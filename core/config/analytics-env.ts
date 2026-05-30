/**
 * 분석 ID — `.env`의 NUXT_PUBLIC_* 만 사용 (하드코딩 금지).
 * @see .env.example
 */
function envFlag(name: string, defaultEnabled = true) {
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
