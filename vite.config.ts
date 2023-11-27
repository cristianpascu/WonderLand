import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isPreview, isSsrBuild }) => {
    console.log(command, mode, isPreview, isSsrBuild);
    return {
        plugins: [
            react({
                jsxImportSource: "@emotion/react",
            }),
        ],
        esbuild: {
            jsxFactory: `jsx`,
            jsxInject: `import { jsx } from '@emotion/react'`,
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/test/setup.ts",
        },
    };
});
