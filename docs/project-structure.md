# Project Structure

이 문서는 저장소의 현재 폴더 구조와 각 폴더의 책임을 정리합니다. `.git`, `.nuxt`, `.output`, `node_modules`처럼 도구가 생성하거나 관리하는 폴더는 제외합니다.

## Root

| 폴더           | 담당                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `.vscode/`     | 로컬 에디터 설정. 앱 실행·빌드 로직에는 관여하지 않습니다.                                                        |
| `app/`         | Nuxt 앱 레벨 옵션. 현재 라우터 스크롤 정책(`router.options.ts`)을 둡니다.                                         |
| `assets/`      | Nuxt가 번들링하는 정적 자산과 SCSS 소스. 폰트, 프로필 이미지, 디자인 토큰, 페이지별 스타일을 둡니다.              |
| `components/`  | Vue 컴포넌트. base, layout, home, work, gallery, motion, page처럼 화면 역할별(소문자)로 나눕니다.                 |
| `composables/` | Vue/Nuxt 조합 함수. UI 상태 동작, 갤러리 탐색 복원, SEO, 홈 섹션 인터랙션처럼 재사용 가능한 런타임 로직을 둡니다. |
| `core/`        | 화면에 직접 종속되지 않는 설정, 공유 타입, 순수 유틸을 둡니다.                                                    |
| `data/`        | 포트폴리오 콘텐츠 데이터. 프로젝트, 프로필, 소개, 여정, 스킬, 하이라이트를 TypeScript 모듈로 관리합니다.          |
| `docs/`        | 프로젝트 설명 문서. 구조, 데이터 관리 방식, 디자인 시스템, 성능 개선 계획을 기록합니다.                           |
| `i18n/`        | 한국어/영어 UI 문자열. 네비게이션, 버튼, 섹션 제목, 메타 문구처럼 짧은 화면 문구를 관리합니다.                    |
| `pages/`       | Nuxt 파일 기반 라우트. 홈, 프로젝트 아카이브/상세, 개인 작업 아카이브/상세, 디자인 토큰 페이지를 담당합니다.      |
| `plugins/`     | Nuxt 플러그인. 앱 초기화, 분석 스크립트, 갤러리 폰트 preload, 내비게이션 복원을 담당합니다.                       |
| `public/`      | 빌드 과정 없이 그대로 배포되는 파일. 이력서, 2025 정적 버전, OG 이미지, favicon, sitemap 등을 둡니다.             |
| `stores/`      | Pinia 전역 상태. 언어 선호와 Works/Highlights UI 선택 상태를 관리합니다.                                          |

## Assets

| 폴더                      | 담당                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `assets/font/`            | Pretendard 웹폰트 파일. `assets/style/abstracts/_fonts.scss`에서 등록합니다.                                                         |
| `assets/images/`          | 번들링 대상 이미지. 현재 프로필 이미지처럼 Nuxt 컴포넌트에서 import/resolve될 수 있는 자산을 둡니다.                                 |
| `assets/style/`           | 전체 SCSS 진입점과 스타일 모듈. `main.scss`가 모든 하위 모듈을 조합합니다.                                                           |
| `assets/style/abstracts/` | 디자인 토큰(`_tokens.scss`, `_tokens.generated.scss`), 폰트 등록, Sass mixin/function. `design-tokens.json` → `npm run tokens:sync`. |
| `assets/style/base/`      | reset, skeleton, 버튼, 라벨, 배지, 카드, 섹션 타이틀, editorial year 등 primitive 스타일.                                            |
| `assets/style/layout/`    | 앱 shell, header, footer, dock, page layer, section 레이아웃.                                                                        |
| `assets/style/home/`      | 홈 섹션별 스타일 — hero, about, works, personal, journey, toolbox, contact, touch/responsive.                                        |
| `assets/style/work/`      | WorkCard 등 작업 카드 패턴 스타일.                                                                                                   |
| `assets/style/gallery/`   | 갤러리 공유 변수(`vars`), 아카이브(`archive`), 상세(`detail`) 페이지 스타일.                                                         |
| `assets/style/motion/`    | 모션 타이포그래피 스타일.                                                                                                            |
| `assets/style/pages/`     | 페이지 단위 예외 스타일. 현재 error page 스타일을 둡니다.                                                                            |

## Components

| 폴더                  | 담당                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `components/base/`    | BaseLink, BaseButton, BaseCard, BaseLabel, BaseSectionTitle, BaseYearTimeline 같은 primitive/공통 UI.    |
| `components/layout/`  | AppLayout, AppHeader, AppFooter, AppLnb, AppDock 등 앱 shell 컴포넌트.                                   |
| `components/home/`    | Hero, Works, Personal, About, Journey, Toolbox, Highlights, Contact + `*Renderer` (모달·탭패널·뷰 전환). |
| `components/work/`    | WorkCard, ProjectGalleryCard, TimelineItem, GalleryEmptyCapture 같은 작업·갤러리 카드 패턴.              |
| `components/gallery/` | 프로젝트/개인 아카이브 목록·상세 화면 컴포넌트. 라우트 데이터는 `composables/gallery/`에서 공급합니다.   |
| `components/motion/`  | TypoDisplayHeading처럼 텍스트 모션 전용 컴포넌트.                                                        |
| `components/page/`    | 페이지 전용 오버레이·임시 UI (예: TempMainProgressModalRenderer).                                        |

