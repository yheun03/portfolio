export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

function isThemeMode(value: string | null): value is ThemeMode {
    return value === 'light' || value === 'dark';
}

export function useTheme() {
    const theme = useState<ThemeMode>('theme', () => 'light');
    const isDarkTheme = computed(() => theme.value === 'dark');

    function setTheme(value: ThemeMode) {
        theme.value = value;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, value);
            document.documentElement.dataset.theme = value;
        }
    }

    function initTheme() {
        if (!import.meta.client) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(isThemeMode(saved) ? saved : system);
    }

    function toggleTheme() {
        setTheme(theme.value === 'dark' ? 'light' : 'dark');
    }

    return { theme, isDarkTheme, initTheme, toggleTheme };
}
