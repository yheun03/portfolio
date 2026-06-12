// 첫 페인트 이후 브라우저 idle 시점에 콜백 예약 — GSAP·관찰자·캔버스 등 무거운 작업용
// 더블 rAF 후 requestIdleCallback (미지원 시 setTimeout) 순서로 실행
export function scheduleAfterFirstPaint(callback: () => void, timeout = 2000): void {
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
