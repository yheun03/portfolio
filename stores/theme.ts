// 앱 전역 테마(light/dark) 상태 — localStorage + 시스템 설정 동기화 포함
import { defineStore } from 'pinia';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

function isThemeMode(v: string | null): v is ThemeMode {
    return v === 'light' || v === 'dark';
}

export const useThemeStore = defineStore('theme', () => {
    const current = ref<ThemeMode>('light');

    function initTheme() {
        if (import.meta.server) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        current.value = isThemeMode(saved) ? saved : system;
        document.documentElement.dataset.theme = current.value;
    }

    function setTheme(theme: ThemeMode) {
        current.value = theme;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, theme);
            document.documentElement.dataset.theme = theme;
        }
    }

    function toggleTheme() {
        setTheme(current.value === 'dark' ? 'light' : 'dark');
    }

    return { current, initTheme, setTheme, toggleTheme };
});
