# 문서 목록

포트폴리오 저장소의 기술·운영 문서입니다. 코드와 맞지 않으면 **코드를 기준**으로 이 폴더를 갱신합니다.

| 문서 | 내용 |
|------|------|
| [project-structure.md](./project-structure.md) | 폴더별 책임, `core/`·`composables/`·플러그인 |
| [design-system.md](./design-system.md) | SCSS 토큰(`_theme.scss`, `_tokens.scss`), 컴포넌트·BEM |
| [project-data-notes.md](./project-data-notes.md) | `data/`, `i18n/`, 수정 체크리스트 |
| [lighthouse-roadmap.md](./lighthouse-roadmap.md) | 성능·접근성·SEO 개선 계획 |

## 스타일 토큰 (요약)

| 편집 파일 | 담당 |
|-----------|------|
| `assets/style/abstracts/_theme.scss` | **색상** — 팔레트, semantic color, gradient, shadow |
| `assets/style/abstracts/_tokens.scss` | **foundation** — typography, spacing, radius, layout, Sass mixin |
| `assets/style/main.scss` | `@use tokens` → `@use theme` (theme가 색 최종 확정) |

과거 `design-tokens.json` + `npm run tokens:sync` 파이프라인은 제거되었습니다.

## 테마 전환

- `stores/theme.ts` + `composables/useTheme.ts`
- `html[data-theme="light|dark"]` 및 `prefers-color-scheme`
- 클라이언트 초기화: `plugins/init.client.ts`
