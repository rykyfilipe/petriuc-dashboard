/** @format */

import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id) {
		return new NextResponse("Missing order ID", { status: 400 });
	}

	const orderItems = await prisma.orderItem.findMany({
		where: { orderId: id },
	});

	if (!orderItems || orderItems.length === 0) {
		return new NextResponse("No order items found", { status: 404 });
	}

	return NextResponse.json(orderItems);
}
