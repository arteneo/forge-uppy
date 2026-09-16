import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
    plugins: [react(), dts({ bundleTypes: true })],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.tsx"),
            formats: ["es"],
            fileName: "index",
        },
        rolldownOptions: {
            // Ensure to externalize deps that should not be bundled into your library (mainly peer dependencies)
            // Additionally:
            // "react/jsx-runtime" introduced by @vitejs/plugin-react
            external: [...Object.keys(pkg.peerDependencies), "react/jsx-runtime"],
        },
    },
});
