/** @format */

"use client";

import { Order, OrderItem, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";

interface OrderWithItems extends Order {
	items: (OrderItem & { product: Product })[];
}

export default function Sales() {
	const [orders, setOrders] = useState<OrderWithItems[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const res = await fetch("/api/orders/allWithItems");
				if (!res.ok) throw new Error("Eroare la încărcarea comenzilor");
				const data = await res.json();
				setOrders(data);
				setLoading(false);
			} catch (error) {
				console.error("Eroare la încărcare comenzi", error);
			}
		};

		fetchOrders();
	}, []);

	const generateInvoice = async (order: OrderWithItems) => {
		const element = document.createElement("div");
		element.style.padding = "20px";
		element.style.fontFamily = "Arial, sans-serif";
		element.style.width = "210mm"; // A4 width
		element.innerHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <h2 style="text-align: center;">Factura fiscală</h2>
        <p><strong>Data:</strong> ${new Date(
					order.createdAt,
				).toLocaleDateString("ro-RO")}</p>
        <p><strong>Cumpărător:</strong> ${order.customer}</p>
        <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; margin-top: 10px; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th>#</th>
              <th>Produs</th>
              <th>UM</th>
              <th>Cantitate</th>
              <th>Preț unitar</th>
              <th>Valoare</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
							.map(
								(item, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${item.product.name}</td>
                <td>${item.product.unit}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)} RON</td>
                <td>${item.total.toFixed(2)} RON</td>
              </tr>
            `,
							)
							.join("")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" style="text-align: right;"><strong>Total</strong></td>
              <td><strong>${order.total.toFixed(2)} RON</strong></td>
            </tr>
          </tfoot>
        </table>
        <p style="margin-top: 20px;">Semnătură:</p>
        <div style="width: 200px; height: 80px; border: 1px solid black;"></div>
      </div>
    `;

		document.body.appendChild(element);

		try {
			const dataUrl = await htmlToImage.toPng(element);
			document.body.removeChild(element);

			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm",
				format: "a4",
			});

			const imgProps = pdf.getImageProperties(dataUrl);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

			pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
			pdf.save(`Factura-${order.id}.pdf`);
		} catch (error) {
			console.error("Error generating PDF:", error);
			document.body.removeChild(element);
		}
	};
	if (loading) {
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}
	if (error)
		return <div className='text-red-500 text-center p-4'>Eroare: {error}</div>;
	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Comenzi</h1>
			{orders.map((order) => (
				<div
					key={order.id}
					className='border p-4 mb-4 rounded shadow-sm bg-white'>
					{order.items.map((item) => (
						<ul className='flex flex-col' key={item.id}>
							<li>Name:{item.product.name}</li>
							<li>Price:{item.product.price}</li>
							<li>Unit:{item.product.unit}</li>
							<li>Quantity:{item.quantity}</li>

							<br />
						</ul>
					))}

					<p className='font-medium'>Comandă: {order.id}</p>
					<p>Total: {order.total.toFixed(2)} RON</p>
					<button
						onClick={() => generateInvoice(order)}
						className='mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'>
						Generează factură
					</button>
				</div>
			))}
		</div>
	);
}
