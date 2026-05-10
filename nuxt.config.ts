import { defineNuxtConfig } from 'nuxt/config';

const isProd = process.env.NODE_ENV === 'production';
const repoName = process.env.GH_PAGES_REPO || 'portfolio';
const resolvedBaseURL = process.env.NUXT_APP_BASE_URL || (isProd ? `/${repoName}/` : '/');

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    experimental: { appManifest: false },
    features: { inlineStyles: false },

    /** 루트 응답이 JSON `Dev server is unavailable` 로 보일 때: 서버 기동 전에 브라우저를 연 경우·캐시 꼬임·포트 중복이 흔한 원인 */
    devServer: {
        host: 'localhost',
    },

    app: {
        baseURL: resolvedBaseURL,
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' },
            ],
        },
    },

    modules: ['@pinia/nuxt'],
    css: ['~/assets/style/main.scss'],

    imports: {
        dirs: ['~/core/composables'],
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
                usePolling: process.env.CHOKIDAR_USEPOLLING === '1',
                interval: 300,
                ignored: ['**/.git/**', '**/.output/**', '**/node_modules/**'],
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: ['assets/style'],
                    additionalData: '@use "abstract/index" as *;',
                },
            },
        },
    },

    watchers: {
        chokidar: {
            usePolling: process.env.CHOKIDAR_USEPOLLING === '1',
            interval: 300,
            ignored: ['**/.git/**', '**/.output/**'],
        },
    },

    nitro: {
        preset: 'static',
    },
});
