export type WorkCategory = "all" | "project" | "operation" | "solution" | "renewal" | "award";

export interface WorkItem {
    id: string;
    category: Exclude<WorkCategory, "all">;
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
    { key: "all", label: { ko: "All", en: "All" } },
    { key: "project", label: { ko: "실무 프로젝트", en: "Project" } },
    { key: "operation", label: { ko: "운영 프로젝트", en: "Operation" } },
    { key: "solution", label: { ko: "자사 솔루션", en: "In-house Solution" } },
    { key: "renewal", label: { ko: "브랜딩/리뉴얼", en: "Branding/Renewal" } },
    { key: "award", label: { ko: "수상 연계 프로젝트", en: "Award-linked" } },
] as const;

export const works: WorkItem[] = [
    {
        id: "orchem-mes",
        category: "project",
        title: { ko: "오알켐 MES 리뉴얼", en: "Orchem MES Renewal" },
        period: "2026.03~",
        type: { ko: "실무 / 구축", en: "Project / Build" },
        role: { ko: "퍼블리싱, 구조 설계", en: "Publishing, Architecture" },
        tech: ["Vue 3", "SCSS", "JavaScript"],
        introduction: {
            ko: "기존 MES를 Vue 3 기반으로 개편하며 UI 퍼블리싱과 공통 컴포넌트 구조를 정리했습니다.",
            en: "Renewed legacy MES with Vue 3 and organized UI publishing with shared component architecture."
        },
        myWorks: [
            { ko: "Vue 3 기반 화면 퍼블리싱", en: "Vue 3 screen publishing" },
            { ko: "구조 통일 및 공통 컴포넌트 설계", en: "Unified structure and shared components" },
            { ko: "유지보수 가능한 스타일 구조 정리", en: "Maintainable style architecture" },
            { ko: "납품형 화면 단위 구성", en: "Delivery-ready page unit composition" }
        ],
        achievements: [],
        points: [
            { ko: "구조 현대화", en: "Modernized architecture" },
            { ko: "납품형 UI 설계", en: "Delivery-ready UI design" }
        ]
    },
    {
        id: "infra",
        category: "solution",
        title: { ko: "자사 인프라 구축", en: "In-house Infrastructure" },
        period: "2026.02~",
        type: { ko: "내부 프로젝트", en: "Internal Project" },
        role: { ko: "구조 재정비", en: "Structure Refactoring" },
        tech: ["Vue 3", "SCSS", "Pinia"],
        introduction: {
            ko: "작업 방식 표준화와 공통 구조 정리를 통해 납품 품질 기준을 정립했습니다.",
            en: "Standardized workflow and shared structure to establish quality baselines."
        },
        myWorks: [
            { ko: "개발/퍼블리싱 방식 표준화 참여", en: "Standardized dev/publishing workflow" },
            { ko: "공통 구조 정리", en: "Organized shared architecture" },
            { ko: "납품 품질 기준 정리", en: "Defined delivery quality baseline" },
            { ko: "재사용 가능한 UI 체계 개선", en: "Improved reusable UI system" }
        ],
        achievements: [],
        points: [{ ko: "표준화", en: "Standardization" }, { ko: "재사용성 향상", en: "Reusability boost" }]
    },
    {
        id: "hanon",
        category: "operation",
        title: { ko: "한온시스템 홈페이지 운영", en: "Hanon System Site Operation" },
        period: "2025.08~",
        type: { ko: "운영", en: "Operation" },
        role: { ko: "퍼블리싱 운영", en: "Publishing Operation" },
        tech: ["CSS3", "CSHTML", "JIRA"],
        introduction: {
            ko: "운영 이슈 대응과 레이아웃 안정화를 통해 서비스 신뢰도를 높였습니다.",
            en: "Improved service stability through issue handling and layout maintenance."
        },
        myWorks: [
            { ko: "운영 이슈 대응", en: "Operation issue response" },
            { ko: "레이아웃 수정 및 안정화", en: "Layout stabilization" },
            { ko: "퍼블리싱 유지보수", en: "Publishing maintenance" },
            { ko: "요청사항 반영 및 커뮤니케이션", en: "Requirement communication" }
        ],
        achievements: [
            { ko: "티켓 처리 리드타임 약 20% 단축", en: "About 20% faster ticket lead time" },
            { ko: "안정적 운영 환경 구축", en: "Built stable operation environment" }
        ],
        points: [{ ko: "운영 대응력", en: "Operation responsiveness" }, { ko: "실서비스 안정성", en: "Live service stability" }]
    },
    {
        id: "company-renewal",
        category: "renewal",
        title: { ko: "자사 홈페이지 리뉴얼", en: "Corporate Site Renewal" },
        period: "2025.07~08",
        type: { ko: "리뉴얼", en: "Renewal" },
        role: { ko: "퍼블리싱, 다국어", en: "Publishing, i18n" },
        tech: ["HTML", "SCSS", "JavaScript", "Git"],
        introduction: {
            ko: "SCSS 컴포넌트화와 다국어/SEO 구조를 반영해 유지보수 효율을 높였습니다.",
            en: "Improved maintainability with SCSS componentization and i18n/SEO structure."
        },
        myWorks: [
            { ko: "전체 퍼블리싱 수행", en: "Full publishing ownership" },
            { ko: "중복 마크업 제거", en: "Removed duplicated markup" },
            { ko: "SCSS 컴포넌트화", en: "SCSS componentization" },
            { ko: "영/베/일 다국어 구조 설계", en: "Multi-language architecture (EN/VI/JP)" },
            { ko: "SEO, SSL, OG 적용", en: "Applied SEO, SSL, OG" },
            { ko: "Git 형상관리 개선 제안", en: "Proposed Git workflow improvements" }
        ],
        achievements: [
            { ko: "유지보수 효율 40% 향상", en: "40% maintainability improvement" },
            { ko: "검색 유입 25% 증가 추산", en: "Estimated 25% search growth" }
        ],
        points: [{ ko: "브랜딩 사이트 경험", en: "Branding site experience" }, { ko: "다국어/SEO 운영 개선", en: "i18n/SEO operation improvement" }]
    },
    {
        id: "hanjinkal",
        category: "project",
        title: { ko: "한진칼 및 계열사 리뉴얼", en: "HanjinKAL Group Renewal" },
        period: "2025.02~07",
        type: { ko: "기업 사이트 / CMS", en: "Corporate / CMS" },
        role: { ko: "컴포넌트 커스터마이징", en: "Component Customizing" },
        tech: ["Vue", "SCSS", "ICE CMS"],
        introduction: {
            ko: "CMS 환경에 맞게 Vue 컴포넌트를 커스터마이징하고 문서/교육 체계를 구축했습니다.",
            en: "Customized Vue components for CMS and built docs/training workflow."
        },
        myWorks: [
            { ko: "Vue 컴포넌트 커스터마이징", en: "Vue component customizing" },
            { ko: "CMS 구조 대응", en: "CMS structure adaptation" },
            { ko: "개발 가이드 문서 제작", en: "Created developer guides" },
            { ko: "교육 문서 작성", en: "Prepared training docs" }
        ],
        achievements: [
            { ko: "커뮤니케이션 비용 약 30% 절감", en: "About 30% lower communication cost" },
            { ko: "운영 안정성 확보", en: "Secured operation stability" }
        ],
        points: [{ ko: "CMS 적응력", en: "CMS adaptability" }, { ko: "문서화/협업 역량", en: "Documentation & collaboration" }]
    },
    {
        id: "oms",
        category: "project",
        title: { ko: "깨끗한나라 OMS 리뉴얼", en: "Kleannara OMS Renewal" },
        period: "2024.07~2025.02",
        type: { ko: "시스템 리뉴얼", en: "System Renewal" },
        role: { ko: "전체 퍼블리싱", en: "Full Publishing" },
        tech: ["Vue", "SCSS"],
        introduction: {
            ko: "일정과 품질을 함께 관리하며 Vue 기반 시스템 UI 전반을 담당했습니다.",
            en: "Handled full Vue-based system UI with both schedule and quality ownership."
        },
        myWorks: [
            { ko: "전체 화면 퍼블리싱", en: "Published all key screens" },
            { ko: "주요 UX 개선안 반영", en: "Applied UX improvement points" },
            { ko: "구조적 화면 정리", en: "Structured screen architecture" }
        ],
        achievements: [
            { ko: "주요 화면 1개월 조기 완료", en: "Completed major screens one month early" },
            { ko: "사용자 편의성 15% 향상 추산", en: "Estimated 15% usability improvement" }
        ],
        points: [{ ko: "대형 프로젝트 대응력", en: "Large-scale delivery capability" }, { ko: "일정+품질 관리", en: "Schedule and quality balance" }]
    },
    {
        id: "robo-tms",
        category: "solution",
        title: { ko: "Robo TMS 솔루션", en: "Robo TMS Solution" },
        period: "2024.02~04",
        type: { ko: "자사 솔루션", en: "In-house Solution" },
        role: { ko: "기획/디자인/퍼블리싱", en: "Planning/Design/Publishing" },
        tech: ["Vue", "SCSS", "Figma"],
        introduction: {
            ko: "요구사항 기반 UX 재설계로 사용자 문의를 줄인 프로젝트입니다.",
            en: "Redesigned UX from requirements and reduced user inquiries."
        },
        myWorks: [
            { ko: "기획", en: "Planning" },
            { ko: "화면 설계", en: "Screen design" },
            { ko: "디자인", en: "Visual design" },
            { ko: "퍼블리싱", en: "Publishing" }
        ],
        achievements: [{ ko: "사용자 문의 25% 감소 추산", en: "Estimated 25% fewer user inquiries" }],
        points: [{ ko: "기획형 퍼블리셔 역량", en: "Planning-led publisher capability" }, { ko: "사용성 개선 사례", en: "UX improvement case" }]
    },
    {
        id: "toms",
        category: "award",
        title: { ko: "TOMS 서비스 구축", en: "TOMS Service Build" },
        period: "2021.10~12",
        type: { ko: "신규 구축", en: "New Build" },
        role: { ko: "디자인, 퍼블리싱, UX", en: "Design, Publishing, UX" },
        tech: ["HTML", "CSS", "jQuery", "Figma"],
        introduction: {
            ko: "디자인부터 UX까지 전담하여 수상으로 이어진 초기 핵심 프로젝트입니다.",
            en: "An early key project fully owned from design to UX and awarded."
        },
        myWorks: [
            { ko: "디자인", en: "Design" },
            { ko: "퍼블리싱", en: "Publishing" },
            { ko: "UX 기획", en: "UX planning" }
        ],
        achievements: [{ ko: "스마트앱어워드 2022 업무향상 부문 대상", en: "Smart App Awards 2022 Grand Prize" }],
        points: [{ ko: "수상 연계 실적", en: "Award-linked achievement" }]
    }
];
