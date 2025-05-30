/** @format */
"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Button } from "@/components/ui/button";
import { Activity, ShoppingCart, DollarSign, Package } from "lucide-react";

export default function DashboardPage() {
	const salesData = [
		{ name: "Jan", value: 4000 },
		{ name: "Feb", value: 3000 },
		{ name: "Mar", value: 5000 },
		{ name: "Apr", value: 2780 },
		{ name: "May", value: 1890 },
		{ name: "Jun", value: 2390 },
	];

	const revenueData = [
		{ name: "Q1", value: 12500 },
		{ name: "Q2", value: 9800 },
		{ name: "Q3", value: 15200 },
		{ name: "Q4", value: 11000 },
	];

	const productDistribution = [
		{ name: "Electronics", value: 35 },
		{ name: "Clothing", value: 25 },
		{ name: "Home Goods", value: 20 },
		{ name: "Other", value: 20 },
	];

	return (
		<div className='w-full h-full p-6 space-y-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<div className='flex space-x-4'>
					<Button variant='outline'>Last Month</Button>
					<Button>This Month</Button>
				</div>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
						<DollarSign className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>$45,231.89</div>
						<p className='text-xs text-muted-foreground'>
							+20.1% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>Sales</CardTitle>
						<ShoppingCart className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+1,234</div>
						<p className='text-xs text-muted-foreground'>
							+18.1% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>Products</CardTitle>
						<Package className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>572</div>
						<p className='text-xs text-muted-foreground'>
							+12 in stock this month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between pb-2'>
						<CardTitle className='text-sm font-medium'>Active Now</CardTitle>
						<Activity className='w-4 h-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+573</div>
						<p className='text-xs text-muted-foreground'>
							+201 since last hour
						</p>
					</CardContent>
				</Card>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
				<Card className='col-span-4'>
					<CardHeader>
						<CardTitle>Sales Overview</CardTitle>
						<CardDescription>Monthly sales performance</CardDescription>
					</CardHeader>
					<CardContent className='pl-2'>
						<BarChart data={salesData} height={300} />
					</CardContent>
				</Card>

				<Card className='col-span-3'>
					<CardHeader>
						<CardTitle>Product Distribution</CardTitle>
						<CardDescription>By category</CardDescription>
					</CardHeader>
					<CardContent>
						<PieChart data={productDistribution} height={300} />
					</CardContent>
				</Card>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
				<Card className='col-span-4'>
					<CardHeader>
						<CardTitle>Revenue Trend</CardTitle>
						<CardDescription>Quarterly revenue analysis</CardDescription>
					</CardHeader>
					<CardContent className='pl-2'>
						<LineChart data={revenueData} height={300} />
					</CardContent>
				</Card>

				<Card className='col-span-3'>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Latest transactions</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center'>
							<div className='w-2 h-2 bg-green-500 rounded-full mr-2' />
							<div className='flex-1'>
								<p className='text-sm font-medium'>New order #1234</p>
								<p className='text-xs text-muted-foreground'>2 min ago</p>
							</div>
							<div className='font-medium'>+$125.00</div>
						</div>
						<div className='flex items-center'>
							<div className='w-2 h-2 bg-blue-500 rounded-full mr-2' />
							<div className='flex-1'>
								<p className='text-sm font-medium'>Product added</p>
								<p className='text-xs text-muted-foreground'>15 min ago</p>
							</div>
							<div className='font-medium'>New item</div>
						</div>
						<div className='flex items-center'>
							<div className='w-2 h-2 bg-yellow-500 rounded-full mr-2' />
							<div className='flex-1'>
								<p className='text-sm font-medium'>Inventory update</p>
								<p className='text-xs text-muted-foreground'>1 hour ago</p>
							</div>
							<div className='font-medium'>+42 items</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
