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

    /** 루트 응답이 JSON `Dev server is unavailable` 로 보일 때: 서버 기동 전에 브라우저를 연 경우·캐시 꼬임·포트 중복이 흔한 원인 */
    devServer: {
        host: 'localhost',
    },

    app: {
        baseURL: resolvedBaseURL,
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: faviconHref }],
        },
    },

    modules: ['@pinia/nuxt'],
    css: ['~/assets/style/main.scss'],

    alias: {
        '@composables': fileURLToPath(new URL('./core/composables', import.meta.url)),
        '@config': fileURLToPath(new URL('./core/config', import.meta.url)),
        '@content': fileURLToPath(new URL('./core/content', import.meta.url)),
        '@locales': fileURLToPath(new URL('./core/locales', import.meta.url)),
        '@stores': fileURLToPath(new URL('./core/stores', import.meta.url)),
        '@app-types': fileURLToPath(new URL('./core/types', import.meta.url)),
        '@utils': fileURLToPath(new URL('./core/utils', import.meta.url)),
    },

    imports: {
        dirs: ['~/core/composables'],
    },

    pinia: {
        storesDirs: ['~/core/stores'],
    },

    plugins: [
        '~/core/plugins/theme-init.client',
        '~/core/plugins/locale-init.client',
        '~/core/plugins/content-ready.client',
        '~/core/plugins/gtm-deferred.client',
        '~/core/plugins/naver-analytics.client',
        '~/core/plugins/gallery-fonts.client',
    ],

    components: [
        { path: '~/components/Common', pathPrefix: false },
        { path: '~/components/Card', pathPrefix: false },
        { path: '~/components/Gallery', pathPrefix: false },
        { path: '~/components/Section', pathPrefix: false },
        { path: '~/components/Layout', pathPrefix: false },
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
                    additionalData: '@use "tokens" as *;',
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
