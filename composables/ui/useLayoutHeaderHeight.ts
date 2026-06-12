// 고정 헤더 실제 높이를 CSS 변수 --layout-header-height에 실시간 동기화
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
