import { profile } from '@content/site';
import { seoConfig, seoKeywords, seoStructuredData, type SeoLocale } from '@config/seo';

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
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function buildAbsoluteUrl(path = '/') {
    const baseUrl = profile.contacts.portfolio.endsWith('/') ? profile.contacts.portfolio : `${profile.contacts.portfolio}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

    return new URL(normalizedPath, baseUrl).toString();
}

function sanitizeJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

function createPersonJsonLd(locale: SeoLocale, canonicalUrl: string, imageUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${canonicalUrl}${seoConfig.personId}`,
        name: profile.name,
        alternateName: [...seoStructuredData.person.alternateName],
        jobTitle: seoStructuredData.person.jobTitle[locale],
        description: seoStructuredData.person.description[locale],
        url: canonicalUrl,
        image: imageUrl,
        sameAs: [profile.contacts.github, profile.contacts.portfolio],
        knowsAbout: seoKeywords[locale],
    };
}

function createWebSiteJsonLd(locale: SeoLocale, canonicalUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${canonicalUrl}${seoConfig.websiteId}`,
        name: seoStructuredData.website.name[locale],
        alternateName: seoConfig.siteName,
        url: canonicalUrl,
        inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
        publisher: {
            '@id': `${canonicalUrl}${seoConfig.personId}`,
        },
        about: seoKeywords[locale],
    };
}

export function usePortfolioSeo(options: MaybeRefOrGetter<PortfolioSeoOptions>) {
    useHead(() => {
        const resolved = toValue(options);
        const canonicalUrl = buildAbsoluteUrl(resolved.path);
        const imagePath = resolved.image?.endsWith('.svg') ? seoConfig.defaultOgImage : (resolved.image ?? seoConfig.defaultOgImage);
        const imageUrl = buildAbsoluteUrl(imagePath);
        const ogLocale = resolved.locale === 'ko' ? 'ko_KR' : 'en_US';
        const alternateLocale = resolved.locale === 'ko' ? 'en_US' : 'ko_KR';
        const socialTitle = resolved.ogTitle ?? resolved.title;
        const socialDescription = resolved.ogDescription ?? resolved.description;
        const keywords = [...seoKeywords[resolved.locale], ...(resolved.keywords ?? [])];
        const jsonLd = [
            createPersonJsonLd(resolved.locale, buildAbsoluteUrl('/'), imageUrl),
            createWebSiteJsonLd(resolved.locale, buildAbsoluteUrl('/')),
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
            ],
            meta: [
                { name: 'description', content: resolved.description },
                { name: 'author', content: profile.name },
                { name: 'keywords', content: [...new Set(keywords)].join(', ') },
                { name: 'robots', content: 'index, follow, max-image-preview:large' },
                { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
                { property: 'og:type', content: resolved.type ?? 'website' },
                { property: 'og:locale', content: ogLocale },
                { property: 'og:locale:alternate', content: alternateLocale },
                { property: 'og:site_name', content: seoConfig.siteName },
                { property: 'og:url', content: canonicalUrl },
                { property: 'og:title', content: socialTitle },
                { property: 'og:description', content: socialDescription },
                { property: 'og:image', content: imageUrl },
                { property: 'og:image:secure_url', content: imageUrl },
                { property: 'og:image:type', content: imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg' },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:alt', content: resolved.imageAlt ?? socialTitle },
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
