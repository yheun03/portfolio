# Portfolio

웹 퍼블리셔 **은영환**의 개인 포트폴리오 사이트입니다. Nuxt 3로 구성된 인터랙티브 홈과, 채용·지원용으로 쓰는 **정적 이력서 문서**를 한 저장소에서 함께 관리합니다.

## 무엇이 들어 있나

| 구분                  | 설명                                                                | 접근                                 |
| --------------------- | ------------------------------------------------------------------- | ------------------------------------ |
| **포트폴리오 (Nuxt)** | 프로필, 경력·개인 프로젝트, 갤러리, 다국어(ko/en), 라이트/다크 테마 | `/` · `/projects` · `/personal`      |
| **이력서**            | 사람인 양식 기반 정적 HTML (프로필·학력·경력 요약)                  | [`/resume.html`](public/resume.html) |
| **자기소개서**        | 동일 HTML 내 `resume_letter` 섹션                                   | 위 이력서 페이지                     |
| **경력기술서**        | 동일 HTML 내 프로젝트별 상세 경력                                   | 위 이력서 페이지                     |

홈 **연락처** 섹션의 「이력서 보기」 링크가 `public/resume.html`로 연결됩니다. 스타일·인쇄용 자산은 `public/resume/`에 있습니다.

이전 버전(2025 정적 사이트)은 `public/ver.2025/`에 보관되어 있습니다.

## 기술 스택

- **Nuxt 3** · Vue 3 · Pinia
- **SCSS** 디자인 토큰 (`assets/style/abstracts/_tokens.scss`)
- **GSAP** (히어로·모션)
- **GitHub Pages** 배포 (`baseURL`: `/portfolio/`)

## 문서

- **[프로젝트 폴더 구조](docs/project-structure.md)** — 전체 폴더별 책임과 통합된 `core` 구조
- **[데이터 · 다국어 구조](docs/project-data-notes.md)** — `data`, `i18n`, 작업 데이터, 갤러리 라우트
- **[디자인 시스템](docs/design-system.md)** — 컴포넌트·토큰·Figma 매핑
- **[Lighthouse 로드맵](docs/lighthouse-roadmap.md)** — 성능·접근성 개선 계획

## 프로젝트 구조

Nuxt 관례에 맞춰 화면 계층은 루트에서 관리하고, 설정성 코드와 순수 유틸은 `core/`로 통합했습니다. 전체 폴더 설명은 [project-structure.md](docs/project-structure.md)를 기준으로 합니다.

```
├── components/          # Vue 컴포넌트 (폴더명 PascalCase)
│   ├── Base/            # 버튼, 카드, 라벨 등 primitive
│   ├── Work/            # 작업 카드, 타임라인, 갤러리 카드
│   ├── Home/            # 홈 섹션 (Hero, Works, About, …)
│   ├── Layout/          # AppLayout, Header, Footer, Lnb, Dock
│   ├── Gallery/         # 프로젝트 아카이브·상세
│   └── Motion/          # 모션 타이포그래피
├── pages/               # 라우트 (index, projects, personal)
├── data/
│   ├── works/           # 경력·개인 프로젝트 (카테고리별 TS)
│   └── site/            # 프로필, 소개, 여정, 스킬, 하이라이트
├── core/                # config, router options, shared types, utils
│   ├── config/
│   ├── types/
│   └── utils/
├── composables/         # 재사용 런타임 로직
├── plugins/             # Nuxt 클라이언트/앱 플러그인
├── stores/              # Pinia 상태
├── i18n/                # UI 문구 (ko.json, en.json)
├── public/
│   ├── resume.html      # 이력서 · 자기소개서 · 경력기술서
│   └── resume/          # 이력서 전용 CSS·이미지
└── assets/style/        # SCSS (base, layout, home, work, gallery, motion)
```

## 로컬 실행

```bash
npm install
npm run dev          # http://localhost:3000/portfolio/
npm run dev:root     # http://localhost:3000/ (로컬 루트 서빙이 필요할 때)
npm run dev:host     # 0.0.0.0:3005
```

기본 개발 서버도 GitHub Pages와 동일한 `/portfolio/` 경로로 실행됩니다. 로컬 루트(`/`)로 확인해야 할 때만 `npm run dev:root`를 사용합니다.

## 배포

```bash
npm run build    # 프로덕션 빌드
npm run deploy   # build + gh-pages 브랜치 배포
```

## 디자인 토큰 (요약)

토큰은 `assets/style/abstracts/_tokens.scss`에 정의되며, `nuxt.config.ts`에서 전역 `@use`됩니다. 화면 진입점은 `assets/style/main.scss`입니다.

- **색상**: `$grayscale-*`, `$primary-*`, `$state-*` (다크 모드는 CSS 변수만 교체)
- **타이포**: `@include font(heading-1)` 등 프리셋 (`heading-*`, `title-*`, `body-*`, `caption-*`, `label`, `button`)
- **간격·형태**: `$space-*`, `$radius-*`, `$shadow-*`

자세한 사용 예와 컴포넌트 매핑은 [design-system.md](docs/design-system.md)를 참고하세요.

```scss
@use 'abstracts/tokens' as *;

.card {
    color: $grayscale-900;
    background: $grayscale-0;
    padding: $space-7;
    border-radius: $radius-card;
}

.hero-title {
    @include font(heading-1);
}
```

## 스크립트

| 명령               | 설명                              |
| ------------------ | --------------------------------- |
| `npm run dev`      | 개발 서버 (`/portfolio/` baseURL) |
| `npm run dev:root` | 개발 서버 (`/` baseURL)           |
| `npm run build`    | 프로덕션 빌드                     |
| `npm run generate` | 정적 생성                         |
| `npm run preview`  | 빌드 결과 미리보기                |
| `npm run deploy`   | build + GitHub Pages 배포         |
| `npm run clean`    | `.nuxt`, `.output` 등 캐시 삭제   |
