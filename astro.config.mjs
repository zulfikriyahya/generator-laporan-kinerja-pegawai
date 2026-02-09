import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
  integrations: [
    alpinejs(),
    AstroPWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false, // Matikan PWA saat mode dev untuk debugging
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "/index.html",
        // PENTING: Jangan cache/intercept request ke API
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkOnly", // Paksa request ke jaringan, jangan cache
          },
        ],
      },
      manifest: {
        name: "E-Kinerja AI",
        short_name: "E-Kinerja",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // Opsional: Proxy agar tidak kena CORS di local
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  },
});
