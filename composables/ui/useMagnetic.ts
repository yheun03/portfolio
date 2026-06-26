// 포인터 근접 시 요소가 커서 방향으로 살짝 끌려오는 마그네틱 호버
// CSS translate 속성을 사용해 기존 :hover transform 과 합성되며, reduce-motion·터치 환경은 제외
import type { Ref } from 'vue';

export function useMagnetic(containerRef: Ref<HTMLElement | null>, selector: string, strength = 0.18) {
    let cleanups: Array<() => void> = [];

    onMounted(() => {
        if (!import.meta.client) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const targets = containerRef.value?.querySelectorAll<HTMLElement>(selector);
        if (!targets?.length) return;

        targets.forEach((el) => {
            let rafId = 0;

            const onMove = (e: MouseEvent) => {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const dx = e.clientX - (rect.left + rect.width / 2);
                    const dy = e.clientY - (rect.top + rect.height / 2);
                    el.style.translate = `${(dx * strength).toFixed(1)}px ${(dy * strength).toFixed(1)}px`;
                });
            };

            const onLeave = () => {
                cancelAnimationFrame(rafId);
                el.style.translate = '0px 0px';
            };

            el.addEventListener('mousemove', onMove);
            el.addEventListener('mouseleave', onLeave);

            cleanups.push(() => {
                cancelAnimationFrame(rafId);
                el.removeEventListener('mousemove', onMove);
                el.removeEventListener('mouseleave', onLeave);
                el.style.translate = '';
            });
        });
    });

    onBeforeUnmount(() => {
        cleanups.forEach((fn) => fn());
        cleanups = [];
    });
}
