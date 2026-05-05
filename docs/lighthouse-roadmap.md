# Lighthouse Targets and Optimization Plan

## Score Targets

- Performance: 95+ (desktop), 85+ (mobile)
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Phase 1 (Quick Wins)

### Performance

- Avoid main-thread work on first paint:
    - Start hero count-up animation only when stats block is visible.
    - Skip count-up animation for `prefers-reduced-motion`.
- Improve scroll performance:
    - Throttle scroll progress updates via `requestAnimationFrame`.
    - Add cleanup for scroll/resize listeners.
- Improve runtime/build defaults:
    - Enable `compatibilityDate` for predictable Nuxt output.
    - Allow CSS code splitting to reduce initial CSS payload.

### Accessibility

- Improve menu semantics:
    - Use `nav` landmark for mobile menu.
    - Keep menu open/close keyboard-friendly with Escape support.
- Improve interaction semantics:
    - Ensure menu trigger has `type="button"`.

### Best Practices

- Secure external links:
    - Add `noopener noreferrer` to external anchor buttons.

### SEO

- Improve metadata completeness:
    - Add canonical and hreflang links.
    - Add robots, Open Graph, and Twitter metadata.
    - Sync `html lang` with selected locale.

## Phase 2 (Structural Improvements)

### Performance

- Split below-the-fold sections into async components:
    - `PortfolioAbout`, `PortfolioJourney`, `PortfolioToolbox`, `PortfolioHighlights`, `PortfolioContact`.
- Keep hero and works as immediate render, defer non-critical section JS.

### Accessibility

- Track keyboard-only interaction tests:
    - Header menu open/close, modal trap, skip link, focus-visible outlines.

### Best Practices

- Keep observer/listener teardown in all composables and UI widgets.

### SEO

- Add final production domain to canonical URL fallback before deploy.
- Optional: include JSON-LD `Person`/`WebSite` schema after domain is fixed.

## Verification Checklist

- `npm run build` succeeds
- No new lint errors in edited files
- Lighthouse rerun (same environment):
    - Confirm category scores meet targets
    - Verify no regressions in Core Web Vitals diagnostics
