const data = [
    {
        id: 'hanon',
        category: 'operation',
        title: {
            ko: '한온시스템 홈페이지 운영',
            en: 'Hanon Systems Website Operation',
        },
        period: '2025.08~',
        type: {
            ko: 'SM 운영',
            en: 'SM Operation',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Rider', 'Teams', 'JIRA', 'C#', 'CSS3', 'CSHTML'],
        introduction: {
            ko: '한온시스템 홈페이지 운영에서 Rider·JIRA 티켓 기반으로 정보 수정, 레이아웃 변경, 최신화 작업을 수행하며 안정적인 운영 환경을 구축했습니다.',
            en: 'Handled Rider/JIRA ticket-based content updates and layout fixes for Hanon Systems website operation, building a stable maintenance flow.',
        },
        myWorks: [
            {
                ko: '티켓 기반 요청사항 분석 및 대응',
                en: 'Ticket-based request analysis and response',
            },
            {
                ko: '타이틀/콘텐츠 정보 수정 및 최신화',
                en: 'Title/content updates and maintenance',
            },
            {
                ko: '레이아웃 변경 및 퍼블리싱 유지보수',
                en: 'Layout changes and publishing maintenance',
            },
            {
                ko: '협업사와 운영 커뮤니케이션 수행',
                en: 'Operational communication with partner teams',
            },
        ],
        achievements: [
            {
                ko: '티켓 처리 리드타임 약 20% 단축',
                en: 'Reduced ticket handling lead time by around 20%',
            },
            {
                ko: '서비스 정보 최신성 및 안정성 유지',
                en: 'Maintained content freshness and service stability',
            },
        ],
        points: [
            {
                ko: '운영 대응력',
                en: 'Operational responsiveness',
            },
            {
                ko: '티켓 기반 유지보수 체계',
                en: 'Ticket-driven maintenance workflow',
            },
        ],
        pin: true,
        duration: {
            ko: '진행 중',
            en: 'Ongoing',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['C#', 'CSS3', 'CSHTML'],
    },
    {
        id: 'tms-maintenance',
        category: 'operation',
        title: {
            ko: 'TMS 운영 · 보수',
            en: 'TMS Operation & Maintenance',
        },
        period: '2023.05~2023.07',
        type: {
            ko: 'SM 보수',
            en: 'SM Maintenance',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Nexacro'],
        introduction: {
            ko: '태림포장 TMS 운영 과정에서 이슈 리포트를 체계화하고, 반복되는 불편 사항을 UX/UI 개선과 보수 작업으로 연결했습니다.',
            en: 'Structured issue reporting during Tailim TMS operation and connected recurring pain points to UX/UI improvements and maintenance.',
        },
        myWorks: [
            {
                ko: '반복 이슈 분석 및 개선 적용',
                en: 'Analyzed recurring issues and applied improvements',
            },
            {
                ko: '심플한 UI로 보수 화면 개선',
                en: 'Refined maintenance screens with cleaner UI',
            },
        ],
        achievements: [
            {
                ko: '일 평균 불편 접수 15건 이상에서 2건 수준으로 감소',
                en: 'Reduced average daily complaints from 15+ to around 2',
            },
        ],
        points: [
            {
                ko: '운영 개선형 퍼블리싱',
                en: 'Operations-focused publishing',
            },
            {
                ko: '문제 재발 방지 관점 적용',
                en: 'Recurrence prevention perspective',
            },
        ],
        pin: false,
        duration: {
            ko: '약 3개월',
            en: '~3 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS'],
    },
] as const;

export default data;
