import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

export default defineConfig({
  integrations: [
    alpinejs(),
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Generator Laporan Kinerja Pegawai",
        short_name: "Laporan Kineja Pegawai",
        description:
          "Aplikasi penyusun laporan kinerja pegawai otomatis berbasis AI",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
