/** 카드 표면 포인터 글로우 + 3D 틸트 — feature-card · surface-card 공통 */
export type CardPointerOptions = {
    tiltStrength?: number;
};

export function bindCardPointer(element: HTMLElement, options: CardPointerOptions = {}): () => void {
    const tiltStrength = options.tiltStrength ?? 5;
    let rafId = 0;

    const reset = () => {
        cancelAnimationFrame(rafId);
        element.classList.remove('card--tilted');
        element.style.removeProperty('transform');
        element.style.removeProperty('--glow-x');
        element.style.removeProperty('--glow-y');
    };

    const onMove = (event: PointerEvent) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (event.clientX - cx) / (rect.width / 2);
            const dy = (event.clientY - cy) / (rect.height / 2);
            const rotateX = +(dy * -tiltStrength).toFixed(2);
            const rotateY = +(dx * tiltStrength).toFixed(2);
            const glowX = +(((event.clientX - rect.left) / rect.width) * 100).toFixed(1);
            const glowY = +(((event.clientY - rect.top) / rect.height) * 100).toFixed(1);

            element.classList.add('card--tilted');
            element.style.setProperty('--glow-x', `${glowX}%`);
            element.style.setProperty('--glow-y', `${glowY}%`);
            element.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
        });
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);

    return () => {
        reset();
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerleave', reset);
        element.removeEventListener('pointercancel', reset);
    };
}

export function bindCardPointers(root: ParentNode, selector = '[data-card-pointer]'): () => void {
    if (!canUseCardPointer()) return () => undefined;

    const cleanups = Array.from(root.querySelectorAll<HTMLElement>(selector)).map((element) => bindCardPointer(element));
    return () => cleanups.forEach((cleanup) => cleanup());
}

export function canUseCardPointer(): boolean {
    if (typeof window === 'undefined') return false;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
}
