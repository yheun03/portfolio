import { defineStore } from 'pinia';

type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

/** 시스템 다크모드 변경 시 반영 (저장된 사용자 선택이 없을 때만) */
let systemPreferenceListenerAttached = false;

export const useThemeStore = defineStore('theme', {
    state: () => ({
        mode: 'light' as ThemeMode,
    }),
    actions: {
        initTheme() {
            if (import.meta.server) return;
            const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
            if (saved === 'light' || saved === 'dark') {
                this.mode = saved;
            } else {
                this.mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.setAttribute('data-theme', this.mode);

            if (!systemPreferenceListenerAttached) {
                systemPreferenceListenerAttached = true;
                const mq = window.matchMedia('(prefers-color-scheme: dark)');
                mq.addEventListener('change', () => {
                    const persisted = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
                    if (persisted === 'light' || persisted === 'dark') return;
                    this.mode = mq.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', this.mode);
                });
            }
        },
        setTheme(mode: ThemeMode) {
            this.mode = mode;
            if (import.meta.client) {
                localStorage.setItem(THEME_STORAGE_KEY, mode);
                document.documentElement.setAttribute('data-theme', mode);
            }
        },
        toggleTheme() {
            this.setTheme(this.mode === 'dark' ? 'light' : 'dark');
        },
    },
});
