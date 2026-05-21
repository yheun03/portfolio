/**
 * `main.scss` 의 narrow layout 기준과 동일 — 탭 리스트 aria-orientation 등에 사용
 */
export function useNarrowLayout() {
    const isNarrow = ref(false);
    let mq: MediaQueryList | null = null;

    const update = () => {
        if (mq) isNarrow.value = mq.matches;
    };

    onMounted(() => {
        mq = window.matchMedia('(max-width: 1023.98px)');
        update();
        mq.addEventListener('change', update);
    });

    onUnmounted(() => {
        mq?.removeEventListener('change', update);
    });

    return { isNarrow };
}
