/** @format */

import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	const orders = await prisma.order.findMany();

	if (!orders || orders.length === 0) {
		return new NextResponse("No orders found", { status: 404 });
	}

	return NextResponse.json(orders);
}
