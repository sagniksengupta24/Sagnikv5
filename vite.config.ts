import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

function copyAssetsPlugin() {
  return {
    name: "copy-assets",
    closeBundle() {
      const src = path.resolve(rootDir, "assets");
      const dest = path.resolve(rootDir, "dist/assets");
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
      }
    }
  };
}

export default defineConfig({
  base: "./",
  plugins: [copyAssetsPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 4096,
    cssCodeSplit: false
  }
});
