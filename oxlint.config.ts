import { defineConfig } from "oxlint";

export default defineConfig({
    plugins: [
        // Default
        "eslint",
        "typescript",
        "unicorn",
        "oxc",
        // Non-default
        "react",
        "import",
        "promise",
    ],
});
