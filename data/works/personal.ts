const data = [
    {
        id: 'jonsoft-framework-portfolio',
        category: 'personal',
        title: {
            ko: '포트폴리오 웹사이트 2026',
            en: 'Portfolio Website 2026',
        },
        period: '2026',
        type: {
            ko: '개인 / Nuxt 포트폴리오',
            en: 'Personal / Nuxt Portfolio',
        },
        role: {
            ko: '디자인·퍼블리싱·구조 설계·프론트엔드 개발 전체 담당',
            en: 'End-to-end design, publishing, architecture, and frontend development',
        },
        tech: ['Nuxt 3', 'Vue 3', 'TypeScript', 'SCSS', 'Pinia', 'GSAP'],
        introduction: {
            ko: '현재 운영 중인 2026 개인 포트폴리오입니다. 실무 프로젝트와 개인 작업을 분리해 보여주는 갤러리 구조, 다국어 콘텐츠, 일관된 단일 테마, 디자인 토큰 정리 페이지까지 하나의 Nuxt 기반 포트폴리오 시스템으로 설계했습니다. 화면을 예쁘게 보여주는 것에서 끝나지 않고, 이후 작업을 계속 추가하고 관리할 수 있는 구조를 목표로 만들었습니다.',
            en: 'My current 2026 personal portfolio. I designed it as a Nuxt-based portfolio system that separates client work and personal projects, supports bilingual content, one consistent theme, and includes a design-token overview. The goal was not only to present the work well, but also to keep the site maintainable as the archive grows.',
        },
        myWorks: [
            {
                ko: '포트폴리오 전체 IA, 화면 흐름, 섹션 구성, 카드형 프로젝트 갤러리 설계',
                en: 'Designed the full IA, page flow, sections, and card-based project gallery',
            },
            {
                ko: 'Nuxt 3·Vue 3 기반 라우팅, 상세 페이지, 데이터 분리 구조, SEO 메타 구성 개발',
                en: 'Built Nuxt 3/Vue 3 routing, detail pages, separated data modules, and SEO metadata',
            },
            {
                ko: '색상·여백·폰트·라운드·그림자를 역할 기반 디자인 토큰으로 정리하고 별도 설명 페이지 구현',
                en: 'Organized color, spacing, typography, radius, and shadow into role-based design tokens and built a dedicated overview page',
            },
            {
                ko: 'SCSS를 main.scss(화면)와 _theme.scss(색)·_tokens.scss(foundation)로 분리해 유지보수 구조로 정리',
                en: 'Split SCSS into main.scss (screens), _theme.scss (colors), and _tokens.scss (foundation) for maintainability',
            },
            {
                ko: 'core 폴더에 모여 있던 앱 계층을 composables·stores·plugins·i18n·api·data·config 루트 구조로 재배치',
                en: 'Reorganized the former core folder into root-level composables, stores, plugins, i18n, api, data, and config layers',
            },
            {
                ko: '사용되지 않는 카드 컴포넌트를 제거하고 소개·툴박스 카드 계열을 FeatureCard로 통합해 컴포넌트 수와 역할 중복을 정리',
                en: 'Removed unused card components and merged intro/toolbox card patterns into FeatureCard to reduce component count and duplicated roles',
            },
            {
                ko: 'GitHub Pages 정적 배포 경로와 public asset 경로를 고려한 빌드 구조 정리',
                en: 'Organized static build output and asset paths for GitHub Pages deployment',
            },
        ],
        achievements: [
            {
                ko: '디자인, 퍼블리싱, 설계, 프론트엔드 개발까지 전 과정을 단독 수행',
                en: 'Handled the full process independently from design and publishing to architecture and frontend development',
            },
            {
                ko: '실무 프로젝트·개인 프로젝트·하이라이트 콘텐츠를 데이터 기반으로 확장 가능하게 구성',
                en: 'Built a data-driven structure that can scale across career work, personal projects, and highlights',
            },
            {
                ko: 'SCSS 파일 수를 11개에서 2개로 줄이되 선택자와 선언 순서를 유지해 화면 회귀 없이 구조만 단순화',
                en: 'Reduced the SCSS file count from 11 to 2 while preserving selectors and declaration order, simplifying structure without visual regression',
            },
            {
                ko: 'Pinia 상태는 앱 환경 설정과 포트폴리오 UI 상태로 묶고, Nuxt 플러그인은 초기화와 분석 스크립트 계열로 통폐합',
                en: 'Grouped Pinia state into app preferences and portfolio UI state, and consolidated Nuxt plugins by app boot and analytics concerns',
            },
            {
                ko: '컴포넌트는 화면에서 실제 호출되는 단위 중심으로 남겨, 디자인 시스템 문서와 코드 목록이 어긋나지 않도록 정리',
                en: 'Kept components centered on units that are actually rendered, aligning the design-system inventory with the codebase',
            },
        ],
        points: [
            {
                ko: '단순 정적 페이지가 아닌 컴포넌트·데이터 중심 포트폴리오 구조',
                en: 'A component- and data-driven portfolio structure, not just a static page',
            },
            {
                ko: '디자인 토큰 페이지에서 네이밍과 사용 이유를 함께 확인할 수 있어 유지보수 기준이 분명함',
                en: 'The design-token page documents naming and rationale, making maintenance decisions clearer',
            },
            {
                ko: '운영 중인 실제 배포 URL을 기준으로 개선과 리팩터링을 계속 반영',
                en: 'Continuously improved and refactored against the live deployed portfolio URL',
            },
            {
                ko: '스타일 본문과 디자인 토큰을 분리해, UI 수정은 main.scss에서 보고 토큰 변경은 _tokens.scss에서 확인할 수 있는 구조',
                en: 'Separated screen styles from design tokens so UI edits live in main.scss and token changes are reviewed in _tokens.scss',
            },
        ],
        pin: true,
        duration: {
            ko: '약 2개월 (지속 개선)',
            en: '~2 months (ongoing improvements)',
        },
        captures: [
            '/images/portfolio-2026/home-light-desktop.png',
            '/images/portfolio-2026/home-dark-desktop.png',
            '/images/portfolio-2026/design-tokens-light-desktop.png',
            '/images/portfolio-2026/design-tokens-dark-desktop.png',
            '/images/portfolio-2026/home-light-tablet.png',
            '/images/portfolio-2026/home-dark-tablet.png',
            '/images/portfolio-2026/home-light-mobile.png',
            '/images/portfolio-2026/home-dark-mobile.png',
            '/images/og-image-2026.jpg',
        ],
        languages: ['Nuxt 3', 'Vue 3', 'TypeScript', 'SCSS'],
        links: [
            {
                label: {
                    ko: '디자인 토큰 보기',
                    en: 'View design tokens',
                },
                href: '/personal/design-tokens',
            },
        ],
    },
    {
        id: 'singil-bmc',
        category: 'personal',
        title: {
            ko: '신길교회 야구 선교단 홈페이지',
            en: 'Singil Church Baseball Mission Website',
        },
        period: '2026.05.31~',
        type: {
            ko: '개인 / Nuxt 커뮤니티 사이트',
            en: 'Personal / Nuxt community website',
        },
        role: {
            ko: '기획·디자인·퍼블리싱·프론트엔드·기록 파이프라인 개발 전체 담당',
            en: 'End-to-end planning, design, publishing, frontend, and record-pipeline development',
        },
        tech: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Pinia', 'SCSS', 'AG Grid', 'Node.js', 'cheerio'],
        introduction: {
            ko: '신길교회 야구 선교단 공식 홈페이지입니다. 2026년 5월 31일 Nuxt 3 기반 골격을 집중 개발한 뒤, 6월에 게임원 HTML→JSON 파싱 파이프라인·다크/라이트 테마·리더 카드·MVP 확장·최신 경기 데이터 반영까지 이어 개선했습니다. 서버 API 없이 `npm run update`로 경기 기록을 갱신하고, 소개·기록·경기·선수·MVP·영상·소식·문의 IA를 GitHub Pages(`/singil-bmc/`)에 정적 배포합니다.',
            en: 'The official Singil Church Baseball Mission website. After an intensive Nuxt 3 foundation on May 31, 2026, June work added a GameOne HTML→JSON parsing pipeline, dark/light themes, leader cards, expanded MVP stats, and fresh game data. With no backend API, `npm run update` refreshes records while about, records, games, roster, MVP, videos, news, and contact IA ship as a static GitHub Pages site at `/singil-bmc/`.',
        },
        myWorks: [
            {
                ko: '선교단 소개·조직·히스토리, 단체사진, 전체/연도별/월별/조별 기록, 월·주간 MVP, 선수·경기·YouTube·소식·문의 페이지 IA 설계',
                en: 'Designed IA for about/leaders/history, team gallery, full/yearly/monthly/group records, monthly/weekly MVP, roster, games, YouTube, news, and contact',
            },
            {
                ko: '게임원 경기 HTML을 cheerio로 파싱해 경기·누적 기록 JSON을 생성하는 `parse-game-html`·`build-records`·`update-records` 스크립트 구축',
                en: 'Built `parse-game-html`, `build-records`, and `update-records` scripts that parse GameOne HTML with cheerio into per-game and summary JSON',
            },
            {
                ko: 'A조(Davids)·D조(다윗) 자동 구분, `playerId` 기준 통계 집계, AG Grid 기록 표·경기 상세 MVP/하이라이트 섹션 구현',
                en: 'Implemented A-group (Davids) / D-group auto classification, playerId-based stat aggregation, AG Grid record tables, and game-detail MVP/highlight sections',
            },
            {
                ko: '`useBasePath`·`fetchJson()`으로 GitHub Pages base path 대응, `GAME_RECORD_UPDATE_HANDOFF.md`로 경기 후 운영 절차 문서화',
                en: 'Handled GitHub Pages base paths via `useBasePath`/`fetchJson()` and documented post-game ops in `GAME_RECORD_UPDATE_HANDOFF.md`',
            },
            {
                ko: '6월: 다크·라이트 테마, 홈 최근 경기·영상 링크 레이아웃, 리더 카드 컴포넌트·이미지 경로 동적 처리, favicon·SCSS 통합',
                en: 'In June: dark/light themes, home layout for recent games and video links, leader card component with dynamic image paths, favicon, and SCSS consolidation',
            },
            {
                ko: 'GitHub Actions·`npm run deploy`·sitemap 생성·JSON-LD·경기·뉴스 동적 SEO 메타로 정적 배포 파이프라인 정리',
                en: 'Organized static deployment with GitHub Actions, `npm run deploy`, sitemap generation, JSON-LD, and dynamic SEO meta for games and news',
            },
        ],
        achievements: [
            {
                ko: '5/31 하루 33커밋으로 IA·기록·통계·명단·미디어·배포 골격을 완성하고, 6월 20커밋으로 테마·MVP·운영 데이터까지 확장 (누적 53커밋)',
                en: 'Shipped IA, records, stats, roster, media, and deployment in 33 commits on May 31, then extended themes, MVP, and ops data with 20 more commits in June (53 total)',
            },
            {
                ko: '게임원 HTML만 추가하면 `npm run update` 한 번으로 경기·누적·조별 기록을 재생성하는 비개발자 친화 운영 구조 확립',
                en: 'Established an operator-friendly flow: drop GameOne HTML and run `npm run update` once to rebuild game and summary records',
            },
            {
                ko: '상대팀 선수 기록 제외·선수명 `players.json` 매칭 등 야구 기록 도메인 규칙을 파싱 스크립트와 README에 반영',
                en: 'Encoded baseball-domain rules—excluding opponent stats and matching names via `players.json`—in parsing scripts and the README',
            },
        ],
        points: [
            {
                ko: '교회 공동체 운영에 맞춘 정적 사이트 — 서버 없이도 경기 후 기록 갱신이 가능한 파이프라인',
                en: 'A church-community static site with a post-game record pipeline that needs no server',
            },
            {
                ko: '초기 하루 집중 개발 이후에도 실제 경기·영상·MVP 데이터를 반영하며 6월까지 지속 개선',
                en: 'Continued improvement through June with real games, videos, and MVP data after the initial one-day push',
            },
            {
                ko: 'GitHub Pages base path, 접근성, SEO, 다크/라이트 테마를 포함한 배포·운영 가능한 실서비스',
                en: 'A deployable, maintainable live site with GitHub Pages base path, accessibility, SEO, and dark/light themes',
            },
        ],
        pin: true,
        duration: {
            ko: '5/31 집중 개발 후 지속 개선 (GitHub 커밋 53회)',
            en: 'Intensive May 31 build, then ongoing (53 GitHub commits)',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Nuxt 3', 'Vue 3', 'TypeScript', 'SCSS', 'Pinia', 'Node.js'],
        links: [
            {
                label: {
                    ko: '페이지 이동하기',
                    en: 'View demo',
                },
                href: 'https://yheun03.github.io/singil-bmc/',
            },
            {
                label: {
                    ko: 'GitHub',
                    en: 'GitHub',
                },
                href: 'https://github.com/yheun03/singil-bmc',
            },
        ],
    },
    {
        id: 'clone-flighty',
        category: 'personal',
        title: {
            ko: '플라이티 클론 데모',
            en: 'Flighty Clone Demo',
        },
        period: '2026.05.24~',
        type: {
            ko: '개인 / Nuxt 클론 서비스',
            en: 'Personal / Nuxt clone service',
        },
        role: {
            ko: '기획·디자인 분석·피그마 재설계·프론트엔드 개발 전체 담당',
            en: 'End-to-end planning, design analysis, Figma redesign, and frontend development',
        },
        tech: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Pinia', 'SCSS', 'Figma', 'AG Grid', 'Chart.js'],
        introduction: {
            ko: '친구 덕분에 항덕이 되었고, 22번의 비행 끝에 공부 겸 플라이티를 클론 개발하고자 시작한 개인 프로젝트입니다. 좋은 디자인과 좋은 UX로 본인의 비행을 예쁘게 정리해 공유할 수 있는 점이 마음에 들었지만, 영어만 지원되는 점과 비행기 기체 이미지가 부족한 점이 아쉬웠습니다. 그래서 다국어 지원과 다양한 기체 등록까지 확장할 수 있는 비행 기록 클론 서비스를 기획했습니다.',
            en: 'A personal project I started after becoming an aviation enthusiast through a friend and taking 22 flights myself. I liked how Flighty lets people organize and share their flights through polished design and UX, but wanted to explore a version with multilingual support and a richer aircraft image library. This clone demo studies the original service and extends the idea toward localized flight records and broader aircraft registration.',
        },
        myWorks: [
            {
                ko: 'Flighty 4.8.2 PC 버전 화면을 캡처하고 정보 구조, 폰트 계층, 카드 구성, 인터랙션 밀도를 분석',
                en: 'Captured the Flighty 4.8.2 desktop UI and analyzed IA, typography hierarchy, card structure, and interaction density',
            },
            {
                ko: '캡처를 기반으로 Figma에서 원본 디자인을 그대로 클론해 레이아웃 규칙과 시각적 디테일을 학습',
                en: 'Recreated the captured UI in Figma to study the layout rules and visual details of the original design',
            },
            {
                ko: '모바일 환경에 맞춰 폰트 위계, 간격, 컴포넌트 크기, 색상 역할을 다시 정리한 최종 디자인 시안 제작',
                en: 'Designed a mobile-adapted version with refined typography, spacing, component sizing, and color roles',
            },
            {
                ko: 'Nuxt 3 기반으로 워크스페이스, 인증, 설정, 공통 컴포넌트 데모, 그리드·차트·업로드 UI 골격 구성',
                en: 'Built a Nuxt 3 foundation with workspace, auth, settings, component demos, grid, chart, and upload UI patterns',
            },
            {
                ko: 'Pinia·Axios·i18n 사전·GitHub Pages base path를 정리해 다국어 확장과 정적 배포를 고려한 구조로 설계',
                en: 'Organized Pinia, Axios, i18n dictionaries, and GitHub Pages base-path handling for localization and static deployment',
            },
        ],
        achievements: [
            {
                ko: '원본 서비스 캡처, 디자인 클론, 모바일 재설계까지 이어지는 디자인 학습 과정을 프로젝트 산출물로 정리',
                en: 'Documented the design-learning process from original-service capture to Figma clone and mobile redesign',
            },
            {
                ko: 'Nuxt 3 + Pinia 기반의 공통 UI 컴포넌트와 데모 페이지를 먼저 구축해 서비스 화면 확장 기반 마련',
                en: 'Prepared a scalable base by building shared UI components and demo pages on Nuxt 3 + Pinia first',
            },
        ],
        points: [
            {
                ko: '항공 경험에서 출발한 개인 동기를 서비스 기획과 프론트엔드 학습으로 연결한 클론 프로젝트',
                en: 'A clone project that connects a personal aviation interest to service planning and frontend practice',
            },
            {
                ko: '영어 중심 서비스의 한계를 다국어 지원 과제로, 기체 이미지 부족을 데이터·자산 확장 과제로 재정의',
                en: 'Reframed English-only UX as a localization task and limited aircraft imagery as a data and asset expansion task',
            },
            {
                ko: '실제 서비스를 그대로 따라 만드는 단계에서 끝내지 않고, 모바일 사용성과 디자인 시스템 관점으로 다시 해석',
                en: 'Moves beyond a direct clone by reinterpreting the product through mobile usability and design-system decisions',
            },
        ],
        pin: true,
        duration: {
            ko: '진행 중',
            en: 'In progress',
        },
        captures: ['/images/projects/flighty/image-1.png', '/images/projects/flighty/image-2.png', '/images/projects/flighty/image-3.png'],
        thumbnail: '/images/archive-thumbs/flighty.jpg',
        languages: ['Nuxt 3', 'Vue 3', 'TypeScript', 'SCSS', 'Pinia', 'Figma'],
        links: [
            {
                label: {
                    ko: '페이지 이동하기',
                    en: 'View demo',
                },
                href: 'https://yheun03.github.io/cloneFlighty/',
            },
            {
                label: {
                    ko: 'GitHub',
                    en: 'GitHub',
                },
                href: 'https://github.com/yheun03/cloneFlighty',
            },
        ],
    },
    {
        id: 'clone-kakaotalk',
        category: 'personal',
        title: {
            ko: '카카오톡 클론',
            en: 'KakaoTalk Clone',
        },
        period: '2025.09.27~2026.05.23',
        type: {
            ko: '개인 / Vue 클론 코딩',
            en: 'Personal / Vue clone project',
        },
        role: {
            ko: '기획·UI 구현·퍼블리싱·프론트엔드 개발 전체 담당',
            en: 'End-to-end planning, UI implementation, publishing, and frontend development',
        },
        tech: ['Vue 3', 'Vue Router 4', 'Vite 6', 'SCSS', '@vuepic/vue-datepicker', 'holiday-kr', 'vite-svg-loader'],
        introduction: {
            ko: '새로운 개발 언어 학습을 위해 기획·디자인이 완료된 카카오톡 UI를 Vue 3로 클론 코딩한 개인 프로젝트입니다. 채팅·친구·설정 등 주요 화면 흐름을 컴포넌트 단위로 나누고, GitHub Pages base path(`/cloneKakaoTalk/`) 배포까지 포함해 실서비스에 가까운 프론트엔드 구조를 연습했습니다.',
            en: 'A personal Vue 3 clone of KakaoTalk, built to learn a new frontend stack while following an existing product’s planning and design. I split major flows—chat, friends, settings—into components and practiced a production-like setup including GitHub Pages deployment with a `/cloneKakaoTalk/` base path.',
        },
        myWorks: [
            {
                ko: '카카오톡 주요 화면 IA를 Vue Router 4 라우트와 레이아웃 컴포넌트로 구성',
                en: 'Mapped core KakaoTalk screens to Vue Router 4 routes and layout components',
            },
            {
                ko: 'Vite 6 + Sass(SCSS) 기반 스타일 구조, SVG 아이콘 로더(vite-svg-loader) 적용',
                en: 'Set up Vite 6 with Sass (SCSS) and SVG icons via vite-svg-loader',
            },
            {
                ko: '날짜·휴일 선택 UI에 @vuepic/vue-datepicker, holiday-kr 연동',
                en: 'Integrated @vuepic/vue-datepicker and holiday-kr for date and holiday-aware UI',
            },
            {
                ko: 'GitHub Pages용 base path(`VITE_APP_BASE_URL`)와 dev/root 스크립트로 로컬·배포 경로 정리',
                en: 'Aligned local and deployed paths with `VITE_APP_BASE_URL` and dev/root npm scripts for GitHub Pages',
            },
            {
                ko: 'gh-pages 브랜치 배포 파이프라인(`npm run deploy`) 구성',
                en: 'Configured gh-pages deployment (`npm run deploy`)',
            },
        ],
        achievements: [
            {
                ko: 'GitHub 커밋 120회 이상으로 화면·컴포넌트를 단계적으로 확장하며 Vue 3 Composition API에 익숙해짐',
                en: 'Grew the UI incrementally across 120+ GitHub commits, getting comfortable with Vue 3 Composition API',
            },
            {
                ko: '프레임워크 없이 HTML만 쓰던 2025 포트폴리오 이후, SPA·라우팅·빌드 도구를 갖춘 Vue 기반 작업으로 전환',
                en: 'Moved from the 2025 HTML-only portfolio to a Vue SPA with routing and a modern build toolchain',
            },
        ],
        points: [
            {
                ko: '기존 서비스 UI를 그대로 따라가며 컴포넌트 분리·상태·라우팅 설계를 연습한 학습용 클론',
                en: 'A learning clone focused on component boundaries, state, and routing by following a real product UI',
            },
            {
                ko: '배포 URL과 저장소 README를 기준으로 로컬 실행·base path 규칙을 문서화해 재현 가능하게 유지',
                en: 'Documented local run and base-path rules in the repo README against the live deployment URL',
            },
        ],
        pin: true,
        duration: {
            ko: '약 8개월 (지속 개선)',
            en: '~8 months (ongoing improvements)',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['Vue 3', 'Vue Router 4', 'Vite 6', 'SCSS', 'JavaScript'],
        links: [
            {
                label: {
                    ko: '페이지 이동하기',
                    en: 'View demo',
                },
                href: 'https://yheun03.github.io/cloneKakaoTalk/',
            },
            {
                label: {
                    ko: 'GitHub',
                    en: 'GitHub',
                },
                href: 'https://github.com/yheun03/cloneKakaoTalk',
            },
        ],
    },
    {
        id: 'portfolio-2025',
        category: 'personal',
        title: {
            ko: '포트폴리오 웹사이트 2025',
            en: 'Portfolio Website 2025',
        },
        period: '2025',
        type: {
            ko: '개인 / HTML 포트폴리오',
            en: 'Personal / HTML Portfolio',
        },
        role: {
            ko: '기획·디자인·퍼블리싱·인터랙션 구현 전체 담당',
            en: 'End-to-end planning, design, publishing, and interaction implementation',
        },
        tech: ['HTML', 'SCSS', 'JavaScript', 'jQuery', 'Swiper'],
        introduction: {
            ko: '2025년에 제작한 정적 HTML 기반 포트폴리오입니다. 자기소개, 프로젝트 소개, 다크 모드, 캔버스 모션을 하나의 페이지 흐름으로 구성해 당시의 퍼블리싱 역량과 화면 구성 방식을 기록했습니다. Nuxt 기반 2026 포트폴리오로 넘어오기 직전의 작업 방식을 그대로 보여주는, 성장 과정을 가늠할 수 있는 아카이브입니다.',
            en: 'A static HTML portfolio built in 2025. It records my publishing craft at the time through a single-page flow with intro content, project showcases, dark mode, and canvas motion—an archive that shows exactly how I worked just before moving to the Nuxt-based 2026 portfolio.',
        },
        myWorks: [
            {
                ko: 'HTML·SCSS 기반의 단일 페이지 포트폴리오 IA와 화면 디자인 설계',
                en: 'Designed the IA and visual layout for a single-page HTML/SCSS portfolio',
            },
            {
                ko: '다크/라이트 모드, Swiper 프로젝트 영역, 모달 인터랙션 구현',
                en: 'Implemented dark/light mode, Swiper project sections, and modal interactions',
            },
            {
                ko: '프로필 이미지, 목업, OG 이미지, 이력서 정적 파일까지 함께 관리',
                en: 'Managed profile images, mockups, OG image, and static resume assets together',
            },
        ],
        achievements: [
            {
                ko: '프레임워크 없이 정적 자산만으로 단일 페이지 포트폴리오를 완성해 배포',
                en: 'Completed and deployed a single-page portfolio using only static assets, no framework',
            },
            {
                ko: '2026 Nuxt 포트폴리오와 비교 가능한 작업 방식·구조 아카이브로 정리',
                en: 'Preserved it as an archive whose approach and structure can be compared with the 2026 Nuxt portfolio',
            },
        ],
        points: [
            {
                ko: 'Nuxt 기반 2026 포트폴리오 이전의 구조와 표현 방식을 비교할 수 있는 아카이브',
                en: 'An archive that makes the structure and expression before the Nuxt-based 2026 portfolio easy to compare',
            },
            {
                ko: '프레임워크 없이 정적 자산만으로 완성한 HTML 중심 작업',
                en: 'HTML-first work completed with static assets and no application framework',
            },
        ],
        pin: true,
        duration: {
            ko: '약 1개월',
            en: '~1 month',
        },
        captures: [
            '/images/portfolio/ver-2025/og-image.jpg',
            '/images/portfolio/ver-2025/photo-1920.webp',
            '/images/portfolio/ver-2025/project/jonsoft/thumbnail-pc.png',
            '/images/portfolio/ver-2025/project/jonsoft/thumbnail-mb.png',
            '/images/portfolio/ver-2025/project/matemate/thumbnail-pc.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-01.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-02.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-03.png',
            '/images/portfolio/ver-2025/project/gongting/thumbnail-mb.png',
        ],
        languages: ['HTML', 'SCSS', 'JavaScript', 'jQuery'],
        links: [
            {
                label: {
                    ko: '2025 버전 보기',
                    en: 'Open 2025 version',
                },
                href: '/ver.2025/index.html',
            },
        ],
    },
    {
        id: 'matemate-capstone',
        category: 'personal',
        title: {
            ko: '메이트메이트(MATEMATE) 룸메이트 매칭',
            en: 'MateMate Roommate Matching',
        },
        period: '2025.01.04~2025.01.30',
        type: {
            ko: '팀 / 방학·캡스톤 (모바일 웹)',
            en: 'Team / Capstone & vacation (mobile web)',
        },
        role: {
            ko: '기획 90%·UI 디자인 30%·퍼블리싱 100% (team-matemate)',
            en: '90% planning, 30% UI design, 100% publishing (team-matemate)',
        },
        tech: ['HTML', 'SCSS', 'JavaScript', 'Firebase Hosting', 'Firestore', 'Cloud Functions', 'Figma'],
        introduction: {
            ko: '한국공학대학교 방학·캡스톤 팀 프로젝트로, 기숙사 룸메이트를 생활 습관·성향 조건으로 매칭하는 모바일 웹 서비스입니다. 랜덤 배정·지인 추천 대신 본인·희망 룸메이트 정보를 입력하면 조건에 맞는 상대를 찾을 수 있도록 설계했습니다. 소스·배포는 team-matemate/matemate 저장소와 Firebase(matemate-2025)에서 관리합니다.',
            en: 'A Korea Polytechnic University capstone/vacation team project: a mobile web service that matches dorm roommates by lifestyle and preferences instead of random assignment or referrals. Source and deployment live in the team-matemate/matemate repo and Firebase project matemate-2025.',
        },
        myWorks: [
            {
                ko: '문제 정의·서비스 기획·매칭·인증·채팅·게시판 등 사용자 흐름과 IA 설계',
                en: 'Defined the problem and IA for matching, auth, chat, board, and related user flows',
            },
            {
                ko: '`public/html/`에 auth·match·chat·board·cutline·user·main 화면 퍼블리싱 및 SCSS 컴포넌트 구조 정리',
                en: 'Published auth, match, chat, board, cutline, user, and main screens under `public/html/` with an SCSS component structure',
            },
            {
                ko: 'Firebase Hosting(루트 → main), Firestore·Storage rules, Cloud Functions 백엔드 연동 구성',
                en: 'Configured Firebase Hosting (root → main), Firestore/Storage rules, and Cloud Functions',
            },
            {
                ko: 'Swiper·공통 JS로 매칭·목록 인터랙션 구현, C2C 반복 수정에 맞춘 UX 정리',
                en: 'Implemented matching and list interactions with Swiper and shared JS, tuned UX for repeated C2C edits',
            },
        ],
        achievements: [
            {
                ko: 'team-matemate 조직 저장소에서 약 74커밋·4주간 집중 개발로 MVP 화면·배포 파이프라인 완성',
                en: 'Shipped an MVP and deployment pipeline with ~74 commits over four weeks in the team-matemate org repo',
            },
            {
                ko: '체크리스트·개인 게시글 방식 대비 자동 조건 매칭이라는 서비스 차별점을 UI 흐름으로 구현',
                en: 'Implemented automatic condition-based matching in the UI, differentiated from paper checklists and ad-hoc posts',
            },
        ],
        points: [
            {
                ko: '팀 캡스톤에서 기획·퍼블리싱을 맡으며 협업 저장소 기준으로 화면 단위를 쪼개 작업',
                en: 'Led planning and publishing in a team capstone, splitting work by screen in a shared repo',
            },
            {
                ko: 'Firebase로 호스팅·DB·함수를 묶어 모바일 웹 프로토타입을 실제 URL로 공유 가능',
                en: 'Bundled hosting, database, and functions on Firebase so the mobile web prototype is shareable via a live URL',
            },
        ],
        pin: false,
        duration: {
            ko: '약 4주 (GitHub 집중 개발)',
            en: '~4 weeks (focused GitHub development)',
        },
        captures: [
            '/images/portfolio/ver-2025/project/matemate/thumbnail-pc.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-01.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-02.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-03.png',
        ],
        thumbnail: '/images/archive-thumbs/matemate.jpg',
        languages: ['HTML', 'SCSS', 'JavaScript', 'Firebase', 'Figma'],
        links: [
            {
                label: {
                    ko: '페이지 이동하기',
                    en: 'View demo',
                },
                href: 'https://yheun03.github.io/matemate/',
            },
            {
                label: {
                    ko: 'GitHub',
                    en: 'GitHub',
                },
                href: 'https://github.com/team-matemate/matemate',
            },
        ],
    },
    {
        id: 'gongting-blind-matching',
        category: 'personal',
        title: {
            ko: '공팅 블라인드 매칭 서비스',
            en: 'Gongting Blind Matching Service',
        },
        period: '2024.05.16~2024.07.21',
        type: {
            ko: '개인 / 모바일 웹 서비스',
            en: 'Personal / Mobile Web Service',
        },
        role: {
            ko: '디자인 50%·퍼블리싱 100%',
            en: '50% design and 100% publishing',
        },
        tech: ['HTML', 'SCSS', 'JavaScript', 'Figma', 'Photoshop', 'Illustrator', 'GitHub Pages'],
        introduction: {
            ko: '한국공학대학교 학생을 대상으로 한 블라인드 매칭 웹 서비스입니다. 코로나19 이후 줄어든 학생 간 교류와 소속감 문제를 줄이기 위해, 성향·관심사 기반으로 새 연결을 돕는 모바일 중심 UI를 설계했습니다. yheun03/gongting 저장소에서 intro·가입·프로필·매칭·결과 화면을 정적 HTML로 관리하고 GitHub Pages에 배포했습니다.',
            en: 'A blind matching web service for Korea Polytechnic University students. It offers a mobile-first UI that helps students connect through interests and traits after pandemic-era isolation. Static HTML for intro, sign-up, profile, matching, and result flows is maintained in the yheun03/gongting repo and deployed on GitHub Pages.',
        },
        myWorks: [
            {
                ko: 'intro·회원(user)·매칭(match) 흐름을 `html/` 정적 페이지와 `intro.html` 진입점으로 구성',
                en: 'Structured intro, user, and match flows as static pages under `html/` with `intro.html` as the entry',
            },
            {
                ko: '모바일 중심 UI 디자인 방향 수립, 브랜드 톤·그래픽·SCSS·JS를 `resources/`에 정리',
                en: 'Set a mobile-first UI direction and organized brand tone, graphics, SCSS, and JS under `resources/`',
            },
            {
                ko: 'UI 컴포넌트 샘플을 `component.html`로 분리해 화면 단위 퍼블리싱 재사용',
                en: 'Split UI component samples into `component.html` for reusable screen-level publishing',
            },
            {
                ko: 'GitHub Pages(`yheun03.github.io/gongting`) 배포 및 파비콘·에셋 세트 구성',
                en: 'Deployed to GitHub Pages (`yheun03.github.io/gongting`) with favicon and asset sets',
            },
        ],
        achievements: [
            {
                ko: '초기 서비스에서 1차 171명, 2차 121명의 참여 경험을 기록',
                en: 'Documented early service participation: 171 users in the first round and 121 in the second',
            },
            {
                ko: 'GitHub 저장소로 화면·리소스를 버전 관리해 포트폴리오 아카이브와 별도로 유지',
                en: 'Version-controlled screens and assets on GitHub, separate from the portfolio archive copy',
            },
        ],
        points: [
            {
                ko: '짧은 런칭 주간에 모바일 서비스 UI·퍼블리싱을 완성한 학교 프로젝트',
                en: 'A campus project that shipped mobile UI and publishing within a focused launch week',
            },
            {
                ko: '사용자 피드백을 바탕으로 친구 매칭 확장 방향까지 문서화',
                en: 'Documented a friend-matching expansion direction based on user feedback',
            },
        ],
        pin: false,
        duration: {
            ko: '약 1주 (런칭) · 저장소 정리 ~2개월',
            en: '~1 week launch · ~2 months in repo',
        },
        captures: ['/images/portfolio/ver-2025/project/gongting/thumbnail-mb.png'],
        languages: ['HTML', 'SCSS', 'JavaScript', 'Figma'],
        links: [
            {
                label: {
                    ko: '페이지 이동하기',
                    en: 'View demo',
                },
                href: 'https://yheun03.github.io/gongting/intro.html',
            },
            {
                label: {
                    ko: 'GitHub',
                    en: 'GitHub',
                },
                href: 'https://github.com/yheun03/gongting',
            },
        ],
    },
    {
        id: 'jonsoft-homepage-2022-archive',
        category: 'personal',
        title: {
            ko: '조앤소프트 홈페이지 리뉴얼 아카이브',
            en: 'JO&soft Homepage Renewal Archive',
        },
        period: '2022.01.03~2022.03.04',
        type: {
            ko: '아카이브 / 기업 홈페이지',
            en: 'Archive / Corporate Website',
        },
        role: {
            ko: '기획·퍼블리싱 중심 참여',
            en: 'Planning and publishing-focused contribution',
        },
        tech: ['HTML', 'CSS', 'jQuery', 'Figma', 'Photoshop', 'Illustrator'],
        introduction: {
            ko: '2025 포트폴리오에 수록되어 있던 조앤소프트 홈페이지 리뉴얼 아카이브입니다. 기존 홈페이지의 단조로운 정보 구조와 낮은 신뢰감을 개선하기 위해 레퍼런스 조사, 콘텐츠 구성, 퍼블리싱, SEO와 오픈그래프 관리까지 함께 정리했습니다.',
            en: 'An archive item from the 2025 portfolio for the JO&soft homepage renewal. It covered reference research, content structure, publishing, SEO, and Open Graph management to improve the previous website’s plain structure and low trust impression.',
        },
        myWorks: [
            {
                ko: '홈페이지 리뉴얼 방향 제안 및 주요 콘텐츠 구조 정리',
                en: 'Proposed renewal direction and organized the main content structure',
            },
            {
                ko: '퍼블리싱, 반응형 화면, SEO·오픈그래프 메타 관리 수행',
                en: 'Handled publishing, responsive screens, SEO, and Open Graph metadata',
            },
            {
                ko: '2025 포트폴리오용 PC·모바일 캡처 자료를 아카이브로 정리',
                en: 'Organized PC and mobile screenshots from the 2025 portfolio as an archive',
            },
        ],
        achievements: [
            {
                ko: '기업 홈페이지의 전문성과 대외 신뢰도 개선에 기여',
                en: 'Contributed to improving corporate professionalism and external trust',
            },
        ],
        points: [
            {
                ko: '현재 실무 프로젝트 이력과 연결되는 초기 기업 홈페이지 리뉴얼 경험',
                en: 'An early corporate renewal experience connected to my current career project history',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2개월',
            en: '~2 months',
        },
        captures: ['/images/portfolio/ver-2025/project/jonsoft/thumbnail-pc.png', '/images/portfolio/ver-2025/project/jonsoft/thumbnail-mb.png'],
        thumbnail: '/images/archive-thumbs/jonsoft-2022.jpg',
        languages: ['HTML', 'CSS', 'jQuery', 'Figma'],
        links: [
            {
                label: {
                    ko: '사이트 보기',
                    en: 'Open site',
                },
                href: 'http://jonsoft.co.kr/',
            },
        ],
    },
] as const;

export default data;
