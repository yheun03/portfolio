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
        tech: ['Cursor', 'Figma', 'Git', 'FileZilla', 'Whois Hosting', 'HTML', 'SCSS', 'JavaScript', 'jQuery'],
        introduction: {
            ko: '구조 복잡성과 정보 노후화로 신뢰도가 떨어진 자사 홈페이지를, AW VIETNAM 2025 국제 전시회를 앞두고 3주 만에 전면 리뉴얼한 프로젝트입니다. 2022년 코드의 구조적 한계를 리팩토링하고, 형상관리가 안 되던 FTP 배포를 Git 도입으로 전환하자고 직접 제안했으며, 영문·베트남어 다국어와 SSL·SEO·접근성까지 함께 끌어올렸습니다.',
            en: 'A three-week full renewal of our corporate site—plagued by structural complexity and stale content—ahead of the AW VIETNAM 2025 exhibition. I refactored the structural limits of the 2022 code, proposed and led the move from unversioned FTP deployment to Git, and raised EN/VI localization, SSL, SEO, and accessibility together.',
        },
        myWorks: [
            {
                ko: '중복 마크업·불필요 요소를 제거하고 SCSS 컴포넌트 구조 도입으로 유지보수성 개선',
                en: 'Removed duplicate markup and dead elements and introduced an SCSS component structure for maintainability',
            },
            {
                ko: 'AW VIETNAM 2025 대비 영문·베트남어 다국어를 유연한 텍스트 적용 방식으로 설계·구현',
                en: 'Designed and built EN/VI localization with a flexible text-application approach for AW VIETNAM 2025',
            },
            {
                ko: '형상관리가 안 되던 FTP 배포를 Git 도입으로 전환하자고 주도적으로 제안·적용',
                en: 'Proactively proposed and adopted Git in place of unversioned FTP deployment',
            },
            {
                ko: '최신 프로젝트 레퍼런스·솔루션·회사 소개 등 콘텐츠를 최신화하고 일부 페이지 구성 기획',
                en: 'Refreshed content—recent references, solutions, company intro—and planned several page compositions',
            },
            {
                ko: 'SSL 인증서 적용과 SEO·오픈그래프·접근성·반응형 표준 반영',
                en: 'Applied an SSL certificate and met SEO, Open Graph, accessibility, and responsive standards',
            },
        ],
        achievements: [
            {
                ko: '중복 마크업 제거·SCSS 컴포넌트화로 유지보수 효율 약 40% 향상',
                en: 'Improved maintainability by ~40% through duplicate-markup removal and SCSS componentization',
            },
            {
                ko: '다국어·SEO·SSL·OG 적용으로 글로벌 접근성과 검색 유입 개선 (~25% 증가 추산)',
                en: 'Improved global accessibility and search inflow (~25% est.) via i18n, SEO, SSL, and OG',
            },
            {
                ko: 'FTP→Git 전환으로 배포 안정성과 협업 추적성 확보',
                en: 'Secured deploy stability and change traceability by moving FTP to Git',
            },
        ],
        points: [
            {
                ko: '브랜드·정보 신뢰도 개선',
                en: 'Brand and information trust',
            },
            {
                ko: '다국어·웹 표준 대응',
                en: 'i18n and web-standard readiness',
            },
            {
                ko: 'Git 도입을 주도한 개선 제안',
                en: 'Led the Git adoption proposal',
            },
        ],
        pin: true,
        duration: {
            ko: '약 3주',
            en: '~3 weeks',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['HTML', 'SCSS', 'JavaScript', 'jQuery'],
        links: [
            {
                label: {
                    ko: '사이트 보기',
                    en: 'Open site',
                },
                href: 'https://jonsoft.co.kr/',
            },
        ],
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
            ko: '기존 투입 인원의 장기 공가로 생긴 공백을 메우기 위해 단기 투입된 프로젝트입니다. 다른 사람이 만들던 화면을 빠르게 파악해 디테일한 오류를 수정하고 신규 페이지까지 제작하며, 짧은 기간에도 매끄럽게 합류하는 온보딩 역량을 보였습니다.',
            en: 'A short-term assignment to cover a teammate’s extended leave. I quickly understood screens someone else had been building, fixed detailed defects, and produced new pages—demonstrating the ability to onboard smoothly even on a tight timeline.',
        },
        myWorks: [
            {
                ko: '기존 인원이 제작한 화면의 디테일한 오류 수정',
                en: 'Fixed detailed defects in screens built by the previous developer',
            },
            {
                ko: '신규 페이지 퍼블리싱',
                en: 'Published new pages',
            },
            {
                ko: '웹스퀘어 SP5 CMS 구조에 빠르게 적응해 합류',
                en: 'Adapted quickly to the WebSquare SP5 CMS to ramp up fast',
            },
        ],
        achievements: [
            {
                ko: '약 2주 내 신규·수정 화면 납품 완료',
                en: 'Delivered new and revised screens within about two weeks',
            },
            {
                ko: '코드 기준을 맞춰 기존 작업과의 충돌 최소화',
                en: 'Matched code conventions to minimize conflicts with existing work',
            },
        ],
        points: [
            {
                ko: '단기 투입 대응력',
                en: 'Short-term ramp-up',
            },
            {
                ko: 'CMS 퍼블리싱 안정화',
                en: 'CMS publishing stabilization',
            },
        ],
        pin: false,
        duration: {
            ko: '약 2주',
            en: '~2 weeks',
        },
        captures: ['/images/projects/placeholder.svg'],
        languages: ['XML', 'CSS3'],
    },
    {
        id: 'fems',
        category: 'renewal',
        title: {
            ko: '삼화페인트 FEMS 리뉴얼',
            en: 'Samhwa Paint FEMS Renewal',
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
            ko: '삼화페인트 FEMS 도입 프로젝트에서 React 기반 주요 화면을 1주 이내에 구현해야 하는 급한 납기에 대응한 작업입니다. 다수의 업무용 웹 애플리케이션 퍼블리싱 경험을 바탕으로 짧은 기간에도 완성도를 확보해 프로젝트 안정화에 기여했습니다.',
            en: 'Part of the Samhwa Paint FEMS adoption, this work answered a tight deadline to ship key React-based screens within a week. Drawing on extensive business web-app publishing experience, I kept quality high under the time pressure and helped stabilize the project.',
        },
        myWorks: [
            {
                ko: '1주 내 우선 구현이 필요한 React 주요 화면 단기 구축',
                en: 'Built the priority React screens needed within one week',
            },
            {
                ko: '급한 납기 속에서도 완성도를 유지하는 퍼블리싱 수행',
                en: 'Delivered publishing that held quality under a rushed deadline',
            },
        ],
        achievements: [
            {
                ko: '1주 내 주요 화면 구현으로 일정 준수·프로젝트 안정화 지원',
                en: 'Supported on-time delivery and stabilization by shipping key screens within a week',
            },
        ],
        points: [
            {
                ko: '단기 납품 대응력',
                en: 'Rapid-delivery capability',
            },
            {
                ko: 'React 퍼블리싱 경험',
                en: 'React publishing experience',
            },
        ],
        pin: false,
        duration: {
            ko: '약 1주',
            en: '~1 week',
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
            ko: '대양제지 SCM 신규 구축에서 퍼블리싱을 전담한 프로젝트입니다. 이전 다수의 프로젝트에서 축적한 공통 컴포넌트 정리·재사용 경험을 적극 활용해, 전체 퍼블리싱 공수를 약 60% 절감하면서 유지보수성과 확장성까지 챙겼습니다.',
            en: 'A new SCM build where I owned publishing. By leaning on reusable common-component patterns accumulated across prior projects, I cut total publishing effort by about 60% while keeping maintainability and scalability in mind.',
        },
        myWorks: [
            {
                ko: '공통 UI 요소를 체계화하고 재사용 구조로 반영',
                en: 'Systematized shared UI elements and applied a reuse-oriented structure',
            },
            {
                ko: '컴포넌트 기반 퍼블리싱으로 화면 일관성 확보',
                en: 'Ensured screen consistency through component-based publishing',
            },
            {
                ko: '유지보수·확장성을 고려한 마크업 설계',
                en: 'Designed markup for maintainability and scalability',
            },
        ],
        achievements: [
            {
                ko: '공통 컴포넌트 재사용으로 전체 퍼블리싱 공수 약 60% 절감',
                en: 'Cut total publishing effort by ~60% through component reuse',
            },
            {
                ko: '퍼블리싱 효율화로 개발 일정 단축에 기여',
                en: 'Contributed to a shorter schedule via publishing efficiency',
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
            ko: '대양판지 SCM 리뉴얼에서 고객 버전과 관리자 버전을 분리해 퍼블리싱한 프로젝트입니다. 고객 버전은 HTML로 구현하고, 관리자 버전은 HTML 퍼블리싱 이후 React 구조에 맞춰 컴포넌트로 전환하며 한 프로젝트 안에서 두 가지 화면 전략을 다뤘습니다.',
            en: 'An SCM renewal where I published customer and admin versions separately. The customer version was implemented in HTML, while the admin version was published in HTML and then componentized to fit a React structure—handling two screen strategies within one project.',
        },
        myWorks: [
            {
                ko: '고객 버전 HTML 퍼블리싱',
                en: 'Published the customer version in HTML',
            },
            {
                ko: '관리자 버전을 React 구조에 맞춰 컴포넌트로 제작',
                en: 'Built admin components aligned to a React structure',
            },
            {
                ko: '버전별 요구사항에 맞춘 화면 분리·구성',
                en: 'Split and structured screens per version requirements',
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
            ko: '단방향 소통에 머물던 단조로운 기존 홈페이지를 개선하기 위해 리뉴얼을 직접 건의하고, 기획·디자인·퍼블리싱·배포·운영까지 일체형으로 수행한 프로젝트입니다. 성공적인 홈페이지 레퍼런스를 수집해 콘텐츠를 기획하고, SEO·오픈그래프를 챙긴 뒤 후이즈 호스팅으로 올려 지금까지 관리하고 있습니다.',
            en: 'After proposing the renewal myself, I delivered our plain, one-way corporate site end to end—planning, design, publishing, deployment, and operation. I gathered references from strong sites to plan content, applied SEO and Open Graph, and deployed via Whois hosting, maintaining it ever since.',
        },
        myWorks: [
            {
                ko: '홈페이지에 담길 콘텐츠를 직접 기획하고 성공 레퍼런스 수집·활용',
                en: 'Planned the site content myself and gathered/applied successful references',
            },
            {
                ko: 'SEO·오픈그래프 프로토콜을 반영한 퍼블리싱 수행',
                en: 'Published with SEO and Open Graph protocol in mind',
            },
            {
                ko: '후이즈 호스팅으로 배포하고 이후 지속 운영·관리',
                en: 'Deployed via Whois hosting and kept operating it afterward',
            },
        ],
        achievements: [
            {
                ko: '단방향 구조를 개선해 기업 전문성·브랜드 신뢰도 향상에 기여',
                en: 'Improved the one-way structure, lifting corporate professionalism and brand trust',
            },
        ],
        points: [
            {
                ko: '기획-구현-운영 일체형 수행',
                en: 'End-to-end plan, build, and operate',
            },
            {
                ko: '브랜드 신뢰도 개선 기여',
                en: 'Contributed to brand trust',
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
            ko: '인천대학교 공과대학 홈페이지 리뉴얼 퍼블리싱을 담당한 프로젝트입니다. 학교가 공유한 브로슈어와 공식 홈페이지의 교수님 데이터가 서로 맞지 않는 문제를 그냥 넘기지 않고, 주인의식을 갖고 학교에 직접 건의해 정확한 정보로 수정·보완되도록 했습니다.',
            en: 'A renewal where I owned publishing for the engineering college site. When the school’s brochure and the official site’s faculty data didn’t match, I didn’t let it slide—I took ownership and raised it with the school so the information was corrected and completed.',
        },
        myWorks: [
            {
                ko: '공과대학 홈페이지 퍼블리싱 전담',
                en: 'Owned publishing for the engineering college site',
            },
            {
                ko: '브로슈어와 홈페이지 데이터 불일치를 발견해 학교에 개선 건의',
                en: 'Spotted brochure-vs-site data mismatches and proposed corrections to the school',
            },
            {
                ko: '정확한 정보로 데이터 수정·추가 반영',
                en: 'Reflected accurate data through corrections and additions',
            },
        ],
        achievements: [
            {
                ko: '주도적 문제 제기로 홈페이지 정보 정확성 개선',
                en: 'Improved site data accuracy through a proactive flag',
            },
        ],
        points: [
            {
                ko: '주도적 문제 발견·해결',
                en: 'Proactive problem discovery and fix',
            },
            {
                ko: '주인의식 기반 개선',
                en: 'Ownership-driven improvement',
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
            ko: '태림포장 TOS 리뉴얼',
            en: 'Tailim TOS Renewal',
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
            ko: '태림포장 사내 주문 시스템(TOS) 리뉴얼에서 퍼블리싱을 담당한 프로젝트입니다. 전자정부 프레임워크 환경에서 업무 시스템 화면을 다루며, 이후 태림포장과의 장기 협업(TOMS·TMS)으로 이어지는 첫 작업이었습니다.',
            en: 'A renewal of Tailim Packaging’s internal order system (TOS) where I handled publishing. Working with business-system screens on the eGovFrame stack, it was the first of a long collaboration with Tailim that later included TOMS and TMS.',
        },
        myWorks: [
            {
                ko: '사내 주문 시스템 리뉴얼 화면 퍼블리싱',
                en: 'Published the internal order-system renewal screens',
            },
            {
                ko: '전자정부 프레임워크 환경에 맞춘 마크업 구성',
                en: 'Structured markup for the eGovFrame environment',
            },
        ],
        achievements: [],
        points: [
            {
                ko: '업무 시스템 퍼블리싱',
                en: 'Business-system publishing',
            },
            {
                ko: '장기 고객 협업의 출발점',
                en: 'Start of a long client relationship',
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
