import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    devtools: { enabled: true },
    experimental: { appManifest: false },
    features: { inlineStyles: false },

    // app: {
    //     baseURL: '/jonsoft-framework/',
    // },

    modules: ['@pinia/nuxt'],
    css: ['~/assets/scss/main.scss'],

    imports: {
        dirs: ['~/composables', '~/core/composables'],
    },

    pinia: {
        storesDirs: ['~/stores'],
    },

    components: [
        { path: "~/components/common", pathPrefix: false },
        { path: "~/components/cards", pathPrefix: false },
        { path: "~/components/sections", pathPrefix: false },
        { path: "~/components/Layout", pathPrefix: false },
    ],

    vite: {
        build: {
            cssCodeSplit: false,
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
