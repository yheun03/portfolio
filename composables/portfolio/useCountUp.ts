/**
 * 목표: 숫자 지표가 뷰포트에 진입했을 때 자연스럽게 증가하는 표시값을 만든다.
 * 기능: 카운트 시작 제어와 reduce-motion 대응 값을 제공한다.
 */
export const useCountUp = (end: number, duration = 1200) => {
    const value = ref(0);
    const started = ref(false);

    const start = () => {
        if (started.value) return;
        started.value = true;
        if (import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            value.value = end;
            return;
        }
        const startTime = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            value.value = Math.floor(end * progress);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    return { value, start };
};
