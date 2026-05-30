# Design System

이 문서는 현재 Vue/Nuxt 코드와 SCSS 토큰을 Figma 디자인 시스템으로 옮기기 위한 코드 기반 정리 문서입니다. 실제 코드 구조인 `assets/style/abstracts`, `assets/style/base`, `assets/style/work`, `assets/style/layout`, `assets/style/home`, `assets/style/gallery`, `assets/style/motion`, `components/base`, `components/work`, `components/layout`, `components/home`, `components/gallery`, `components/motion`를 기준으로 분석했습니다.

## Design Principles

- Code-first naming: SCSS 변수명과 Vue 클래스명을 Figma 토큰/컴포넌트 설명에 그대로 남긴다.
- Single theme first: `:root` 토큰을 기준으로 모든 섹션과 갤러리의 시각 언어를 일관되게 유지한다.
- System over pages: `base`는 primitive, `work`와 `gallery`는 pattern, `layout`은 shell, `home`은 page composition으로 다룬다.
- Density and motion: 기본 UI는 compact한 spacing과 hover lift, focus ring, active 상태를 가진다.
- Manual fidelity: `color-mix()`, `clamp()`, gradient, inset shadow는 Figma에서 자동 변환이 제한되므로 수동 확인 대상으로 둔다.

## Color Tokens

Source: `assets/style/abstracts/_tokens.scss`

| Token                    | Light            | Dark             | Usage                            |
| ------------------------ | ---------------- | ---------------- | -------------------------------- |
| `--color-primary`        | `#2456ff`        | `#93a8ff`        | CTA, focus, active, label accent |
| `--color-primary-dark`   | `#183fd1`        | `#6b7fff`        | work tone accent                 |
| `--color-accent-hot`     | `#ff5c8d`        | `#ff7eb3`        | journey/highlight mix accent     |
| `--color-accent-mint`    | `#0ecf9b`        | `#3ee8c5`        | personal/contact mix accent      |
| `--color-bg`             | `#f4f6fb`        | `#050810`        | page background                  |
| `--color-surface`        | `#ffffff`        | `#0d1424`        | cards, panels                    |
| `--color-surface-strong` | `#e9eef6`        | `#141d32`        | tabs, header surfaces            |
| `--color-text`           | `#0a0f1a`        | `#f4f7ff`        | primary text                     |
| `--color-text-muted`     | `#4a5d82`        | `#9fb1d6`        | secondary text                   |
| `--color-on-accent`      | `#ffffff`        | `#06111f`        | text on accent gradient          |
| `--color-border`         | `#c9d5e6`        | `#2a3f63`        | borders and dividers             |
| `--color-overlay`        | `color-mix(...)` | `color-mix(...)` | modal/backdrop overlay           |
| `--color-glass-2`        | `color-mix(...)` | `color-mix(...)` | translucent cards                |
| `--color-glass-2-strong` | `color-mix(...)` | `color-mix(...)` | header/button glass              |

Gradient tokens:

| Token                    | Role                              |
| ------------------------ | --------------------------------- |
| `--gradient-accent`      | Primary CTA, active tab/nav state |
| `--gradient-accent-soft` | Decorative subtle accent wash     |
| `--gradient-surface`     | `BaseCard` background             |
| `--gradient-noise`       | app/page background               |
| `--gradient-hero-mesh`   | hero mesh atmosphere              |

## Typography Tokens

| Token                       | Value                                       | Usage                      |
| --------------------------- | ------------------------------------------- | -------------------------- |
| `--font-display`            | system sans                                 | headings, buttons, nav     |
| `--font-body`               | system sans                                 | body copy                  |
| `--font-mono`               | ui monospace                                | labels, eyebrows           |
| `--font-size-2xs`           | `0.72rem`                                   | `BaseLabel`, tiny metadata |
| `--font-size-xs`            | `0.78rem`                                   | badge, mobile eyebrow      |
| `--font-size-sm`            | `0.86rem`                                   | nav, header action, tabs   |
| `--font-size-md`            | `clamp(0.92rem, 0.88rem + 0.18vw, 1.03rem)` | body and button            |
| `--font-size-lg`            | `clamp(1rem, 0.96rem + 0.32vw, 1.16rem)`    | descriptions               |
| `--font-size-xl`            | `clamp(1.12rem, 1rem + 0.8vw, 1.42rem)`     | small section headings     |
| `--font-size-section-title` | `clamp(1.9rem, 3.2vw, 3.05rem)`             | `.section-title__title`    |
| `--font-size-hero`          | `clamp(3.8rem, 6vw, 7.25rem)`               | hero mega title            |
| `--font-size-hero-card`     | `clamp(2.15rem, 4vw, 4.45rem)`              | hero card display          |
| `--font-size-display-soft`  | `clamp(2.2rem, 5vw, 5.25rem)`               | soft display text          |
| `--font-size-contact`       | `clamp(2.35rem, 8vw, 8.75rem)`              | contact mail art           |
| `--font-size-counter`       | `clamp(2.1rem, 4.6vw, 3.7rem)`              | stat counters              |

