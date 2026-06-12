// 1023px 이하 좁은 화면 여부를 반응형으로 제공 — MediaQueryList 구독
const NARROW_LAYOUT_BREAKPOINT = '1023px';

export function useNarrowLayout() {
    const isNarrow = ref(false);
    let mq: MediaQueryList | null = null;

    function update() {
        if (mq) isNarrow.value = mq.matches;
    }

    onMounted(() => {
        mq = window.matchMedia(`(max-width: ${NARROW_LAYOUT_BREAKPOINT})`);
        update();
        mq.addEventListener('change', update);
    });

    onUnmounted(() => {
        mq?.removeEventListener('change', update);
    });

    return { isNarrow };
}
