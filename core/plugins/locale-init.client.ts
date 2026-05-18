import { useLocaleStore } from '@stores/localeStore';

/**
 * 모든 라우트에서 언어를 초기화합니다.
 * 서브페이지 직접 진입 시에도 localStorage에 저장된 언어가 즉시 전역 적용됩니다.
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        useLocaleStore().initLocale();
    });
});
