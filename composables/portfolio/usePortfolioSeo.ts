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
};

const SITE_URL = 'https://yheun03.github.io/portfolio/';
const DEFAULT_IMAGE = '/images/og-image-2026.jpg';
const contentByLocale = { ko: ko.content, en: en.content };

function absoluteUrl(path = '/') {
    return new URL(path.startsWith('/') ? path.slice(1) : path, SITE_URL).toString();
}

export function usePortfolioSeo(options: MaybeRefOrGetter<PortfolioSeoOptions>) {
    const { public: config } = useRuntimeConfig();

    useHead(() => {
        const page = toValue(options);
        const { profile, seo } = contentByLocale[page.locale];
        const canonical = absoluteUrl(page.path);
        const imagePath = page.image?.endsWith('.svg') ? DEFAULT_IMAGE : (page.image ?? DEFAULT_IMAGE);
        const image = absoluteUrl(imagePath);
        const title = page.ogTitle ?? page.title;
        const description = page.ogDescription ?? page.description;
        const robots = page.noindex ? 'noindex, nofollow' : 'index, follow';
        const googleVerification = String(config.googleSiteVerification ?? '').trim();
        const naverVerification = String(config.naverSiteVerification ?? '').trim();

        return {
            htmlAttrs: { lang: page.locale },
            title: page.title,
            link: [{ rel: 'canonical', href: canonical }],
            meta: [
                { name: 'description', content: page.description },
                { name: 'author', content: profile.name },
                { name: 'keywords', content: [...new Set([...seo.keywords, ...(page.keywords ?? [])])].join(', ') },
                { name: 'robots', content: robots },
                ...(googleVerification ? [{ name: 'google-site-verification', content: googleVerification }] : []),
                ...(naverVerification ? [{ name: 'naver-site-verification', content: naverVerification }] : []),
                { property: 'og:type', content: page.type ?? 'website' },
                { property: 'og:locale', content: page.locale === 'ko' ? 'ko_KR' : 'en_US' },
                { property: 'og:site_name', content: seo.websiteName },
                { property: 'og:url', content: canonical },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: image },
                { property: 'og:image:alt', content: page.imageAlt ?? title },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image },
            ],
        };
    });
}
