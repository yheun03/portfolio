import { seoConfig } from '../config/seo';

/** `seoConfig.siteUrl` + 앱 경로 → 절대 URL (OG·canonical·JSON-LD 공용) */
export function buildAbsoluteSeoUrl(path = '/') {
    const baseUrl = seoConfig.siteUrl.endsWith('/') ? seoConfig.siteUrl : `${seoConfig.siteUrl}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

    return new URL(normalizedPath, baseUrl).toString();
}
