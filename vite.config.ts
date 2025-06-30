import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		https: {
			key: fs.readFileSync(path.resolve(__dirname, "cert/pc.local-key.pem")),
			cert: fs.readFileSync(path.resolve(__dirname, "cert/pc.local.pem")),
		},
		allowedHosts: ["pc.local"],
		host: "pc.local",
		port: 5173,
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
		},
	},
	optimizeDeps: {
		exclude: ["@preflower/barcode-detector-polyfill"],
	},
});
