/** @format */

import { prisma } from "@/app/lib/prisma";
import { Product } from "@prisma/client";

export async function GET() {
	const products: Product[] = await prisma.product.findMany();
	if (!products || products.length === 0) {
		return new Response("No products found", { status: 404 });
	} else {
		const categories = Array.from(
			new Set(products.map((p) => p.category).filter((c) => c)),
		);

		return new Response(JSON.stringify(categories), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
