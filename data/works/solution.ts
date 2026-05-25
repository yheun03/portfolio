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
        tech: ['Nuxt 3', 'Vue 3', 'TypeScript', 'JavaScript', 'SCSS', 'Pinia', 'Axios', 'Vite', 'Chart.js', 'vue-chartjs', 'AG Grid', 'flatpickr', 'noUiSlider'],
        introduction: {
            ko: '사내 프로젝트의 개발 생산성과 UI 품질을 높이기 위해 Nuxt 3 기반 프론트엔드 프레임워크와 재사용 가능한 UI 컴포넌트, SCSS 토큰 구조를 구축했습니다.',
            en: 'Built a Nuxt 3 frontend framework, reusable UI components, and SCSS token architecture to improve internal project productivity and UI quality.',
        },
        myWorks: [
            {
                ko: '자동 라우팅, 컴포넌트 자동 import, Pinia 상태 관리, Axios API 플러그인 구조 정리',
                en: 'Organized auto routing, auto component imports, Pinia state management, and Axios API plugin structure',
            },
            {
                ko: 'AppButton, AppInput, AppSelect, AppDatePicker, AppProgress, Chart, AG Grid 컴포넌트 제작',
                en: 'Built AppButton, AppInput, AppSelect, AppDatePicker, AppProgress, Chart, and AG Grid components',
            },
            {
                ko: '상태, 사이즈, disabled, readonly, focus, error 등 실무 케이스 반영',
                en: 'Covered production states such as size, disabled, readonly, focus, and error',
            },
            {
                ko: 'BEM과 디자인 토큰 기반 SCSS 구조 설계',
                en: 'Designed SCSS architecture based on BEM and design tokens',
            },
        ],
        achievements: [
            {
                ko: '프로젝트마다 반복 구축하던 기본 UI와 구조를 프레임워크화',
                en: 'Frameworkized the basic UI and structure that had been rebuilt per project',
            },
            {
                ko: '컴포넌트, API 구조, 페이지 예제를 함께 정리해 협업 가능한 표준 구조 구축',
                en: 'Built a collaborative standard with components, API structure, and example pages',
            },
        ],
        points: [
            {
                ko: 'Nuxt 3 프레임워크',
                en: 'Nuxt 3 framework',
            },
            {
                ko: '디자인 시스템',
                en: 'Design system',
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
                    ko: '데모 보기',
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
            ko: '사내 프로젝트의 퍼블리싱 품질과 개발 효율을 높이기 위해 공통 UI, SCSS 구조, 컴포넌트 네이밍, 폴더 구조, API 연동 방식을 표준화했습니다.',
            en: 'Standardized shared UI, SCSS architecture, component naming, folder structure, and API integration patterns to improve internal publishing quality and development efficiency.',
        },
        myWorks: [
            {
                ko: '버튼, 입력폼, 셀렉트, 달력, 프로그레스, 차트, 그리드, LNB, 레이아웃 구조 공통화',
                en: 'Standardized buttons, forms, selects, date pickers, progress UI, charts, grids, LNB, and layout structures',
            },
            {
                ko: '실무 적용 가능한 예제 페이지 제작',
                en: 'Built production-ready example pages',
            },
            {
                ko: 'SCSS 토큰, BEM 네이밍, 컴포넌트 단위 스타일 관리 방식 정리',
                en: 'Organized SCSS tokens, BEM naming, and component-level style management',
            },
            {
                ko: '프로젝트별 반복 UI를 재사용 가능한 형태로 구성',
                en: 'Turned repeated project UI into reusable structures',
            },
        ],
        achievements: [
            {
                ko: '신규 프로젝트 착수 시 기본 레이아웃, 컴포넌트, 스타일 가이드를 빠르게 적용할 수 있는 기반 마련',
                en: 'Created a foundation for quickly applying base layouts, components, and style guides to new projects',
            },
            {
                ko: '산발적으로 구현되던 UI 구조를 공통화해 개발 생산성 향상 기반 구축',
                en: 'Built a productivity foundation by unifying previously scattered UI structures',
            },
        ],
        points: [
            {
                ko: '표준화',
                en: 'Standardization',
            },
            {
                ko: '재사용성 향상',
                en: 'Reusability boost',
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
            ko: '기획/디자인/퍼블리싱',
            en: 'Planning/Design/Publishing',
        },
        tech: ['Vue', 'SCSS', 'Figma'],
        introduction: {
            ko: '요구사항 기반 UX 재설계로 사용자 문의를 줄인 프로젝트입니다.',
            en: 'Redesigned UX from requirements and reduced user inquiries.',
        },
        myWorks: [
            {
                ko: '기획',
                en: 'Planning',
            },
            {
                ko: '화면 설계',
                en: 'Screen design',
            },
            {
                ko: '디자인',
                en: 'Visual design',
            },
            {
                ko: '퍼블리싱',
                en: 'Publishing',
            },
        ],
        achievements: [
            {
                ko: '사용자 문의 25% 감소 추산',
                en: 'Estimated 25% fewer user inquiries',
            },
        ],
        points: [
            {
                ko: '기획형 퍼블리셔 역량',
                en: 'Planning-led publisher capability',
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
            ko: '스마트팩토리 MES 경험을 바탕으로 자사 Robo MES 솔루션을 모듈형 컴포넌트 중심으로 구축했습니다.',
            en: 'Built Robo MES based on smart-factory MES experience with modular component architecture.',
        },
        myWorks: [
            {
                ko: '모듈 단위 UI 컴포넌트 구축',
                en: 'Built module-level UI components',
            },
            {
                ko: '전체 퍼블리싱 전담 및 구조 고도화',
                en: 'Owned full publishing and improved structural consistency',
            },
        ],
        achievements: [
            {
                ko: '퍼블리싱 공수 약 40% 절감',
                en: 'Reduced publishing effort by about 40%',
            },
        ],
        points: [
            {
                ko: '솔루션 제품화 경험',
                en: 'Solution productization experience',
            },
            {
                ko: '모듈화 기반 생산성 향상',
                en: 'Productivity gains through modularization',
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
