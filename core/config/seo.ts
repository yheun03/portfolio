/**
 * 목표: 포트폴리오 전역 SEO 메타와 구조화 데이터를 한곳에서 관리한다.
 * 기능: 기본 사이트 정보, 다국어 키워드, Person/WebSite JSON-LD 원천 데이터를 제공한다.
 */
export type SeoLocale = 'ko' | 'en';

export const seoConfig = {
    siteUrl: 'https://yheun03.github.io/portfolio/',
    defaultOgImage: '/images/og-image-2026.jpg',
    personImage: '/images/portfolio/ver-2025/photo-1440.webp',
    defaultOgImageSize: {
        width: 1402,
        height: 1122,
    },
    siteName: '은영환 웹 퍼블리셔 포트폴리오',
    themeColor: '#f7f2ea',
    dateModified: '2026-08-16',
    personId: '#person',
    websiteId: '#website',
    profilePageId: '#profile-page',
    sameAs: ['https://github.com/yheun03'],
} as const;

export const seoKeywords = {
    ko: [
        '은영환',
        '은영환 포트폴리오',
        '웹 퍼블리셔',
        '웹퍼블리셔',
        '웹 퍼블리셔 포트폴리오',
        '웹 퍼블리셔 포트폴리오 2026',
        '웹 프론트엔드 개발자',
        '웹 프론트엔드 개발자 포트폴리오',
        '웹 프론트엔드 개발자 포트폴리오 2026',
        '프론트엔드 개발자',
        '프론트엔드 개발자 포트폴리오',
        'UI 개발자',
        'UI 개발',
        'Vue 프론트엔드',
        'Vue 3',
        'SCSS',
        'JavaScript',
        '퍼블리셔 포트폴리오',
        '프론트엔드 포트폴리오',
        '2026 포트폴리오',
        '웹 표준',
        '웹 접근성',
        'SEO',
        'AEO',
        'GEO',
        'AI 검색 최적화',
        '반응형 웹',
    ],
    en: [
        'Eunyounghwan',
        'Eunyounghwan portfolio',
        'web publisher',
        'web publisher portfolio',
        'web publisher portfolio 2026',
        'frontend developer',
        'web frontend developer',
        'web frontend developer portfolio',
        'web frontend developer portfolio 2026',
        'UI developer',
        'UI development',
        'Vue frontend',
        'Vue 3',
        'SCSS',
        'JavaScript',
        'frontend portfolio',
        '2026 portfolio',
        'web standards',
        'web accessibility',
        'SEO',
        'AEO',
        'GEO',
        'AI search optimization',
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
            ko: 'Vue 3, SCSS, JavaScript 기반 UI 개발과 웹 접근성, SEO, 반응형 웹을 함께 다루는 웹 퍼블리셔이자 웹 프론트엔드 개발자 은영환입니다.',
            en: 'Eunyounghwan is a web publisher and frontend developer focused on web standards, accessibility, SEO, Vue 3 component architecture, and UI development.',
        },
    },
    website: {
        name: {
            ko: '웹 퍼블리셔 은영환 2026 포트폴리오',
            en: 'Eunyounghwan Frontend Developer Portfolio 2026',
        },
    },
    answerEngine: {
        questions: {
            ko: [
                {
                    name: '은영환은 어떤 일을 하나요?',
                    acceptedAnswer:
                        '은영환은 HTML, SCSS, JavaScript, Vue 3 기반의 UI 구현과 반응형 웹, 웹 접근성, SEO를 함께 다루는 웹 퍼블리셔이자 웹 프론트엔드 개발자입니다.',
                },
                {
                    name: '은영환 포트폴리오에서 확인할 수 있는 역량은 무엇인가요?',
                    acceptedAnswer:
                        '실무 프로젝트, 개인 프로젝트, Vue 3와 SCSS 기반 컴포넌트 설계, CMS 커스터마이징, 유지보수 가능한 UI 구조, 문서화와 협업 경험을 확인할 수 있습니다.',
                },
                {
                    name: '은영환에게 프로젝트 문의는 어떻게 하나요?',
                    acceptedAnswer:
                        '포트폴리오의 연락 섹션 또는 이력서 링크를 통해 확인할 수 있으며, 대표 연락처는 eyh208@naver.com 입니다.',
                },
            ],
            en: [
                {
                    name: 'What does Eunyounghwan do?',
                    acceptedAnswer:
                        'Eunyounghwan is a web publisher and web frontend developer focused on HTML, SCSS, JavaScript, Vue 3 UI implementation, responsive web, accessibility, and SEO.',
                },
                {
                    name: 'What skills are shown in this portfolio?',
                    acceptedAnswer:
                        'The portfolio highlights production projects, personal projects, Vue 3 and SCSS component structure, CMS customization, maintainable UI architecture, documentation, and collaboration.',
                },
                {
                    name: 'How can I contact Eunyounghwan for a project?',
                    acceptedAnswer:
                        'Use the contact section or resume link in the portfolio. The primary email contact is eyh208@naver.com.',
                },
            ],
        },
    },
} as const;