| Token                    | Value      |
| ------------------------ | ---------- |
| `--font-weight-regular`  | `500`      |
| `--font-weight-medium`   | `650`      |
| `--font-weight-semibold` | `720`      |
| `--font-weight-bold`     | `760`      |
| `--font-weight-black`    | `900`      |
| `--line-height-tight`    | `0.96`     |
| `--line-height-heading`  | `1.08`     |
| `--line-height-title`    | `1.14`     |
| `--line-height-body`     | `1.66`     |
| `--line-height-ui`       | `1`        |
| `--tracking-tight`       | `-0.04em`  |
| `--tracking-heading`     | `-0.035em` |
| `--tracking-ui`          | `0.02em`   |
| `--tracking-label`       | `0.1em`    |

Suggested Figma text styles:

| Style               | Code mapping                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `Display / Hero`    | `--font-display`, `--font-size-hero`, `--font-weight-black`, `--line-height-tight`, `--tracking-tight` |
| `Heading / Section` | `.section-title__title`                                                                                |
| `Body / Default`    | `--font-body`, `--font-size-md`, `--line-height-body`                                                  |
| `UI / Button`       | `.base-button`                                                                                         |
| `UI / Label`        | `.base-label`                                                                                          |
| `UI / Tab`          | `.tab-list`, `.tab-list__tab`, `.tab-list__tab--active`, `.tab-rail`                                   |

## Spacing Tokens

| Token                 | Value                           |
| --------------------- | ------------------------------- |
| `--space-0`           | `0`                             |
| `--space-1`           | `0.25rem`                       |
| `--space-2`           | `0.38rem`                       |
| `--space-3`           | `0.5rem`                        |
| `--space-4`           | `0.65rem`                       |
| `--space-5`           | `0.82rem`                       |
| `--space-6`           | `1rem`                          |
| `--space-7`           | `1.2rem`                        |
| `--space-8`           | `1.5rem`                        |
| `--space-9`           | `2rem`                          |
| `--space-10`          | `2.6rem`                        |
| `--space-11`          | `3.4rem`                        |
| `--space-fluid-xs`    | `clamp(0.5rem, 1vw, 0.85rem)`   |
| `--space-fluid-sm`    | `clamp(0.75rem, 1.6vw, 1.2rem)` |
| `--space-fluid-md`    | `clamp(1rem, 2.4vw, 1.85rem)`   |
| `--space-fluid-lg`    | `clamp(1.4rem, 4vw, 3rem)`      |
| `--space-fluid-xl`    | `clamp(2.4rem, 6vw, 5rem)`      |
| `--space-fluid-2xl`   | `clamp(3.8rem, 8vw, 6.5rem)`    |
| `--inset-page`        | `clamp(2rem, 5vw, 6rem)`        |
| `--inset-page-hero`   | `clamp(1.5rem, 4vw, 5rem)`      |
| `--inset-panel`       | `clamp(1.1rem, 2.6vw, 2rem)`    |
| `--card-padding`      | `var(--space-7)`                |
| `--space-section-y`   | `var(--space-fluid-2xl)`        |
| `--space-section-gap` | `var(--space-fluid-md)`         |
| `--space-block-gap`   | `var(--space-fluid-sm)`         |

## Radius Tokens

