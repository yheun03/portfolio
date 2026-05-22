import { resolveShellTheme } from '@config/shellTheme';

/** 현재 라우트에 맞춰 `html[data-shell-theme]` 동기화 */
export function useRouteShellTheme() {
    const route = useRoute();
    useShellTheme(computed(() => resolveShellTheme(route.path)));
}
