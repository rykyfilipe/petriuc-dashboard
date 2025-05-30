/** @format */

// lib/authOptions.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				name: { label: "Name", type: "text" },
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
				role: { label: "Role", type: "text" },
			},
			async authorize(credentials) {
				if (
					!credentials?.name ||
					!credentials?.email ||
					!credentials?.password ||
					!credentials?.role
				) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (
					!user ||
					!(await bcrypt.compare(credentials.password, user.password)) ||
					user.role !== credentials.role ||
					user.name !== credentials.name
				) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					role: user.role,
					name: user.name,
				};
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.sub) {
				session.user.id = token.sub;
			}
			if (token.role) {
				session.user.role = token.role;
			}
			return session;
		},
	},
};
