const data = {
    name: '은영환',
    role: {
        ko: '웹 퍼블리셔 / 웹 프론트엔드 개발자',
        en: 'Web Publisher / Web Frontend Developer',
    },
    keywords: [
        '웹 퍼블리셔',
        '웹 프론트엔드 개발자',
        '프론트엔드 개발자',
        'UI 개발자',
        'HTML5',
        'SCSS',
        'JavaScript',
        'Vue 3',
        'React',
        'CMS Customizing',
        'UI/UX',
        'Accessibility',
        'SEO',
        'Multi-language',
        'Documentation',
    ],
    focusAreas: [
        {
            label: {
                ko: '구조 설계',
                en: 'Structure',
            },
            value: {
                ko: '컴포넌트 / SCSS / 파일 구조',
                en: 'Components / SCSS / File architecture',
            },
        },
        {
            label: {
                ko: '퍼블리싱 품질',
                en: 'Publishing Quality',
            },
            value: {
                ko: '반응형 / 접근성 / 크로스브라우징',
                en: 'Responsive / A11y / Cross-browser',
            },
        },
        {
            label: {
                ko: '협업 효율',
                en: 'Team Efficiency',
            },
            value: {
                ko: '문서화 / 공통화 / 운영 대응',
                en: 'Docs / Reuse / Operations',
            },
        },
    ],
    deliveryPillars: [
        {
            ko: 'Design-to-code 정합성',
            en: 'Design-to-code fidelity',
        },
        {
            ko: '유지보수 가능한 UI 시스템',
            en: 'Maintainable UI system',
        },
        {
            ko: '검색과 접근성을 고려한 마크업',
            en: 'SEO and accessibility-first markup',
        },
        {
            ko: '운영 환경에 강한 구조',
            en: 'Production-ready structure',
        },
    ],
    stats: [
        {
            label: {
                ko: '실무 경험',
                en: 'Experience',
            },
            value: 79,
            suffix: 'M+',
        },
        {
            label: {
                ko: '프로젝트',
                en: 'Projects',
            },
            value: 20,
            suffix: '+',
        },
        {
            label: {
                ko: '퍼블리싱 책임 수행',
                en: 'Publishing Ownership',
            },
            value: 100,
            suffix: '%',
        },
        {
            label: {
                ko: '일정 준수율',
                en: 'On-Time Delivery',
            },
            value: 100,
            suffix: '%',
        },
    ],
    contacts: {
        email: 'eyh208@naver.com',
        github: 'https://github.com/yheun03',
        resume: 'files/Resume.pdf',
    },
} as const;

export default data;
