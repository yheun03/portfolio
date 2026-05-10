const data = [
    {
        id: 'infra',
        category: 'solution',
        title: {
            ko: '자사 인프라 구축',
            en: 'In-house Infrastructure',
        },
        period: '2026.02~',
        type: {
            ko: '내부 프로젝트',
            en: 'Internal Project',
        },
        role: {
            ko: '구조 재정비',
            en: 'Structure Refactoring',
        },
        tech: ['Vue 3', 'SCSS', 'Pinia'],
        introduction: {
            ko: '작업 방식 표준화와 공통 구조 정리를 통해 납품 품질 기준을 정립했습니다.',
            en: 'Standardized workflow and shared structure to establish quality baselines.',
        },
        myWorks: [
            {
                ko: '개발/퍼블리싱 방식 표준화 참여',
                en: 'Standardized dev/publishing workflow',
            },
            {
                ko: '공통 구조 정리',
                en: 'Organized shared architecture',
            },
            {
                ko: '납품 품질 기준 정리',
                en: 'Defined delivery quality baseline',
            },
            {
                ko: '재사용 가능한 UI 체계 개선',
                en: 'Improved reusable UI system',
            },
        ],
        achievements: [],
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
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue 3', 'SCSS'],
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
