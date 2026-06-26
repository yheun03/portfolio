// 뷰포트 진입 시 숫자를 0에서 목표값까지 애니메이션하는 카운트업 — reduce-motion 대응 포함
export function useCountUp(end: number, duration = 1200) {
    const value = ref(0);
    const started = ref(false);

    function start() {
        if (started.value) return;
        started.value = true;

        if (import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            value.value = end;
            return;
        }

        const startTime = performance.now();

        function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease-out expo — 끝으로 갈수록 감속해 숫자가 자연스럽게 멈추도록
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            value.value = Math.round(end * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    return { value, start };
}
