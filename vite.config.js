import { defineConfig } from 'vite';

export default defineConfig({
    base: '/VarthamanAgriSeeds-frontend/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    server: {
        port: 3000,
        open: true
    }
});
