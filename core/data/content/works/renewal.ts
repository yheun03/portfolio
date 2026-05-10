const data = [
    {
        id: 'company-renewal',
        category: 'renewal',
        title: {
            ko: '자사 홈페이지 리뉴얼',
            en: 'Corporate Site Renewal',
        },
        period: '2025.07~2025.08',
        type: {
            ko: '내부 프로젝트',
            en: 'Internal Project',
        },
        role: {
            ko: '퍼블리싱 100%, UI 개선 50%, 콘텐츠 기획 30%',
            en: 'Publishing 100%, UI Improvement 50%, Content Planning 30%',
        },
        tech: ['Visual Studio Code', 'Figma', 'FileZilla', 'Whois Hosting', 'HTML', 'SCSS', 'JavaScript', 'jQuery'],
        introduction: {
            ko: '구조 복잡성과 정보 최신화 이슈를 해소하기 위해 전면 리뉴얼을 기획/수행하고, 다국어 및 웹 표준 대응까지 확장했습니다.',
            en: 'Led full-site renewal to solve structure/content issues and expanded i18n and modern web-standard support.',
        },
        myWorks: [
            {
                ko: '중복 마크업 및 불필요 요소 제거',
                en: 'Removed duplicated markup and unnecessary elements',
            },
            {
                ko: 'SCSS 컴포넌트 구조 도입',
                en: 'Introduced SCSS component architecture',
            },
            {
                ko: '영문/베트남어 다국어 구조 설계 및 구현',
                en: 'Designed and implemented EN/VI i18n structure',
            },
            {
                ko: '콘텐츠 최신화 및 일부 페이지 구성 기획 참여',
                en: 'Updated content and contributed to page content planning',
            },
            {
                ko: 'SEO/OG/접근성/반응형/SSL 기준 적용',
                en: 'Applied SEO/OG/a11y/responsive/SSL standards',
            },
        ],
        achievements: [
            {
                ko: '유지보수성과 개발 효율 개선',
                en: 'Improved maintainability and development efficiency',
            },
            {
                ko: '글로벌 전시 대응을 위한 다국어 기반 확보',
                en: 'Established multilingual foundation for global event readiness',
            },
        ],
        points: [
            {
                ko: '브랜딩/정보 신뢰도 개선',
                en: 'Brand trust and information reliability improvement',
            },
            {
                ko: '다국어 및 웹 표준 대응',
                en: 'Multilingual and web-standard readiness',
            },
        ],
        pin: true,
        duration: {
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'SCSS', 'JavaScript', 'jQuery'],
    },
    {
        id: 'kyungdongwon-cms',
        category: 'renewal',
        title: {
            ko: '경동원 CMS 리뉴얼',
            en: 'Kyungdongwon CMS Renewal',
        },
        period: '2025.07',
        type: {
            ko: 'SI / CMS',
            en: 'SI / CMS',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['WebSquare SP5', 'XML', 'CSS3'],
        introduction: {
            ko: '인원 공백 대응을 위해 단기 투입되어 기존 화면 오류를 수정하고 신규 페이지를 제작했습니다.',
            en: 'Joined as a short-term backup to fix existing screen issues and build new pages in CMS.',
        },
        myWorks: [
            {
                ko: '기존 화면 디테일 오류 수정',
                en: 'Fixed detailed issues in existing screens',
            },
            {
                ko: '신규 페이지 퍼블리싱',
                en: 'Published new pages',
            },
            {
                ko: 'CMS 구조 적응 및 빠른 온보딩',
                en: 'Adapted quickly to CMS structure',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '단기 투입 대응력',
                en: 'Short-term ramp-up capability',
            },
            {
                ko: 'CMS 퍼블리싱 안정화',
                en: 'CMS publishing stabilization',
            },
        ],
        pin: false,
        duration: {
            ko: '약 3주',
            en: '~3 weeks',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['XML', 'CSS3'],
    },
    {
        id: 'fems',
        category: 'renewal',
        title: {
            ko: 'FEMS 리뉴얼',
            en: 'FEMS Renewal',
        },
        period: '2024.11',
        type: {
            ko: 'SI / 단기 납품',
            en: 'SI / Rapid Delivery',
        },
        role: {
            ko: '퍼블리싱 50%',
            en: 'Publishing 50%',
        },
        tech: ['Visual Studio Code', 'Figma', 'HTML', 'SCSS', 'React.js'],
        introduction: {
            ko: '급한 납품 일정에 맞춰 React 기반 주요 화면을 단기간에 구현한 프로젝트입니다.',
            en: 'Delivered key React-based screens within a tight timeline for urgent release needs.',
        },
        myWorks: [
            {
                ko: '우선 구현 대상 페이지 단기 구축',
                en: 'Built priority pages in a short timeframe',
            },
            {
                ko: '일정 내 품질 확보 중심 퍼블리싱',
                en: 'Maintained quality under strict schedule constraints',
            },
        ],
        achievements: [
            {
                ko: '1주 내 주요 화면 구현 지원',
                en: 'Supported key screen delivery within one week',
            },
        ],
        points: [
            {
                ko: '단기 납품 대응력',
                en: 'Rapid delivery capability',
            },
            {
                ko: 'React 퍼블리싱 경험',
                en: 'React publishing experience',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2주',
            en: '~2 weeks',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'SCSS', 'React'],
    },
    {
        id: 'scm-daeyang-paper',
        category: 'renewal',
        title: {
            ko: '대양제지 SCM 리뉴얼',
            en: 'Daeyang Paper SCM Renewal',
        },
        period: '2024.05~2024.06',
        type: {
            ko: 'SI / 신규 구축',
            en: 'SI / New Build',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Visual Studio Code', 'Figma', 'HTML', 'SCSS'],
        introduction: {
            ko: 'SCM 신규 구축에서 퍼블리싱을 전담하며 공통 UI 재사용 체계를 적용해 생산성을 높였습니다.',
            en: 'Owned publishing for a new SCM build and improved productivity through reusable UI patterns.',
        },
        myWorks: [
            {
                ko: '공통 UI 요소 체계화 및 재사용 구조 반영',
                en: 'Organized reusable shared UI elements',
            },
            {
                ko: '컴포넌트 기반 퍼블리싱 수행',
                en: 'Implemented component-based publishing',
            },
            {
                ko: '유지보수/확장성 고려한 마크업 설계',
                en: 'Designed markup for maintainability and scalability',
            },
        ],
        achievements: [
            {
                ko: '전체 퍼블리싱 공수 약 60% 절감',
                en: 'Reduced publishing effort by about 60%',
            },
        ],
        points: [
            {
                ko: '재사용 중심 퍼블리싱',
                en: 'Reuse-oriented publishing',
            },
            {
                ko: '일정 단축 기여',
                en: 'Delivery acceleration',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'SCSS'],
    },
    {
        id: 'scm-daeyang-board',
        category: 'renewal',
        title: {
            ko: '대양판지 SCM 리뉴얼',
            en: 'Daeyang Board SCM Renewal',
        },
        period: '2023.08~2024.01',
        type: {
            ko: 'SI / 리뉴얼',
            en: 'SI / Renewal',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Visual Studio Code', 'Figma', 'HTML', 'SCSS', 'React'],
        introduction: {
            ko: '고객/관리자 버전을 분리해 퍼블리싱하고, 관리자 화면은 React 구조에 맞게 컴포넌트화했습니다.',
            en: 'Published customer/admin versions separately and componentized admin screens for React structure.',
        },
        myWorks: [
            {
                ko: '고객 버전 HTML 퍼블리싱',
                en: 'Published customer version with HTML',
            },
            {
                ko: '관리자 버전 React 구조 컴포넌트 제작',
                en: 'Built admin components aligned with React structure',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '멀티 버전 구조 대응',
                en: 'Multi-version structure handling',
            },
            {
                ko: 'React 컴포넌트 적응력',
                en: 'React component adaptation',
            },
        ],
        pin: false,
        duration: {
            ko: '약 6개월',
            en: '~6 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'SCSS', 'React'],
    },
    {
        id: 'company-renewal-2022',
        category: 'renewal',
        title: {
            ko: '자사 홈페이지 리뉴얼 (2022)',
            en: 'Corporate Site Renewal (2022)',
        },
        period: '2022.01~2022.03',
        type: {
            ko: '내부 프로젝트',
            en: 'Internal Project',
        },
        role: {
            ko: '퍼블리싱 100%, 디자인 40%, UX 기획 25%',
            en: 'Publishing 100%, Design 40%, UX Planning 25%',
        },
        tech: ['Visual Studio Code', 'Figma', 'FileZilla', 'Whois Hosting', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '단방향 구조의 기존 홈페이지를 개선하기 위해 리뉴얼을 제안하고 기획·퍼블리싱·운영까지 수행했습니다.',
            en: 'Proposed and delivered a full renewal of the old one-way corporate site, from planning to operation.',
        },
        myWorks: [
            {
                ko: '콘텐츠 구조 기획 및 레퍼런스 리서치',
                en: 'Planned content structure and researched references',
            },
            {
                ko: 'SEO/OG 반영 퍼블리싱',
                en: 'Implemented publishing with SEO/OG considerations',
            },
            {
                ko: '호스팅 배포 및 사후 운영 관리',
                en: 'Managed hosting deployment and post-launch operations',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '브랜드 신뢰도 개선 기여',
                en: 'Contributed to improved brand trust',
            },
            {
                ko: '기획-구현-운영 일체형 수행',
                en: 'End-to-end execution from plan to operation',
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
    {
        id: 'incheon-university',
        category: 'renewal',
        title: {
            ko: '인천대학교 공과대학 홈페이지 리뉴얼',
            en: 'Incheon National University Engineering Site Renewal',
        },
        period: '2021.03~2021.04',
        type: {
            ko: 'SM / 리뉴얼',
            en: 'SM / Renewal',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Visual Studio Code', 'Adobe XD', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '홈페이지 데이터 정확성 이슈를 주도적으로 개선 제안하며 리뉴얼 퍼블리싱을 수행했습니다.',
            en: 'Handled renewal publishing while proactively improving data accuracy issues.',
        },
        myWorks: [
            {
                ko: '공과대학 홈페이지 퍼블리싱 전담',
                en: 'Owned publishing for engineering college site',
            },
            {
                ko: '데이터 정합성 검토 및 개선 제안',
                en: 'Reviewed data consistency and suggested corrections',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '주도적 문제 발견/해결',
                en: 'Proactive problem discovery and resolution',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'jQuery'],
    },
    {
        id: 'tos-renewal',
        category: 'renewal',
        title: {
            ko: 'TOS 리뉴얼',
            en: 'TOS Renewal',
        },
        period: '2021.01~2021.02',
        type: {
            ko: 'SI / 리뉴얼',
            en: 'SI / Renewal',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['eGovFrame', 'Sketch', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '태림포장 사내 주문 시스템 리뉴얼 프로젝트에서 퍼블리싱을 담당했습니다.',
            en: 'Handled publishing for the internal order system renewal at Taelim Packaging.',
        },
        myWorks: [
            {
                ko: '주문 시스템 리뉴얼 퍼블리싱',
                en: 'Published internal order system renewal screens',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '업무 시스템 퍼블리싱',
                en: 'Business system publishing',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'jQuery'],
    },
] as const;

export default data;
