// GTM·GA4·네이버 WCS 분석 ID와 검색·소셜 검증 메타 키 — .env의 NUXT_PUBLIC_* 값만 사용 (하드코딩 금지)
function envFlag(name: string, defaultEnabled = true): boolean {
    const raw = process.env[name];
    if (raw === undefined) return defaultEnabled;
    return raw !== 'false' && raw !== '0';
}

export const analyticsPublicEnv = {
    gtmId: process.env.NUXT_PUBLIC_GTM_ID?.trim() ?? '',
    gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '',
    naverWcsWa: process.env.NUXT_PUBLIC_NAVER_WCS_WA?.trim() ?? '',
    naverWcsScriptUrl: process.env.NUXT_PUBLIC_NAVER_WCS_SCRIPT_URL?.trim() ?? '',
    analyticsEnabled: envFlag('NUXT_PUBLIC_ANALYTICS_ENABLED'),
} as const;

export const seoPublicEnv = {
    googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? '',
    naverSiteVerification: process.env.NUXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim() ?? '',
} as const;
