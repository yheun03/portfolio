import { defineStore } from 'pinia';

export type Locale = 'ko' | 'en';

const LOCALE_STORAGE_KEY = 'portfolio-locale';

const isLocale = (value: string | null): value is Locale => value === 'ko' || value === 'en';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        current: 'ko' as Locale,
    }),
    actions: {
        initLocale() {
            if (import.meta.server) return;
            const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
            this.current = isLocale(saved) ? saved : 'ko';
            document.documentElement.setAttribute('lang', this.current);
        },
        setLocale(locale: Locale) {
            this.current = locale;
            if (import.meta.client) {
                localStorage.setItem(LOCALE_STORAGE_KEY, locale);
                document.documentElement.setAttribute('lang', locale);
            }
        },
        toggleLocale() {
            this.setLocale(this.current === 'ko' ? 'en' : 'ko');
        },
    },
});
