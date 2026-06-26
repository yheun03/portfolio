// 포인터 위치를 --glow-x/--glow-y CSS 변수로 추적해 카드 표면 라디얼 글로우를 만드는 헬퍼
// selector 미지정 시 컨테이너 자신이 대상이 되며, 터치·reduce-motion 환경은 제외
import type { Ref } from 'vue';

export function usePointerGlow(containerRef: Ref<HTMLElement | null>, selector?: string) {
    let cleanups: Array<() => void> = [];

    onMounted(() => {
        if (!import.meta.client) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const container = containerRef.value;
        if (!container) return;

        const targets = selector
            ? Array.from(container.querySelectorAll<HTMLElement>(selector))
            : [container];

        targets.forEach((el) => {
            let rafId = 0;

            const onMove = (e: PointerEvent) => {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    el.style.setProperty('--glow-x', `${(e.clientX - rect.left).toFixed(1)}px`);
                    el.style.setProperty('--glow-y', `${(e.clientY - rect.top).toFixed(1)}px`);
                });
            };

            const onEnter = () => el.classList.add('is-glow');

            const onLeave = () => {
                cancelAnimationFrame(rafId);
                el.classList.remove('is-glow');
            };

            el.addEventListener('pointermove', onMove);
            el.addEventListener('pointerenter', onEnter);
            el.addEventListener('pointerleave', onLeave);

            cleanups.push(() => {
                cancelAnimationFrame(rafId);
                el.removeEventListener('pointermove', onMove);
                el.removeEventListener('pointerenter', onEnter);
                el.removeEventListener('pointerleave', onLeave);
                el.classList.remove('is-glow');
                el.style.removeProperty('--glow-x');
                el.style.removeProperty('--glow-y');
            });
        });
    });

    onBeforeUnmount(() => {
        cleanups.forEach((fn) => fn());
        cleanups = [];
    });
}
