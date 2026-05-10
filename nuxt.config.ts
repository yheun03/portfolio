import { defineNuxtConfig } from 'nuxt/config';

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
        head: {
            script: [
                {
                    innerHTML: `(function(){try{var k='portfolio-theme',s=localStorage.getItem(k),r=document.documentElement;if(s==='light'||s==='dark')r.setAttribute('data-theme',s);else r.setAttribute('data-theme',window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');r.classList.add('skeleton-active');}catch(e){}})();`,
                    type: 'text/javascript',
                    tagPosition: 'head',
                },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Outfit:wght@500;600;700;800;900&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
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
