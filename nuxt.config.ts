import { defineNuxtConfig } from 'nuxt/config';
import { joinURL } from 'ufo';

/** GitHub Pages 기본 경로. 로컬에서 루트로 띄우려면 `NUXT_APP_BASE_URL=/` */
const rawBase = process.env.NUXT_APP_BASE_URL ?? '/portfolio/';
const resolvedBaseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const faviconHref = joinURL(resolvedBaseURL, 'favicon.svg');

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
            link: [{ rel: 'icon', type: 'image/svg+xml', href: faviconHref }],
            script: [
                {
                    key: 'gtm-base',
                    type: 'text/javascript',
                    tagPosition: 'head',
                    /** 헤드 안에서 가능한 한 앞쪽 (Unhead: 숫자가 클수록 먼저 삽입) */
                    tagPriority: 100,
                    innerHTML:
                        "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KJZM3PWS');",
                },
                {
                    type: 'text/javascript',
                    src: '//wcs.pstatic.net/wcslog.js',
                    tagPosition: 'bodyClose',
                },
                {
                    type: 'text/javascript',
                    tagPosition: 'bodyClose',
                    innerHTML: 'if(!wcs_add) var wcs_add = {};\nwcs_add["wa"] = "1c95700c9231150";\nif(window.wcs) {\nwcs_do();\n}',
                },
            ],
            noscript: [
                {
                    key: 'gtm-noscript',
                    tagPosition: 'bodyOpen',
                    tagPriority: 100,
                    innerHTML:
                        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJZM3PWS" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
                },
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