| Token           | Value      | Usage                                 |
| --------------- | ---------- | ------------------------------------- |
| `--radius-card` | `0.65rem`  | buttons, header actions, mobile links |
| `--radius-lg`   | `1.05rem`  | `BaseCard`, section cards             |
| `--radius-xl`   | `1.45rem`  | mobile menu, large panels             |
| `999px`         | hard-coded | badges, labels, tabs, nav pills       |

Note: `main.scss` references `--radius-md` in `.tab-list .tab-list__tab`, and the token is defined in `_tokens.scss`.

## Component Inventory

| Code folder         | Figma group      | Components                                                                                                                                                  |
| ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/base`   | Base             | `BaseLink`, `BaseButton`, `BaseBadge`, `BaseCard`, `BaseLabel`, `BaseSectionTitle`                                                                           |
| `components/work`   | Pattern / Card   | `FeatureCard`, `WorkCard`, `TimelineItem`, `ProjectGalleryCard`                                                                                             |
| `components/layout` | Module / Layout  | `AppLayout`, `AppHeader`, `AppFooter`, `AppLnb`, `AppDock`                                                                                                  |
| `components/motion` | Motion           | `TypoDisplayHeading`                                                                                                                                        |
| `components/home`   | Module / Section | `PortfolioHero`, `PortfolioWorks`, `PortfolioPersonal`, `PortfolioAbout`, `PortfolioJourney`, `PortfolioToolbox`, `PortfolioHighlights`, `PortfolioContact` |

## Component Variants

### Base Components

| Component          | Class                                                                                                                                                                                 | Props                                                                                                                           | Variants / size                                                            | States                                                                            | Slots                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------- |
| `BaseButton`       | `.base-button`, `.base-button--primary`, `.base-button--ghost`                                                                                                                        | `label: string`, `href?: string`, `ariaLabel?: string`, `variant?: "primary" \| "ghost"`                                        | `Primary`, `Ghost`; no explicit size prop, default min size `--size-touch` | `Default`, `Hover`, `Focus`, link mode, external link mode                        | default slot fallback `label` |
| `BaseBadge`        | `.base-badge`, `.base-badge--sm`, `.base-badge--toolbox`, `.base-badge--work`, `.base-badge--plain`                                                                                   | `size?: "sm" \| "md"`, `tone?: "default" \| "toolbox" \| "work"`, `plain?: boolean`                                             | size `Sm`, `Md`; tone `Default`, `Toolbox`, `Work`; dot `On/Off`           | `Default`, `Hover`                                                                | default slot                  |
| `BaseCard`         | `.base-card`                                                                                                                                                                          | `animate?: boolean` default `true`                                                                                              | no variant prop; content driven                                            | `Default`, `Animated`, `Static`, hover only when parent adds `data-motion="lift"` | default slot                  |
| `BaseLabel`        | `.base-label`, `.base-label--work`, `.base-label--personal`, `.base-label--toolbox`, `.base-label--highlight`, `.base-label--journey`, `.base-label--contact`, `.base-label--profile` | `label?: string`, `tone?: "default" \| "work" \| "personal" \| "toolbox" \| "highlight" \| "journey" \| "contact" \| "profile"` | tone variants listed in class column                                       | `Default`                                                                         | default slot fallback `label` |
| `BaseSectionTitle` | `.section-title`, `.section-title__eyebrow`, `.section-title__title`, `.section-title__description`, `.section-title__spark`                                                          | `eyebrow: string`, `title: string`, `description?: string`                                                                      | description `Shown/Hidden`; spark always shown                             | `Animated` via `data-animate`                                                     | none                          |

### Card Patterns

| Component            | Class                                                                                  | Props                                                                                                 | Variants / size                                                  | States                                                      | Slots        |
| -------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- | ------------ |
| `WorkCard`           | `.work-card`, `.work-card__meta`, `.work-card__tech`, `.work-card__button`             | `work: WorkItem`, `item: { title; type; summary }`, `detailLabel`, `variant?: "career" \| "personal"` | `Career`, `Personal`; label tone changes to `work` or `personal` | `Default`, `Hover` via `data-motion="lift"`; emits `select` | none         |
| `FeatureCard`        | `.feature-card`, `.skill-card` (skill variant)                                         | `title`, `eyebrow?`, `description?`, `items?`, `variant?: "plain" \| "skill"`                         | `Plain`, `Skill`                                                 | `Animated` via `data-animate`                               | default slot |
| `TimelineItem`       | `.timeline-item`, `.timeline-item__period`                                             | `period`, `title`, `description`                                                                      | milestone list item                                              | `Animated` via `data-animate`                               | none         |
| `ProjectGalleryCard` | `.gallery-card`, `.gallery-card__media`, `.gallery-card__body`, `.gallery-card__langs` | `work: WorkItem`, `to: string`                                                                        | gallery/link card                                                | `Default`, `Hover` via `data-motion="lift"`                 | none         |

### Motion

| Component            | Class                                                                   | Props                                                                     | Variants / size    | States                                  | Slots |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------ | --------------------------------------- | ----- |
| `TypoDisplayHeading` | `.typo-word`, section display line classes (e.g. `.hero__display-line`) | `tag`, `lines`, `groupId`, `headingClass`, `lineClass`, `lineAccentClass` | `h1` / `h2` / `h3` | typo word `Default` / `Active` on hover | none  |

### Layout / Section Modules

| Component             | Class                                                                                                                                         | Props                                                                                                | Variants / size                                       | States                                                                       | Slots        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- | ------------ |
| `AppLayout`           | `.portfolio-page`, `.portfolio-page--app-dock`                                                                                                | `links`, `activeId`, `footerText`, `headerLinks?`, `brandHref?`, `activePath?`, `showAppDock?`       | app dock `Shown/Hidden`                               | page layout state                                                            | default slot |
| `AppHeader`           | `.app-header`, `.app-header__brand`, `.app-header__nav`, `.app-header__actions`, `.language-toggle`, `.app-header__menu-btn` | `links`, `activeId`, `brandHref?`, `activePath?`; inline `BaseButton` + `useLocale()` | desktop nav, locale toggle, mobile menu button | nav item `Default/Active`; toggles `Default/Hover/Focus`; menu `Open/Closed` | none         |
| `AppLnb`              | `.app-lnb`, `.app-lnb__backdrop`, `.app-lnb__eyebrow`                                                                                         | `id?`, `open`, `links`, `activeId?`, `activePath?`                                                   | drawer `Open/Closed`                                  | link `Default/Active`; emits `close`                                         | none         |
| `AppDock`             | `.app-dock-ribbon`, `.app-dock`, `.app-dock__item`, `.app-dock__item--active`                                                                 | `links: { href; label }[]`, `activeId: string`, `activePath?`                                        | section anchor nav                                    | item `Default/Active`                                                        | none         |
| `AppFooter`           | `.app-footer`, `.app-footer__emoji-line`                                                                                                      | `text`                                                                                               | default footer                                        | `Default`                                                                    | none         |
| `PortfolioWorks`      | `.section--works`, `.works__filters`, `.works__grid`, `.works__modal`                                                                         | none, uses stores/data                                                                               | tabbed project section                                | tab `Default/Active`; modal `Open/Closed`; list `More/Collapse`              | none         |
| `PortfolioHighlights` | `.section--highlights`, `.highlights__tabs`, `.highlights__panel`                                                                             | none, uses store/data                                                                                | tabbed highlight section                              | tab `Default/Active`                                                         | none         |
| `PortfolioHero`       | `.section--hero`, `.hero__poster`, `.hero__canvas`, `#animatedCanvas`, `.hero__actions`                                                       | none, uses site data                                                                                 | hero composition                                      | canvas marquee + stat count-up on intersection                               | none         |
| `PortfolioAbout`      | `.section--about`, `.about__summary`, `.about__cards`, `.about__workflow`                                                                     | none, uses site data                                                                                 | about composition                                     | default                                                                      | none         |
| `PortfolioJourney`    | `.section--journey`, `.journey__summary`, `.journey__summary--temp`, `.journey__timeline`                                                     | none, uses site data                                                                                 | summary `Default/Temp`                                | default                                                                      | none         |
| `PortfolioToolbox`    | `.section--toolbox`, `.toolbox__orbit`                                                                                                        | none, uses site data                                                                                 | skill grid                                            | default                                                                      | none         |
| `PortfolioPersonal`   | `.section--personal`, `.personal__grid`                                                                                                       | none, uses works store/data                                                                          | personal work grid                                    | card select opens work detail                                                | none         |
| `PortfolioContact`    | `.section--contact`, `.contact__mail-art`, `.contact__summary`, `.contact__cta`                                                               | none, uses profile data                                                                              | contact composition                                   | CTA link states                                                              | none         |

