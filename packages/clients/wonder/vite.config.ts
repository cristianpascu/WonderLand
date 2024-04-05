/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    loadEnv(mode, process.cwd(), '');
    const production = mode == 'production';
    const host = production ? '/api' : 'http://localhost:3001';
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        esbuild: {
            jsxFactory: `jsx`,
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setup-tests.ts',
        },
        server: {
            host: true,
            port: 80,
            hmr: {
                path: '/socket.io',
                port: 443,
            },
        },
        define: {
            __APP_ENV__: JSON.stringify({
                host,
            }),
        },
    };
});
