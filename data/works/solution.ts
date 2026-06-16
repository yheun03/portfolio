const data = [
    {
        id: 'framework',
        category: 'solution',
        title: {
            ko: '조앤소프트 프레임워크 구축',
            en: 'JO&SOFT Frontend Framework',
        },
        period: '2026.02~',
        type: {
            ko: '내부 프로젝트 / 프레임워크',
            en: 'Internal / Framework',
        },
        role: {
            ko: '퍼블리싱 100%, 프론트엔드 구조 설계 70%, 디자인 시스템 구축 70%',
            en: 'Publishing 100%, frontend architecture 70%, design system 70%',
        },
        tech: [
            'Nuxt 3',
            'Vue 3',
            'TypeScript',
            'JavaScript',
            'SCSS',
            'Pinia',
            'Axios',
            'Vite',
            'Vue I18n',
            'Chart.js',
            'vue-chartjs',
            'AG Grid',
            'flatpickr',
            'noUiSlider',
        ],
        introduction: {
            ko: '프로젝트마다 화면 구조·공통 UI·SCSS를 처음부터 다시 짜던 비효율을 없애기 위해, Nuxt 3 기반의 자사 프론트엔드 프레임워크를 직접 구축한 내부 프로젝트입니다. 자동 라우팅·컴포넌트 자동 import·상태 관리·API 플러그인 같은 기반 구조와, 실무 상태(size·disabled·readonly·focus·error 등)를 반영한 재사용 UI 컴포넌트, 디자인 토큰 기반 SCSS를 하나의 표준으로 묶었습니다.',
            en: 'An internal project where I built a Nuxt 3 frontend framework to end the per-project habit of rebuilding screen structure, shared UI, and SCSS from scratch. I unified the base layer—auto routing, auto component imports, state management, and the API plugin—with reusable UI components covering production states (size, disabled, readonly, focus, error) and a design-token SCSS system, all as one standard.',
        },
        myWorks: [
            {
                ko: '자동 라우팅·컴포넌트 자동 import·Pinia 상태 관리·Axios API 플러그인 등 기반 구조 정리',
                en: 'Organized the base layer—auto routing, auto component imports, Pinia state, and the Axios API plugin',
            },
            {
                ko: 'AppButton·AppInput·AppSelect·AppDatePicker·AppProgress·Chart·AG Grid 등 재사용 컴포넌트 제작',
                en: 'Built reusable components: AppButton, AppInput, AppSelect, AppDatePicker, AppProgress, Chart, and AG Grid',
            },
            {
                ko: '컴포넌트마다 size·disabled·readonly·focus·error·loading·active 등 실무 상태를 반영',
                en: 'Covered real-world states per component—size, disabled, readonly, focus, error, loading, and active',
            },
            {
                ko: 'BEM 네이밍과 디자인 토큰(색·타이포·간격·상태·반응형)을 기준으로 SCSS 구조 설계',
                en: 'Designed the SCSS structure around BEM naming and design tokens (color, type, spacing, state, breakpoints)',
            },
            {
                ko: 'composable·레이아웃·공통 플러그인을 실무 적용 가능한 형태로 구성하고 예제 페이지 제작',
                en: 'Shaped composables, layouts, and shared plugins for production use and built example pages',
            },
        ],
        achievements: [
            {
                ko: '프로젝트마다 반복 구축하던 기본 UI·레이아웃·API 연동·SCSS 구조를 프레임워크화',
                en: 'Frameworkized the base UI, layout, API integration, and SCSS rebuilt on every project',
            },
            {
                ko: '컴포넌트·API 구조·예제 페이지를 함께 정리해 신규 프로젝트 착수 속도를 높이는 협업 표준 구축',
                en: 'Built a collaboration standard—components, API structure, and examples—that speeds up new-project kickoff',
            },
        ],
        points: [
            {
                ko: 'Nuxt 3 프레임워크화',
                en: 'Nuxt 3 frameworkization',
            },
            {
                ko: '실무 상태 반영 컴포넌트',
                en: 'Production-state components',
            },
            {
                ko: '디자인 토큰 기반 SCSS',
                en: 'Design-token SCSS',
            },
        ],
        pin: true,
        duration: {
            ko: '진행 중',
            en: 'Ongoing',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Nuxt 3', 'Vue 3', 'TypeScript', 'SCSS'],
        links: [
            {
                label: {
                    ko: '페이지 이동하기',
                    en: 'Open demo',
                },
                href: 'https://yheun03.github.io/framework/',
            },
            {
                label: {
                    ko: 'GitHub',
                    en: 'GitHub',
                },
                href: 'https://github.com/yheun03/framework',
            },
        ],
    },
    {
        id: 'infra',
        category: 'solution',
        title: {
            ko: '자사 개발 인프라 및 퍼블리싱 표준화',
            en: 'In-house Development Infra & Publishing Standardization',
        },
        period: '2026.02~',
        type: {
            ko: '내부 프로젝트',
            en: 'Internal Project',
        },
        role: {
            ko: '퍼블리싱 표준화 80%, UI 구조 개선 70%, 문서화 50%',
            en: 'Publishing standardization 80%, UI structure 70%, documentation 50%',
        },
        tech: ['GitHub', 'Visual Studio Code', 'Cursor', 'Figma', 'Vue 3', 'Nuxt 3', 'SCSS', 'JavaScript', 'TypeScript'],
        introduction: {
            ko: '프레임워크 구축과 함께, 프로젝트마다 산발적으로 작성되던 화면 구조·SCSS·컴포넌트 네이밍·폴더 구조·API 연동·다국어 처리를 하나의 기준으로 정리한 표준화 작업입니다. 단순히 규칙을 정하는 데 그치지 않고, 실무에 바로 적용 가능한 예제 페이지와 스타일 가이드를 함께 만들어 퍼블리싱과 프론트엔드 개발이 같은 언어로 협업할 수 있게 했습니다.',
            en: 'Alongside the framework, this work standardized what had been written ad hoc per project—screen structure, SCSS, component naming, folder layout, API integration, and i18n—into one baseline. Beyond setting rules, I shipped production-ready example pages and a style guide so publishing and frontend development could collaborate in the same language.',
        },
        myWorks: [
            {
                ko: '버튼·입력폼·셀렉트·달력·프로그레스·차트·그리드·LNB·레이아웃 구조를 공통화',
                en: 'Standardized buttons, forms, selects, date pickers, progress, charts, grids, LNB, and layouts',
            },
            {
                ko: '컴포넌트 네이밍·폴더 구조·API 연동·다국어 처리 방식을 신규 프로젝트 재사용 가능한 형태로 정리',
                en: 'Defined reusable conventions for naming, folder structure, API integration, and i18n for new projects',
            },
            {
                ko: 'SCSS 토큰·BEM 네이밍·컴포넌트 단위 스타일 관리 방식 정립',
                en: 'Established SCSS tokens, BEM naming, and component-level style management',
            },
            {
                ko: '실무 적용 가능한 예제 페이지와 스타일 가이드 제작·문서화',
                en: 'Built and documented production-ready example pages and a style guide',
            },
        ],
        achievements: [
            {
                ko: '신규 프로젝트 착수 시 기본 레이아웃·컴포넌트·스타일 가이드를 빠르게 적용할 수 있는 기반 마련',
                en: 'Created a foundation for quickly applying base layouts, components, and the style guide on new projects',
            },
            {
                ko: '산발적이던 UI 구조를 공통화해 퍼블리싱–프론트엔드 협업 생산성 향상 기반 구축',
                en: 'Unified scattered UI structures into a base that lifts publishing–frontend collaboration productivity',
            },
        ],
        points: [
            {
                ko: '퍼블리싱 표준화',
                en: 'Publishing standardization',
            },
            {
                ko: '재사용성·협업성 향상',
                en: 'Reuse and collaboration',
            },
            {
                ko: '예제·가이드 문서화',
                en: 'Examples and guide docs',
            },
        ],
        pin: true,
        duration: {
            ko: '진행 중',
            en: 'Ongoing',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue 3', 'Nuxt 3', 'SCSS', 'TypeScript'],
    },
    {
        id: 'robo-tms',
        category: 'solution',
        title: {
            ko: 'Robo TMS 솔루션',
            en: 'Robo TMS Solution',
        },
        period: '2024.02~04',
        type: {
            ko: '자사 솔루션',
            en: 'In-house Solution',
        },
        role: {
            ko: '기획 30%, 퍼블리싱 100%, 디자인 80%',
            en: 'Planning 30%, Publishing 100%, Design 80%',
        },
        tech: ['Vue', 'SCSS', 'Figma'],
        introduction: {
            ko: 'TMS 서비스를 운영하며 마주한 여러 고객의 요구·문의를 직접 해결해 본 경험을 토대로, 자사 솔루션 Robo TMS를 만든 프로젝트입니다. 특히 고객용 애플리케이션은 UI·UX 디자인부터 퍼블리싱까지 직접 맡아 가장 애정을 쏟았고, 개편된 UI와 더 편한 UX로 고객 만족도를 끌어올렸습니다.',
            en: 'Built on hands-on experience resolving customer requests during TMS operation, this project produced the in-house Robo TMS solution. I cared most about the customer-facing app—owning it from UI/UX design through publishing—and lifted satisfaction with a redesigned UI and a more comfortable UX.',
        },
        myWorks: [
            {
                ko: '운영 중 수집한 고객 요구·문의를 바탕으로 기획에 참여',
                en: 'Contributed to planning from customer needs gathered during operation',
            },
            {
                ko: '고객용 애플리케이션의 UI·UX 디자인을 직접 설계',
                en: 'Designed the customer application UI/UX directly',
            },
            {
                ko: 'Vue·SCSS 기반으로 전체 화면 퍼블리싱 전담',
                en: 'Owned full screen publishing on Vue and SCSS',
            },
            {
                ko: '개편된 UI와 더 편한 사용 흐름으로 사용성 개선',
                en: 'Improved usability with a redesigned UI and smoother flow',
            },
        ],
        achievements: [
            {
                ko: '개선된 UX로 사용자 문의 약 25% 감소 추산',
                en: 'Estimated ~25% fewer user inquiries from the improved UX',
            },
            {
                ko: '운영 경험을 제품화로 연결한 자사 솔루션 결과물 완성',
                en: 'Turned operational experience into a finished in-house product',
            },
        ],
        points: [
            {
                ko: '기획·디자인·퍼블리싱 일체형 수행',
                en: 'Planning, design, and publishing in one',
            },
            {
                ko: '운영 경험 → 제품화',
                en: 'Operation experience to productization',
            },
            {
                ko: '사용성 개선 사례',
                en: 'UX improvement case',
            },
        ],
        pin: false,
        duration: {
            ko: '약 3개월',
            en: '~3 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue', 'SCSS'],
    },
    {
        id: 'robo-mes',
        category: 'solution',
        title: {
            ko: 'Robo MES 솔루션 개발',
            en: 'Robo MES Solution Development',
        },
        period: '2022.08~2023.04',
        type: {
            ko: '자사 솔루션',
            en: 'In-house Solution',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['WebSquare', 'Figma', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '여러 제조사의 MES·스마트팩토리 프로젝트에서 다진 노하우를 모아 자사 Robo MES 솔루션으로 제품화한 프로젝트입니다. 퍼블리싱을 100% 담당하며 화면을 모듈 단위 컴포넌트로 구축해, 이후 프로젝트의 화면 제작 공수를 크게 줄이는 기반을 만들었습니다.',
            en: 'A project that consolidated MES/smart-factory know-how from multiple manufacturers into the productized Robo MES solution. Owning publishing end to end, I built screens as module-level components, creating a base that sharply reduced screen-build effort on later projects.',
        },
        myWorks: [
            {
                ko: '반복 화면을 모듈 단위 UI 컴포넌트로 구축',
                en: 'Built repeated screens as module-level UI components',
            },
            {
                ko: '전체 퍼블리싱을 전담하며 화면 구조 일관성 고도화',
                en: 'Owned all publishing and tightened structural consistency',
            },
            {
                ko: 'WebSquare 환경에서 컴포넌트 재사용 체계 정착',
                en: 'Established a component-reuse system in the WebSquare environment',
            },
        ],
        achievements: [
            {
                ko: '모듈화로 퍼블리싱 공수 약 40% 절감',
                en: 'Cut publishing effort by about 40% through modularization',
            },
            {
                ko: '현장 프로젝트 노하우를 재사용 가능한 솔루션 자산으로 전환',
                en: 'Converted field-project know-how into reusable solution assets',
            },
        ],
        points: [
            {
                ko: '솔루션 제품화 경험',
                en: 'Solution productization',
            },
            {
                ko: '모듈화 기반 생산성 향상',
                en: 'Modularization-driven productivity',
            },
        ],
        pin: false,
        duration: {
            ko: '약 9개월',
            en: '~9 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'jQuery'],
    },
] as const;

export default data;
