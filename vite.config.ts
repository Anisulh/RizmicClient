import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-icon.png"],
      manifest: {
        name: "RizmicFits",
        short_name: "Rizmic",
        description: "All in one app to manage all your clothing needs.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
