const data = [
    {
        id: 'jonsoft-framework-portfolio',
        category: 'personal',
        title: {
            ko: 'Jonsoft Framework 포트폴리오',
            en: 'Jonsoft Framework Portfolio',
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
            ko: '현재 운영 중인 개인 포트폴리오입니다. 프로젝트 데이터 구조, 다국어 콘텐츠, 테마 토큰, 인터랙션, 정적 배포 흐름까지 직접 설계하고 구현했습니다. 단순 소개 페이지가 아니라 실무 프로젝트와 개인 작업을 지속적으로 확장할 수 있는 포트폴리오 프레임워크로 구성했습니다.',
            en: 'My current personal portfolio. I designed and built the full experience, including project data architecture, bilingual content, theme tokens, interactions, and static deployment. It is structured as an extensible portfolio framework rather than a one-off showcase page.',
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
                ko: '라이트/다크 테마 대응 디자인 토큰, SCSS 믹스인, 반응형 레이아웃 구현',
                en: 'Implemented design tokens, SCSS mixins, responsive layout, and light/dark theme support',
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
                ko: '디자인 토큰 기반으로 색상, 폰트, 여백, 테마를 일관되게 관리',
                en: 'Consistent color, typography, spacing, and theme management through design tokens',
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
        captures: ['/images/og-image.png'],
        languages: ['Nuxt 3', 'Vue 3', 'TypeScript', 'SCSS'],
        links: [
            {
                label: {
                    ko: '포트폴리오 보기',
                    en: 'Open portfolio',
                },
                href: 'https://yheun03.github.io/jonsoft-framework/',
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
] as const;

export default data;
