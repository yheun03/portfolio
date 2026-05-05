export type WorkCategory = 'all' | 'project' | 'operation' | 'solution' | 'renewal' | 'award';

export interface WorkItem {
    id: string;
    category: Exclude<WorkCategory, 'all'>;
    title: { ko: string; en: string };
    period: string;
    type: { ko: string; en: string };
    role: { ko: string; en: string };
    tech: string[];
    introduction: { ko: string; en: string };
    myWorks: { ko: string; en: string }[];
    achievements: { ko: string; en: string }[];
    points: { ko: string; en: string }[];
}

export const workCategories = [
    { key: 'all', label: { ko: 'All', en: 'All' } },
    { key: 'project', label: { ko: '실무 프로젝트', en: 'Project' } },
    { key: 'operation', label: { ko: '운영 프로젝트', en: 'Operation' } },
    { key: 'solution', label: { ko: '자사 솔루션', en: 'In-house Solution' } },
    { key: 'renewal', label: { ko: '브랜딩/리뉴얼', en: 'Branding/Renewal' } },
    { key: 'award', label: { ko: '수상 연계 프로젝트', en: 'Award-linked' } },
] as const;

export const works: WorkItem[] = [
    {
        id: 'orchem-mes',
        category: 'project',
        title: { ko: '오알켐 MES 리뉴얼', en: 'Orchem MES Renewal' },
        period: '2026.03~',
        type: { ko: '실무 / 구축', en: 'Project / Build' },
        role: { ko: '퍼블리싱, 구조 설계', en: 'Publishing, Architecture' },
        tech: ['Vue 3', 'SCSS', 'JavaScript'],
        introduction: {
            ko: '기존 MES를 Vue 3 기반으로 개편하며 UI 퍼블리싱과 공통 컴포넌트 구조를 정리했습니다.',
            en: 'Renewed legacy MES with Vue 3 and organized UI publishing with shared component architecture.',
        },
        myWorks: [
            { ko: 'Vue 3 기반 화면 퍼블리싱', en: 'Vue 3 screen publishing' },
            { ko: '구조 통일 및 공통 컴포넌트 설계', en: 'Unified structure and shared components' },
            { ko: '유지보수 가능한 스타일 구조 정리', en: 'Maintainable style architecture' },
            { ko: '납품형 화면 단위 구성', en: 'Delivery-ready page unit composition' },
        ],
        achievements: [],
        points: [
            { ko: '구조 현대화', en: 'Modernized architecture' },
            { ko: '납품형 UI 설계', en: 'Delivery-ready UI design' },
        ],
    },
    {
        id: 'infra',
        category: 'solution',
        title: { ko: '자사 인프라 구축', en: 'In-house Infrastructure' },
        period: '2026.02~',
        type: { ko: '내부 프로젝트', en: 'Internal Project' },
        role: { ko: '구조 재정비', en: 'Structure Refactoring' },
        tech: ['Vue 3', 'SCSS', 'Pinia'],
        introduction: {
            ko: '작업 방식 표준화와 공통 구조 정리를 통해 납품 품질 기준을 정립했습니다.',
            en: 'Standardized workflow and shared structure to establish quality baselines.',
        },
        myWorks: [
            { ko: '개발/퍼블리싱 방식 표준화 참여', en: 'Standardized dev/publishing workflow' },
            { ko: '공통 구조 정리', en: 'Organized shared architecture' },
            { ko: '납품 품질 기준 정리', en: 'Defined delivery quality baseline' },
            { ko: '재사용 가능한 UI 체계 개선', en: 'Improved reusable UI system' },
        ],
        achievements: [],
        points: [
            { ko: '표준화', en: 'Standardization' },
            { ko: '재사용성 향상', en: 'Reusability boost' },
        ],
    },
    {
        id: 'hanon',
        category: 'operation',
        title: { ko: '한온시스템 홈페이지 운영', en: 'Hanon Systems Website Operation' },
        period: '2025.07~',
        type: { ko: 'SM 운영', en: 'SM Operation' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Rider', 'Teams', 'JIRA', 'C#', 'CSS3', 'CSHTML'],
        introduction: {
            ko: '한온시스템 홈페이지 운영에서 Jira 티켓 기반으로 정보 수정, 레이아웃 변경, 최신화 작업을 수행하며 서비스 안정성을 높였습니다.',
            en: 'Handled Jira ticket-based content updates and layout fixes for Hanon Systems website operation.',
        },
        myWorks: [
            { ko: '티켓 기반 요청사항 분석 및 대응', en: 'Ticket-based request analysis and response' },
            { ko: '타이틀/콘텐츠 정보 수정 및 최신화', en: 'Title/content updates and maintenance' },
            { ko: '레이아웃 변경 및 퍼블리싱 유지보수', en: 'Layout changes and publishing maintenance' },
            { ko: '협업사와 운영 커뮤니케이션 수행', en: 'Operational communication with partner teams' },
        ],
        achievements: [
            { ko: '요청 반영 리드타임 단축', en: 'Reduced request turnaround time' },
            { ko: '서비스 정보 최신성 및 안정성 유지', en: 'Maintained content freshness and service stability' },
        ],
        points: [
            { ko: '운영 대응력', en: 'Operational responsiveness' },
            { ko: '티켓 기반 유지보수 체계', en: 'Ticket-driven maintenance workflow' },
        ],
    },
    {
        id: 'company-renewal',
        category: 'renewal',
        title: { ko: '자사 홈페이지 리뉴얼', en: 'Corporate Site Renewal' },
        period: '2025.07~2025.08',
        type: { ko: '내부 프로젝트', en: 'Internal Project' },
        role: { ko: '퍼블리싱 100%, UI 개선 50%, 콘텐츠 기획 30%', en: 'Publishing 100%, UI Improvement 50%, Content Planning 30%' },
        tech: ['Visual Studio Code', 'Figma', 'FileZilla', 'Whois Hosting', 'HTML', 'SCSS', 'JavaScript', 'jQuery'],
        introduction: {
            ko: '구조 복잡성과 정보 최신화 이슈를 해소하기 위해 전면 리뉴얼을 기획/수행하고, 다국어 및 웹 표준 대응까지 확장했습니다.',
            en: 'Led full-site renewal to solve structure/content issues and expanded i18n and modern web-standard support.',
        },
        myWorks: [
            { ko: '중복 마크업 및 불필요 요소 제거', en: 'Removed duplicated markup and unnecessary elements' },
            { ko: 'SCSS 컴포넌트 구조 도입', en: 'Introduced SCSS component architecture' },
            { ko: '영문/베트남어 다국어 구조 설계 및 구현', en: 'Designed and implemented EN/VI i18n structure' },
            { ko: '콘텐츠 최신화 및 일부 페이지 구성 기획 참여', en: 'Updated content and contributed to page content planning' },
            { ko: 'SEO/OG/접근성/반응형/SSL 기준 적용', en: 'Applied SEO/OG/a11y/responsive/SSL standards' },
        ],
        achievements: [
            { ko: '유지보수성과 개발 효율 개선', en: 'Improved maintainability and development efficiency' },
            { ko: '글로벌 전시 대응을 위한 다국어 기반 확보', en: 'Established multilingual foundation for global event readiness' },
        ],
        points: [
            { ko: '브랜딩/정보 신뢰도 개선', en: 'Brand trust and information reliability improvement' },
            { ko: '다국어 및 웹 표준 대응', en: 'Multilingual and web-standard readiness' },
        ],
    },
    {
        id: 'kyungdongwon-cms',
        category: 'renewal',
        title: { ko: '경동원 CMS 리뉴얼', en: 'Kyungdongwon CMS Renewal' },
        period: '2025.07',
        type: { ko: 'SI / CMS', en: 'SI / CMS' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['WebSquare SP5', 'XML', 'CSS3'],
        introduction: {
            ko: '인원 공백 대응을 위해 단기 투입되어 기존 화면 오류를 수정하고 신규 페이지를 제작했습니다.',
            en: 'Joined as a short-term backup to fix existing screen issues and build new pages in CMS.',
        },
        myWorks: [
            { ko: '기존 화면 디테일 오류 수정', en: 'Fixed detailed issues in existing screens' },
            { ko: '신규 페이지 퍼블리싱', en: 'Published new pages' },
            { ko: 'CMS 구조 적응 및 빠른 온보딩', en: 'Adapted quickly to CMS structure' },
        ],
        achievements: [],
        points: [
            { ko: '단기 투입 대응력', en: 'Short-term ramp-up capability' },
            { ko: 'CMS 퍼블리싱 안정화', en: 'CMS publishing stabilization' },
        ],
    },
    {
        id: 'hanjinkal',
        category: 'project',
        title: { ko: '한진칼 및 계열사 리뉴얼', en: 'HANJIN KAL and Affiliates Renewal' },
        period: '2025.02~07',
        type: { ko: '기업 사이트 / CMS', en: 'Corporate / CMS' },
        role: { ko: '교육지원 80%, 운영 안정화 80%, 협업 커뮤니케이션 40%', en: 'Education Support 80%, Stability 80%, Collaboration 40%' },
        tech: ['IntelliJ', 'ICE 5.0', 'Microsoft Teams', 'Word', 'PowerPoint', 'HTML', 'SCSS', 'Vue.js'],
        introduction: {
            ko: 'Vue 컴포넌트를 ICE CMS 구조에 맞게 재구성하고, 가이드 문서/교육 체계를 구축해 프로젝트 운영 안정성을 높였습니다.',
            en: 'Adapted Vue components to ICE CMS and built guides/training materials to improve delivery stability.',
        },
        myWorks: [
            { ko: 'ICE CMS 요구사항 기반 파일 구조 설계', en: 'Designed file structure for ICE CMS requirements' },
            { ko: 'Vue 컴포넌트의 CMS 친화형 변환/개선', en: 'Converted Vue components for CMS compatibility' },
            { ko: '개발/환경세팅 가이드 직접 기획·제작', en: 'Planned and produced dev/environment setup guides' },
            { ko: '대외 커뮤니케이션 및 산출물 정리 주도', en: 'Led external communication and deliverable alignment' },
        ],
        achievements: [
            { ko: '커뮤니케이션 혼선 완화 및 대응 속도 개선', en: 'Reduced communication confusion and improved response speed' },
            { ko: '운영 안정성 및 협업 효율 향상', en: 'Improved operational stability and collaboration efficiency' },
        ],
        points: [
            { ko: 'CMS 적응력', en: 'CMS adaptability' },
            { ko: '문서화/교육/협업 역량', en: 'Documentation, training, and collaboration' },
        ],
    },
    {
        id: 'fems',
        category: 'renewal',
        title: { ko: 'FEMS 리뉴얼', en: 'FEMS Renewal' },
        period: '2024.11',
        type: { ko: 'SI / 단기 납품', en: 'SI / Rapid Delivery' },
        role: { ko: '퍼블리싱 50%', en: 'Publishing 50%' },
        tech: ['Visual Studio Code', 'Figma', 'HTML', 'SCSS', 'React.js'],
        introduction: {
            ko: '급한 납품 일정에 맞춰 React 기반 주요 화면을 단기간에 구현한 프로젝트입니다.',
            en: 'Delivered key React-based screens within a tight timeline for urgent release needs.',
        },
        myWorks: [
            { ko: '우선 구현 대상 페이지 단기 구축', en: 'Built priority pages in a short timeframe' },
            { ko: '일정 내 품질 확보 중심 퍼블리싱', en: 'Maintained quality under strict schedule constraints' },
        ],
        achievements: [{ ko: '1주 내 주요 화면 구현 지원', en: 'Supported key screen delivery within one week' }],
        points: [
            { ko: '단기 납품 대응력', en: 'Rapid delivery capability' },
            { ko: 'React 퍼블리싱 경험', en: 'React publishing experience' },
        ],
    },
    {
        id: 'oms',
        category: 'project',
        title: { ko: '깨끗한나라 OMS 리뉴얼', en: 'KleanNara OMS Renewal' },
        period: '2024.07~2025.02',
        type: { ko: '시스템 리뉴얼', en: 'System Renewal' },
        role: { ko: '전체 퍼블리싱', en: 'Full Publishing' },
        tech: ['Vue', 'SCSS'],
        introduction: {
            ko: '일정과 품질을 함께 관리하며 Vue 기반 시스템 UI 전반을 담당했습니다.',
            en: 'Handled full Vue-based system UI with both schedule and quality ownership.',
        },
        myWorks: [
            { ko: '전체 화면 퍼블리싱', en: 'Published all key screens' },
            { ko: '주요 UX 개선안 반영', en: 'Applied UX improvement points' },
            { ko: '구조적 화면 정리', en: 'Structured screen architecture' },
            { ko: 'Vue 기반 컴포넌트 개발 참여', en: 'Contributed to Vue-based component development' },
        ],
        achievements: [
            { ko: '주요 화면 1개월 조기 완료', en: 'Completed major screens one month early' },
            { ko: '사용자 편의성 15% 향상 추산', en: 'Estimated 15% usability improvement' },
        ],
        points: [
            { ko: '대형 프로젝트 대응력', en: 'Large-scale delivery capability' },
            { ko: '일정+품질 관리', en: 'Schedule and quality balance' },
        ],
    },
    {
        id: 'scm-daeyang-paper',
        category: 'renewal',
        title: { ko: '대양제지 SCM 리뉴얼', en: 'Daeyang Paper SCM Renewal' },
        period: '2024.05~2024.06',
        type: { ko: 'SI / 신규 구축', en: 'SI / New Build' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Visual Studio Code', 'Figma', 'HTML', 'SCSS'],
        introduction: {
            ko: 'SCM 신규 구축에서 퍼블리싱을 전담하며 공통 UI 재사용 체계를 적용해 생산성을 높였습니다.',
            en: 'Owned publishing for a new SCM build and improved productivity through reusable UI patterns.',
        },
        myWorks: [
            { ko: '공통 UI 요소 체계화 및 재사용 구조 반영', en: 'Organized reusable shared UI elements' },
            { ko: '컴포넌트 기반 퍼블리싱 수행', en: 'Implemented component-based publishing' },
            { ko: '유지보수/확장성 고려한 마크업 설계', en: 'Designed markup for maintainability and scalability' },
        ],
        achievements: [{ ko: '전체 퍼블리싱 공수 약 60% 절감', en: 'Reduced publishing effort by about 60%' }],
        points: [
            { ko: '재사용 중심 퍼블리싱', en: 'Reuse-oriented publishing' },
            { ko: '일정 단축 기여', en: 'Delivery acceleration' },
        ],
    },
    {
        id: 'robo-tms',
        category: 'solution',
        title: { ko: 'Robo TMS 솔루션', en: 'Robo TMS Solution' },
        period: '2024.02~04',
        type: { ko: '자사 솔루션', en: 'In-house Solution' },
        role: { ko: '기획/디자인/퍼블리싱', en: 'Planning/Design/Publishing' },
        tech: ['Vue', 'SCSS', 'Figma'],
        introduction: {
            ko: '요구사항 기반 UX 재설계로 사용자 문의를 줄인 프로젝트입니다.',
            en: 'Redesigned UX from requirements and reduced user inquiries.',
        },
        myWorks: [
            { ko: '기획', en: 'Planning' },
            { ko: '화면 설계', en: 'Screen design' },
            { ko: '디자인', en: 'Visual design' },
            { ko: '퍼블리싱', en: 'Publishing' },
        ],
        achievements: [{ ko: '사용자 문의 25% 감소 추산', en: 'Estimated 25% fewer user inquiries' }],
        points: [
            { ko: '기획형 퍼블리셔 역량', en: 'Planning-led publisher capability' },
            { ko: '사용성 개선 사례', en: 'UX improvement case' },
        ],
    },
    {
        id: 'scm-daeyang-board',
        category: 'renewal',
        title: { ko: '대양판지 SCM 리뉴얼', en: 'Daeyang Board SCM Renewal' },
        period: '2023.08~2024.01',
        type: { ko: 'SI / 리뉴얼', en: 'SI / Renewal' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Visual Studio Code', 'Figma', 'HTML', 'SCSS', 'React'],
        introduction: {
            ko: '고객/관리자 버전을 분리해 퍼블리싱하고, 관리자 화면은 React 구조에 맞게 컴포넌트화했습니다.',
            en: 'Published customer/admin versions separately and componentized admin screens for React structure.',
        },
        myWorks: [
            { ko: '고객 버전 HTML 퍼블리싱', en: 'Published customer version with HTML' },
            { ko: '관리자 버전 React 구조 컴포넌트 제작', en: 'Built admin components aligned with React structure' },
        ],
        achievements: [],
        points: [
            { ko: '멀티 버전 구조 대응', en: 'Multi-version structure handling' },
            { ko: 'React 컴포넌트 적응력', en: 'React component adaptation' },
        ],
    },
    {
        id: 'tms-maintenance',
        category: 'operation',
        title: { ko: 'TMS 보수', en: 'TMS Maintenance' },
        period: '2023.07',
        type: { ko: 'SM 보수', en: 'SM Maintenance' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Nexacro'],
        introduction: {
            ko: '반복 이슈 리포트를 기반으로 UX/UI를 개선하고 넥사크로 기반 보수 작업을 수행했습니다.',
            en: 'Improved UX/UI based on recurring issue reports and delivered Nexacro maintenance.',
        },
        myWorks: [
            { ko: '반복 이슈 분석 및 개선 적용', en: 'Analyzed recurring issues and applied improvements' },
            { ko: '심플한 UI로 보수 화면 개선', en: 'Refined maintenance screens with cleaner UI' },
        ],
        achievements: [],
        points: [
            { ko: '운영 개선형 퍼블리싱', en: 'Operations-focused publishing' },
            { ko: '문제 재발 방지 관점 적용', en: 'Recurrence prevention perspective' },
        ],
    },
    {
        id: 'tms-operation',
        category: 'operation',
        title: { ko: 'TMS 운영', en: 'TMS Operation' },
        period: '2023.05~2023.06',
        type: { ko: 'SM 운영', en: 'SM Operation' },
        role: { ko: '이슈 보고서 작성 100%', en: 'Issue Reporting 100%' },
        tech: ['Nexacro'],
        introduction: {
            ko: '속도 저하와 화면 오류 이슈를 분석·분류해 고객 불편사항 대응 체계를 정비했습니다.',
            en: 'Analyzed performance and screen issues and structured a responsive customer support workflow.',
        },
        myWorks: [
            { ko: '단위 테스트 기반 원인 구간 식별', en: 'Identified root areas through unit-level testing' },
            { ko: '이슈 산출물 제작 및 케이스 정리', en: 'Created issue artifacts and case documentation' },
            { ko: '고객사 즉시 응대 및 개발팀 연계', en: 'Handled immediate response and dev-team escalation' },
        ],
        achievements: [{ ko: '일 평균 불편 접수 15건 이상에서 2건 수준으로 감소', en: 'Reduced average daily complaints from 15+ to around 2' }],
        points: [
            { ko: '운영 대응 프로세스 정립', en: 'Operational response process setup' },
            { ko: '문제 분석/보고 역량', en: 'Issue analysis and reporting capability' },
        ],
    },
    {
        id: 'robo-mes',
        category: 'solution',
        title: { ko: 'Robo MES 솔루션 개발', en: 'Robo MES Solution Development' },
        period: '2022.08~2023.04',
        type: { ko: '자사 솔루션', en: 'In-house Solution' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['WebSquare', 'Figma', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '스마트팩토리 MES 경험을 바탕으로 자사 Robo MES 솔루션을 모듈형 컴포넌트 중심으로 구축했습니다.',
            en: 'Built Robo MES based on smart-factory MES experience with modular component architecture.',
        },
        myWorks: [
            { ko: '모듈 단위 UI 컴포넌트 구축', en: 'Built module-level UI components' },
            { ko: '전체 퍼블리싱 전담 및 구조 고도화', en: 'Owned full publishing and improved structural consistency' },
        ],
        achievements: [{ ko: '퍼블리싱 공수 약 40% 절감', en: 'Reduced publishing effort by about 40%' }],
        points: [
            { ko: '솔루션 제품화 경험', en: 'Solution productization experience' },
            { ko: '모듈화 기반 생산성 향상', en: 'Productivity gains through modularization' },
        ],
    },
    {
        id: 'company-renewal-2022',
        category: 'renewal',
        title: { ko: '자사 홈페이지 리뉴얼 (2022)', en: 'Corporate Site Renewal (2022)' },
        period: '2022.01~2022.03',
        type: { ko: '내부 프로젝트', en: 'Internal Project' },
        role: { ko: '퍼블리싱 100%, 디자인 40%, UX 기획 25%', en: 'Publishing 100%, Design 40%, UX Planning 25%' },
        tech: ['Visual Studio Code', 'Figma', 'FileZilla', 'Whois Hosting', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '단방향 구조의 기존 홈페이지를 개선하기 위해 리뉴얼을 제안하고 기획·퍼블리싱·운영까지 수행했습니다.',
            en: 'Proposed and delivered a full renewal of the old one-way corporate site, from planning to operation.',
        },
        myWorks: [
            { ko: '콘텐츠 구조 기획 및 레퍼런스 리서치', en: 'Planned content structure and researched references' },
            { ko: 'SEO/OG 반영 퍼블리싱', en: 'Implemented publishing with SEO/OG considerations' },
            { ko: '호스팅 배포 및 사후 운영 관리', en: 'Managed hosting deployment and post-launch operations' },
        ],
        achievements: [],
        points: [
            { ko: '브랜드 신뢰도 개선 기여', en: 'Contributed to improved brand trust' },
            { ko: '기획-구현-운영 일체형 수행', en: 'End-to-end execution from plan to operation' },
        ],
    },
    {
        id: 'toms',
        category: 'award',
        title: { ko: 'TOMS 서비스 구축', en: 'TOMS Service Build' },
        period: '2021.10~12',
        type: { ko: '신규 구축', en: 'New Build' },
        role: { ko: '디자인, 퍼블리싱, UX', en: 'Design, Publishing, UX' },
        tech: ['HTML', 'CSS', 'jQuery', 'Figma'],
        introduction: {
            ko: '디자인부터 UX까지 전담하여 수상으로 이어진 초기 핵심 프로젝트입니다.',
            en: 'An early key project fully owned from design to UX and awarded.',
        },
        myWorks: [
            { ko: '디자인', en: 'Design' },
            { ko: '퍼블리싱', en: 'Publishing' },
            { ko: 'UX 기획', en: 'UX planning' },
        ],
        achievements: [{ ko: '스마트앱어워드 2022 업무향상 부문 대상', en: 'Smart App Awards 2022 Grand Prize' }],
        points: [{ ko: '수상 연계 실적', en: 'Award-linked achievement' }],
    },
    {
        id: 'smart-factory-gov',
        category: 'project',
        title: { ko: '스마트팩토리 정부 사업 프로젝트', en: 'Smart Factory Government Projects' },
        period: '2021.05~2022.07',
        type: { ko: 'SI·SM', en: 'SI·SM' },
        role: { ko: '퍼블리싱 100%, 디자인 20%', en: 'Publishing 100%, Design 20%' },
        tech: ['eGovFrame', 'Adobe XD', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '다수 제조사의 MES/스마트팩토리 도입 프로젝트에서 퍼블리싱과 일부 디자인을 수행했습니다.',
            en: 'Contributed publishing and partial design across multiple MES/smart-factory adoption projects.',
        },
        myWorks: [
            { ko: '기업별 요구사항 반영 퍼블리싱', en: 'Delivered publishing tailored to each client requirement' },
            { ko: '브랜드 특성 반영 UI 커스터마이징', en: 'Customized UI to match brand characteristics' },
            { ko: 'Robo MES 솔루션화 기반 경험 축적', en: 'Built experience that later fed Robo MES productization' },
        ],
        achievements: [],
        points: [
            { ko: '다수 고객사 동시 대응', en: 'Handled multiple enterprise clients' },
            { ko: '도메인 확장형 실무 경험', en: 'Domain-scalable practical experience' },
        ],
    },
    {
        id: 'incheon-university',
        category: 'renewal',
        title: { ko: '인천대학교 공과대학 홈페이지 리뉴얼', en: 'Incheon National University Engineering Site Renewal' },
        period: '2021.03~2021.04',
        type: { ko: 'SM / 리뉴얼', en: 'SM / Renewal' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Visual Studio Code', 'Adobe XD', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '홈페이지 데이터 정확성 이슈를 주도적으로 개선 제안하며 리뉴얼 퍼블리싱을 수행했습니다.',
            en: 'Handled renewal publishing while proactively improving data accuracy issues.',
        },
        myWorks: [
            { ko: '공과대학 홈페이지 퍼블리싱 전담', en: 'Owned publishing for engineering college site' },
            { ko: '데이터 정합성 검토 및 개선 제안', en: 'Reviewed data consistency and suggested corrections' },
        ],
        achievements: [],
        points: [{ ko: '주도적 문제 발견/해결', en: 'Proactive problem discovery and resolution' }],
    },
    {
        id: 'tos-renewal',
        category: 'renewal',
        title: { ko: 'TOS 리뉴얼', en: 'TOS Renewal' },
        period: '2021.01~2021.02',
        type: { ko: 'SI / 리뉴얼', en: 'SI / Renewal' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['eGovFrame', 'Sketch', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '태림포장 사내 주문 시스템 리뉴얼 프로젝트에서 퍼블리싱을 담당했습니다.',
            en: 'Handled publishing for the internal order system renewal at Taelim Packaging.',
        },
        myWorks: [{ ko: '주문 시스템 리뉴얼 퍼블리싱', en: 'Published internal order system renewal screens' }],
        achievements: [],
        points: [{ ko: '업무 시스템 퍼블리싱', en: 'Business system publishing' }],
    },
    {
        id: 'kwangjang-homepage',
        category: 'project',
        title: { ko: '광장 파트너스 홈페이지', en: 'Kwangjang Partners Website' },
        period: '2020.11~2020.12',
        type: { ko: 'SI / 구축', en: 'SI / Build' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Visual Studio Code', 'Sketch', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '광장 파트너스 기업 홈페이지 구축에서 퍼블리싱을 전담했습니다.',
            en: 'Owned publishing for the Kwangjang Partners corporate website build.',
        },
        myWorks: [{ ko: '기업 홈페이지 퍼블리싱', en: 'Corporate website publishing' }],
        achievements: [],
        points: [{ ko: '초기 실무 구축 경험', en: 'Early-stage production build experience' }],
    },
    {
        id: 'hama-app',
        category: 'project',
        title: { ko: '하마 애플리케이션', en: 'Hama Application' },
        period: '2020.09~2020.10',
        type: { ko: 'SI / 구축', en: 'SI / Build' },
        role: { ko: '퍼블리싱 100%', en: 'Publishing 100%' },
        tech: ['Visual Studio Code', 'Sketch', 'HTML', 'CSS', 'JavaScript'],
        introduction: {
            ko: '부동산 건축 서비스 애플리케이션을 퍼블리싱하고 웹앱 형태로 빌드했습니다.',
            en: 'Published a real-estate/construction service application and built it as a web app.',
        },
        myWorks: [
            { ko: '서비스 애플리케이션 퍼블리싱', en: 'Published service application screens' },
            { ko: '웹앱 형태 빌드 적용', en: 'Applied web-app build format' },
        ],
        achievements: [],
        points: [{ ko: '앱형 웹 구축 경험', en: 'App-like web implementation experience' }],
    },
];
