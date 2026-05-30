# Design System

코드와 Figma(Tokens Studio) 사이의 기준 문서입니다. **런타임 CSS 변수의 단일 소스는 `design-tokens.json`**이며, `npm run tokens:sync`로 `assets/style/abstracts/_tokens.generated.scss`가 생성됩니다. Sass mixin·breakpoint·responsive override는 `assets/style/abstracts/_tokens.scss`에 남깁니다.

## Token Pipeline

| 단계    | 파일                   | 역할                                                             |
| ------- | ---------------------- | ---------------------------------------------------------------- |
| 1. 편집 | `design-tokens.json`   | Figma/Tokens Studio import + `palette`·`typography`·`spacing` 등 |
| 2. 생성 | `npm run tokens:sync`  | `:root` 블록 → `_tokens.generated.scss`                          |
| 3. 검증 | `npm run tokens:check` | JSON과 generated 파일 drift 확인                                 |
| 4. Sass | `_tokens.scss`         | `$bp-*`, `@mixin font`, narrow/mobile `:root` override           |

`palette` 토큰은 프로덕션 editorial blue 테마(`#2f6fa7` 계열)를 반영합니다. `semantic/dark`는 Figma Dark 모드용이며, **현재 사이트는 Light `:root`만 사용**합니다.

## Design Principles

- Code-first naming: SCSS 변수명과 Vue BEM 클래스명을 Figma 설명에 그대로 남긴다.
- Single theme first: Light `:root` 기준. Dark는 Figma 변수 모드로만 유지.
- System over pages: `base` = primitive, `work`/`gallery` = pattern, `layout` = shell, `home` = section composition.
- Global BEM: 대부분의 스타일은 `assets/style/` 글로벌 SCSS. co-located `<style>`은 예외(`design-tokens.vue`, 임시 modal).

## Color Tokens (Light / Production)

Source: `design-tokens.json` → `palette`, `scripts/sync-design-tokens.mjs` computed aliases

| Token                    | Value                              | Usage                            |
| ------------------------ | ---------------------------------- | -------------------------------- |
| `--color-primary`        | `var(--primary-600)` → `#255987`   | CTA, focus, active, label accent |
| `--color-primary-dark`   | `var(--primary-700)` → `#1d4568`   | work tone accent                 |
| `--color-accent-hot`     | `#476f9f`                          | editorial mix accent             |
| `--color-accent-mint`    | `#7898b8`                          | editorial mix accent             |
| `--color-bg`             | `var(--grayscale-100)` → `#e7eef7` | page background                  |
| `--color-surface`        | `var(--grayscale-0)` → `#fbfdff`   | cards, panels                    |
| `--color-surface-strong` | `var(--grayscale-200)` → `#d4deec` | tabs, header surfaces            |
| `--color-text`           | `var(--grayscale-900)` → `#101827` | primary text                     |
| `--color-text-muted`     | `var(--grayscale-700)` → `#2f3a50` | secondary text                   |
| `--color-on-accent`      | `var(--grayscale-0)`               | text on accent gradient          |
| `--color-border`         | `var(--grayscale-300)` → `#b7c5d8` | borders and dividers             |
| `--color-overlay`        | `color-mix(...)`                   | modal/backdrop overlay           |
| `--color-glass-2`        | `color-mix(...)`                   | translucent cards                |
| `--color-glass-2-strong` | `color-mix(...)`                   | header/button glass              |

Primary scale (`--primary-50` … `--primary-900`): editorial blue, anchored at `--primary-500: #2f6fa7`.

Gradient tokens:

| Token                    | Role                              |
| ------------------------ | --------------------------------- |
| `--gradient-accent`      | Primary CTA, active tab/nav state |
| `--gradient-accent-soft` | Decorative subtle accent wash     |
| `--gradient-surface`     | `BaseCard` background             |
| `--gradient-noise`       | app/page background               |
| `--gradient-hero-mesh`   | hero mesh atmosphere              |

## Typography Tokens

