/**
 * 목표: 컴포넌트가 좁은 화면 레이아웃 여부를 반응형으로 판단하게 한다.
 * 기능: media query 구독과 boolean 상태를 제공한다.
 */
const NARROW_LAYOUT_MAX = '1023px';

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
