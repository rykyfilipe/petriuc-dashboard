/** @format */

// app/api/orders/allWithItems/route.ts
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	const orders = await prisma.order.findMany({
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	return NextResponse.json(orders);
}
