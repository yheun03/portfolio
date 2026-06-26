// macOS Dock 확대(magnification) — 세로 도크에서 커서에 가까운 항목일수록
// 가우시안 감쇠로 부드럽게 커집니다. 각 항목에 --dock-mag(스케일 배수)를 써서
// CSS(.app-dock__dot)가 크기를 반영. 터치·reduce-motion 환경은 제외합니다.
import type { Ref } from 'vue';

interface DockMagnifyOptions {
    /** 커서 바로 위 항목의 최대 추가 배율 (1 + amp 가 최대 스케일) */
    amp?: number;
    /** 감쇠 폭 — 항목 높이 대비 배수가 클수록 더 넓게 부푼다 */
    spread?: number;
}

export function useDockMagnify(containerRef: Ref<HTMLElement | null>, options: DockMagnifyOptions = {}) {
    const { amp = 0.95, spread = 1.6 } = options;
    let cleanup: (() => void) | null = null;

    onMounted(() => {
        if (!import.meta.client) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const container = containerRef.value;
        if (!container) return;

        let rafId = 0;
        let items: HTMLElement[] = [];

        const refreshItems = () => {
            items = Array.from(container.querySelectorAll<HTMLElement>('.app-dock__item'));
        };
        refreshItems();

        const apply = (pointerY: number) => {
            for (const el of items) {
                const rect = el.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const falloff = spread * rect.height || 1;
                const dist = (pointerY - center) / falloff;
                const mag = 1 + amp * Math.exp(-(dist * dist));
                el.style.setProperty('--dock-mag', mag.toFixed(3));
            }
        };

        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(rafId);
            const y = e.clientY;
            rafId = requestAnimationFrame(() => apply(y));
        };

        const reset = () => {
            cancelAnimationFrame(rafId);
            for (const el of items) el.style.setProperty('--dock-mag', '1');
        };

        const onEnter = () => refreshItems();

        container.addEventListener('pointerenter', onEnter);
        container.addEventListener('pointermove', onMove);
        container.addEventListener('pointerleave', reset);

        cleanup = () => {
            cancelAnimationFrame(rafId);
            container.removeEventListener('pointerenter', onEnter);
            container.removeEventListener('pointermove', onMove);
            container.removeEventListener('pointerleave', reset);
            for (const el of items) el.style.removeProperty('--dock-mag');
        };
    });

    onBeforeUnmount(() => {
        cleanup?.();
        cleanup = null;
    });
}
