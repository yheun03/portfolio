import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';
import { joinURL } from 'ufo';

/** GitHub Pages 기본 경로 */
const rawBase = process.env.NUXT_APP_BASE_URL ?? '/';
const resolvedBaseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const imagesDir = fileURLToPath(new URL('./assets/images', import.meta.url));
const iconsDir = fileURLToPath(new URL('./assets/icons', import.meta.url));
const faviconHref = joinURL(resolvedBaseURL, 'assets/icons/favicon.svg');
const sitemapHref = joinURL(resolvedBaseURL, 'sitemap.xml');
const isAnalyticsEnabled = process.env.ANALYTICS_ENABLED === 'true';
const naverAnalyticsId = isAnalyticsEnabled ? (process.env.NUXT_PUBLIC_NAVER_ANALYTICS_ID?.trim() ?? '') : '';
const googleTagManagerId = isAnalyticsEnabled ? (process.env.NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?.trim() ?? '') : '';

export default defineNuxtConfig({
    compatibilityDate: '2026-05-02',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    experimental: {
        appManifest: false,
    },

    runtimeConfig: {
        public: {
            naverSiteVerification: process.env.NUXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim() ?? '',
            naverAnalyticsId,
            googleTagManagerId,
        },
    },
    app: {
        baseURL: resolvedBaseURL,
        head: {
            htmlAttrs: { lang: 'ko' },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            meta: [
                { name: 'referrer', content: 'strict-origin-when-cross-origin' },
                { name: 'color-scheme', content: 'light dark' },
                { name: 'theme-color', content: '#f2f4f6', media: '(prefers-color-scheme: light)' },
                { name: 'theme-color', content: '#060a10', media: '(prefers-color-scheme: dark)' },
                { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: faviconHref },
                { rel: 'sitemap', type: 'application/xml', href: sitemapHref },
            ],
            script: [
                ...(googleTagManagerId
                    ? [
                          {
                              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`,
                          },
                      ]
                    : []),
                ...(naverAnalyticsId
                    ? [
                          {
                              src: 'https://wcs.naver.net/wcslog.js',
                              tagPosition: 'bodyClose' as const,
                          },
                          {
                              innerHTML: `if (!wcs_add) var wcs_add = {}; wcs_add.wa = '${naverAnalyticsId}'; if (window.wcs) { wcs_do(); }`,
                              tagPosition: 'bodyClose' as const,
                          },
                      ]
                    : []),
            ],
            noscript: googleTagManagerId
                ? [
                      {
                          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                          tagPosition: 'bodyOpen',
                      },
                  ]
                : [],
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
        publicAssets: [
            { dir: imagesDir, baseURL: '/assets/images' },
            { dir: iconsDir, baseURL: '/assets/icons' },
        ],
    },
});
