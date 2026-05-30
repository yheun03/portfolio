import { useLocaleStore } from '@stores/appPreferenceStore';

/**
 * Client app bootstrapping: locale and skeleton-ready state.
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        useLocaleStore().initLocale();

        const root = document.documentElement;
        requestAnimationFrame(() => {
            root.classList.remove('skeleton-active');
            root.classList.add('skeleton-ready');
        });
    });
});
