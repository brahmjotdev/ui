import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "src/package/ui/**/*.test.ts",
      "src/package/ui/**/*.test.tsx",
      "src/docs/**/*.test.ts",
      "src/docs/**/*.test.tsx",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
      "@cerevialabs/ui": path.resolve(root, "./src/package/ui"),
    },
  },
});
