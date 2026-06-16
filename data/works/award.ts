const data = [
    {
        id: 'toms',
        category: 'award',
        title: {
            ko: 'TOMS 서비스 구축',
            en: 'TOMS Service Build',
        },
        period: '2021.10~12',
        type: {
            ko: '신규 구축',
            en: 'New Build',
        },
        role: {
            ko: '디자인 30%, 퍼블리싱 100%, UX 기획 25%',
            en: 'Design 30%, Publishing 100%, UX Planning 25%',
        },
        tech: ['HTML', 'CSS', 'jQuery', 'Figma'],
        introduction: {
            ko: '태림포장 사내 원지·박스 주문 서비스를 리뉴얼·구축하며 필요한 애플리케이션의 디자인 협업·UX 기획·퍼블리싱을 함께 수행한 프로젝트입니다. 디자이너와 Figma로 소통하면서 사용법을 익혀 고객사 요구사항을 정확히 반영해 직접 디자인했고, 그 결과물이 스마트앱어워드 2022 업무향상 부문 대상으로 이어졌습니다.',
            en: 'A renewal/build of Tailim Packaging’s internal paper-and-box ordering service, where I combined design collaboration, UX planning, and publishing for the required application. Communicating with the designer in Figma, I learned the tooling, reflected client requirements precisely, and designed directly—an outcome that won the Smart App Awards 2022 Grand Prize in the work-improvement category.',
        },
        myWorks: [
            {
                ko: 'Figma 기반으로 디자이너와 협업하며 고객 요구사항을 정확히 반영',
                en: 'Collaborated with the designer in Figma and reflected client requirements precisely',
            },
            {
                ko: 'HTML·CSS·jQuery 기반 애플리케이션 화면 퍼블리싱 100% 수행',
                en: 'Owned 100% of application screen publishing with HTML, CSS, and jQuery',
            },
            {
                ko: '업무 흐름을 고려한 UX 기획과 화면 사용성 개선',
                en: 'Planned UX around work flows and improved screen usability',
            },
        ],
        achievements: [
            {
                ko: '스마트앱어워드 2022 업무향상 부문 대상 수상',
                en: 'Won the Smart App Awards 2022 Grand Prize (work-improvement category)',
            },
        ],
        points: [
            {
                ko: '수상 연계 실적',
                en: 'Award-linked achievement',
            },
            {
                ko: '디자인·UX·퍼블리싱 일체형 구축',
                en: 'Design, UX, and publishing in one build',
            },
        ],
        pin: true,
        duration: {
            ko: '약 3개월',
            en: '~3 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'jQuery'],
    },
] as const;

export default data;
