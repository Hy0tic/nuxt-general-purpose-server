import { TimeSpan } from "oslo";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";

export default eventHandler(async (event) => {
	const formData = await readFormData(event);
	const otp = formData.get("TOTP")?.toString().replace(/\s+/g, "") ?? "";

	const temptTokenFromCookie = getCookie(event, "tempToken");

	if (!temptTokenFromCookie) {
		return {
			statusCode: 400,
		};
	}

	const tempToken = await prisma.tempToken.findFirst({
		where: {
			token: temptTokenFromCookie,
		},
	});

	// TODO: check if temp token expires

	const userRecord = await prisma.user.findUnique({
		where: {
			id: tempToken?.userId,
		},
		select: {
			two_factor_secret: true,
		},
	});

	const twoFactorSecret = decodeHex(userRecord?.two_factor_secret ?? "");

	if (twoFactorSecret) {
		const oneHour = new TimeSpan(30, "s");
		const validOTP = await new TOTPController({
			digits: 6,
			period: oneHour,
		}).verify(otp, twoFactorSecret);

		if (validOTP && tempToken?.userId) {
			// create session
			const session = await lucia.createSession(tempToken?.userId, {});
			appendHeader(
				event,
				"Set-Cookie",
				lucia.createSessionCookie(session.id).serialize(),
			);

			// remove token from table
			await prisma.tempToken.delete({
				where: {
					token: tempToken.token,
				},
			});

			// remove temp token from cookie
			appendHeader(
				event,
				"Set-Cookie",
				`tempToken=; HttpOnly; Path=/; Max-Age=10;`,
			);

			return {
				statusCode: 200,
				message: "TOTP verified",
			};
		}

		return {
			statusCode: 400,
			message: "invalid",
		};
	} else {
		return {
			statusCode: 400,
			message: "invalid",
		};
	}
});
