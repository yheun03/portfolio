/**
 * 목표: 현재 테마와 테마 전환 액션을 컴포넌트에서 간단히 사용한다.
 */
import { useThemeStore } from '@stores/theme';

export const useTheme = () => {
    const store = useThemeStore();
    const theme = computed(() => store.current);
    const isDarkTheme = computed(() => theme.value === 'dark');

    return {
        theme,
        isDarkTheme,
        toggleTheme: store.toggleTheme,
    };
};
