import { joinURL } from 'ufo';

/**
 * `app.baseURL`이 `/portfolio/`일 때 루트 절대경로(`/foo`)를 배포 경로(`/portfolio/foo`)로 바꿉니다.
 * 외부 URL·프로토콜 상대·메일·같은 문서 앵커는 그대로 둡니다.
 */
export function useAppPathResolver() {
    const baseURL = useRuntimeConfig().app.baseURL;

    return function resolveAppPath(path: string): string {
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
    };
}
