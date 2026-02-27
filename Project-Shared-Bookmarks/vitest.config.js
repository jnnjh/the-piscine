import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // for DOM testing
    globals: true,        // optional: allows to use describe/test/expect without importing
    include: ["src/**/*.test.js"],
  },
});