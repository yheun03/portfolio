/** 레이아웃 셸(헤더·skip-link·배경 등) — 본문 섹션 테마와 분리 */
export type ShellTheme = 'home' | 'gallery';

export const SHELL_THEME_ATTR = 'data-shell-theme';

/** 갤러리(실무·개인 아카이브) 경로 — `data-shell-theme="gallery"` */
const GALLERY_PATH_PREFIXES = ['/projects', '/personal'] as const;

/** 라우트 경로 → 셸 테마 (GNB 탭·페이지 이동 시 배경·크롬 색) */
export function resolveShellTheme(path: string): ShellTheme {
    const normalized = path.replace(/\/$/, '') || '/';
    if (normalized === '/') return 'home';

    const isGallery = GALLERY_PATH_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`));
    return isGallery ? 'gallery' : 'home';
}
