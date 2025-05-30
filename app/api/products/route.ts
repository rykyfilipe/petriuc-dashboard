/** @format */

import { prisma } from "@/app/lib/prisma";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
	const products: Product[] = await prisma.product.findMany();

	if (!products || products.length === 0) {
		return new Response("No products found", { status: 404 });
	}

	return new Response(JSON.stringify(products), {
		headers: { "Content-Type": "application/json" },
	});
}

export async function POST(request: Request) {
	try {
		const productData = await request.json();
		// if (!productData.name || !productData.price || !productData.unit) {
		// 	return NextResponse.json(
		// 		{ message: "Missing required fields" },
		// 		{ status: 400 },
		// 	);
		// }

		if (isNaN(parseFloat(productData.price))) {
			return NextResponse.json(
				{ message: "Price must be a number" },
				{ status: 400 },
			);
		}

		const newProduct = await prisma.product.create({
			data: {
				name: productData.name,
				price: parseFloat(productData.price),
				unit: productData.unit,
				description: productData.description || null,
				category: productData.category || null,
			},
		});

		return NextResponse.json(newProduct, { status: 201 });
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
