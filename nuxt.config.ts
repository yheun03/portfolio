import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';
import { joinURL } from 'ufo';

/** GitHub Pages 기본 경로. 로컬에서 루트로 띄우려면 `NUXT_APP_BASE_URL=/` */
const rawBase = process.env.NUXT_APP_BASE_URL ?? '/portfolio/';
const resolvedBaseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const faviconHref = joinURL(resolvedBaseURL, 'favicon.svg');

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    experimental: { appManifest: false },
    /** 정적 배포 시 CSS를 HTML에 인라인해 렌더 차단 외부 stylesheet 완화 */
    features: { inlineStyles: true },

    app: {
        baseURL: resolvedBaseURL,
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: faviconHref }],
        },
    },

    modules: ['@pinia/nuxt'],
    css: ['~/assets/style/main.scss'],

    alias: {
        '@composables': fileURLToPath(new URL('./composables', import.meta.url)),
        '@config': fileURLToPath(new URL('./core/config', import.meta.url)),
        '@core': fileURLToPath(new URL('./core', import.meta.url)),
        '@data': fileURLToPath(new URL('./data', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./i18n', import.meta.url)),
        '@stores': fileURLToPath(new URL('./stores', import.meta.url)),
        '@app-types': fileURLToPath(new URL('./core/types', import.meta.url)),
        '@utils': fileURLToPath(new URL('./core/utils', import.meta.url)),
    },

    hooks: {
        'pages:routerOptions'({ files }) {
            files.push({
                path: fileURLToPath(new URL('./core/router.options.ts', import.meta.url)),
            });
        },
    },

    imports: {
        dirs: ['~/composables', '~/composables/**'],
    },

    pinia: {
        storesDirs: ['~/stores'],
    },

    plugins: [
        '~/plugins/shell-theme',
        '~/plugins/app-init.client',
        '~/plugins/analytics.client',
        '~/plugins/gallery-fonts.client',
        '~/plugins/navigation-restore.client',
    ],

    components: [
        { path: '~/components/base', pathPrefix: false },
        { path: '~/components/work', pathPrefix: false },
        { path: '~/components/gallery', pathPrefix: false },
        { path: '~/components/motion', pathPrefix: false },
        { path: '~/components/home', pathPrefix: false },
        { path: '~/components/layout', pathPrefix: false },
    ],

    vite: {
        build: {
            chunkSizeWarningLimit: 900,
            target: 'es2022',
            modulePreload: { polyfill: false },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules/gsap')) return 'gsap';
                    },
                },
            },
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
                    additionalData: '@use "abstracts/tokens" as *;',
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
        routeRules: {
            '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
            '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/**/*.webp': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
        },
    },
});