## Figma Mapping Guide

1. Import `design-tokens.json` into Tokens Studio.
2. Create Figma Variable collections:
    - `Color` with modes `Light`, `Dark`
    - `Typography`
    - `Spacing`
    - `Radius`
    - `Shadow`
    - `Layout`
3. Preserve CSS variable names in token descriptions or aliases. Example: Figma variable `color/primary` should mention `--color-primary`.
4. Convert rem values using the project base assumption `1rem = 16px` unless Figma team has a different base.
5. For `clamp()` typography/spacing, create either:
    - a representative desktop value and mobile value, or
    - separate Figma variables such as `fontSize/md/min`, `fontSize/md/max`.
6. For `color-mix()` colors, sample the computed color in browser for Light/Dark and add manually to Figma.
7. For gradients, create Figma paint styles manually because Tokens Studio may keep them as assets/string tokens.
8. For shadows with `color-mix()` and inset, create Figma effect styles manually and preserve token names.

## Naming Convention

Use `/` as the Figma component property hierarchy separator.

| Code component       | Figma component naming                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `BaseButton`         | `Button / Primary / Medium / Default`, `Button / Ghost / Medium / Hover`, `Button / Primary / Medium / Focus` |
| `BaseBadge`          | `Badge / Default / Medium / Dot`, `Badge / Toolbox / Small / Plain`, `Badge / Work / Small / Dot`             |
| `BaseLabel`          | `Label / Work / Default`, `Label / Personal / Default`, `Label / Journey / Default`                           |
| `BaseCard`           | `Card / Base / Default`, `Card / Base / Static`, `Card / Base / Lift`                                         |
| `BaseSectionTitle`   | `Section Title / With Description`, `Section Title / No Description`                                          |
| `tab-list__tab`      | `Tab / Pill / Default`, `Tab / Pill / Active`, `Tab / LNB / Default`, `Tab / LNB / Active`                    |
| `WorkCard`           | `Card / Work / Career`, `Card / Work / Personal`                                                              |
| `FeatureCard`        | `Card / Feature / Plain`, `Card / Feature / Skill`                                                            |
| `TimelineItem`       | `Timeline Item / Journey / Default`                                                                           |
| `ProjectGalleryCard` | `Card / Gallery / Default`, `Card / Gallery / Hover`                                                          |
| `AppHeader`          | `Navigation / Header / Desktop`, `Navigation / Header / Mobile`                                               |
| `AppLnb`             | `Navigation / App Lnb / Open`, `Navigation / App Lnb / Closed`                                                |
| `AppDock`            | `Navigation / App Dock / Default`, `Navigation / App Dock / Active`                                           |

