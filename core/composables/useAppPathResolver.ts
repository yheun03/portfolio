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

    /** `NuxtLink`용 — 단일 `/`로 시작하는 앱 내부 경로 */
    function isAppRoute(path: string): boolean {
        return path.startsWith('/') && !path.startsWith('//');
    }

    return { resolveAppPath, isAppRoute };
}
