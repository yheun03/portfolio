import type { MaybeRef } from 'vue';
import { SHELL_THEME_ATTR, type ShellTheme } from '@config/shellTheme';

/** `html[data-shell-theme]` — SSR·하이드레이션 전부터 셸 색상 일치 */
export function useShellTheme(theme: MaybeRef<ShellTheme>) {
    useHead({
        htmlAttrs: {
            [SHELL_THEME_ATTR]: computed(() => unref(theme)),
        },
    });
}
