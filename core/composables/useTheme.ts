const THEME_KEY = 'portfolio-theme';

export const useTheme = () => {
    const theme = useState<'dark' | 'light'>('theme', () => 'dark');

    const setTheme = (nextTheme: 'dark' | 'light') => {
        theme.value = nextTheme;
        if (process.client) {
            localStorage.setItem(THEME_KEY, nextTheme);
        }
    };

    const initTheme = () => {
        if (process.client) {
            const saved = localStorage.getItem(THEME_KEY) as 'dark' | 'light' | null;
            if (saved) theme.value = saved;
        }
    };

    return { theme, setTheme, initTheme };
};
