// 앱 시작 시 locale·theme 초기화 — localStorage 동기화 및 <html> 속성 설정
import { useLocaleStore } from '@stores/locale';
import { useThemeStore } from '@stores/theme';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        useLocaleStore().initLocale();
        useThemeStore().initTheme();
    });
});
