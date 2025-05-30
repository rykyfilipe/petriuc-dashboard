/** @format */

"use client";

import { useEffect, useState } from "react";
import { Product, StockEntry } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle } from "lucide-react";
import { POST } from "@/app/api/products/route";

export default function ProductsPage() {
	const { data: session } = useSession();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [addProduct, setAddProduct] = useState(false);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0.0);
	const [category, setCategory] = useState("");
	const [unit, setUnit] = useState("");

	const [stock, setStock] = useState<StockEntry[]>([]);

	const units = ["m3", "m2", "m", "cm2", "cm"];

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/api/products");
				if (!res.ok) throw new Error("Eroare la încărcarea produselor");
				const data: Product[] = await res.json();
				setProducts(data);
			} catch (err: any) {
				setError(err.message || "Eroare necunoscută");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		const fetchStock = async () => {
			try {
				const res = await fetch("/api/stock");
				if (!res.ok) throw new Error("Eroare la încărcarea produselor");
				const data: StockEntry[] = await res.json();
				setStock(data);
			} catch (err: any) {
				setError(err.message || "Eroare necunoscută");
			} finally {
				setLoading(false);
			}
		};

		fetchStock();
	}, []);

	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/categories");
				if (!response.ok) {
					throw new Error("Failed to fetch categories");
				}
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const addProductHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					description,
					price,
					category,
					unit,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to add product");
			}

			const data = await response.json();
			setProducts((prev) => [...prev, data]);
			resetForm();
			setAddProduct(false);
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	const resetForm = () => {
		setName("");
		setDescription("");
		setPrice(0);
		setCategory("");
		setUnit("");
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
		<div className='container mx-auto px-4 py-8'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
				<h1 className='text-3xl font-bold'>Produse ({products.length})</h1>

				<div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
					<div className='relative w-full'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Caută produse...'
							className='pl-10 w-full'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<Button variant='outline' className='gap-2'>
						<Filter className='h-4 w-4' />
						Filtre
					</Button>

					<Button
						className='gap-2 cursor-pointer'
						onClick={() => setAddProduct(true)}>
						<PlusCircle className='h-4 w-4' />
						Adaugă produs
					</Button>
				</div>
			</div>

			{addProduct && (
				<div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'>
					<Tabs
						defaultValue='addProduct'
						className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md'>
						<TabsContent value='addProduct'>
							<h1 className='text-xl font-semibold mb-4'>Add new product</h1>
							<form onSubmit={addProductHandler} className='space-y-6'>
								<div className='grid gap-2'>
									<Label htmlFor='name'>Name</Label>
									<Input
										id='name'
										type='text'
										placeholder='test'
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='price'>Price</Label>
									<Input
										id='price'
										type='number'
										placeholder='0.00'
										value={price}
										onChange={(e) => setPrice(Number(e.target.value))}
										required
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='category'>Unit</Label>
									<Select onValueChange={setUnit}>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select unit' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{units.map((unit) => (
													<SelectItem key={unit} value={unit}>
														{unit}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='description'>Description</Label>
									<Input
										id='description'
										type='text'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										required
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='category'>Category</Label>
									<Select onValueChange={setCategory}>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select category' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{categories.map((category) => (
													<SelectItem key={category} value={category}>
														{category}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className='flex justify-end gap-4 pt-4'>
									<Button type='submit' size='sm' className='cursor-pointer'>
										Add
									</Button>
									<Button
										className='cursor-pointer'
										type='button'
										size='sm'
										variant='ghost'
										onClick={() => setAddProduct(false)}>
										Cancel
									</Button>
								</div>
							</form>
						</TabsContent>
					</Tabs>
				</div>
			)}

			{filteredProducts.length === 0 ? (
				<div className='text-center py-12'>
					<p className='text-muted-foreground'>Nu s-au găsit produse.</p>
				</div>
			) : (
				<div className='flex flex-col gap-2 w-full'>
					{/* Header - afișat doar pe ecrane mari */}
					<div className='hidden md:grid grid-cols-6 gap-4 font-semibold text-sm text-muted-foreground border-b pb-2 px-4'>
						<span>Nume</span>
						<span>Categorie</span>
						<span>ID</span>
						<span>Descriere</span>
						<span>Preț / Stoc</span>
						<span>Acțiuni</span>
					</div>

					{/* Lista produse */}
					{filteredProducts.map((product) => {
						const productStock =
							stock.find((e) => e.productId === product.id)?.quantity ?? 0;

						return (
							<div
								key={product.id}
								className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-full text-sm
                   flex flex-col gap-3 md:grid md:grid-cols-6 md:items-center md:gap-4 md:px-4 md:py-3'>
								{/* Nume */}
								<span className='font-medium text-base md:text-sm'>
									{product.name}
								</span>

								{/* Categorie */}
								<Badge variant='secondary' className='w-fit'>
									{product.category}
								</Badge>

								{/* ID */}
								<span className='text-xs text-muted-foreground'>
									{product.id}
								</span>

								{/* Descriere */}
								<p className='text-muted-foreground text-sm md:text-xs line-clamp-2'>
									{product.description || "Fără descriere"}
								</p>

								{/* Preț / Stoc */}
								<div className='flex flex-col'>
									<span className='font-bold text-base md:text-sm'>
										{product.price.toFixed(2)} {product.unit}
									</span>
									<span
										className={`text-sm ${
											productStock > 0 ? "text-green-500" : "text-red-500"
										}`}>
										{productStock > 0
											? `În stoc: ${productStock}`
											: "Stoc epuizat"}
									</span>
								</div>

								<div className='flex gap-2 md:flex-col lg:flex-row'>
									<Button
										variant='outline'
										size='sm'
										className='flex-1 cursor-pointer'>
										Detalii
									</Button>
									<Button size='sm' className='flex-1 cursor-pointer'>
										Modifică
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
