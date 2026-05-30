/**
 * 목표: 포트폴리오 페이지별 SEO 메타와 구조화 데이터를 일관되게 생성한다.
 * 기능: canonical, OG/Twitter 메타, Person/WebSite/페이지 JSON-LD를 주입한다.
 */
import { profile } from '@data/site';
import { seoConfig, seoKeywords, seoStructuredData, type SeoLocale } from '@config/seo';
import { buildAbsoluteSeoUrl } from '@utils/seo-url';

interface PortfolioSeoOptions {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    keywords?: string[];
    path?: string;
    locale: SeoLocale;
    type?: 'website' | 'article';
    image?: string;
    imageAlt?: string;
    /** 검색 색인 제외(에러·내부 문서 등) */
    noindex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function getLanguageTag(locale: SeoLocale) {
    return locale === 'ko' ? 'ko-KR' : 'en-US';
}

function getImageMimeType(imageUrl: string) {
    if (imageUrl.endsWith('.png')) return 'image/png';
    if (imageUrl.endsWith('.webp')) return 'image/webp';
    if (imageUrl.endsWith('.gif')) return 'image/gif';
    return 'image/jpeg';
}

function sanitizeJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

function createPersonJsonLd(locale: SeoLocale, homeUrl: string, imageUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${homeUrl}${seoConfig.personId}`,
        name: profile.name,
        alternateName: [...seoStructuredData.person.alternateName],
        jobTitle: seoStructuredData.person.jobTitle[locale],
        description: seoStructuredData.person.description[locale],
        url: homeUrl,
        image: imageUrl,
        sameAs: [...seoConfig.sameAs],
        knowsAbout: seoKeywords[locale],
    };
}

function createWebSiteJsonLd(locale: SeoLocale, homeUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${homeUrl}${seoConfig.websiteId}`,
        name: seoStructuredData.website.name[locale],
        alternateName: seoConfig.siteName,
        url: homeUrl,
        inLanguage: [getLanguageTag('ko'), getLanguageTag('en')],
        publisher: {
            '@id': `${homeUrl}${seoConfig.personId}`,
        },
        about: seoKeywords[locale],
    };
}

function createProfilePageJsonLd(homeUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${homeUrl}#profile`,
        url: homeUrl,
        mainEntity: {
            '@id': `${homeUrl}${seoConfig.personId}`,
        },
    };
}

export function usePortfolioSeo(options: MaybeRefOrGetter<PortfolioSeoOptions>) {
    useHead(() => {
        const resolved = toValue(options);
        const homeUrl = buildAbsoluteSeoUrl('/');
        const canonicalUrl = buildAbsoluteSeoUrl(resolved.path);
        const imagePath = resolved.image?.endsWith('.svg') ? seoConfig.defaultOgImage : (resolved.image ?? seoConfig.defaultOgImage);
        const imageUrl = buildAbsoluteSeoUrl(imagePath);
        const ogLocale = resolved.locale === 'ko' ? 'ko_KR' : 'en_US';
        const alternateLocale = resolved.locale === 'ko' ? 'en_US' : 'ko_KR';
        const languageTag = getLanguageTag(resolved.locale);
        const socialTitle = resolved.ogTitle ?? resolved.title;
        const socialDescription = resolved.ogDescription ?? resolved.description;
        const keywords = [...seoKeywords[resolved.locale], ...(resolved.keywords ?? [])];
        const isHome = !resolved.path || resolved.path === '/';
        const robotsContent = resolved.noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large';
        const googlebotContent = resolved.noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
        const jsonLd = [
            createPersonJsonLd(resolved.locale, homeUrl, imageUrl),
            createWebSiteJsonLd(resolved.locale, homeUrl),
            ...(isHome ? [createProfilePageJsonLd(homeUrl)] : []),
            ...(Array.isArray(resolved.jsonLd) ? resolved.jsonLd : resolved.jsonLd ? [resolved.jsonLd] : []),
        ];

        return {
            htmlAttrs: {
                lang: resolved.locale,
            },
            title: resolved.title,
            link: [
                { rel: 'canonical', href: canonicalUrl },
                { rel: 'alternate', hreflang: 'ko', href: canonicalUrl },
                { rel: 'alternate', hreflang: 'en', href: canonicalUrl },
                { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
                { rel: 'image_src', href: imageUrl },
            ],
            meta: [
                { name: 'description', content: resolved.description },
                { name: 'author', content: profile.name },
                { name: 'keywords', content: [...new Set(keywords)].join(', ') },
                { name: 'robots', content: robotsContent },
                { name: 'googlebot', content: googlebotContent },
                { name: 'application-name', content: seoConfig.siteName },
                { name: 'theme-color', content: seoConfig.themeColor },
                { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
                { 'http-equiv': 'content-language', content: languageTag },
                { property: 'og:type', content: resolved.type ?? 'website' },
                { property: 'og:locale', content: ogLocale },
                { property: 'og:locale:alternate', content: alternateLocale },
                { property: 'og:site_name', content: seoConfig.siteName },
                { property: 'og:url', content: canonicalUrl },
                { property: 'og:title', content: socialTitle },
                { property: 'og:description', content: socialDescription },
                { property: 'og:image', content: imageUrl },
                { property: 'og:image:secure_url', content: imageUrl },
                { property: 'og:image:type', content: getImageMimeType(imageUrl) },
                { property: 'og:image:width', content: String(seoConfig.defaultOgImageSize.width) },
                { property: 'og:image:height', content: String(seoConfig.defaultOgImageSize.height) },
                { property: 'og:image:alt', content: resolved.imageAlt ?? socialTitle },
                ...(resolved.type === 'article'
                    ? [
                          { property: 'article:author', content: profile.name },
                          { property: 'article:section', content: 'Portfolio' },
                      ]
                    : []),
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: socialTitle },
                { name: 'twitter:description', content: socialDescription },
                { name: 'twitter:image', content: imageUrl },
                { name: 'twitter:image:alt', content: resolved.imageAlt ?? socialTitle },
            ],
            script: [
                {
                    key: 'portfolio-json-ld',
                    type: 'application/ld+json',
                    innerHTML: sanitizeJsonLd(jsonLd),
                },
            ],
        };
    });
}
