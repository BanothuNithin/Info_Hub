import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy /api/* to backend running on port 4000
      "/api": {
        target: "https://info-hubaa.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
