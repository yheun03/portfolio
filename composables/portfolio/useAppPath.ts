// GitHub Pages baseURL 환경에서 앱 경로 보정 및 SPA 라우트 여부 판별
import { joinURL } from 'ufo';

// NuxtLink가 처리하지 않는 정적 파일 확장자 목록
const STATIC_ASSET_PATTERN = /\.(?:html?|pdf|txt|json|wasm|webp|gif|(?:jpe?g)|png|svg|ico|xml|csv|zip|woff2?)$/i;

export function useAppPath() {
    const baseURL = useRuntimeConfig().app.baseURL;

    function resolveAppPath(path: string): string {
        if (!path || path.startsWith('#')) return path;
        if (/^(https?:|mailto:|tel:)/i.test(path) || path.startsWith('//')) return path;
        if (!path.startsWith('/')) return path;
        const rest = path === '/' ? '' : path.replace(/^\//, '');
        return joinURL(baseURL, rest);
    }

    function isAppRoute(path: string): boolean {
        if (!path.startsWith('/') || path.startsWith('//')) return false;
        const pathOnly = path.split(/[#?]/, 1)[0] ?? path;
        return !STATIC_ASSET_PATTERN.test(pathOnly);
    }

    return { resolveAppPath, isAppRoute };
}
