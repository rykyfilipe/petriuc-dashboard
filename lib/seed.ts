/** @format */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

async function main() {
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.stockEntry.deleteMany();
	await prisma.product.deleteMany();

	const products = await prisma.product.createMany({
		data: [
			{
				id: "69c4e28d-ae6b-4e56-9b7e-48e8c6099924",
				name: "Gresie Alba",
				description: "Plăci de gresie albă, lucioasă",
				unit: "m2",
				price: 45.0,
			},
			{
				id: "9ad89426-c15e-434c-92f3-4f6fac64731b",
				name: "Tigla metalică",
				description: "Tigla metalică roșie 0.5mm",
				unit: "ml",
				price: 27.5,
			},
			{
				id: "9710bb1b-8b3d-4922-8c4e-d9ab3271488f",
				name: "Adeziv",
				description: "Saci de adeziv 25kg",
				unit: "buc",
				price: 35.0,
			},
		],
	});

	// 🧱 Adăugăm intrări în stoc
	await prisma.stockEntry.createMany({
		data: [
			{
				id: "073bef20-c461-4a39-aed5-81f982e9c723",
				productId: "69c4e28d-ae6b-4e56-9b7e-48e8c6099924",
				quantity: 100.0,
			},
			{
				id: "b5b762ca-dda6-416b-a806-a87cd6bd6ebc",
				productId: "9ad89426-c15e-434c-92f3-4f6fac64731b",
				quantity: 250.0,
			},
			{
				id: "deb991f1-163b-449c-96f0-fdce8244b169",
				productId: "9710bb1b-8b3d-4922-8c4e-d9ab3271488f",
				quantity: 60.0,
			},
		],
	});

	// 🧾 Creăm comandă și produsele din comandă
	await prisma.order.create({
		data: {
			id: "d7726eb4-8d4f-47b8-9bb3-e8bb8dcdb373",
			customer: "Ion Popescu",
			total: 625.0,
			items: {
				create: [
					{
						id: "de84d8b9-7f32-4d04-b2ac-67e0caad15a1",
						productId: "69c4e28d-ae6b-4e56-9b7e-48e8c6099924",
						quantity: 10.0,
						unitPrice: 45.0,
						total: 450.0,
					},
					{
						id: "d21ff2a6-3ac4-4c95-ab4e-8742c8adb7e6",
						productId: "9710bb1b-8b3d-4922-8c4e-d9ab3271488f",
						quantity: 5.0,
						unitPrice: 35.0,
						total: 175.0,
					},
				],
			},
		},
	});

	console.log("✅ Seed complet!");
}

main()
	.catch((e) => {
		console.error("❌ Eroare la seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
