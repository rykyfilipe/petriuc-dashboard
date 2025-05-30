/** @format */

// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			name: string;
			id: string;
			email: string;
			role: "ADMIN" | "AGENT";
		} & DefaultSession["user"];
	}

	interface User {
		name: string;
		id: string;
		email: string;
		role: "ADMIN" | "AGENT";
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role?: "ADMIN" | "AGENT";
		sub?: string;
	}
}
