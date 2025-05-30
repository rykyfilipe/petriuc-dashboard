/** @format */

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [click, setClick] = useState(false);

	useEffect(() => {
		if (status === "loading") return;
		if (session) {
			router.replace("/dashboard");
		} else {
			router.replace("/login");
		}
	}, [click, router, session, status]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6'>
			<h1 className='text-5xl font-extrabold mb-4'>Welcome to Demo App</h1>
			<p className='mb-8 text-lg max-w-xl text-center'>
				This is a simple demonstration of a Next.js application with
				authentication.
			</p>
			<button
				onClick={() => setClick(true)}
				className='cursor-pointer px-8 py-3 bg-white text-blue-600 rounded font-semibold hover:bg-gray-200 transition'>
				Get Started
			</button>
		</div>
	);
}
