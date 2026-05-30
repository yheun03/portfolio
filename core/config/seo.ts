/**
 * 목표: 포트폴리오 전역 SEO 메타와 구조화 데이터를 한곳에서 관리한다.
 * 기능: 기본 사이트 정보, 다국어 키워드, Person/WebSite JSON-LD 원천 데이터를 제공한다.
 */
export type SeoLocale = 'ko' | 'en';

export const seoConfig = {
    siteUrl: 'https://yheun03.github.io/portfolio/',
    defaultOgImage: '/images/og-image-2026.png',
    defaultOgImageSize: {
        width: 1402,
        height: 1122,
    },
    siteName: 'Eunyounghwan Portfolio',
    themeColor: '#f7f2ea',
    personId: '#person',
    websiteId: '#website',
    sameAs: ['https://github.com/yheun03'],
} as const;

export const seoKeywords = {
    ko: [
        '은영환',
        '웹 퍼블리셔',
        '웹퍼블리셔',
        '웹 프론트엔드 개발자',
        '프론트엔드 개발자',
        'UI 개발자',
        'Vue 프론트엔드',
        '퍼블리셔 포트폴리오',
        '프론트엔드 포트폴리오',
        '웹 표준',
        '웹 접근성',
        'SEO',
        '반응형 웹',
    ],
    en: [
        'Eunyounghwan',
        'web publisher',
        'frontend developer',
        'web frontend developer',
        'UI developer',
        'Vue frontend',
        'frontend portfolio',
        'web standards',
        'web accessibility',
        'SEO',
        'responsive web',
    ],
} satisfies Record<SeoLocale, string[]>;

export const seoStructuredData = {
    person: {
        alternateName: ['Eunyounghwan', 'Yh Eun', 'yheun03'],
        jobTitle: {
            ko: '웹 퍼블리셔, 웹 프론트엔드 개발자, 프론트엔드 개발자, UI 개발자',
            en: 'Web Publisher, Web Frontend Developer, Frontend Developer, UI Developer',
        },
        description: {
            ko: '웹 표준, 접근성, SEO, Vue 3 컴포넌트 구조를 기반으로 UI 퍼블리싱과 프론트엔드 개발을 수행하는 웹 퍼블리셔 은영환입니다.',
            en: 'Eunyounghwan is a web publisher and frontend developer focused on web standards, accessibility, SEO, Vue 3 component architecture, and UI development.',
        },
    },
    website: {
        name: {
            ko: '웹 퍼블리셔 은영환 포트폴리오',
            en: 'Eunyounghwan Frontend Portfolio',
        },
    },
} as const;
