import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host : "localhost",
    port: 3000
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
      "#root": resolve("."),
    },
  },
});
