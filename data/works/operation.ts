const data = [
    {
        id: 'hanon',
        category: 'operation',
        title: {
            ko: '한온시스템 홈페이지 운영',
            en: 'Hanon Systems Website Operation',
        },
        period: '2025.07~',
        type: {
            ko: 'SM 운영',
            en: 'SM Operation',
        },
        role: {
            ko: '퍼블리싱 100%, 운영 이슈 대응 100%',
            en: 'Publishing 100%, operation issue response 100%',
        },
        tech: ['Rider', 'Teams', 'JIRA', 'C#', 'CSS3', 'csHtml', 'JavaScript'],
        introduction: {
            ko: '콘센트릭스 CATALYST와 협업하며 한온시스템 홈페이지 운영 티켓을 처리하고, 문구·이미지·링크·레이아웃·콘텐츠 영역 수정과 운영 환경 이슈 검토를 수행했습니다.',
            en: 'Collaborated with Concentrix CATALYST on Hanon Systems website operation tickets, handling text, image, link, layout, content updates, and operational environment checks.',
        },
        myWorks: [
            {
                ko: '티켓 기반 요청사항 분석 및 대응',
                en: 'Ticket-based request analysis and response',
            },
            {
                ko: '문구, 타이틀, 이미지, 링크, 레이아웃, 콘텐츠 영역 수정',
                en: 'Updated text, titles, images, links, layouts, and content areas',
            },
            {
                ko: 'csHtml 화면 구조 확인 및 CSS/정적 리소스 수정',
                en: 'Reviewed csHtml view structure and updated CSS/static resources',
            },
            {
                ko: 'CSP, 인코딩, 정적 리소스 경로, 404, 보안 점검 이슈 영향 범위 검토',
                en: 'Reviewed CSP, encoding, static resource paths, 404 handling, and security check impacts',
            },
        ],
        achievements: [
            {
                ko: '운영 요청사항을 신속히 반영해 홈페이지 콘텐츠 최신성 유지',
                en: 'Kept website content up to date through fast operation ticket handling',
            },
            {
                ko: '뷰 구조, CSS 리소스 경로, 보안 설정 영향까지 함께 검토해 운영 안정성 확보에 기여',
                en: 'Contributed to operational stability by reviewing view structure, CSS resources, and security setting impact',
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
        languages: ['C#', 'CSS3', 'csHtml', 'JavaScript'],
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
