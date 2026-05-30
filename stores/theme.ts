/**
 * 목표: 사용자의 테마 선호를 앱 전역 상태로 관리한다.
 * 기능: 저장된 theme 복원, theme 변경, document data-theme 속성 동기화를 수행한다.
 */
import { defineStore } from 'pinia';

export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'portfolio-theme';

const isThemeMode = (value: string | null): value is ThemeMode => value === 'light' || value === 'dark';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        current: 'light' as ThemeMode,
    }),
    actions: {
        initTheme() {
            if (import.meta.server) return;

            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            this.current = isThemeMode(saved) ? saved : systemTheme;
            document.documentElement.dataset.theme = this.current;
        },
        setTheme(theme: ThemeMode) {
            this.current = theme;

            if (import.meta.client) {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
                document.documentElement.dataset.theme = theme;
            }
        },
        toggleTheme() {
            this.setTheme(this.current === 'dark' ? 'light' : 'dark');
        },
    },
});
