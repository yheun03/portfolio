import { defineStore } from 'pinia';

export type Locale = 'ko' | 'en';

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        current: 'ko' as Locale,
    }),
    actions: {
        initLocale() {
            if (import.meta.server) return;
            const saved = localStorage.getItem('portfolio-locale') as Locale | null;
            this.current = saved === 'en' ? 'en' : 'ko';
            document.documentElement.setAttribute('lang', this.current);
        },
        setLocale(locale: Locale) {
            this.current = locale;
            if (import.meta.client) {
                localStorage.setItem('portfolio-locale', locale);
                document.documentElement.setAttribute('lang', locale);
            }
        },
        toggleLocale() {
            this.setLocale(this.current === 'ko' ? 'en' : 'ko');
        },
    },
});
