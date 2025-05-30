/** @format */

"use client";

import { useEffect, useState } from "react";
import { StockEntry } from "@prisma/client";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Search, Filter, PlusCircle } from "lucide-react";
export default function Stock() {
	const [stock, setStock] = useState<StockEntry[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [addProduct, setAddProduct] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0.0);

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			const response = await fetch("/api/stock");
			const data = await response.json();

			if (data) {
				setStock(data);
				setLoading(false);
			}
		};
		loadData();
	}, []);
	if (loading) {
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}
	if (error) {
		setError(error);
		return <div className='text-red-500 text-center p-4'>Eroare: {error}</div>;
	}
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
				<h1 className='text-3xl font-bold'>Stock ({stock.length})</h1>

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
							<form className='space-y-6'>
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
									<Label htmlFor='description'>Description</Label>
									<Input
										id='description'
										type='text'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										required
									/>
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

			{stock.length === 0 ? (
				<div className='text-center py-12'>
					<p className='text-muted-foreground'>Adauga stock.</p>
				</div>
			) : (
				<div className='flex flex-col gap-2 w-full'>
					<div className='hidden md:grid grid-cols-6 gap-4 font-semibold text-sm text-muted-foreground border-b pb-2 px-4'>
						<span>ID</span>
						<span>Acțiuni</span>
					</div>

					{stock.map((product) => {
						return (
							<div
								key={product.id}
								className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-full text-sm
                                            flex flex-col gap-3 md:grid md:grid-cols-6 md:items-center md:gap-4 md:px-4 md:py-3'>
								<span className='text-xs text-muted-foreground'>
									{product.id}
								</span>
								<span className='text-xs text-muted-foreground'>
									{new Date(product.addedAt).toLocaleString()}
								</span>
								<span className='text-xs text-muted-foreground'>
									{product.quantity}
								</span>

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