| Token                       | Value                                     | Usage                      |
| --------------------------- | ----------------------------------------- | -------------------------- |
| `--font-display`            | system sans                               | headings, buttons, nav     |
| `--font-body`               | system sans                               | body copy                  |
| `--font-mono`               | ui monospace                              | labels, eyebrows           |
| `--font-pretendard`         | Pretendard stack                          | optional loaded face       |
| `--font-size-xs`            | `0.875rem`                                | badge, label (14px UI min) |
| `--font-size-sm`            | `0.9375rem`                               | nav, header action, tabs   |
| `--font-size-md`            | `clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)` | body and button            |
| `--font-size-lg`            | `clamp(1rem, 0.96rem + 0.32vw, 1.16rem)`  | descriptions               |
| `--font-size-xl`            | `clamp(1.12rem, 1rem + 0.8vw, 1.42rem)`   | small section headings     |
| `--font-size-display-1`     | `clamp(4rem, 7.5vw, 8.5rem)`              | hero mega title            |
| `--font-size-display-4`     | `clamp(1.9rem, 3.2vw, 3.05rem)`           | section title              |
| `--font-size-section-title` | alias → display-4                         | `.section-title__title`    |
| `--font-size-hero`          | alias → display-1                         | hero                       |
| `--font-size-contact`       | `clamp(2.5rem, 9vw, 9.5rem)`              | `.contact__mail-display`   |
| `--font-size-counter`       | alias → display-5                         | section counter            |

| Token                    | Value  |
| ------------------------ | ------ |
| `--font-weight-regular`  | `500`  |
| `--font-weight-medium`   | `650`  |
| `--font-weight-semibold` | `720`  |
| `--font-weight-bold`     | `760`  |
| `--font-weight-black`    | `900`  |
| `--line-height-tight`    | `1.05` |
| `--line-height-display`  | `1.12` |
| `--line-height-heading`  | `1.14` |
| `--line-height-title`    | `1.22` |
| `--line-height-body`     | `1.72` |
| `--line-height-ui`       | `1.2`  |

Narrow/mobile breakpoint에서 display scale은 `_tokens.scss` media query가 override합니다.

## Spacing Tokens

| Token                                    | Value                                |
| ---------------------------------------- | ------------------------------------ |
| `--space-1` … `--space-11`               | `0.25rem` … `3.4rem` (compact scale) |
| `--space-fluid-xs` … `--space-fluid-3xl` | responsive clamp scale               |
| `--space-section-y`                      | `var(--space-fluid-3xl)`             |
| `--space-section-gap`                    | `var(--space-fluid-lg)`              |
| `--space-block-gap`                      | `var(--space-fluid-sm)`              |
| `--inset-page`                           | `clamp(2rem, 5vw, 6rem)`             |
| `--inset-page-hero`                      | `clamp(1.5rem, 4vw, 5rem)`           |
| `--inset-panel`                          | `clamp(1.1rem, 2.6vw, 2rem)`         |
| `--card-padding`                         | `clamp(1.35rem, 3vw, 2.35rem)`       |
| `--card-padding-lg`                      | `clamp(1.75rem, 4vw, 3rem)`          |

## Radius Tokens

| Token           | Value     | Usage                           |
| --------------- | --------- | ------------------------------- |
| `--radius-card` | `0.95rem` | buttons, compact controls       |
| `--radius-md`   | `0.9rem`  | tab list                        |
| `--radius-lg`   | `1.15rem` | cards, section panels           |
| `--radius-xl`   | `1.65rem` | mobile menu, large panels       |
| `--radius-2xl`  | `2.25rem` | hero/contact panels             |
| `--radius-pill` | `999px`   | badges, labels, tabs, nav pills |

## SCSS Module Map

| Folder                    | 담당                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `assets/style/abstracts/` | `_tokens.scss`, `_tokens.generated.scss`, `_fonts.scss`                    |
| `assets/style/base/`      | reset, skeleton, button, label, badge, card, section-title, year-timeline  |
| `assets/style/layout/`    | shell, header, footer, dock                                                |
| `assets/style/home/`      | hero, about, works, personal, journey, toolbox, contact, touch, responsive |
| `assets/style/work/`      | work-card                                                                  |
| `assets/style/gallery/`   | archive, detail, vars                                                      |
| `assets/style/motion/`    | typo-word                                                                  |

