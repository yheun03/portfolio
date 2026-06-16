const data = [
    {
        id: 'samhwa-eco-dashboard',
        category: 'project',
        title: {
            ko: '삼화페인트 생태공장 대시보드',
            en: 'Samhwa Paint Eco-factory Dashboard',
        },
        period: '2026.05',
        type: {
            ko: 'SI / 대시보드',
            en: 'SI / Dashboard',
        },
        role: {
            ko: '퍼블리싱 100%, UI 개선 50%',
            en: 'Publishing 100%, UI Improvement 50%',
        },
        tech: ['Visual Studio Code', 'Git', 'Vue', 'JavaScript', 'SCSS', 'HTML'],
        introduction: {
            ko: '운영자가 공정·환경 데이터를 한 화면에서 빠르게 확인하는 생태공장 대시보드입니다. Client 화면 퍼블리싱을 전담하면서, 카드·상태 표시·차트·정보성 UI가 제각각이던 화면을 하나의 시각 규칙으로 묶어 "보기 좋은 화면"이 아니라 "빠르게 읽히는 화면"을 목표로 정리했습니다.',
            en: 'An eco-factory dashboard where operators scan process and environmental data at a glance. I owned the client-side publishing and unified inconsistent cards, status indicators, charts, and informational UI under one visual rule—aiming not for a pretty screen but for one that reads fast.',
        },
        myWorks: [
            {
                ko: '대시보드 Client 화면 전체 퍼블리싱 — 카드, 데이터 영역, 상태 표시, 차트, 정보성 UI',
                en: 'Published all client dashboard screens—cards, data areas, status indicators, charts, and informational UI',
            },
            {
                ko: '화면별로 흩어져 있던 위계·간격·정렬 기준을 통일해 일관된 카드형 레이아웃 정립',
                en: 'Unified scattered hierarchy, spacing, and alignment rules into a consistent card-based layout',
            },
            {
                ko: '정상·경고 등 상태 표현을 색·라벨 규칙으로 정리해 데이터 판독성 강화',
                en: 'Codified normal/warning states into color and label rules to make data easier to read',
            },
            {
                ko: '차트·수치 영역의 반응형 대응으로 다양한 해상도에서 가독성 유지',
                en: 'Kept charts and metric areas readable across resolutions with responsive handling',
            },
            {
                ko: '기존 화면의 불규칙한 스타일을 정리하며 UI 개선(50%)을 함께 수행',
                en: 'Improved the existing UI (50%) while cleaning up irregular styles',
            },
        ],
        achievements: [
            {
                ko: '정보 가독성과 UI 일관성을 개선해 운영자의 데이터 확인 속도 향상',
                en: 'Improved readability and UI consistency so operators read data faster',
            },
            {
                ko: '카드 레이아웃·상태 표현 규칙을 표준화해 신규 위젯 추가 시 재사용 가능',
                en: 'Standardized card layouts and status rules so new widgets can reuse them',
            },
        ],
        points: [
            {
                ko: '데이터 중심 대시보드 UI',
                en: 'Data-focused dashboard UI',
            },
            {
                ko: '상태·위계 시각화 규칙 정립',
                en: 'Status and hierarchy visualization rules',
            },
            {
                ko: '짧은 기간에 화면 일관성 확보',
                en: 'Screen consistency in a short timeframe',
            },
        ],
        pin: true,
        duration: {
            ko: '약 1개월',
            en: '~1 month',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue', 'JavaScript', 'SCSS', 'HTML'],
    },
    {
        id: 'orchem-mes',
        category: 'project',
        title: {
            ko: '오알켐 MES 리뉴얼',
            en: 'Orchem MES Renewal',
        },
        period: '2026.03~',
        type: {
            ko: '실무 / 구축',
            en: 'Project / Build',
        },
        role: {
            ko: '퍼블리싱 100%, UI 컴포넌트 구조 개선 70%, 화면 구조 설계 50%',
            en: 'Publishing 100%, UI component structure 70%, screen architecture 50%',
        },
        tech: ['Vue 3', 'Vite', 'JavaScript', 'SCSS', 'HTML', 'Vue Router', 'Pinia', 'Axios', 'Vue I18n', 'AG Grid', 'Chart.js', 'flatpickr', 'marked'],
        introduction: {
            ko: 'Vue 3 + Vite 기반으로 제조 현장의 MES를 리뉴얼한 프로젝트입니다. Vue Router·Pinia·Axios·Vue I18n로 짜인 구조 위에 업무 화면을 퍼블리싱하면서, 반복되던 화면을 공통 컴포넌트로 묶고 AG Grid 기반 테이블 UX와 태블릿 사용성을 함께 끌어올렸습니다.',
            en: 'A shop-floor MES renewal on Vue 3 + Vite. On top of a Vue Router / Pinia / Axios / Vue I18n structure, I published the work screens while consolidating repeated layouts into shared components and raising both AG Grid table UX and tablet usability.',
        },
        myWorks: [
            {
                ko: 'Vue Router·Pinia·Axios·Vue I18n 구조에 맞춰 MES 업무 화면 퍼블리싱·구성',
                en: 'Published and structured MES work screens to fit the Vue Router / Pinia / Axios / Vue I18n setup',
            },
            {
                ko: '공통 컴포넌트(AppGrid·AppInput·AppSelect·AppButton·AppAccordion·AppModalHost)를 활용·개선해 화면 간 UI 일관성 확보',
                en: 'Used and improved shared components (AppGrid, AppInput, AppSelect, AppButton, AppAccordion, AppModalHost) for cross-screen consistency',
            },
            {
                ko: '원재료 준비·중간 검사·검사 결과·태블릿 화면의 레이아웃과 인터랙션 개선',
                en: 'Improved layouts and interactions for material prep, intermediate inspection, inspection results, and tablet screens',
            },
            {
                ko: 'AG Grid 검색·선택·삭제·칩 렌더링·조건부 스타일·엑셀 다운로드·행/헤더 높이까지 테이블 동작 정리',
                en: 'Organized AG Grid behavior—search, selection, deletion, chip rendering, conditional styling, Excel export, and row/header heights',
            },
            {
                ko: '태블릿 환경의 버튼·카드·아코디언·그리드 반응형·터치 UI 개선',
                en: 'Refined responsive and touch UI for buttons, cards, accordions, and grids on tablets',
            },
            {
                ko: 'API 응답·다국어 키를 안정적으로 반영하도록 props·상태값·이벤트 처리 구조 정리',
                en: 'Tidied props, state, and event handling so API responses and i18n keys bind reliably',
            },
        ],
        achievements: [
            {
                ko: '반복되는 MES 화면을 공통 컴포넌트 중심으로 정리해 유지보수성 향상',
                en: 'Improved maintainability by centering repeated MES screens on shared components',
            },
            {
                ko: 'AG Grid 테이블의 검색·선택·렌더·다운로드 구조를 표준화해 프로젝트 전반의 확장성·재사용성 확보',
                en: 'Standardized AG Grid search/selection/render/download patterns, raising scalability and reuse project-wide',
            },
            {
                ko: '퍼블리싱과 프론트엔드 개발 사이 연결성을 높여 협업 효율 개선',
                en: 'Tightened the seam between publishing and frontend development for smoother collaboration',
            },
        ],
        points: [
            {
                ko: 'AG Grid 테이블 UX 표준화',
                en: 'AG Grid table UX standardization',
            },
            {
                ko: '태블릿 업무 UI 대응',
                en: 'Tablet workflow UI',
            },
            {
                ko: 'Vue 3 + Vite 구조 연동',
                en: 'Vue 3 + Vite integration',
            },
        ],
        pin: true,
        duration: {
            ko: '진행 중 · 약 3개월~',
            en: 'Ongoing · ~3+ months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue 3', 'Vite', 'JavaScript', 'SCSS', 'AG Grid'],
    },
    {
        id: 'hanjinkal',
        category: 'project',
        title: {
            ko: '한진칼 및 계열사 리뉴얼',
            en: 'HANJIN KAL and Affiliates Renewal',
        },
        period: '2025.02~07',
        type: {
            ko: '기업 사이트 / CMS',
            en: 'Corporate / CMS',
        },
        role: {
            ko: '문서화·교육 지원 80%, 운영 안정화 80%, 협업 커뮤니케이션 40%',
            en: 'Documentation/training 80%, stability 80%, collaboration 40%',
        },
        tech: ['IntelliJ', 'ICE 5.0', 'Microsoft Teams', 'Word', 'PowerPoint', 'HTML', 'SCSS', 'Vue.js'],
        introduction: {
            ko: '한진칼과 계열사 홈페이지를 리뉴얼하며, 콘센트릭스 퍼블리싱팀이 전달한 Vue 컴포넌트를 아이온커뮤니케이션즈의 ICE 5.0 CMS 구조에 맞게 커스터마이징한 프로젝트입니다. 공식 가이드가 없어 교육 단계에서 혼선이 생기자, 컴포넌트 개발 구조와 ICE 환경 세팅 가이드를 직접 만들어 협력사·고객사에 공유했고, ICE 담당자 롤아웃 이후에는 대외 커뮤니케이션을 전담했습니다.',
            en: 'A renewal of the HANJIN KAL group sites where I customized Concentrix-built Vue components to fit iontech ICE 5.0 CMS. With no official guide, training caused confusion—so I authored a component-development and ICE-setup guide myself and shared it with the partner and client, then owned external communication after the ICE engineer rolled off.',
        },
        myWorks: [
            {
                ko: '콘센트릭스가 전달한 Vue 컴포넌트를 ICE 5.0 CMS 구조에 맞게 커스터마이징·재구성',
                en: 'Customized and restructured Concentrix-delivered Vue components for the ICE 5.0 CMS',
            },
            {
                ko: 'ICE가 요구하는 파일 구조를 직접 설계하고, 컴포넌트를 재사용·확장 가능한 CMS 친화형으로 변환',
                en: 'Designed the ICE-required file structure and converted components into a reusable, extensible CMS-friendly form',
            },
            {
                ko: '공식 가이드 부재로 생긴 교육 혼선을 해소하기 위해 개발 구조·ICE 세팅 가이드를 직접 기획·제작해 콘센트릭스·한진칼에 공유',
                en: 'Authored a development-structure and ICE-setup guide to resolve training confusion and shared it with Concentrix and HANJIN KAL',
            },
            {
                ko: 'ICE 내부 기능 미비로 발생한 이슈를 ICE 담당자와 지속 커뮤니케이션하며 해결 속도 단축',
                en: 'Cut issue-resolution time by communicating continuously with the ICE engineer about CMS limitations',
            },
            {
                ko: '퍼블리싱 가이드를 유지하면서 다양한 디바이스 대응 마크업·스타일링을 주도적으로 수정·적용',
                en: 'Proactively adapted markup and styling for multiple devices while preserving the publishing guide',
            },
            {
                ko: '2025.04 ICE 담당자 롤아웃 이후 대외 커뮤니케이션 전담, 내부 산출물 정리·공유로 협업 효율 유지',
                en: 'Took over external communication after the April 2025 ICE roll-off, keeping collaboration efficient through organized deliverables',
            },
        ],
        achievements: [
            {
                ko: '가이드·산출물 정리로 교육·협업 혼선을 줄여 커뮤니케이션 비용 약 30% 절감 추산',
                en: 'Estimated ~30% lower communication cost by reducing training and collaboration friction with guides and clean deliverables',
            },
            {
                ko: 'ICE 기능 한계 상황에서도 컴포넌트 재사용·확장 구조를 확보해 운영 안정성 향상',
                en: 'Secured reusable, extensible component structure despite CMS limitations, improving operational stability',
            },
            {
                ko: '협력사(콘센트릭스·아이온)–고객사(한진칼) 사이를 잇는 커뮤니케이션 허브 역할 수행',
                en: 'Acted as the communication hub between partners (Concentrix, iontech) and the client (HANJIN KAL)',
            },
        ],
        points: [
            {
                ko: 'CMS 커스터마이징 적응력',
                en: 'CMS customization adaptability',
            },
            {
                ko: '가이드·문서화·교육 주도',
                en: 'Led guides, documentation, and training',
            },
            {
                ko: '다자 협업 커뮤니케이션',
                en: 'Multi-party collaboration',
            },
        ],
        pin: true,
        duration: {
            ko: '약 6개월',
            en: '~6 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'SCSS', 'Vue'],
    },
    {
        id: 'oms',
        category: 'project',
        title: {
            ko: '깨끗한나라 OMS 리뉴얼',
            en: 'KleanNara OMS Renewal',
        },
        period: '2024.07~2025.02',
        type: {
            ko: '시스템 리뉴얼',
            en: 'System Renewal',
        },
        role: {
            ko: '전체 퍼블리싱 100%',
            en: 'Full Publishing 100%',
        },
        tech: ['Vue', 'SCSS', 'Figma'],
        introduction: {
            ko: '깨끗한나라 OMS 리뉴얼에서 전체 화면 퍼블리싱을 전담한 프로젝트입니다. 주어진 일정보다 빠르게 주요 화면을 끝낸 뒤, 남은 기간을 흘려보내지 않고 자발적으로 Vue 컴포넌트 개발에 참여하고 오픈 전 UI/UX 개선안을 정리해 제안했습니다. 마진·폰트 같은 디테일까지 챙기는 꼼꼼함이 강점으로 작동한 사례입니다.',
            en: 'A KleanNara OMS renewal where I owned all screen publishing. After finishing the key screens ahead of schedule, I used the remaining time to volunteer on Vue component development and to compile UI/UX improvement proposals before launch—a case where attention to detail down to margins and fonts paid off.',
        },
        myWorks: [
            {
                ko: '전체 화면을 Vue 기반으로 퍼블리싱 전담',
                en: 'Owned full Vue-based publishing across all screens',
            },
            {
                ko: '주요 화면을 약 1개월 만에 조기 완료해 일정 여유 확보',
                en: 'Completed the major screens in about a month, creating schedule slack',
            },
            {
                ko: '잔여 기간에 자발적으로 Vue 컴포넌트 개발에 참여해 프론트엔드 기여 확대',
                en: 'Volunteered on Vue component development in the remaining time to broaden frontend contribution',
            },
            {
                ko: '서비스 오픈 전 UI/UX 개선 항목을 정리해 팀장에게 제안, 일부 실제 반영',
                en: 'Compiled pre-launch UI/UX improvements for the team lead; several were adopted',
            },
            {
                ko: '세부 마진·폰트 크기까지 점검해 화면 완성도 유지',
                en: 'Checked details down to margins and font sizes to keep screen quality high',
            },
        ],
        achievements: [
            {
                ko: '주요 화면 약 1개월 조기 완료로 일정 리스크 완화',
                en: 'De-risked the schedule by finishing major screens about a month early',
            },
            {
                ko: '개선 제안 일부가 실제 반영되어 사용자 경험 향상에 기여',
                en: 'Contributed to UX gains as several improvement proposals shipped',
            },
        ],
        points: [
            {
                ko: '일정 단축과 품질을 동시 달성',
                en: 'Speed and quality together',
            },
            {
                ko: '자발적 프론트엔드 기여',
                en: 'Self-initiated frontend contribution',
            },
            {
                ko: '개선 제안형 퍼블리셔',
                en: 'Improvement-driven publisher',
            },
        ],
        pin: true,
        duration: {
            ko: '약 8개월',
            en: '~8 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue', 'SCSS'],
    },
    {
        id: 'smart-factory-gov',
        category: 'project',
        title: {
            ko: '스마트팩토리 정부 사업 프로젝트',
            en: 'Smart Factory Government Projects',
        },
        period: '2021.05~2022.07',
        type: {
            ko: 'SI·SM',
            en: 'SI·SM',
        },
        role: {
            ko: '퍼블리싱 100%, 디자인 20%',
            en: 'Publishing 100%, Design 20%',
        },
        tech: ['eGovFrame', 'Adobe XD', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '테라에코의 MES 도입·스마트팩토리 구축에서 출발해 썬겔·다우기업·신애전자 등 다수 제조사로 확장된 정부 지원 사업입니다. 일회성 납품이 아니라 자사 솔루션으로 키워가는 과정이었고, 각 기업의 브랜드 철학과 색상을 반영한 맞춤 디자인으로 높은 만족도를 끌어냈습니다. 이때 쌓은 화면 노하우가 이후 Robo MES 솔루션의 토대가 됐습니다.',
            en: 'A government-funded program that began with Teraeco MES/smart-factory work and expanded across manufacturers like Sungel, Dawoo, and Sinae Electronics. Rather than one-off delivery, it grew into an in-house solution: I tailored each client UI to its brand identity and colors, and the screen know-how here became the foundation for Robo MES.',
        },
        myWorks: [
            {
                ko: '테라에코 MES 도입·스마트팩토리 구축 화면 퍼블리싱 100% 수행',
                en: 'Delivered 100% of publishing for Teraeco MES adoption and smart-factory build',
            },
            {
                ko: '썬겔·다우기업·신애전자 등 다수 제조사로 확장하며 기업별 요구사항 반영',
                en: 'Reflected per-client requirements while expanding to Sungel, Dawoo, Sinae, and more',
            },
            {
                ko: '각 기업의 브랜드 철학·색상을 반영한 맞춤 UI 디자인(20%) 제공',
                en: 'Provided tailored UI design (20%) matching each brand identity and colors',
            },
            {
                ko: '반복 화면을 솔루션화 관점으로 정리해 후속 재사용 기반 마련',
                en: 'Organized repeated screens with a productization lens for later reuse',
            },
        ],
        achievements: [
            {
                ko: '다수 고객사로 사업을 확장하며 맞춤 디자인으로 높은 만족도 확보',
                en: 'Expanded across multiple clients with tailored design and high satisfaction',
            },
            {
                ko: '축적한 MES 화면 노하우가 자사 Robo MES 솔루션 구축의 기반이 됨',
                en: 'The accumulated MES screen know-how seeded the in-house Robo MES solution',
            },
        ],
        points: [
            {
                ko: '다수 고객사 동시 대응',
                en: 'Handled multiple enterprise clients',
            },
            {
                ko: '브랜드 맞춤 디자인',
                en: 'Brand-tailored design',
            },
            {
                ko: '솔루션화 기반 경험',
                en: 'Productization-grounded experience',
            },
        ],
        pin: false,
        duration: {
            ko: '약 15개월',
            en: '~15 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'jQuery'],
    },
    {
        id: 'kwangjang-homepage',
        category: 'project',
        title: {
            ko: '광장 파트너스 홈페이지',
            en: 'Kwangjang Partners Website',
        },
        period: '2020.11~2020.12',
        type: {
            ko: 'SI / 구축',
            en: 'SI / Build',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Visual Studio Code', 'Sketch', 'HTML', 'CSS', 'jQuery'],
        introduction: {
            ko: '광장 파트너스 기업 홈페이지 신규 구축에서 퍼블리싱을 전담한, 입사 초기의 실무 구축 경험입니다. Sketch 시안을 기준으로 반응형·크로스브라우징을 챙기며 기업 사이트의 기본기를 다졌습니다.',
            en: 'An early-career build where I owned publishing for the Kwangjang Partners corporate site. Working from Sketch designs, I covered responsive layout and cross-browser support, building the fundamentals of corporate-site delivery.',
        },
        myWorks: [
            {
                ko: '기업 홈페이지 전 화면 퍼블리싱 전담',
                en: 'Owned publishing for all corporate-site screens',
            },
            {
                ko: 'Sketch 시안 기반 반응형·크로스브라우징 대응',
                en: 'Handled responsive and cross-browser work from Sketch designs',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '초기 실무 구축 경험',
                en: 'Early-stage production build experience',
            },
            {
                ko: '기업 사이트 퍼블리싱 기본기',
                en: 'Corporate-site publishing fundamentals',
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
        id: 'hama-app',
        category: 'project',
        title: {
            ko: '하마 애플리케이션',
            en: 'Hama Application',
        },
        period: '2020.09~2020.10',
        type: {
            ko: 'SI / 구축',
            en: 'SI / Build',
        },
        role: {
            ko: '퍼블리싱 100%',
            en: 'Publishing 100%',
        },
        tech: ['Visual Studio Code', 'Sketch', 'HTML', 'CSS', 'JavaScript'],
        introduction: {
            ko: '부동산 건축 서비스에 필요한 애플리케이션을 퍼블리싱하고 웹앱 형태로 빌드한 프로젝트입니다. 입사 첫 달에 맡아 화면 퍼블리싱부터 앱 사용 흐름까지 경험한 첫 애플리케이션 작업입니다.',
            en: 'A real-estate/construction service application that I published and built as a web app. Taken on in my first month, it was my first application project—from screen publishing through to app-style usage flow.',
        },
        myWorks: [
            {
                ko: '부동산 건축 서비스 애플리케이션 화면 퍼블리싱',
                en: 'Published the real-estate/construction service application screens',
            },
            {
                ko: 'JavaScript 기반 인터랙션 구현',
                en: 'Implemented JavaScript-based interactions',
            },
            {
                ko: '웹앱(WebApp) 형태로 빌드해 앱 사용 흐름 구현',
                en: 'Built it as a web app to realize an app-style usage flow',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '앱형 웹 구축 경험',
                en: 'App-like web implementation',
            },
            {
                ko: '서비스 애플리케이션 퍼블리싱',
                en: 'Service application publishing',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'CSS', 'JavaScript'],
    },
] as const;

export default data;
