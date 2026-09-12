import ko from '@i18n/ko.json';
import en from '@i18n/en.json';

type SeoLocale = 'ko' | 'en';

type PortfolioSeoOptions = {
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
    noindex?: boolean;
    schemaType?: 'ProfilePage' | 'CollectionPage' | 'AboutPage' | 'WebPage';
    breadcrumbs?: { name: string; path: string }[];
    mainEntity?: Record<string, unknown>;
    dateCreated?: string;
    dateModified?: string;
    relatedLinks?: string[];
    significantLinks?: string[];
};

const SITE_URL = 'https://yheun03.github.io/';
const DEFAULT_IMAGE = '/assets/images/projects/portfolio-2026/home-light-desktop.png';
const contentByLocale = { ko: ko.content, en: en.content };

export function getPortfolioAbsoluteUrl(path = '/') {
    return new URL(path.startsWith('/') ? path.slice(1) : path, SITE_URL).toString();
}

function getImageMimeType(path: string) {
    if (/\.png$/i.test(path)) return 'image/png';
    if (/\.jpe?g$/i.test(path)) return 'image/jpeg';
    if (/\.svg$/i.test(path)) return 'image/svg+xml';
    return 'image/webp';
}

export function usePortfolioSeo(options: MaybeRefOrGetter<PortfolioSeoOptions>) {
    const { public: config } = useRuntimeConfig();

    useHead(() => {
        const page = toValue(options);
        const { profile, seo } = contentByLocale[page.locale];
        const pagePath = page.path ?? '/';
        const canonicalPath = pagePath === '/' || pagePath.endsWith('/') ? pagePath : `${pagePath}/`;
        const canonical = getPortfolioAbsoluteUrl(canonicalPath);
        const imagePath = page.image?.endsWith('.svg') ? DEFAULT_IMAGE : (page.image ?? DEFAULT_IMAGE);
        const image = getPortfolioAbsoluteUrl(imagePath);
        const title = page.ogTitle ?? page.title;
        const description = page.ogDescription ?? page.description;
        const robots = page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
        const naverVerification = String(config.naverSiteVerification ?? '').trim();
        const personId = `${SITE_URL}#person`;
        const organizationId = `${SITE_URL}#organization`;
        const websiteId = `${SITE_URL}#website`;
        const webpageId = `${canonical}#webpage`;
        const imageId = `${canonical}#primaryimage`;
        const person = {
            '@type': 'Person',
            '@id': personId,
            name: profile.name,
            url: SITE_URL,
            jobTitle: seo.jobTitle,
            description: seo.description,
            email: `mailto:${profile.contacts.email}`,
            sameAs: [profile.contacts.github],
            knowsAbout: profile.keywords,
        };
        const webpage: Record<string, unknown> = {
            '@type': page.schemaType ?? (pagePath === '/' ? 'ProfilePage' : 'WebPage'),
            '@id': webpageId,
            url: canonical,
            name: page.title,
            description: page.description,
            inLanguage: page.locale,
            isPartOf: { '@id': websiteId },
            about: { '@id': personId },
            publisher: { '@id': organizationId },
            primaryImageOfPage: { '@id': imageId },
        };

        if ((page.schemaType ?? (pagePath === '/' ? 'ProfilePage' : 'WebPage')) === 'ProfilePage') {
            webpage.mainEntity = { '@id': personId };
        } else if (page.mainEntity) {
            webpage.mainEntity = page.mainEntity;
        }

        if (page.dateCreated) webpage.dateCreated = page.dateCreated;
        if (page.dateModified) webpage.dateModified = page.dateModified;
        if (page.relatedLinks?.length) webpage.relatedLink = page.relatedLinks.map(getPortfolioAbsoluteUrl);
        if (page.significantLinks?.length) webpage.significantLink = page.significantLinks.map(getPortfolioAbsoluteUrl);

        const graph: Record<string, unknown>[] = [
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: SITE_URL,
                name: seo.websiteName,
                description: seo.description,
                inLanguage: ['ko', 'en'],
                publisher: { '@id': organizationId },
            },
            {
                '@type': 'Organization',
                '@id': organizationId,
                name: seo.websiteName,
                url: SITE_URL,
                founder: { '@id': personId },
                sameAs: [profile.contacts.github],
            },
            person,
            {
                '@type': 'ImageObject',
                '@id': imageId,
                url: image,
                contentUrl: image,
                caption: page.imageAlt ?? title,
                inLanguage: page.locale,
            },
            webpage,
        ];

        if (page.breadcrumbs?.length) {
            graph.push({
                '@type': 'BreadcrumbList',
                '@id': `${canonical}#breadcrumb`,
                itemListElement: page.breadcrumbs.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.name,
                    item: getPortfolioAbsoluteUrl(item.path === '/' || item.path.endsWith('/') ? item.path : `${item.path}/`),
                })),
            });
            webpage.breadcrumb = { '@id': `${canonical}#breadcrumb` };
        }

        const structuredData = JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': graph,
        }).replace(/</g, '\\u003c');

        return {
            htmlAttrs: { lang: page.locale },
            title: page.title,
            link: page.noindex ? [] : [{ rel: 'canonical', href: canonical }],
            meta: [
                { name: 'description', content: page.description },
                { name: 'author', content: profile.name },
                { name: 'keywords', content: [...new Set([...seo.keywords, ...(page.keywords ?? [])])].join(', ') },
                { name: 'robots', content: robots },
                { name: 'googlebot', content: robots },
                { name: 'bingbot', content: robots },
                ...(naverVerification ? [{ name: 'naver-site-verification', content: naverVerification }] : []),
                { property: 'og:type', content: page.type ?? 'website' },
                { property: 'og:locale', content: page.locale === 'ko' ? 'ko_KR' : 'en_US' },
                { property: 'og:site_name', content: seo.websiteName },
                { property: 'og:url', content: canonical },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: image },
                { property: 'og:image:secure_url', content: image },
                { property: 'og:image:type', content: getImageMimeType(imagePath) },
                { property: 'og:image:alt', content: page.imageAlt ?? title },
                ...(imagePath === DEFAULT_IMAGE
                    ? [
                          { property: 'og:image:width', content: '1200' },
                          { property: 'og:image:height', content: '900' },
                      ]
                    : []),
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image },
                { name: 'twitter:image:alt', content: page.imageAlt ?? title },
            ],
            script: page.noindex
                ? []
                : [
                      {
                          key: 'portfolio-structured-data',
                          type: 'application/ld+json',
                          innerHTML: structuredData,
                      },
                  ],
        };
    });
}
