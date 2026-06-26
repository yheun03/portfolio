// 현재 테마 상태(theme, isDarkTheme)와 토글 액션 제공
import { useThemeStore } from '@stores/theme';

export function useTheme() {
    const store = useThemeStore();
    const theme = computed(() => store.current);
    const isDarkTheme = computed(() => theme.value === 'dark');

    return { theme, isDarkTheme, toggleTheme: store.toggleTheme };
}
