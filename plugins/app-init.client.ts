/**
 * 목표: 클라이언트 앱 시작 시 저장된 사용자 환경 설정을 복원한다.
 * 기능: locale store 초기화를 실행해 html lang과 localStorage 값을 동기화한다.
 */
import { useLocaleStore } from '@stores/localeStore';

export default defineNuxtPlugin(() => {
    useLocaleStore().initLocale();

    const html = document.documentElement;
    const clearSkeleton = () => html.classList.remove('skeleton-active');
    const fonts = document.fonts;

    window.setTimeout(clearSkeleton, 1800);

    if (fonts?.ready) {
        fonts.ready.then(clearSkeleton).catch(clearSkeleton);
        return;
    }

    if (document.readyState === 'complete') {
        clearSkeleton();
    } else {
        window.addEventListener('load', clearSkeleton, { once: true });
    }
});
