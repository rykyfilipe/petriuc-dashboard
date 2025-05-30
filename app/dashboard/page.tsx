/** @format */
"use client";

import React from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Activity,
	ShoppingCart,
	DollarSign,
	Package,
	TrendingUp,
	TrendingDown,
} from "lucide-react";
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

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
		{ name: "Electronics", value: 35, color: "#3b82f6" },
		{ name: "Clothing", value: 25, color: "#ef4444" },
		{ name: "Home Goods", value: 20, color: "#10b981" },
		{ name: "Other", value: 20, color: "#f59e0b" },
	];

	type StatCardProps = {
		title: string;
		value: string | number;
		change: string;
		icon: React.ElementType;
		trend: "up" | "down";
	};

	const StatCard = ({
		title,
		value,
		change,
		icon: Icon,
		trend,
	}: StatCardProps) => (
		<Card className='transition-all duration-200 hover:shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50'>
			<CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
				<CardTitle className='text-sm font-medium text-gray-600'>
					{title}
				</CardTitle>
				<div className='p-2 bg-blue-50 rounded-lg'>
					<Icon className='w-4 h-4 text-blue-600' />
				</div>
			</CardHeader>
			<CardContent className='space-y-1'>
				<div className='text-2xl font-bold text-gray-900'>{value}</div>
				<div className='flex items-center text-xs'>
					{trend === "up" ? (
						<TrendingUp className='w-3 h-3 text-green-500 mr-1' />
					) : (
						<TrendingDown className='w-3 h-3 text-red-500 mr-1' />
					)}
					<span className={trend === "up" ? "text-green-600" : "text-red-600"}>
						{change}
					</span>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
			<div className='w-full h-full p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto'>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
					<div>
						<h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
							Dashboard
						</h1>
						<p className='text-sm text-gray-500 mt-1 hidden sm:block'>
							Welcome back! Here&apos;s what&apos;s happening with your
							business.
						</p>
					</div>
					<div className='flex gap-2 sm:gap-4'>
						<Button variant='outline' size='sm' className='flex-1 sm:flex-none'>
							Last Month
						</Button>
						<Button size='sm' className='flex-1 sm:flex-none'>
							This Month
						</Button>
					</div>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
					<StatCard
						title='Total Revenue'
						value='$45,231.89'
						change='+20.1% from last month'
						icon={DollarSign}
						trend='up'
					/>
					<StatCard
						title='Sales'
						value='+1,234'
						change='+18.1% from last month'
						icon={ShoppingCart}
						trend='up'
					/>
					<StatCard
						title='Products'
						value='572'
						change='+12 in stock this month'
						icon={Package}
						trend='up'
					/>
					<StatCard
						title='Active Now'
						value='+573'
						change='+201 since last hour'
						icon={Activity}
						trend='up'
					/>
				</div>

				{/* Charts Section */}
				<div className='space-y-4 sm:space-y-6'>
					{/* Sales Overview - Full width on mobile */}
					<Card className='border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50'>
						<CardHeader className='pb-4'>
							<CardTitle className='text-lg font-semibold text-gray-900'>
								Sales Overview
							</CardTitle>
							<CardDescription className='text-gray-600'>
								Monthly sales performance
							</CardDescription>
						</CardHeader>
						<CardContent className='p-0 sm:pl-2'>
							<ResponsiveContainer width='100%' height={250}>
								<BarChart
									data={salesData}
									margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
									<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
									<XAxis dataKey='name' stroke='#666' fontSize={12} />
									<YAxis stroke='#666' fontSize={12} />
									<Tooltip
										contentStyle={{
											backgroundColor: "white",
											border: "none",
											borderRadius: "8px",
											boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
										}}
									/>
									<Bar dataKey='value' fill='#3b82f6' radius={[4, 4, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* Desktop: Two columns, Mobile: Stacked */}
					<div className='grid gap-4 lg:grid-cols-2'>
						{/* Revenue Trend */}
						<Card className='border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50'>
							<CardHeader className='pb-4'>
								<CardTitle className='text-lg font-semibold text-gray-900'>
									Revenue Trend
								</CardTitle>
								<CardDescription className='text-gray-600'>
									Quarterly revenue analysis
								</CardDescription>
							</CardHeader>
							<CardContent className='p-0 sm:pl-2'>
								<ResponsiveContainer width='100%' height={220}>
									<LineChart
										data={revenueData}
										margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
										<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
										<XAxis dataKey='name' stroke='#666' fontSize={12} />
										<YAxis stroke='#666' fontSize={12} />
										<Tooltip
											contentStyle={{
												backgroundColor: "white",
												border: "none",
												borderRadius: "8px",
												boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
											}}
										/>
										<Line
											type='monotone'
											dataKey='value'
											stroke='#10b981'
											strokeWidth={3}
											dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
											activeDot={{
												r: 6,
												stroke: "#10b981",
												strokeWidth: 2,
												fill: "white",
											}}
										/>
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						{/* Product Distribution */}
						<Card className='border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50'>
							<CardHeader className='pb-4'>
								<CardTitle className='text-lg font-semibold text-gray-900'>
									Product Distribution
								</CardTitle>
								<CardDescription className='text-gray-600'>
									By category
								</CardDescription>
							</CardHeader>
							<CardContent className='flex flex-col sm:flex-row items-center'>
								<div className='w-full sm:w-auto'>
									<ResponsiveContainer
										width='100%'
										height={180}
										className='sm:w-48'>
										<PieChart>
											<Pie
												data={productDistribution}
												cx='50%'
												cy='50%'
												innerRadius={40}
												outerRadius={70}
												paddingAngle={2}
												dataKey='value'>
												{productDistribution.map((entry, index) => (
													<Cell key={`cell-${index}`} fill={entry.color} />
												))}
											</Pie>
											<Tooltip />
										</PieChart>
									</ResponsiveContainer>
								</div>
								<div className='flex flex-wrap sm:flex-col gap-2 sm:gap-3 mt-4 sm:mt-0 sm:ml-4'>
									{productDistribution.map((item, index) => (
										<div key={index} className='flex items-center gap-2'>
											<div
												className='w-3 h-3 rounded-full'
												style={{ backgroundColor: item.color }}
											/>
											<span className='text-xs sm:text-sm text-gray-600'>
												{item.name} ({item.value}%)
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Recent Activity */}
					<Card className='border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50'>
						<CardHeader className='pb-4'>
							<CardTitle className='text-lg font-semibold text-gray-900'>
								Recent Activity
							</CardTitle>
							<CardDescription className='text-gray-600'>
								Latest transactions
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex items-center p-3 bg-green-50 rounded-lg'>
								<div className='w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm font-medium text-gray-900 truncate'>
										New order #1234
									</p>
									<p className='text-xs text-gray-500'>2 min ago</p>
								</div>
								<div className='font-semibold text-green-600 text-sm'>
									+$125.00
								</div>
							</div>
							<div className='flex items-center p-3 bg-blue-50 rounded-lg'>
								<div className='w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm font-medium text-gray-900 truncate'>
										Product added
									</p>
									<p className='text-xs text-gray-500'>15 min ago</p>
								</div>
								<div className='font-semibold text-blue-600 text-sm'>
									New item
								</div>
							</div>
							<div className='flex items-center p-3 bg-yellow-50 rounded-lg'>
								<div className='w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0' />
								<div className='flex-1 min-w-0'>
									<p className='text-sm font-medium text-gray-900 truncate'>
										Inventory update
									</p>
									<p className='text-xs text-gray-500'>1 hour ago</p>
								</div>
								<div className='font-semibold text-yellow-600 text-sm'>
									+42 items
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
