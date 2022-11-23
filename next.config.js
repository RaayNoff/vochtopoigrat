/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["media.rawg.io"],
	},
};

module.exports = nextConfig;
