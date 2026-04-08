import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"], // Static assets
      manifest: {
        id: "/",
        name: "Gwalior Construction ERP",
        short_name: "GwaliorERP",
        description: "Site management for Gwalior projects",
        theme_color: "#000000",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot-mobile.png",
            sizes: "678x382",
            type: "image/png",
            form_factor: "narrow",
            label: "Gwalior ERP Mobile View",
          },
          {
            src: "/screenshot-desktop.png",
            sizes: "1345x633",
            type: "image/png",
            form_factor: "wide",
            label: "Gwalior ERP Desktop View",
          },
        ],
      },
      workbox: {
        // Isse aapka app "Fast" aur "Offline" chalega
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  server: {
    host: "0.0.0.0", // <-- यह सही है, इससे Vite सभी नेटवर्क इंटरफेस पर सुनेगा
    port: 5173, // <-- पोर्ट सही है
    open: true, // <-- वैकल्पिक: सर्वर स्टार्ट होते ही ब्राउज़र खुलेगा

    // *** यह महत्वपूर्ण लाइन है जो आपको पिछली एरर (Blocked request) से छुटकारा दिलाएगी ***
    allowedHosts: [".ngrok-free.app"], // <-- यह ngrok डोमेन को अनुमति देगा
  },
});
