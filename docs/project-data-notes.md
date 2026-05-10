# 프로젝트 데이터 · 다국어 구조 노트

포트폴리오에서 **콘텐츠(본문)** 와 **UI 문구** 가 어디에 있고, 어떻게 수정하는지 한곳에 정리한 문서입니다.

---

## 1. 디렉터리 한눈에 보기

| 경로                              | 역할                                                      |
| --------------------------------- | --------------------------------------------------------- |
| `core/data/json/works/`           | 경력·개인 **프로젝트** (카테고리별 JSON)                  |
| `core/data/json/site/`            | **프로필·소개·여정·스킬** 등 사이트 본문                  |
| `core/data/json/site/highlights/` | **수상·자격·역할·활동** 목록 + 탭 설명                    |
| `core/data/*.ts`                  | 위 JSON을 불러와 `export` (얇은 로더) + `works` 타입·조합 |
| `core/i18n/ko.json`, `en.json`    | **UI 껍데기** (네비, 버튼, 섹션 타이틀 틀, 메타 등)       |

---

## 2. `core/data/json/works/` (프로젝트)

- **파일명 = 작업 분류**  
  `project.json`, `operation.json`, `solution.json`, `renewal.json`, `award.json`, `personal.json`
- 각 파일은 **객체 배열**이며, 항목 스키마는 `core/data/works.ts`의 `WorkItem`과 맞춥니다.
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

## 3. `core/data/json/site/` (본문 JSON)

| 파일           | 용도                                   | TS 로더                                    |
| -------------- | -------------------------------------- | ------------------------------------------ |
| `profile.json` | 이름, 역할, 키워드, 통계, 연락처 등    | `profile.ts` → `profile`                   |
| `about.json`   | 소개 문단, 키워드, 원칙, 워크플로      | `about.ts` → `aboutContent`                |
| `journey.json` | `summary` + `timeline` (타임라인 배열) | `journey.ts` → `journeySummary`, `journey` |
| `skills.json`  | 툴박스(스킬 카드) 배열                 | `skills.ts` → `skills`                     |

---

## 4. `core/data/json/site/highlights/`

- `awards.json`, `certifications.json`, `roles.json`, `activities.json`: `{ "ko", "en" }` 항목 배열
- `descriptions.json`: 탭별 설명 객체 (`awards`, `certifications`, …)

로더: `core/data/highlights.ts` → `highlights` 객체.

---

## 5. TypeScript만 두는 파일 (JSON으로 안 옮긴 이유)

| 파일          | 이유                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| `homePage.ts` | 홈 **섹션 키**·**레이어 그룹** — `HomeSectionKey` 타입과 `pages/index.vue` 매핑과 맞추기 쉬움 |
| `works.ts`    | 여러 JSON **병합**, `WorkItem` 타입, `getCareerWorkById` 등                                   |

---

## 6. i18n (`core/i18n/`) vs 데이터 JSON

- **i18n**: 화면 곳곳에 붙는 **짧은 UI 문자열** (`t('nav.works')`, `gallery.duration` 등). 로케일 파일끼리 **키 구조 동일**.
- **데이터 JSON**: **구조화된 콘텐츠** (프로젝트 한 건, 소개 문단). 필드가 많고 `{ ko, en }`을 레코드 안에 두는 패턴. 컴포넌트에서는 `pick()`으로 현재 언어 선택.

둘 다 다국어를 지원하지만 **역할이 다르다**고 보면 됩니다.

---

## 7. 보조 스크립트

- `scripts/enrich-works-json.mjs`
    - 대상: `core/data/json/works/*.json`
    - `pin`, `duration`, `captures`, `languages` 등 **기본 채움** (이미 있는 값은 유지)
    - **빌드 필수 아님** — 데이터 대량 정리할 때만 실행

```bash
node scripts/enrich-works-json.mjs
```

---

## 8. 수정 시 체크리스트

1. **프로젝트 추가/수정** → 해당 카테고리 JSON (`works/`) + 필요 시 `public/sitemap.xml` URL 추가
2. **프로필·소개·여정·스킬** → `site/*.json`
3. **수상·자격증** → `site/highlights/*.json`
4. **헤더 문구·버튼** → `core/i18n/*.json`
5. **홈 섹션 순서/그룹** → `homePage.ts`

---

## 9. 관련 코드 진입점

- 작업 목록·필터·모달: `core/stores/worksUiStore.ts`, `components/Section/PortfolioWorks.vue`
- 갤러리: `pages/projects/*.vue`, `pages/personal/*.vue`
- 하이라이트 탭: `components/Section/PortfolioHighlights.vue`

---

_마지막 정리 기준: 저장소 내 `core/data` · `core/i18n` 구조와 동일하게 유지할 것._
