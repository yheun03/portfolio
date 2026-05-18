import { useThemeStore } from '@stores/themeStore';

export const useTheme = () => {
    const store = useThemeStore();
    return {
        theme: computed(() => store.mode),
        initTheme: store.initTheme,
        setTheme: store.setTheme,
        toggleTheme: store.toggleTheme,
    };
};
