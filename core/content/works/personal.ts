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
            ko: '현재 운영 중인 2026 개인 포트폴리오입니다. 실무 프로젝트와 개인 작업을 분리해 보여주는 갤러리 구조, 다국어 콘텐츠, 라이트/다크 테마, 디자인 토큰 정리 페이지까지 하나의 Nuxt 기반 포트폴리오 시스템으로 설계했습니다. 화면을 예쁘게 보여주는 것에서 끝나지 않고, 이후 작업을 계속 추가하고 관리할 수 있는 구조를 목표로 만들었습니다.',
            en: 'My current 2026 personal portfolio. I designed it as a Nuxt-based portfolio system that separates client work and personal projects, supports bilingual content, light/dark themes, and includes a design-token overview. The goal was not only to present the work well, but also to keep the site maintainable as the archive grows.',
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
            '/images/og-image-2026.png',
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
            ko: '2025년에 제작한 정적 HTML 기반 포트폴리오입니다. 자기소개, 프로젝트 소개, 다크 모드, 캔버스 모션을 하나의 페이지 흐름으로 구성해 당시 퍼블리싱 역량과 화면 구성 방식을 기록했습니다.',
            en: 'A static HTML portfolio built in 2025. It records my publishing craft at the time through a single-page flow with intro content, project showcases, dark mode, and canvas motion.',
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
        achievements: [],
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
            '/images/portfolio/ver-2025/og-image.png',
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
            ko: '메이트메이트 룸메이트 매칭 서비스',
            en: 'MateMate Roommate Matching Service',
        },
        period: '2024.03.09~2024.06.22',
        type: {
            ko: '개인 / 캡스톤·서비스 기획',
            en: 'Personal / Capstone Service Planning',
        },
        role: {
            ko: '아이디어 기획·UX 설계·UI 디자인 일부 담당',
            en: 'Idea planning, UX design, and partial UI design',
        },
        tech: ['Figma', 'HTML', 'SCSS', 'JavaScript'],
        introduction: {
            ko: '기숙사 룸메이트를 생활 습관과 성향 기준으로 매칭하기 위해 기획한 캡스톤 프로젝트입니다. 랜덤 배정이나 지인 추천에 의존하던 불편을 줄이고, 사용자가 원하는 조건을 기반으로 더 편안한 기숙사 생활을 선택할 수 있도록 서비스 흐름을 설계했습니다.',
            en: 'A capstone project planned to match dorm roommates by lifestyle and preferences. I designed the service flow so users could move beyond random assignment or referrals and find a more comfortable dorm-life match.',
        },
        myWorks: [
            {
                ko: '문제 정의, 아이디어 기획, 사용자 흐름 추상화 및 주요 UX 구조 설계',
                en: 'Defined the problem, planned the idea, abstracted user flows, and shaped the core UX structure',
            },
            {
                ko: '룸메이트 조건 입력, 매칭 결과 확인 등 핵심 화면의 UI 방향성 정리',
                en: 'Organized UI direction for core screens such as roommate preference input and match results',
            },
            {
                ko: '2025 포트폴리오 내 프로젝트 카드와 상세 모달용 캡처 자료 정리',
                en: 'Organized screenshots for the 2025 portfolio project card and detail modal',
            },
        ],
        achievements: [
            {
                ko: '캡스톤 팀 프로젝트에서 기획과 사용자 경험 설계 역할 수행',
                en: 'Handled planning and user experience design in a capstone team project',
            },
        ],
        points: [
            {
                ko: '사용자 조건 기반 매칭이라는 서비스 목적을 화면 흐름으로 구체화',
                en: 'Translated the condition-based matching concept into a concrete screen flow',
            },
            {
                ko: '기획·디자인의 중요성과 협업 기반 개발 과정을 체득한 프로젝트',
                en: 'A project that strengthened my understanding of planning, design, and collaborative development',
            },
        ],
        pin: false,
        duration: {
            ko: '약 3개월',
            en: '~3 months',
        },
        captures: [
            '/images/portfolio/ver-2025/project/matemate/thumbnail-pc.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-01.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-02.png',
            '/images/portfolio/ver-2025/project/matemate/modal/modal-03.png',
        ],
        languages: ['Figma', 'HTML', 'SCSS', 'JavaScript'],
        links: [
            {
                label: {
                    ko: '아카이브 보기',
                    en: 'Open archive',
                },
                href: 'https://yheun03.github.io/portfolio/portfolio/newmeet/',
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
        period: '2024.05.16~2024.05.24',
        type: {
            ko: '개인 / 모바일 웹 서비스',
            en: 'Personal / Mobile Web Service',
        },
        role: {
            ko: '디자인 50%·퍼블리싱 100%',
            en: '50% design and 100% publishing',
        },
        tech: ['HTML', 'SCSS', 'JavaScript', 'Figma', 'Photoshop', 'Illustrator'],
        introduction: {
            ko: '한국공학대학교 학생들의 교류를 돕기 위해 만든 블라인드 매칭 웹 서비스입니다. 코로나19 이후 줄어든 학생 간 만남과 소속감 문제를 해결하기 위해, 성향과 관심사를 기반으로 새로운 연결을 지원하는 모바일 중심 경험을 설계했습니다.',
            en: 'A blind matching web service for Korea Polytechnic University students. It focused on a mobile-first experience that helped students build new connections through interests and personal traits after social interaction had declined during the pandemic.',
        },
        myWorks: [
            {
                ko: '모바일 중심 UI 디자인 방향 수립 및 주요 화면 퍼블리싱',
                en: 'Set the mobile-first UI direction and published the main screens',
            },
            {
                ko: '브랜드 톤, 그래픽 요소, 반응형 화면 구성을 함께 정리',
                en: 'Organized brand tone, graphic elements, and responsive screen composition',
            },
            {
                ko: '2025 포트폴리오 내 프로젝트 슬라이드와 상세 모달 콘텐츠로 재구성',
                en: 'Reworked the project into a slide and modal case inside the 2025 portfolio',
            },
        ],
        achievements: [
            {
                ko: '초기 서비스에서 1차 171명, 2차 121명의 참여 경험을 기록',
                en: 'Documented early service participation: 171 users in the first round and 121 in the second',
            },
        ],
        points: [
            {
                ko: '짧은 기간 안에 모바일 서비스의 UI와 퍼블리싱 결과물을 완성',
                en: 'Completed mobile service UI and publishing output within a short period',
            },
            {
                ko: '사용자 피드백을 기반으로 친구 버전 확장 방향까지 구체화',
                en: 'Shaped an expanded friend-version direction based on user feedback',
            },
        ],
        pin: false,
        duration: {
            ko: '약 1주',
            en: '~1 week',
        },
        captures: ['/images/portfolio/ver-2025/project/gongting/thumbnail-mb.png'],
        languages: ['HTML', 'SCSS', 'JavaScript', 'Figma'],
        links: [
            {
                label: {
                    ko: '아카이브 보기',
                    en: 'Open archive',
                },
                href: 'https://yheun03.github.io/portfolio/portfolio/gongting/intro.html',
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
