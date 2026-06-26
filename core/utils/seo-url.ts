// siteUrl + 앱 경로 → 절대 URL 생성 — OG·canonical·JSON-LD 공용
import { seoConfig } from '../config/seo';

export function buildAbsoluteSeoUrl(path = '/'): string {
    const baseUrl = seoConfig.siteUrl.endsWith('/') ? seoConfig.siteUrl : `${seoConfig.siteUrl}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return new URL(normalizedPath, baseUrl).toString();
}
