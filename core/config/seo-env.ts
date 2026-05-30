/**
 * 검색·소셜 검증 메타 — `.env`의 NUXT_PUBLIC_* 만 사용 (하드코딩 금지).
 * @see .env.example
 */
export const seoPublicEnv = {
    googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? '',
    naverSiteVerification: process.env.NUXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim() ?? '',
} as const;
