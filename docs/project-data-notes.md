# 프로젝트 데이터 · 다국어 구조 노트

포트폴리오에서 **콘텐츠(본문)** 와 **UI 문구** 가 어디에 있고, 어떻게 수정하는지 한곳에 정리한 문서입니다.

---

## 1. 디렉터리 한눈에 보기

| 경로                               | 역할                                                |
| ---------------------------------- | --------------------------------------------------- |
| `data/works/`                      | 경력·개인 **프로젝트** (카테고리별 TS 데이터)       |
| `data/site/`                       | **프로필·소개·여정·스킬** 등 사이트 본문            |
| `data/site/highlights/`            | **수상·자격·역할·활동** 목록 + 탭 설명              |
| `data/site.ts`, `data/works.ts`    | 사이트 데이터 export + 작업 타입·조합               |
| `i18n/ko.json`, `i18n/en.json`     | **UI 껍데기** (네비, 버튼, 섹션 타이틀 틀, 메타 등) |
| `stores/appPreferenceStore.ts`     | 언어·테마 등 앱 환경 설정 상태                      |
| `stores/portfolioUiStore.ts`       | Works·Highlights 등 포트폴리오 UI 상태              |
| `composables/`, `plugins/`         | 화면 로직, Nuxt 플러그인                           |
| `core/`                            | 라우터 옵션과 앱 설정성 TS 모듈                    |

---

## 2. `data/works/` (프로젝트)

- **파일명 = 작업 분류**  
  `project.ts`, `operation.ts`, `solution.ts`, `renewal.ts`, `award.ts`, `personal.ts`
- 각 파일은 **객체 배열**이며, 항목 스키마는 `data/works.ts`의 `WorkItem`과 맞춥니다.
- 공통으로 자주 쓰는 필드:
    - `id`, `category`, `title` / `type` / `role` / `introduction` 등: `{ "ko": "...", "en": "..." }`
    - `pin`: 메인 홈의 Works / Personal 섹션에 **대표 카드로만** 노출할지 (`true`만 표시)
    - `duration`, `captures`, `languages`: 갤러리·상세 페이지용
    - `tech`, `myWorks`, `achievements`, `points`: 상세·모달용

**합쳐진 목록**은 `works.ts`에서 `careerWorks`(실무 JSON들 합침) + `personalWorksList` → 전체 `works`.

**갤러리 라우트**

- 실무: `/projects`, `/projects/[id]`
- 개인: `/personal`, `/personal/[id]`

---

## 3. `data/site/` (본문 TS)

| 파일         | 용도                                   | TS export                      |
| ------------ | -------------------------------------- | ------------------------------ |
| `profile.ts` | 이름, 역할, 키워드, 통계, 연락처 등    | `site.ts` → `profile`          |
| `about.ts`   | 소개 문단, 키워드, 원칙, 워크플로      | `site.ts` → `aboutContent`     |
| `journey.ts` | `summary` + `timeline` (타임라인 배열) | `site.ts` → `journeyCompanies` |
| `skills.ts`  | 툴박스(스킬 카드) 배열                 | `site.ts` → `skills`           |

---

## 4. `data/site/highlights/`

- `awards.ts`, `certifications.ts`, `roles.ts`, `activities.ts`: `{ "ko", "en" }` 항목 배열
- `descriptions.ts`: 탭별 설명 객체 (`awards`, `certifications`, …)

로더: `data/site.ts` → `highlights` 객체.

---

## 5. TypeScript만 두는 파일 (JSON으로 안 옮긴 이유)

| 파일                 | 이유                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `core/config/homePage.ts` | 홈 **섹션 키**·**레이어 그룹** — `HomeSectionKey` 타입과 `pages/index.vue` 매핑과 맞추기 쉬움 |
| `data/works.ts`      | 여러 데이터 **병합**, `WorkItem` 타입, `getCareerWorkById` 등                                 |

---

## 6. i18n (`i18n/`) vs 데이터 TS

- **i18n**: 화면 곳곳에 붙는 **짧은 UI 문자열** (`t('nav.works')`, `gallery.duration` 등). 로케일 파일끼리 **키 구조 동일**.
- **데이터 TS**: **구조화된 콘텐츠** (프로젝트 한 건, 소개 문단). 필드가 많고 `{ ko, en }`을 레코드 안에 두는 패턴. 컴포넌트에서는 `pick()`으로 현재 언어 선택.

둘 다 다국어를 지원하지만 **역할이 다르다**고 보면 됩니다.

---

## 7. 보조 스크립트

- 현재 프로젝트 데이터는 TS 모듈에서 직접 관리합니다.
- `pin`, `duration`, `captures`, `languages` 등 기본 필드는 `data/works/*.ts`에 명시합니다.

---

## 8. 수정 시 체크리스트

1. **프로젝트 추가/수정** → 해당 카테고리 데이터 (`data/works/`) + 필요 시 `public/sitemap.xml` URL 추가
2. **프로필·소개·여정·스킬** → `data/site/*.ts`
3. **수상·자격증** → `data/site/highlights/*.ts`
4. **헤더 문구·버튼** → `i18n/*.json`
5. **홈 섹션 순서/그룹** → `core/config/homePage.ts`

---

## 9. 관련 코드 진입점

- 작업 목록·필터·모달: `stores/portfolioUiStore.ts`, `components/home/PortfolioWorks.vue`
- 갤러리: `components/gallery/GalleryArchivePage.vue`, `GalleryDetailPage.vue` (공통 화면) · `composables/gallery/useGalleryRouteData.ts` (라우트 데이터) · `pages/projects/*`, `pages/personal/*` (URL 엔트리)
- 하이라이트 탭: `components/home/PortfolioHighlights.vue`

---

_마지막 정리 기준: 저장소 내 `data` · `i18n` 구조와 동일하게 유지할 것._
