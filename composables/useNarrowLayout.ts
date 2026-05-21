/** `assets/style/_tokens.scss` — $bp-max-narrow (1023px) 와 동일 */
const NARROW_LAYOUT_MAX = '1023px';

/**
 * narrow layout 기준 — 탭 리스트 aria-orientation 등에 사용
 */
export function useNarrowLayout() {
    const isNarrow = ref(false);
    let mq: MediaQueryList | null = null;

    const update = () => {
        if (mq) isNarrow.value = mq.matches;
    };

    onMounted(() => {
        mq = window.matchMedia(`(max-width: ${NARROW_LAYOUT_MAX})`);
        update();
        mq.addEventListener('change', update);
    });

    onUnmounted(() => {
        mq?.removeEventListener('change', update);
    });

    return { isNarrow };
}
