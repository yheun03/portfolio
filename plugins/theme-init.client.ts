import { useThemeStore } from '~/core/stores/themeStore';

/**
 * 모든 라우트에서 테마를 초기화합니다 (시스템 선호 또는 localStorage 저장값).
 * 홈에서만 onMounted로 초기화할 때 서브페이지 직접 진입 시 light로 고정되던 문제를 해소합니다.
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        useThemeStore().initTheme();
    });
});
