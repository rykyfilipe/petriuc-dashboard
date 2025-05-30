/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
	try {
		// 1. Verifică tipul conținutului
		const contentType = req.headers.get("content-type");
		if (contentType !== "application/json") {
			return NextResponse.json(
				{ error: "Content-Type must be application/json" },
				{ status: 415 },
			);
		}

		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const currentUser = await prisma.user.findUnique({
			where: { email: session.user.email! },
		});

		if (!currentUser || currentUser.role !== "ADMIN") {
			return NextResponse.json(
				{ error: "Only administrators can create new users" },
				{ status: 403 },
			);
		}

		let body;
		try {
			body = await req.json();
		} catch (_e) {
			return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
		}

		const { email, password, role, name } = body;

		if (!name || typeof name !== "string" || name.trim().length === 0) {
			return NextResponse.json({ error: "Name is required" }, { status: 400 });
		}

		if (!email || !password || !role) {
			return NextResponse.json(
				{ error: "Email, password, and role are required" },
				{ status: 400 },
			);
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ error: "Password must be at least 6 characters long" },
				{ status: 400 },
			);
		}

		if (!["ADMIN", "AGENT"].includes(role)) {
			return NextResponse.json(
				{ error: "Invalid role. Allowed values: ADMIN, AGENT" },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists" },
				{ status: 409 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				role,
			},
		});

		const { password: _, ...userWithoutPassword } = newUser;

		return NextResponse.json(
			{
				message: "User created successfully",
				user: userWithoutPassword,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Signup error details:", error);

		return NextResponse.json(
			{
				error: "Internal server error",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
