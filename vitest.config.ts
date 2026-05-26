import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom", // The jsdom environment is used (for DOM testing).
    globals: true, // allows to use global test functions like describe, test, and expect without importing them.
    setupFiles: "tests/setup.ts", // runs the tests/setup.ts file before each test to set up jest-dom globally.
    exclude: [
      "node_modules",
      "dist",
      "**/*.config.js", // Exclude any *.config.js files from being tested.
      "**/*.config.ts",
      "tests/setup.ts", // Exclude setup file if necessary.
    ],
    include: [
        "tests/**/*.test.{js,ts,jsx,tsx}",
    ],
    coverage: {
      //   include: [
      //     "src/components/reports/**/*.{js,ts,jsx,tsx}",
      //     // "src/components/inventory-management/**/*.{js,ts,jsx,tsx}",
      //     // Include all files in a custom directory.
      //   ],
      //   exclude: [
      //     "src/types",
      //     "src/language",
      //     "src/assets",
      //     "**/*.config.js",
      //     "**/*.config.ts",
      //   ], // exclude the types and test-utils files from the coverage report.
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
