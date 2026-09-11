# Portfolio

웹 퍼블리셔 **은영환**의 개인 포트폴리오 사이트입니다. Nuxt 3로 구성된 인터랙티브 홈과, 채용·지원용으로 쓰는 **PDF 이력서**를 한 저장소에서 함께 관리합니다.

## 무엇이 들어 있나

| 구분                  | 설명                                                                | 접근                                           |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| **포트폴리오 (Nuxt)** | 프로필, 경력·개인 프로젝트, 갤러리, 다국어(ko/en), 일관된 단일 테마 | `/` · `/projects` · `/personal`                |
| **이력서**            | 채용·지원용 PDF 문서                                                | [`/files/Resume.pdf`](public/files/Resume.pdf) |

홈 **연락처** 섹션의 「이력서 보기」 링크가 `public/files/Resume.pdf`로 연결됩니다.

이전 버전(2025 정적 사이트)은 `public/ver.2025/`에 보관되어 있습니다.

## 기술 스택

- **Nuxt 3** · Vue 3 · Pinia
- **SCSS** — 색상 `_theme.scss`, foundation `_tokens.scss`
- **GSAP** (히어로·모션)
- **GitHub Pages** 배포 (`baseURL`: `/`)

## 문서

- **[프로젝트 폴더 구조](docs/project-structure.md)** — 전체 폴더별 책임과 `core` 앱 공용 계층
- **[데이터 · 다국어 구조](docs/project-data-notes.md)** — `data`, `i18n`, 작업 데이터, 갤러리 라우트
- **[디자인 시스템](docs/design-system.md)** — SCSS 토큰·컴포넌트·BEM
- **[문서 목록](docs/README.md)** — docs 폴더 안내
- **[Lighthouse 로드맵](docs/lighthouse-roadmap.md)** — 성능·접근성 개선 계획

## 프로젝트 구조

Nuxt 관례에 맞춰 화면 계층은 루트에서 관리하고, 설정·타입·순수 유틸은 `core/` 앱 공용 계층으로 분리했습니다. 전체 폴더 설명은 [project-structure.md](docs/project-structure.md)를 기준으로 합니다.

```
├── components/          # Vue 컴포넌트 (폴더명 PascalCase)
│   ├── base/            # 버튼, 카드, 라벨 등 primitive
│   ├── work/            # 작업 카드, 타임라인, 갤러리 카드
│   ├── home/            # 홈 섹션 (Hero, Works, About, …)
│   ├── layout/          # AppLayout, Header, Footer, Lnb, Dock
│   ├── gallery/         # 프로젝트 아카이브·상세
│   └── motion/          # 모션 타이포그래피
├── pages/               # 라우트 (index, projects, personal)
├── data/
│   ├── works/           # 경력·개인 프로젝트 (카테고리별 TS)
│   └── site/            # 프로필, 소개, 여정, 스킬, 하이라이트
├── app/                 # Nuxt 앱 옵션 (router.options.ts)
├── core/                # config, app types, pure utils
│   ├── config/
│   ├── types/
│   └── utils/
├── composables/         # 재사용 런타임 로직
├── plugins/             # Nuxt 클라이언트/앱 플러그인
├── stores/              # Pinia 상태
├── i18n/                # UI 문구 (ko.json, en.json)
├── public/
│   └── files/
│       └── Resume.pdf   # PDF 이력서
└── assets/style/        # SCSS (base, layout, home, work, gallery, motion)
```

## 환경 변수 (`.env`)

분석 스크립트 ID는 하드코딩하지 않고 `.env`로 관리합니다. 저장소에는 `.env.example`만 포함됩니다.

```bash
cp .env.example .env
```

| 변수                            | 설명                                                              |
| ------------------------------- | ----------------------------------------------------------------- |
| `NUXT_PUBLIC_GTM_ID`               | Google Tag Manager (`GTM-…`)                                      |
| `NUXT_PUBLIC_GA_MEASUREMENT_ID`    | Google Analytics 4 gtag (`G-…`, 구버전 사이트와 동일 시)          |
| `NUXT_PUBLIC_NAVER_WCS_WA`         | 네이버 `wcs_add["wa"]`                                            |
| `NUXT_PUBLIC_NAVER_WCS_SCRIPT_URL` | 네이버 `wcslog.js` URL                                            |
| `NUXT_PUBLIC_ANALYTICS_ENABLED`    | `false`면 분석 스크립트 전부 미로드                               |
| `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML 태그 값 (선택)                      |
| `NUXT_PUBLIC_NAVER_SITE_VERIFICATION`  | 네이버 서치어드바이저 사이트 소유 확인 값 (선택)               |
| `NUXT_APP_BASE_URL`             | 앱 base path (기본 `/`)                                           |

`NUXT_PUBLIC_*` 값은 **클라이언트 번들에 포함**됩니다. `plugins/analytics.client.ts`가 빌드·런타임에 이 값을 읽습니다.

GitHub Pages 배포(`npm run deploy`) 전에 로컬 `.env`를 채우거나, CI에서는 Repository secrets에 동일한 `NUXT_PUBLIC_*`를 설정하세요.

## 로컬 실행

```bash
npm install
npm run dev          # http://localhost:3000/
npm run dev:root     # http://localhost:3000/
npm run dev:host     # 0.0.0.0:3005
```

기본 개발 서버와 GitHub Pages 모두 루트(`/`) 경로로 실행됩니다.

## 배포

```bash
npm run build    # 프로덕션 빌드
npm run deploy   # build + gh-pages 브랜치 배포
```

## 디자인 토큰 (요약)

진입점: `assets/style/main.scss` (`nuxt.config.ts` → `css`).

| 파일                                  | 담당                                         |
| ------------------------------------- | -------------------------------------------- |
| `assets/style/abstracts/_theme.scss`  | 색상·그라데이션·shadow (`#0050FF` 브랜드 등) |
| `assets/style/abstracts/_tokens.scss` | typography, spacing, radius, Sass mixin      |

- **색상**: `_theme.scss`만 편집. Sass에서는 `$primary-600`, `var(--color-primary)` 등 사용.
- **타이포**: `@include font(heading-1)` 등 (`_tokens.scss`의 `$font-presets`)
- **테마**: 헤더 토글 + `stores/theme.ts` → `html[data-theme]`

자세한 내용은 [design-system.md](docs/design-system.md)를 참고하세요.

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
| `npm run dev`      | 개발 서버 (`/` baseURL)           |
| `npm run dev:root` | 개발 서버 (`/` baseURL)           |
| `npm run build`    | 프로덕션 빌드                     |
| `npm run generate` | 정적 생성                         |
| `npm run preview`  | 빌드 결과 미리보기                |
| `npm run deploy`   | build + GitHub Pages 배포         |
| `npm run clean`    | `.nuxt`, `.output` 등 캐시 삭제   |
