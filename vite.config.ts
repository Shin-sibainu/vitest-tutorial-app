/// <reference types="vitest"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"],
    coverage: {
      provider: "v8",
      exclude: [
        "src/main.tsx", // 既に含まれているファイル
        "**/*.cjs", // .cjs 拡張子を持つすべてのファイルを除外
        "src/App.tsx", // App.tsx を除外
      ],
    },
  },
});