## Component Inventory

| Code folder           | Components                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `components/base/`    | `BaseLink`, `BaseButton`, `BaseBadge`, `BaseCard`, `BaseLabel`, `BaseSectionTitle`, `BaseYearTimeline`                                                      |
| `components/work/`    | `FeatureCard`, `WorkCard`, `TimelineItem`, `ProjectGalleryCard`, `GalleryEmptyCapture`                                                                      |
| `components/layout/`  | `AppLayout`, `AppHeader`, `AppFooter`, `AppLnb`, `AppDock`                                                                                                  |
| `components/motion/`  | `TypoDisplayHeading`                                                                                                                                        |
| `components/home/`    | `PortfolioHero`, `PortfolioWorks`, `PortfolioPersonal`, `PortfolioAbout`, `PortfolioJourney`, `PortfolioToolbox`, `PortfolioHighlights`, `PortfolioContact` |
| `components/gallery/` | `GalleryArchivePage`, `GalleryDetailPage`, `GalleryPageHeader`                                                                                              |     |

## Component Variants

### Base Components

| Component          | Class                                                                                                                                                                                                           | Notes                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `BaseButton`       | `.base-button`, `.base-button--primary`, `.base-button--ghost`                                                                                                                                                  | min touch `--size-touch`                                          |
| `BaseBadge`        | `.base-badge`, `.base-badge--sm`, `.base-badge--toolbox`, `.base-badge--work`, `.base-badge--plain`                                                                                                             |                                                                   |
| `BaseCard`         | `.base-card`                                                                                                                                                                                                    | hover lift when parent has `data-motion="lift"`                   |
| `BaseLabel`        | `.base-label`, `.base-label--work`, `.base-label--personal`, `.base-label--toolbox`, `.base-label--highlight`, `.base-label--journey`, `.base-label--contact`, `.base-label--profile`, `.base-label--technical` |                                                                   |
| `BaseSectionTitle` | `.section-title`, `.section-title__eyebrow`, `.section-title__title`, `.section-title__description`, `.section-title__spark`                                                                                    | counter via `.section:not(.section--hero) .section-title::before` |
| `BaseYearTimeline` | `.year-timeline`, `.year-timeline__era`, `.year-timeline__year`, `.year-timeline__year-title`, `.year-timeline__entries`                                                                                        | variant `home` / `gallery`                                        |

### Overlay / Panel Renderers

모달·탭 패널·뷰 전환(아코디언/세그먼트) UI는 섹션 본문과 분리해 `*Renderer.vue`로 호출한다. 상태는 Pinia 또는 `use*TabRenderer` composable이 담당한다.

| Component                       | Role                         | Notes                             |
| ------------------------------- | ---------------------------- | --------------------------------- |
| `WorksDetailModalRenderer`      | Works 상세 모달              | `worksUi.activeWork`, `useModal`  |
| `WorksTabPanelRenderer`         | Works `role="tabpanel"`      | `:key`로 탭 전환 시 리마운트      |
| `HighlightsTabPanelRenderer`    | Highlights `role="tabpanel"` | `useHighlightsTabRenderer`        |
| `JourneyViewRenderer`           | Journey 소속순 / 시간순      | 세그먼트 컨트롤은 섹션에 유지     |
| `GalleryArchiveListRenderer`    | Gallery editorial / grid     | 헤더 컨트롤은 `GalleryPageHeader` |
| `TempMainProgressModalRenderer` | 임시 공지 모달               | scoped, 삭제 예정                 |

### Card Patterns

| Component            | Class                                                                                              | Notes                         |
| -------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------- |
| `WorkCard`           | `.work-card`, `.work-card__meta`, `.work-card__tech`, `.work-card__button`                         | variant `career` / `personal` |
| `FeatureCard`        | `.feature-card`, `.feature-card--skill`, `.surface-card` (skill variant)                           | **not** `.skill-card`         |
| `TimelineItem`       | `.timeline-item`, `.timeline-item__period`, `.timeline-item__title`, `.timeline-item__description` |                               |
| `ProjectGalleryCard` | `.gallery-card`, `.gallery-card__media`, `.gallery-card__body`                                     |                               |

