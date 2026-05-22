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
