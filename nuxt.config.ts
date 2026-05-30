import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineNuxtConfig } from 'nuxt/config';
import { createJiti } from 'jiti';
import { fileURLToPath } from 'node:url';
import { joinURL } from 'ufo';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const jiti = createJiti(rootDir);

function writePublicSitemap() {
    const { buildSitemapXml } = jiti('./core/sitemap/build-sitemap.ts') as typeof import('./core/sitemap/build-sitemap');
    writeFileSync(join(rootDir, 'public/sitemap.xml'), buildSitemapXml());
}

/** GitHub Pages 기본 경로. 로컬에서 루트로 띄우려면 `NUXT_APP_BASE_URL=/` */
const rawBase = process.env.NUXT_APP_BASE_URL ?? '/portfolio/';
const resolvedBaseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const faviconHref = joinURL(resolvedBaseURL, 'favicon.svg');
// 빌드 시 해시 없는 public 경로 — LCP용 Pretendard Bold preload
const pretendardBoldHref = joinURL(resolvedBaseURL, 'fonts/Pretendard-Bold.woff2');

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    experimental: {
        appManifest: false,
        defaults: {
            nuxtLink: {
                prefetch: false,
            },
        },
    },
    /** 정적 배포 시 CSS를 HTML에 인라인해 렌더 차단 외부 stylesheet 완화 */
    features: { inlineStyles: true },

    app: {
        baseURL: resolvedBaseURL,
        head: {
            htmlAttrs: { lang: 'ko', class: 'skeleton-active' },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                { name: 'color-scheme', content: 'light' },
                { name: 'theme-color', content: '#f7f2ea' },
                { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: faviconHref },
                { rel: 'apple-touch-icon', href: faviconHref },
                {
                    rel: 'preload',
                    href: pretendardBoldHref,
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous',
                },
            ],
        },
    },

    hooks: {
        /** `nuxt build` / `nuxt generate` 공통 — Nuxt 3에는 `generate:before` 훅이 없음 */
        'build:before': writePublicSitemap,
    },

    modules: ['@pinia/nuxt'],
    css: ['~/assets/style/main.scss'],

    alias: {
        '@composables': fileURLToPath(new URL('./composables', import.meta.url)),
        '@config': fileURLToPath(new URL('./core/config', import.meta.url)),
        '@data': fileURLToPath(new URL('./data', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./i18n', import.meta.url)),
        '@stores': fileURLToPath(new URL('./stores', import.meta.url)),
        '@app-types': fileURLToPath(new URL('./core/types', import.meta.url)),
        '@utils': fileURLToPath(new URL('./core/utils', import.meta.url)),
    },

    imports: {
        dirs: ['~/composables', '~/composables/**'],
    },

    pinia: {
        storesDirs: ['~/stores'],
    },

    plugins: ['~/plugins/init.client', '~/plugins/analytics.client', '~/plugins/gallery-font.client', '~/plugins/gallery-navigation.client'],

    components: [
        { path: '~/components/base', pathPrefix: false },
        { path: '~/components/work', pathPrefix: false },
        { path: '~/components/gallery', pathPrefix: false },
        { path: '~/components/motion', pathPrefix: false },
        { path: '~/components/home', pathPrefix: false },
        { path: '~/components/layout', pathPrefix: false },
        { path: '~/components/page', pathPrefix: false },
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
                        if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) return 'vue';
                        if (id.includes('node_modules/pinia')) return 'pinia';
                        if (id.includes('/data/works')) return 'works-data';
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
            '/portfolio/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
            '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/**/*.webp': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
        },
    },
});
