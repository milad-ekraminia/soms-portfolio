import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "stats.html",
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
          open: true,
        }),
      ],
      output: {
        manualChunks(id) {
          if (!id) return;

          // React and react-dom must stay together.
          // Splitting them into separate chunks can cause runtime errors like:
          // "Cannot set properties of undefined (setting 'Children')"
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/scheduler")
          ) {
            return "react-vendor";
          }

          // ---- Charts ----
          if (
            id.includes("node_modules/apexcharts") ||
            id.includes("node_modules/react-apexcharts")
          ) {
            return "apexcharts";
          }

          // ---- Forms ----
          if (
            id.includes("node_modules/yup") ||
            id.includes("node_modules/react-hook-form") ||
            id.includes("node_modules/@hookform/resolvers")
          ) {
            return "forms";
          }

          // ---- Tables ----
          if (
            id.includes("node_modules/@tanstack/react-table") ||
            id.includes("node_modules/@tanstack/react-virtual")
          ) {
            return "tanstack";
          }

          // ---- Mapping ----
          if (
            id.includes("node_modules/leaflet") ||
            id.includes("node_modules/react-leaflet") ||
            id.includes("node_modules/leaflet.vectorgrid")
          ) {
            return "map";
          }

          // ---- Drag & Drop ----
          if (id.includes("node_modules/@dnd-kit")) {
            return "dnd-kit";
          }

          // ---- i18n ----
          if (
            id.includes("node_modules/i18next") ||
            id.includes("node_modules/react-i18next")
          ) {
            return "i18n";
          }

          // ---- Networking ----
          if (id.includes("node_modules/axios")) {
            return "axios";
          }

          // ---- Local helpers ----
          if (id.includes(path.resolve(__dirname, "src/helpers"))) {
            return "helpers";
          }

          // ---- Assets ----
          if (id.includes(path.resolve(__dirname, "src/assets"))) {
            return "assets";
          }

          // ---- Default vendor ----
          // if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
