import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    devtools: { enabled: true },
    experimental: { appManifest: false },
    features: { inlineStyles: false },

    // app: {
    //     baseURL: '/jonsoft-framework/',
    // },

    modules: ['@pinia/nuxt'],
    css: ['ag-grid-community/styles/ag-theme-quartz.css', '~/assets/scss/main.scss'],

    imports: {
        dirs: ['~/composables', '~/core/composables'],
    },

    pinia: {
        storesDirs: ['~/stores', '~/core/store'],
    },

    components: [
        { path: "~/components/common", pathPrefix: false },
        { path: "~/components/cards", pathPrefix: false },
        { path: "~/components/sections", pathPrefix: false },
        { path: "~/components/Layout", pathPrefix: false },
    ],

    plugins: [
        '~/core/plugins/preferences.client',
        '~/core/plugins/axios',
        '~/core/plugins/iconify',
        '~/core/plugins/ag-grid.client',
        '~/core/plugins/route-tabs.client',
        '~/core/plugins/global-css-no-inline.client',
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
        scanDirs: ['core/api/server'],
    },
});
