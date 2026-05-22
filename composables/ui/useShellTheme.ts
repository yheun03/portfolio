import type { MaybeRefOrGetter } from 'vue';
import { resolveShellTheme, SHELL_THEME_ATTR, type ShellTheme } from '@config/shellTheme';

/** `html[data-shell-theme]` — SSR·하이드레이션 전부터 셸 색상 일치 */
export function useShellTheme(theme: MaybeRefOrGetter<ShellTheme>) {
    useHead({
        htmlAttrs: {
            [SHELL_THEME_ATTR]: computed(() => toValue(theme)),
        },
    });
}

/** 현재 라우트에 맞춰 `html[data-shell-theme]` 동기화 */
export function useRouteShellTheme() {
    const route = useRoute();
    useShellTheme(computed(() => resolveShellTheme(route.path)));
}
