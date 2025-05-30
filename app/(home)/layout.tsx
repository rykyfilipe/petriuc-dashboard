/** @format */
"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "../register-sw";

export default function Layout() {
	useEffect(() => {
		registerServiceWorker();
	}, []);
}
