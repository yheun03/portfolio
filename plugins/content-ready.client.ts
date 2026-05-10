/**
 * 이전 빌드에서 남아있을 수 있는 텍스트 스켈레톤 상태를 정리합니다.
 */
export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    const root = document.documentElement;

    const finish = () => {
        root.classList.remove('skeleton-active');
        root.classList.add('skeleton-ready');
    };

    requestAnimationFrame(finish);
});
