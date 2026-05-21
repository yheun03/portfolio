import { useLocaleStore, useThemeStore } from '@stores/appPreferenceStore';

/**
 * Client app bootstrapping: theme, locale, and skeleton-ready state.
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        useThemeStore().initTheme();
        useLocaleStore().initLocale();

        const root = document.documentElement;
        requestAnimationFrame(() => {
            root.classList.remove('skeleton-active');
            root.classList.add('skeleton-ready');
        });
    });
});
