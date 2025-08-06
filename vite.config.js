import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "192.168.100.237",
        port: 5173,
        strictPort: true,
        cors: true, // habilita CORS para acceso cruzado desde Laravel
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "resources/js"),
        },
    },
});
