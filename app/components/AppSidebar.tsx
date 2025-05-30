/** @format */

"use client";
import {
	Home,
	Settings,
	NotebookIcon,
	WarehouseIcon,
	Package,
	Users,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Products",
		url: "/dashboard/products",
		icon: Package,
	},
	{
		title: "Sales",
		url: "/dashboard/sales",
		icon: NotebookIcon,
	},
	{
		title: "Stock",
		url: "/dashboard/stock",
		icon: WarehouseIcon,
	},
	{
		title: "Agents",
		url: "/dashboard/agents",
		icon: Users,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar() {
	const handleLogout = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='text-2xl pb-2'>
						PETRIUC
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button className='cursor-pointer' onClick={handleLogout}>
					Logout
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
