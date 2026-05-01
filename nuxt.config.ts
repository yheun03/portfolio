import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    devtools: { enabled: true },
    experimental: { appManifest: false },
    features: { inlineStyles: false },

    app: {
        baseURL: '/jonsoft-framework/',
    },

    modules: ['@pinia/nuxt'],
    css: [
        'ag-grid-community/styles/ag-theme-quartz.css',
        '~/assets/scss/main.scss',
    ],

    imports: {
        dirs: ['~/core/composables'],
    },

    pinia: {
        storesDirs: ['~/core/store'],
    },

    components: [
        { path: '~/components/Table', pathPrefix: false },
        { path: '~/components/Section', pathPrefix: false },
        { path: '~/components/Layout', pathPrefix: false },
        { path: '~/components/Modal', pathPrefix: false },
        { path: '~/components', pathPrefix: true },
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
