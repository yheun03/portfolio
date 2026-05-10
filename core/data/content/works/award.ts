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
            ko: '디자인, 퍼블리싱, UX',
            en: 'Design, Publishing, UX',
        },
        tech: ['HTML', 'CSS', 'jQuery', 'Figma'],
        introduction: {
            ko: '디자인부터 UX까지 전담하여 수상으로 이어진 초기 핵심 프로젝트입니다.',
            en: 'An early key project fully owned from design to UX and awarded.',
        },
        myWorks: [
            {
                ko: '디자인',
                en: 'Design',
            },
            {
                ko: '퍼블리싱',
                en: 'Publishing',
            },
            {
                ko: 'UX 기획',
                en: 'UX planning',
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
        ],
        pin: false,
        duration: {
            ko: '약 3개월',
            en: '~3 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'jQuery'],
    },
] as const;

export default data;
