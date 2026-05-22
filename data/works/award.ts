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
            ko: '태림포장 사내 원지·박스 주문 서비스를 리뉴얼하며 필요한 애플리케이션의 디자인 협업, UX 기획, 퍼블리싱을 수행했습니다. 프로젝트 결과물은 스마트앱어워드 2022 업무향상 부문 대상 수상으로 이어졌습니다.',
            en: 'Renewed an internal order service for Tailim Packaging and handled design collaboration, UX planning, and publishing for the required application. The outcome won the Smart App Awards 2022 Grand Prize in the work improvement category.',
        },
        myWorks: [
            {
                ko: 'Figma 기반 디자이너 협업 및 고객 요구사항 반영',
                en: 'Collaborated in Figma and reflected client requirements',
            },
            {
                ko: 'HTML/CSS/jQuery 기반 애플리케이션 화면 퍼블리싱 100% 수행',
                en: 'Owned 100% of application screen publishing with HTML/CSS/jQuery',
            },
            {
                ko: '업무 흐름을 고려한 UX 기획 및 화면 사용성 개선',
                en: 'Planned UX around work flows and improved screen usability',
            },
        ],
        achievements: [
            {
                ko: '스마트앱어워드 2022 업무향상 부문 대상',
                en: 'Smart App Awards 2022 Grand Prize',
            },
        ],
        points: [
            {
                ko: '수상 연계 실적',
                en: 'Award-linked achievement',
            },
            {
                ko: '디자인·UX·퍼블리싱을 연결한 실무형 구축 사례',
                en: 'A practical build connecting design, UX, and publishing',
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
