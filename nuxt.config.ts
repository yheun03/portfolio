import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';
import { joinURL } from 'ufo';

const analyticsEnabled = !['false', '0'].includes(process.env.NUXT_PUBLIC_ANALYTICS_ENABLED ?? 'true');

/** GitHub Pages 기본 경로. 로컬에서 루트로 띄우려면 `NUXT_APP_BASE_URL=/` */
const rawBase = process.env.NUXT_APP_BASE_URL ?? '/portfolio/';
const resolvedBaseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const faviconHref = joinURL(resolvedBaseURL, 'favicon.svg');
const faviconIcoHref = joinURL(resolvedBaseURL, 'ver.2025/src/assets/favicon/favicon.ico');
const faviconPngHref = joinURL(resolvedBaseURL, 'ver.2025/src/assets/favicon/favicon-32x32.png');
const appleTouchIconHref = joinURL(resolvedBaseURL, 'ver.2025/src/assets/favicon/apple-icon-180x180.png');
const sitemapHref = joinURL(resolvedBaseURL, 'sitemap.xml');

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },

    runtimeConfig: {
        public: {
            gtmId: process.env.NUXT_PUBLIC_GTM_ID?.trim() ?? '',
            gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '',
            naverWcsWa: process.env.NUXT_PUBLIC_NAVER_WCS_WA?.trim() ?? '',
            naverWcsScriptUrl: process.env.NUXT_PUBLIC_NAVER_WCS_SCRIPT_URL?.trim() ?? '',
            analyticsEnabled,
            googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? '',
            naverSiteVerification: process.env.NUXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim() ?? '',
        },
    },
    app: {
        baseURL: resolvedBaseURL,
        head: {
            htmlAttrs: { lang: 'ko' },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                { name: 'color-scheme', content: 'light dark' },
                { name: 'theme-color', content: '#f2f4f6', media: '(prefers-color-scheme: light)' },
                { name: 'theme-color', content: '#060a10', media: '(prefers-color-scheme: dark)' },
                { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: faviconHref },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: faviconPngHref },
                { rel: 'shortcut icon', type: 'image/x-icon', href: faviconIcoHref },
                { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconHref },
                { rel: 'sitemap', type: 'application/xml', href: sitemapHref },
            ],
        },
    },

    css: [
        '@fontsource/roboto-slab/latin-400.css',
        '@fontsource/roboto-slab/latin-700.css',
        '@fontsource/roboto-slab/latin-900.css',
        '~/assets/style/main.scss',
    ],

    alias: {
        '@data': fileURLToPath(new URL('./data', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./i18n', import.meta.url)),
    },

    imports: {
        dirs: ['~/composables', '~/composables/**'],
    },

    components: [
        { path: '~/components/base', pathPrefix: false },
        { path: '~/components/work', pathPrefix: false },
        { path: '~/components/gallery', pathPrefix: false },
        { path: '~/components/home', pathPrefix: false },
        { path: '~/components/layout', pathPrefix: false },
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: ['assets/style'],
                    additionalData: '@use "abstracts/tokens" as *;',
                },
            },
        },
    },

    nitro: {
        preset: 'static',
    },
});
