/** @format */

"use client";

import {
	BarChart as RechartsBarChart,
	LineChart as RechartsLineChart,
	PieChart as RechartsPieChart,
	Bar,
	Line,
	Pie,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell,
} from "recharts";

const colorPalette = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface ChartData {
	name: string;
	value: number;
}

interface ChartProps {
	data: ChartData[];
	height?: number;
}

export function BarChart({ data, height = 300 }: ChartProps) {
	return (
		<ResponsiveContainer width='100%' height={height}>
			<RechartsBarChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey='value' fill='#8884d8' />
			</RechartsBarChart>
		</ResponsiveContainer>
	);
}

export function LineChart({ data, height = 300 }: ChartProps) {
	return (
		<ResponsiveContainer width='100%' height={height}>
			<RechartsLineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey='value'
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
			</RechartsLineChart>
		</ResponsiveContainer>
	);
}

export function PieChart({ data, height = 300 }: ChartProps) {
	return (
		<ResponsiveContainer width='100%' height={height}>
			<RechartsPieChart>
				<Pie
					data={data}
					cx='50%'
					cy='50%'
					labelLine={false}
					outerRadius={80}
					fill='#8884d8'
					dataKey='value'
					label={({ name, percent }) =>
						`${name}: ${(percent * 100).toFixed(0)}%`
					}>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={colorPalette[index % colorPalette.length]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</RechartsPieChart>
		</ResponsiveContainer>
	);
}
