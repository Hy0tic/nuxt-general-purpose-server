import { createTOTPKeyURI } from "oslo/otp";
import QRCode from "qrcode";
import { encodeHex } from "oslo/encoding";

export default eventHandler(async (event) => {
	const user = event.context.user;

	if (!user) {
		return new Response(null, {
			status: 401
		});
	}

	const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20));
	await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			two_factor_secret: encodeHex(twoFactorSecret)
		}
	});

	// pass the website's name and the user identifier (e.g. email, username)
	const uri = createTOTPKeyURI(
		"nuxt-general-purpose-server",
		user.username,
		twoFactorSecret
	);

	// use any image generator
	const qrcode = await generateQR(uri);

	return {
		result: qrcode,
		status: 200
	};
});

const generateQR = async (text: any) => {
	try {
		return await QRCode.toDataURL(text);
	} catch (err) {
		console.error(err);
	}
};
