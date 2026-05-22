import { joinURL } from 'ufo';

/**
 * `app.baseURL`(예: `/portfolio/`) 아래에 두는 public·라우트 경로 처리.
 */
export function useAppPathResolver() {
    const baseURL = useRuntimeConfig().app.baseURL;

    function resolveAppPath(path: string): string {
        if (!path || path.startsWith('#')) {
            return path;
        }
        if (/^(https?:|mailto:|tel:)/i.test(path) || path.startsWith('//')) {
            return path;
        }
        if (!path.startsWith('/')) {
            return path;
        }
        const rest = path === '/' ? '' : path.replace(/^\//, '');
        return joinURL(baseURL, rest);
    }

    /** public 정적 파일·확장자 경로 등은 Vue 라우터가 처리하지 않음 */
    const staticAssetExtension = /\.(?:html?|pdf|txt|json|wasm|webp|gif|(?:jpe?g)|png|svg|ico|xml|csv|zip|woff2?)$/i;

    /** `NuxtLink`용 — 단일 `/`로 시작하는 앱 SPA 경로만 */
    function isAppRoute(path: string): boolean {
        if (!path.startsWith('/') || path.startsWith('//')) {
            return false;
        }
        const pathOnly = path.split(/[#?]/, 1)[0] ?? path;
        return !staticAssetExtension.test(pathOnly);
    }

    return { resolveAppPath, isAppRoute };
}
