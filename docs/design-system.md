# Design System

코드 기준 디자인 시스템 문서입니다.

## Token sources

| 파일           | 역할                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------- |
| `_theme.scss`  | 색 팔레트, `--color-*`, gradient, shadow, gallery/shell 색 alias                             |
| `_tokens.scss` | `:root` foundation(폰트·여백·radius·layout), `$bp-*`, `@mixin font`, 반응형 `:root` override |
| `main.scss`    | `tokens` → `theme` 순 로드 (**theme이 색을 최종 확정**)                                      |

라이트/다크: `:root[data-theme="light|dark"]`, `prefers-color-scheme`, `composables/useTheme.ts` + 헤더 테마 토글.

## Design principles

- **역할 이름 우선**: `--color-surface`, `--space-section-y`처럼 UI 역할로 이름을 맞춘다.
- **글로벌 BEM**: 스타일은 `assets/style/` SCSS. co-located `<style>`은 예외(`pages/personal/design-tokens.vue` 등).
- **렌더러 분리**: 모달·탭 패널·뷰 전환은 `components/renderers/*Renderer.vue`.

## Color (light / production)

편집: `assets/style/abstracts/_theme.scss` → `theme-light-palette` mixin.

| Token                    | 값 (요약) | Usage                     |
| ------------------------ | --------- | ------------------------- |
| `--color-primary`        | `#0050ff` | CTA, focus, active nav    |
| `--color-primary-dark`   | `#0040cc` | 강조 보조                 |
| `--primary-600`          | `#0050ff` | Sass `$primary-600` alias |
| `--color-bg`             | `#f2f4f6` | page background           |
| `--color-surface`        | `#fff`    | cards, panels             |
| `--color-surface-strong` | `#e5e8eb` | tabs, elevated surface    |
| `--color-text`           | `#333d4b` | body                      |
| `--color-text-muted`     | `#6b7684` | secondary                 |
| `--color-border`         | `#d1d6db` | borders                   |
| `--accent-hot`           | `#6b7fff` | hero mesh accent          |
| `--accent-mint`          | `#4dc9ff` | hero mesh accent          |
| `--color-on-primary`     | `#fff`    | text on filled buttons    |

Primary scale: `--primary-50` … `--primary-900` (앵커 `#0050ff`).

| Gradient                 | Role                |
| ------------------------ | ------------------- |
| `--gradient-accent`      | CTA, active tab/nav |
| `--gradient-accent-soft` | decorative wash     |
| `--gradient-surface`     | `BaseCard`          |
| `--gradient-noise`       | app background      |
| `--gradient-hero-mesh`   | hero atmosphere     |

## Typography

`:root` foundation + `_tokens.scss` media query override (narrow/mobile display scale).

| Token                                          | Usage                         |
| ---------------------------------------------- | ----------------------------- |
| `--font-display`, `--font-body`, `--font-mono` | font stacks                   |
| `--font-size-display-1` … `--font-size-xs`     | type scale                    |
| `@include font(title-2)` 등                    | Sass preset (`$font-presets`) |

## Spacing & layout

### Viewport tiers (`_tokens.scss` `:root` + `layout/_viewport.scss`)

| 구간        | Sass                        | 페이지 여백·리듬                                                                         |
| ----------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| **Mobile**  | `≤767px` (`$bp-max-mobile`) | `--page-pad-x` ~1–1.35rem, `--section-pad-y` 타이트, 스와이프 카드 `min(88vw, 21rem)`    |
| **Tablet**  | `768–1023px`                | `--page-pad-x` ~1.35–2.25rem, 2열 toolbox·히어로 CTA 그리드, 스와이프 `min(44vw, 20rem)` |
| **Desktop** | `≥1024px`                   | `:root` baseline, 섹션은 `layout/_shell.scss` 중앙 컬럼 + grid                           |

공통 rhythm 토큰 (handheld·desktop 모두):

| Token                                             | Notes                                |
| ------------------------------------------------- | ------------------------------------ |
| `--page-pad-x`, `--page-pad-hero`                 | 좌우 페이지 패딩                     |
| `--section-pad-y`, `--section-gap`, `--block-gap` | 섹션 세로·내부 간격                  |
| `--swipe-card-width`                              | Works/Personal 가로 스크롤 카드 폭   |
| `--inset-page`                                    | `--page-pad-x` alias (shell·dock)    |
| `--touch-pad-x`, `--touch-stack-gap`              | legacy alias → 위 토큰               |
| `--space-1` … `--space-11`, `--space-fluid-*`     | compact / fluid scale                |
| `--card-padding`, `--card-padding-lg`             | 카드 내부 패딩 (viewport별 override) |
| `--layout-header-height`                          | 고정 헤더 높이 기본값                |
| `--layout-content-max`                            | `1680px`                             |

## Radius

`--radius-card`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-pill`

## SCSS module map

| Folder              | 담당                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `abstracts/`        | `_theme.scss`, `_tokens.scss`, `_fonts.scss`                         |
| `base/`             | reset, skeleton, button, label, badge, progress, card, section-title |
| `layout/`           | shell, **viewport**, header, footer, dock                            |
| `home/`             | section composition                                                  |
| `work/`, `gallery/` | card·archive·detail patterns                                         |

## Component inventory

| Folder       | Components                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `base/`      | `BaseLink`, `BaseButton`, `BaseBadge`, `BaseCard`, `BaseLabel`, `BaseSectionTitle`, `BaseYearTimeline` |
| `layout/`    | `AppLayout`, `AppHeader`, `AppFooter`, `AppLnb`, `AppDock`                                             |
| `home/`      | `Portfolio*` sections                                                                                  |
| `work/`      | `ProjectGalleryCard`, `TimelineItem`, …                                                                |
| `gallery/`   | `GalleryArchivePage`, `GalleryDetailPage`, …                                                           |
| `renderers/` | `JourneyViewRenderer`, `HighlightsTabPanelRenderer`, …                                                 |

### Layout highlights

| Component   | Key classes                                                                            | SCSS                  |
| ----------- | -------------------------------------------------------------------------------------- | --------------------- |
| `AppHeader` | `.app-header`, `.app-header__theme-toggle`, `.app-header__language-toggle`, `.app-lnb` | `layout/_header.scss` |
| `AppLnb`    | `.app-lnb`, `.app-lnb__backdrop`, `.app-lnb__link`                                     | `layout/_header.scss` |
| `AppDock`   | `.app-dock-ribbon`, `.app-dock__item--active`                                          | `layout/_dock.scss`   |

### Tab list

| Class                      | Context                         |
| -------------------------- | ------------------------------- |
| `.tab-list`                | vertical filter (works desktop) |
| `.tab-list.tab-list--rail` | horizontal scroll (narrow)      |

Active/hover: `--active:hover`로 액티브 상태 유지.

## 수정 가이드

1. **색·그라데이션** → `_theme.scss` only
2. **폰트·spacing·radius** → `_tokens.scss` `:root` 또는 하단 media query
3. **컴포넌트 스타일** → 역할에 맞는 `assets/style/**` 모듈
4. **변수명 변경** → SCSS `$*` 와 CSS `var(--*)` 사용처 전체 검색

## Naming (code ↔ UI)

| Code                 | Example          |
| -------------------- | ---------------- |
| `BaseButton`         | primary / ghost  |
| `ProjectGalleryCard` | editorial / grid |
| `tab-list__tab`      | pill / rail      |
