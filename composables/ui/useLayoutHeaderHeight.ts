/**
 * 목표: 고정 토큰과 실제 헤더 높이 불일치를 막는다.
 * 기능: .app-header 측정값을 --layout-header-height에 동기화한다.
 */
export function useLayoutHeaderHeight(headerRef: Ref<HTMLElement | null>) {
    if (!import.meta.client) return;

    let resizeObserver: ResizeObserver | null = null;

    function syncHeaderHeight() {
        const header = headerRef.value;
        if (!header) return;

        const height = header.offsetHeight;
        if (height <= 0) return;

        document.documentElement.style.setProperty('--layout-header-height', `${Math.ceil(height)}px`);
    }

    onMounted(() => {
        nextTick(syncHeaderHeight);

        resizeObserver = new ResizeObserver(syncHeaderHeight);
        watch(
            headerRef,
            (header, _, onCleanup) => {
                if (!header) return;
                resizeObserver?.observe(header);
                onCleanup(() => resizeObserver?.unobserve(header));
            },
            { immediate: true },
        );

        window.addEventListener('resize', syncHeaderHeight, { passive: true });
    });

    onBeforeUnmount(() => {
        resizeObserver?.disconnect();
        window.removeEventListener('resize', syncHeaderHeight);
    });
}
