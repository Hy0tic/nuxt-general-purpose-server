import { lucia } from "../../utils/Auth";

// server/api/amIauthenticated.get.ts
export default eventHandler(async (event) => {
	const cookie = getCookie(event, lucia.sessionCookieName);

	if (!cookie) {
		return {
			fresh: false,
			message: "No cookie found",
		};
	}

	try {
		const { session, user } = await lucia.validateSession(cookie);
		if (session) {
			return {
				fresh: true,
				message: "Cookie is fresh",
				username: user.username,
				statusCode: 200,
			};
		} else {
			return {
				fresh: false,
				message: "Cookie is not valid",
				statusCode: 200,
			};
		}
	} catch (error) {
		return {
			fresh: false,
			message: "Error verifying cookie",
			statusCode: 400,
		};
	}
});
