import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./PostgresSqlDb";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !import.meta.dev
		}
	},
	getUserAttributes: (attributes: any) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
			setupTwoFactor: attributes.two_factor_secret !== null
		};
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			username: string;
			two_factor_secret: string | null;
		};
	}
	
}
