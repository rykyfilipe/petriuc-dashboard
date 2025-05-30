/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});

module.exports = withPWA(nextConfig);
