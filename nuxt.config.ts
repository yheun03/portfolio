export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@pinia/nuxt'],
    components: true,
    pages: true,
    experimental: {
        appManifest: false,
    },
    css: ['~/assets/styles/index.scss', 'swiper/css'],
    vite: {
        server: {
            watch: {
                usePolling: true,
                interval: 1000,
            },
        },
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
        },
    },
    imports: {
        dirs: ['core/composables', 'core/stores'],
    },
    alias: {
        '@core': './core',
    },
    compatibilityDate: '2026-04-16',
});
