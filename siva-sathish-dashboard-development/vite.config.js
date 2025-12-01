import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    middlewareMode: false,
    setupMiddlewares(middlewares, devServer) {
      middlewares.unshift(
        history({
          verbose: true, // ✅ This will print fallback logs in your terminal
        })
      );
      return middlewares;
    },
  },
});
