import { profile } from '~/core/data/site';

type SeoLocale = 'ko' | 'en';

interface PortfolioSeoOptions {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    path?: string;
    locale: SeoLocale;
    type?: 'website' | 'article';
    image?: string;
    imageAlt?: string;
}

const DEFAULT_OG_IMAGE = '/images/og-image.png';
const SITE_NAME = 'Eunyounghwan Portfolio';

function buildAbsoluteUrl(path = '/') {
    const baseUrl = profile.contacts.portfolio.endsWith('/') ? profile.contacts.portfolio : `${profile.contacts.portfolio}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

    return new URL(normalizedPath, baseUrl).toString();
}

export function usePortfolioSeo(options: MaybeRefOrGetter<PortfolioSeoOptions>) {
    useHead(() => {
        const resolved = toValue(options);
        const canonicalUrl = buildAbsoluteUrl(resolved.path);
        const imagePath = resolved.image?.endsWith('.svg') ? DEFAULT_OG_IMAGE : (resolved.image ?? DEFAULT_OG_IMAGE);
        const imageUrl = buildAbsoluteUrl(imagePath);
        const ogLocale = resolved.locale === 'ko' ? 'ko_KR' : 'en_US';
        const alternateLocale = resolved.locale === 'ko' ? 'en_US' : 'ko_KR';
        const socialTitle = resolved.ogTitle ?? resolved.title;
        const socialDescription = resolved.ogDescription ?? resolved.description;

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
                { name: 'robots', content: 'index, follow, max-image-preview:large' },
                { property: 'og:type', content: resolved.type ?? 'website' },
                { property: 'og:locale', content: ogLocale },
                { property: 'og:locale:alternate', content: alternateLocale },
                { property: 'og:site_name', content: SITE_NAME },
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
        };
    });
}