### Layout / Section Modules

| Component             | Class                                                                                                                                                 | SCSS                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `AppLayout`           | `.portfolio-page`, `.portfolio-page--app-dock`, `.page__layer`, `.page__layer--{hero,profile,works,capability,contact}`                               | `layout/_shell.scss`, `layout/_dock.scss` |
| `AppHeader`           | `.app-header`, `.app-header__brand`, `.app-header__nav`, `.app-header__actions`, `.language-toggle`                                                   | `layout/_header.scss`                     |
| `AppLnb`              | `.app-lnb`, `.app-lnb__backdrop`, `.app-lnb__link`                                                                                                    | `layout/_header.scss`                     |
| `AppDock`             | `.app-dock-ribbon`, `.app-dock`, `.app-dock__item`, `.app-dock__item--active`                                                                         | `layout/_dock.scss`                       |
| `AppFooter`           | `.app-footer`, `.app-footer__emoji-line`                                                                                                              | `layout/_footer.scss`                     |
| `PortfolioHero`       | `.section--hero`, `.hero__poster`, `.hero__canvas`, `.hero__actions`                                                                                  | `home/_hero.scss`                         |
| `PortfolioAbout`      | `.section--about`, `.about__stage`, `.about__intro`, `.about__display`, `.about__spotlight`, `.about__workflow`, `.surface-card--flow`, `.flow-steps` | `home/_about.scss`                        |
| `PortfolioWorks`      | `.section--works`, `.works__title-col`, `.works__filters`, `.works__grid`, `.works__modal`, `.tab-list--rail` (narrow)                                | `home/_works.scss`                        |
| `PortfolioPersonal`   | `.section--personal`, `.personal__head`, `.personal__grid`, `.swipe-rail`                                                                             | `home/_personal.scss`                     |
| `PortfolioJourney`    | `.section--journey`, `.journey__head`, `.journey__flow`, `.journey__chapter`, `.journey__chapter--temp`, `.journey__steps`                            | `home/_journey.scss`                      |
| `PortfolioToolbox`    | `.section--toolbox`, `.toolbox__head`, `.toolbox__grid`, `.feature-grid--toolbox`                                                                     | `home/_toolbox-highlights.scss`           |
| `PortfolioHighlights` | `.section--highlights`, `.highlights__head`, `.highlights__nav`, `.highlights__nav-item`, `.highlights__panel`                                        | `home/_toolbox-highlights.scss`           |
| `PortfolioContact`    | `.section--contact`, `.contact__poster`, `.contact__head`, `.contact__mail-display`, `.contact__actions`, `.contact__note`                            | `home/_contact.scss`                      |

### Tab list variants

| Class                      | Context                                   |
| -------------------------- | ----------------------------------------- |
| `.tab-list`                | vertical LNB-style filter (desktop works) |
| `.tab-list.tab-list--rail` | horizontal scroll rail (narrow viewport)  |

## Figma Mapping Guide

1. Import `design-tokens.json` into Tokens Studio.
2. Light theme: `palette` + `semantic/light` + `typography` + `spacing` + `radius` + `layout`.
3. Dark theme: `semantic/dark` (Figma only until site supports `[data-theme=dark]`).
4. After JSON edits: run `npm run tokens:sync` and commit `_tokens.generated.scss`.
5. Preserve CSS variable names in token `$description` or `$cssVar` fields.
6. For `color-mix()` / multi-stop gradients: sample in browser or use `scripts/sync-design-tokens.mjs` `COMPUTED_ROOT` definitions.
7. Convert rem with `1rem = 16px`.

## Naming Convention

| Code                | Figma example                                       |
| ------------------- | --------------------------------------------------- |
| `BaseButton`        | `Button / Primary / Medium / Default`               |
| `FeatureCard` skill | `Card / Feature / Skill` (+ `surface-card` pattern) |
| `tab-list__tab`     | `Tab / Pill / Default`, `Tab / Rail / Active`       |
| `WorkCard`          | `Card / Work / Career`, `Card / Work / Personal`    |