## Core And App

| 폴더/파일               | 담당                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `app/router.options.ts` | Nuxt 표준 라우터 옵션. 해시 스크롤, 저장 위치, 갤러리 목록 복귀 스크롤 복원을 담당합니다.  |
| `core/config/`          | 런타임 데이터가 아닌 설정성 TS 모듈. 홈 섹션 순서, SEO, tablist 접근성 기본값을 둡니다.    |
| `core/types/`           | 앱 전역 공유 타입. Highlight tab key, editorial year 렌더링 타입을 둡니다.                 |
| `core/utils/`           | 순수 유틸. 앵커 스크롤, 작업 정렬/연도 그룹, 갤러리 placeholder capture 판별을 담당합니다. |

## Data

| 폴더/파일               | 담당                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `data/works.ts`         | 작업 데이터 타입, 카테고리, 통합 목록, 상세 조회 함수.                                               |
| `data/works/`           | 실무·개인 프로젝트 원천 데이터. project, operation, solution, renewal, award, personal로 분리합니다. |
| `data/site.ts`          | 사이트 콘텐츠 barrel. profile, about, journey, skills, highlights를 모읍니다.                        |
| `data/site/`            | 프로필, 소개, 여정, 스킬 등 홈 콘텐츠 원천 데이터.                                                   |
| `data/site/highlights/` | 수상, 자격, 역할, 활동 목록과 탭 설명 데이터.                                                        |

## Composables

| 폴더/파일                  | 담당                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `composables/useLocale.ts` | i18n 문자열 선택과 `{ ko, en }` 데이터 선택 helper.                                                      |
| `composables/gallery/`     | 갤러리 목록/상세 UX. 정렬, 뷰 모드, 목록 복귀 스냅샷, 포커스 복원을 담당합니다.                          |
| `composables/portfolio/`   | 홈 포트폴리오 UX. 카운트업, GSAP, 여정 보기, Works/Highlights 탭 렌더링, SEO, 상세 라벨 등을 담당합니다. |
| `composables/ui/`          | UI 공통 동작. 모달 포커스 트랩, 좁은 화면 감지, scroll spy, 탭 키보드, 타이포 hover 상태.                |

## Pages

| 폴더/파일         | 담당                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| `pages/index.vue` | 홈 페이지. `core/config/home-sections.ts`의 섹션 그룹을 컴포넌트로 매핑합니다. |
| `pages/projects/` | 실무 프로젝트 아카이브와 상세 라우트.                                          |
| `pages/personal/` | 개인 작업 아카이브, 상세 라우트, 디자인 토큰 페이지.                           |

## Plugins And Stores

| 폴더/파일                              | 담당                                    |
| -------------------------------------- | --------------------------------------- |
| `plugins/app-init.client.ts`           | 클라이언트 앱 시작 시 언어 초기화.      |
| `plugins/analytics.client.ts`          | 분석 스크립트 초기화.                   |
| `plugins/gallery-fonts.client.ts`      | 갤러리 페이지 폰트 preload/최적화.      |
| `plugins/navigation-restore.client.ts` | 갤러리 목록 복귀 시 스크롤/포커스 복원. |
| `stores/localeStore.ts`                | locale 선호 상태와 html lang 동기화.    |
| `stores/worksUiStore.ts`               | Works 탭/모달 상태.                     |
| `stores/highlightsUiStore.ts`          | Highlights 탭 상태.                     |

## Public

| 폴더/파일                                                    | 담당                                                           |
| ------------------------------------------------------------ | -------------------------------------------------------------- |
| `public/favicon.svg`                                         | 사이트 favicon.                                                |
| `public/robots.txt`, `public/sitemap.xml`, `public/_headers` | 배포용 검색/헤더 메타 파일.                                    |
| `public/images/`                                             | 배포 경로가 고정된 이미지. OG 이미지와 프로젝트 캡처를 둡니다. |
| `public/files/Resume.pdf`                                    | 채용·지원용 PDF 이력서.                                        |
| `public/ver.2025/`                                           | 2025년 이전 정적 포트폴리오 아카이브.                          |

## Removed Or Consolidated

| 이전 폴더  | 정리 결과                                                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `api/`     | 실제 사용처가 없어 제거했습니다. 런타임 API가 생기면 Nuxt 서버 라우트(`server/api`)나 전용 클라이언트 모듈로 다시 설계합니다. |
| `config/`  | `core/config/`로 통합했습니다. `@config/*` alias는 유지합니다.                                                                |
| `types/`   | `core/types/`로 통합했습니다. `@app-types/*` alias는 유지합니다.                                                              |
| `utils/`   | `core/utils/`로 통합했습니다. `@utils/*` alias는 유지합니다.                                                                  |
| `layouts/` | 슬롯만 있던 빈 `default.vue`를 제거하고 `app.vue`가 `NuxtPage`를 직접 렌더링하도록 단순화했습니다.                            |
