/** @format */

// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Titlu",
	description: "Descriere",
	manifest: "public/manifest.json",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link rel='manifest' href='public/manifest.json' />
				<meta name='theme-color' content='#000000' />
				<meta name='mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<link rel='apple-touch-icon' href='/icons/icon-192x192.png' />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SessionProviderWrapper>{children}</SessionProviderWrapper>
			</body>
		</html>
	);
}
