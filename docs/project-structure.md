# Project Structure

이 문서는 저장소의 현재 폴더 구조와 각 폴더의 책임을 정리합니다. `.git`, `.nuxt`, `.output`, `node_modules`처럼 도구가 생성하거나 관리하는 폴더는 제외합니다.

## Root

| 폴더           | 담당                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `.vscode/`     | 로컬 에디터 설정. 앱 실행·빌드 로직에는 관여하지 않습니다.                                                      |
| `assets/`      | Nuxt가 번들링하는 정적 자산과 SCSS 소스. 폰트, 프로필 이미지, 디자인 토큰, 페이지별 스타일을 둡니다.            |
| `components/`  | Vue 컴포넌트. base, layout, home, work, gallery, renderers처럼 화면 역할별로 나눕니다.                          |
| `composables/` | 여러 화면에서 재사용하는 언어, 테마, SEO, 내비게이션, 갤러리, 이력 로직을 둡니다.                               |
| `data/`        | 현재 언어의 프로젝트 데이터가 따르는 TypeScript 타입만 관리합니다.                                              |
| `docs/`        | 프로젝트 설명 문서. 구조, 데이터 관리 방식, 디자인 시스템, 성능 개선 계획을 기록합니다.                         |
| `i18n/`        | 한국어/영어 전체 콘텐츠. UI 문구, 프로필, 프로젝트, 여정, 스킬, SEO 문구를 `ko.json`, `en.json`에서 관리합니다. |
| `pages/`       | Nuxt 파일 기반 라우트. 홈, 프로젝트 아카이브/상세, 개인 작업 아카이브/상세, 디자인 토큰 페이지를 담당합니다.    |
| `plugins/`     | 브라우저에서만 실행해야 하는 방문 분석 스크립트를 둡니다.                                                       |
| `public/`      | 빌드 과정 없이 그대로 배포되는 파일. 이력서, 2025 정적 버전, OG 이미지, favicon, sitemap 등을 둡니다.           |

## Assets

| 폴더                      | 담당                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `assets/font/`            | Pretendard 웹폰트 파일. `assets/style/abstracts/_fonts.scss`에서 등록합니다.                         |
| `assets/images/`          | 번들링 대상 이미지. 현재 프로필 이미지처럼 Nuxt 컴포넌트에서 import/resolve될 수 있는 자산을 둡니다. |
| `assets/style/`           | 전체 SCSS 진입점과 스타일 모듈. `main.scss`가 모든 하위 모듈을 조합합니다.                           |
| `assets/style/abstracts/` | `_theme.scss`(색), `_tokens.scss`(foundation·Sass), `_fonts.scss`.                                   |
| `assets/style/base/`      | reset, 버튼, 라벨, 배지, 카드, 섹션 타이틀, editorial year 등 primitive 스타일.                      |
| `assets/style/layout/`    | 앱 shell, header, footer, dock, page layer, section 레이아웃.                                        |
| `assets/style/home/`      | 홈 섹션별 스타일 — hero, about, works, personal, journey, toolbox, contact, touch/responsive.        |
| `assets/style/gallery/`   | 갤러리 공유 변수(`vars`), 아카이브(`archive`), 상세(`detail`) 페이지 스타일.                         |
| `assets/style/motion/`    | CSS 기반 스크롤 보조 효과.                                                                           |
| `assets/style/pages/`     | 페이지 단위 예외 스타일. 현재 error page 스타일을 둡니다.                                            |

## Components

| 폴더                    | 담당                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `components/base/`      | BaseLink, BaseButton, BaseCard, BaseLabel, BaseSectionTitle, BaseYearTimeline 같은 primitive/공통 UI.  |
| `components/layout/`    | AppLayout, AppHeader, AppFooter, AppLnb, AppDock 등 앱 shell 컴포넌트.                                 |
| `components/home/`      | Hero, Why, Showcase, Proof, How, Journey, Toolbox, Highlights, Contact 섹션.                           |
| `components/work/`      | ProjectGalleryCard, TimelineItem, GalleryEmptyCapture 같은 작업·갤러리 카드 패턴.                      |
| `components/gallery/`   | 프로젝트/개인 아카이브 목록·상세 화면 컴포넌트. 라우트 데이터는 `composables/gallery/`에서 공급합니다. |
| `components/renderers/` | 홈·갤러리의 탭 패널과 리스트 뷰처럼 반복 마크업을 분리한 UI.                                           |

## Data

| 폴더/파일       | 담당                                     |
| --------------- | ---------------------------------------- |
| `data/works.ts` | 현재 언어로 변환된 프로젝트 데이터 타입. |
| `i18n/ko.json`  | 한국어 UI 문구와 전체 콘텐츠.            |
| `i18n/en.json`  | 영어 UI 문구와 전체 콘텐츠.              |

## Composables

| 폴더/파일                  | 담당                                                            |
| -------------------------- | --------------------------------------------------------------- |
| `composables/useLocale.ts` | 현재 언어의 `t()` 문구와 `content` 데이터를 제공합니다.         |
| `composables/useTheme.ts`  | `useState` 기반 라이트/다크 테마 토글.                          |
| `composables/gallery/`     | 실무·개인 갤러리에서 함께 쓰는 정렬, 연도 그룹, 상세 조회 로직. |
| `composables/portfolio/`   | 여러 화면에서 재사용하는 이력 보기, SEO, 링크 상태, 경로 처리.  |

## Pages

| 폴더/파일         | 담당                                                        |
| ----------------- | ----------------------------------------------------------- |
| `pages/index.vue` | 홈 페이지. 섹션 순서와 링크를 템플릿 가까이에서 관리합니다. |
| `pages/projects/` | 실무 프로젝트 아카이브와 상세 라우트.                       |
| `pages/personal/` | 개인 작업 아카이브, 상세 라우트, 디자인 토큰 페이지.        |

## Plugins And State

| 폴더/파일                     | 담당                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| `plugins/analytics.client.ts` | GTM·GA4·네이버 WCS 로드 (`.env` → `runtimeConfig.public`). |

## Public

| 폴더/파일                                                    | 담당                                                           |
| ------------------------------------------------------------ | -------------------------------------------------------------- |
| `public/favicon.svg`                                         | 사이트 favicon.                                                |
| `public/robots.txt`, `public/sitemap.xml`, `public/_headers` | 배포용 검색/헤더 메타 파일.                                    |
| `public/images/`                                             | 배포 경로가 고정된 이미지. OG 이미지와 프로젝트 캡처를 둡니다. |
| `public/files/Resume.pdf`                                    | 채용·지원용 PDF 이력서.                                        |
| `public/ver.2025/`                                           | 2025년 이전 정적 포트폴리오 아카이브.                          |

## Removed Or Consolidated

| 이전 항목                                                             | 정리 결과                                                                   |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `design-tokens.json`, `npm run tokens:sync`, `_tokens.generated.scss` | 색·토큰은 `_theme.scss` + `_tokens.scss`만 사용. JSON sync 파이프라인 제거. |
| `composables/portfolio/useAppPathResolver.ts`                         | `useAppPath.ts`와 중복되어 제거.                                            |
| `api/`                                                                | 미사용 제거. 필요 시 `server/api` 등으로 재설계.                            |
| `layouts/default.vue`                                                 | `app.vue`가 `NuxtPage` 직접 렌더.                                           |
| `app/`, `core/`, `composables/ui/`                                    | 한 곳에서만 쓰던 설정·타입·유틸을 사용 위치로 통합하거나 제거.              |
