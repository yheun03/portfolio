/**
 * 첫 페인트 이후 idle 시점에 작업을 예약한다 (GSAP·관찰자·캔버스 등).
 */
export function scheduleAfterFirstPaint(callback: () => void, timeout = 2000) {
    if (!import.meta.client) return;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (typeof window.requestIdleCallback === 'function') {
                window.requestIdleCallback(callback, { timeout });
            } else {
                window.setTimeout(callback, Math.min(timeout, 800));
            }
        });
    });
}
