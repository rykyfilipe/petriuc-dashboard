/** @format */

export type Role = "ADMIN" | "AGENT";

export interface User {
	id: string;
	email: string;
	name: string;
	role: Role;
	password: string;
	createdAt: Date;
}

export interface Product {
	id: string;
	name: string;
	description?: string | null;
	unit: string; // ex: "m2", "ml", "buc"
	price: number;
	createdAt: Date;
	stock?: StockEntry[];
	orderItems?: OrderItem[];
}

export interface StockEntry {
	id: string;
	productId: string;
	quantity: number;
	addedAt: Date;
	product?: Product;
}

export interface Order {
	id: string;
	customer: string;
	createdAt: Date;
	total: number;
	items?: OrderItem[];
}

export interface OrderItem {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	unitPrice: number;
	total: number;
	order?: Order;
	product?: Product;
}
