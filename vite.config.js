import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // relative paths — works on Vercel, Netlify, and GitHub Pages
  server: { host: true, port: 5173 },
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          drei: ["@react-three/drei", "@react-three/fiber", "@react-three/postprocessing"],
        },
      },
    },
  },
});