Recommended variant properties:

| Property  | Values                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `Variant` | `Primary`, `Ghost`, `Default`, `Work`, `Personal`, `Toolbox`, `Highlight`, `Journey`, `Contact`, `Profile` |
| `Size`    | `Small`, `Medium`                                                                                          |
| `State`   | `Default`, `Hover`, `Focus`, `Active`, `Open`, `Closed`, `Static`, `Animated`                              |
| `Dot`     | `On`, `Off`                                                                                                |

## TODO for Figma Manual Setup

- Add `design-tokens.json` to Tokens Studio and verify all token groups import cleanly.
- Create Light/Dark variable modes from `color.light` and `color.dark`.
- Manually resolve every `color-mix()` token to a sampled Figma color.
- Manually build gradient paint styles for `--gradient-accent`, `--gradient-surface`, `--gradient-noise`, `--gradient-hero-mesh`.
- Manually build effect styles for `--shadow-soft`, `--shadow-lift`, `--shadow-glow`, `--shadow-ring`.
- Decide a Figma value for missing `--radius-md` or add the token to code later.
- Create component sets in this order: Button, Badge, Label, Card, Section Title, Tab, Navigation, Work/Gallery cards, Section modules.
- Add component descriptions with original Vue file paths and class names.
- Capture current browser-rendered examples for hover/active/focus states before final component polishing.
