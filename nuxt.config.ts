export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@pinia/nuxt'],
    css: ['~/assets/scss/main.scss', 'swiper/css', '~/src/assets/css/style.min.css'],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
        },
    },
    imports: {
        dirs: ['core/composables', 'core/stores'],
    },
    alias: {
        '@core': '/core',
    },
    compatibilityDate: '2026-04-16',
});
