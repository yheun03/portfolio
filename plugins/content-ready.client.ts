/**
 * 폰트·window load 이후 skeleton-active 제거 (텍스트 스켈레톤 → 실제 타이포).
 */
export default defineNuxtPlugin(() => {
    if (!import.meta.client) return;

    const root = document.documentElement;

    const finish = () => {
        root.classList.remove('skeleton-active');
        root.classList.add('skeleton-ready');
    };

    const fonts = (): Promise<unknown> => {
        try {
            return document.fonts?.ready ?? Promise.resolve();
        } catch {
            return Promise.resolve();
        }
    };

    const loaded = (): Promise<void> =>
        new Promise((resolve) => {
            if (document.readyState === 'complete') resolve();
            else window.addEventListener('load', () => resolve(), { once: true });
        });

    Promise.all([fonts().catch(() => undefined), loaded()]).then(() => {
        requestAnimationFrame(() => requestAnimationFrame(finish));
    });

    window.setTimeout(finish, 6000);
});
