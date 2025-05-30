/** @format */

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className='overflow-hidden dark'>
			<AppSidebar />
			<main className='h-auto w-full'>
				<SidebarTrigger className='absolute' />
				{children}
			</main>
		</SidebarProvider>
	);
}
