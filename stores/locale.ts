// 앱 전역 언어(locale) 상태 — localStorage 동기화 포함
import { defineStore } from 'pinia';

export type Locale = 'ko' | 'en';

const STORAGE_KEY = 'portfolio-locale';

function isLocale(v: string | null): v is Locale {
    return v === 'ko' || v === 'en';
}

export const useLocaleStore = defineStore('locale', () => {
    const current = ref<Locale>('ko');

    function initLocale() {
        if (import.meta.server) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        current.value = isLocale(saved) ? saved : 'ko';
        document.documentElement.setAttribute('lang', current.value);
    }

    function setLocale(locale: Locale) {
        current.value = locale;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, locale);
            document.documentElement.setAttribute('lang', locale);
        }
    }

    function toggleLocale() {
        setLocale(current.value === 'ko' ? 'en' : 'ko');
    }

    return { current, initLocale, setLocale, toggleLocale };
});
