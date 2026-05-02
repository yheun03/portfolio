import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    experimental: { appManifest: false },
    features: { inlineStyles: false },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        },
    },

    modules: ['@pinia/nuxt'],
    css: ['~/assets/scss/main.scss'],

    imports: {
        dirs: ['~/composables', '~/core/composables'],
    },

    pinia: {
        storesDirs: ['~/core/stores'],
    },

    components: [
        { path: '~/components/Common', pathPrefix: false },
        { path: '~/components/Card', pathPrefix: false },
        { path: '~/components/Section', pathPrefix: false },
        { path: '~/components/Layout', pathPrefix: false },
    ],

    vite: {
        build: {
            chunkSizeWarningLimit: 900,
        },
        server: {
            watch: {
                usePolling: true,
                interval: 250,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: ['assets/scss'],
                    additionalData: '@use "abstract/index" as *;',
                },
            },
        },
    },

    watchers: {
        chokidar: {
            usePolling: true,
            interval: 250,
        },
    },

    runtimeConfig: {
        public: {
            apiBase: '/api',
        },
    },

    nitro: {
        preset: 'static',
        scanDirs: ['core/server'],
    },
});
