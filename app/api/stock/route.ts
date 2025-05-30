/** @format */

import { StockEntry } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
	const stock: StockEntry[] = await prisma.stockEntry.findMany();

	if (!stock || stock.length === 0) {
		return new Response("No products found", { status: 404 });
	}

	return new Response(JSON.stringify(stock), {
		headers: { "Content-Type": "application/json" },
	});
}

// export async function PATCH(req: Request) {

// }
