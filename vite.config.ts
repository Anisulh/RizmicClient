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
        start_url: ".",
        display: "standalone",
        shortcuts: [
          {
            name: "Add Outfit",
            short_name: "Add Outfit",
            description: "Quickly add a new outfit",
            url: "/wardrobe?action=add&tab=outfits",
            icons: [
              {
                src: "/icons/add-outfit.svg",
                sizes: "any",
                type: "image/svg+xml",
              },
            ],
          },
          {
            name: "Add Clothes",
            short_name: "Add Clothes",
            description: "Quickly add new clothes",
            url: "/wardrobe?action=add&tab=clothes",
            icons: [
              {
                src: "/icons/add-clothes.svg",
                sizes: "any",
                type: "image/svg+xml",
              },
            ],
          },
          {
            name: "Open Wardrobe",
            short_name: "Wardrobe",
            description: "Open your wardrobe",
            url: "/wardrobe",
            icons: [
              {
                src: "/icons/wardrobe.svg",
                sizes: "any",
                type: "image/svg+xml",
              },
            ],
          },
          {
            name: "Find Friends",
            short_name: "Find Friends",
            description: "Find and add friends",
            url: "/friends",
            icons: [
              {
                src: "/icons/friends.svg",
                sizes: "any",
                type: "image/svg+xml",
              },
            ],
          },
        ],
      },
    }),
  ],
});
