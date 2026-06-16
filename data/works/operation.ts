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
            ko: '콘센트릭스 CATALYST와 협업해 한온시스템 홈페이지를 운영하는 SM 사업입니다. JIRA로 들어오는 운영 티켓을 단순 화면 수정으로 끝내지 않고, csHtml 뷰 구조·CSP·인코딩·정적 리소스 경로·404·보안 점검까지 퍼블리싱 관점에서 영향 범위를 함께 검토하며 운영 안정성을 챙겼습니다.',
            en: 'An SM engagement operating the Hanon Systems website with Concentrix CATALYST. Rather than treating JIRA tickets as one-off screen edits, I reviewed impact from a publishing angle—csHtml views, CSP, encoding, static-resource paths, 404 handling, and security checks—to keep operations stable.',
        },
        myWorks: [
            {
                ko: 'JIRA 운영 티켓 기반으로 요청사항을 분석하고 우선순위에 맞춰 대응',
                en: 'Analyzed and prioritized requests from JIRA operation tickets',
            },
            {
                ko: '문구·타이틀·이미지·링크·레이아웃·콘텐츠 영역 등 퍼블리싱 중심 유지보수 수행',
                en: 'Handled publishing-focused maintenance—text, titles, images, links, layouts, and content areas',
            },
            {
                ko: 'csHtml 화면 구조를 확인하고 필요 시 CSS·정적 리소스를 직접 수정',
                en: 'Reviewed csHtml view structure and edited CSS and static resources as needed',
            },
            {
                ko: 'CSP·인코딩·정적 리소스 경로·404·보안 점검 이슈를 퍼블리싱 관점에서 검토하고 영향 범위 정리',
                en: 'Reviewed CSP, encoding, static-resource paths, 404, and security issues from a publishing angle and scoped their impact',
            },
        ],
        achievements: [
            {
                ko: '운영 요청을 신속히 반영해 홈페이지 콘텐츠의 최신성 유지',
                en: 'Kept site content current by turning operation requests around quickly',
            },
            {
                ko: '뷰 구조·CSS 경로·보안 설정 영향까지 함께 검토해 운영 안정성 확보에 기여',
                en: 'Contributed to stability by also reviewing view structure, CSS paths, and security-setting impact',
            },
        ],
        points: [
            {
                ko: '운영 대응력',
                en: 'Operational responsiveness',
            },
            {
                ko: '티켓 기반 유지보수 체계',
                en: 'Ticket-driven maintenance',
            },
            {
                ko: '배포·보안 영향까지 검토하는 시야',
                en: 'Awareness of deploy and security impact',
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
            ko: 'SM 운영·보수',
            en: 'SM Operation & Maintenance',
        },
        role: {
            ko: '이슈 리포트·운영 대응 100%, 보수 퍼블리싱 100%',
            en: 'Issue reporting & ops 100%, maintenance publishing 100%',
        },
        tech: ['Nexacro'],
        introduction: {
            ko: '태림포장·대영포장 TMS의 속도 저하 이슈 해결을 위해 투입된 뒤, 단위 테스트로 원인을 찾아 해결하고 그대로 운영 대응까지 이어간 프로젝트입니다. 서비스에 익숙해지자 자발적으로 고객 응대를 맡아 일 평균 15건 이상이던 불편 접수를 2건 수준으로 줄였고, 반복 이슈는 UX/UI 개선과 보수 작업으로 연결했습니다.',
            en: 'Brought in to fix performance degradation in the Tailim/Daeyoung TMS, I traced the cause through unit testing, resolved it, and carried on into operations. As I grew familiar with the service I volunteered to handle customers directly—cutting daily complaints from 15+ to about 2—and turned recurring issues into UX/UI improvements and maintenance.',
        },
        myWorks: [
            {
                ko: '속도 저하 이슈를 단위 테스트로 특정해 원인 해결',
                en: 'Isolated the performance issue via unit testing and resolved its cause',
            },
            {
                ko: '자발적으로 고객 응대를 맡아 속도·화면 오류 등 불편사항 즉시 처리',
                en: 'Volunteered for customer support, resolving speed and screen issues on the spot',
            },
            {
                ko: '미해결 이슈는 개발팀에 신속 보고하고, 해결 케이스를 산출물로 정리',
                en: 'Escalated unresolved issues to the dev team and documented resolution cases as deliverables',
            },
            {
                ko: '반복되는 불편 사항을 분석해 UX/UI 개선·보수 화면(Nexacro)으로 연결',
                en: 'Analyzed recurring complaints and turned them into UX/UI improvements and maintenance screens in Nexacro',
            },
        ],
        achievements: [
            {
                ko: '일 평균 불편 접수 15건 이상 → 2건 수준으로 획기적 단축',
                en: 'Cut average daily complaints from 15+ to around 2',
            },
            {
                ko: '해결 케이스 산출물이 동일 이슈 재발 시 대응 자료로 재사용됨',
                en: 'Resolution-case documents were reused to handle recurrences faster',
            },
        ],
        points: [
            {
                ko: '운영 개선형 퍼블리싱',
                en: 'Operations-improving publishing',
            },
            {
                ko: '주도적 고객 응대',
                en: 'Self-initiated customer support',
            },
            {
                ko: '재발 방지 산출물화',
                en: 'Recurrence-prevention documentation',
            },
        ],
        pin: false,
        duration: {
            ko: '약 3개월',
            en: '~3 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Nexacro'],
    },
] as const;

export default data;
