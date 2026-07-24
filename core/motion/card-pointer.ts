/** 카드 표면 포인터 글로우 + 3D 틸트 — feature-card · surface-card 공통 */
export type CardPointerOptions = {
    tiltStrength?: number;
};

type TiltProfile = {
    strength: number;
    yFactor: number;
    xFactor: number;
    maxRotate: number;
    zLift: number;
    perspective: number;
};

function clamp(value: number, max: number): number {
    return Math.max(-max, Math.min(max, value));
}

function getTiltProfile(rect: DOMRect, baseStrength: number): TiltProfile {
    const aspect = rect.width / Math.max(rect.height, 1);
    const isWide = aspect > 1.35;
    const isVeryWide = aspect > 2.1;

    if (isVeryWide) {
        return {
            strength: baseStrength * 0.55,
            yFactor: Math.max(0.12, 0.85 / aspect),
            xFactor: Math.max(0.45, 0.9 / Math.sqrt(aspect)),
            maxRotate: 2,
            zLift: 2,
            perspective: 1400,
        };
    }

    if (isWide) {
        return {
            strength: baseStrength * 0.72,
            yFactor: Math.max(0.22, 1 / aspect),
            xFactor: Math.max(0.65, 1 / Math.sqrt(aspect)),
            maxRotate: 2.75,
            zLift: 3,
            perspective: 1000,
        };
    }

    return {
        strength: baseStrength,
        yFactor: 1,
        xFactor: 1,
        maxRotate: 4,
        zLift: 5,
        perspective: 800,
    };
}

export function bindCardPointer(element: HTMLElement, options: CardPointerOptions = {}): () => void {
    const baseStrength = options.tiltStrength ?? 3.5;
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
            const profile = getTiltProfile(rect, baseStrength);
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = clamp((event.clientX - cx) / (rect.width / 2), 1);
            const dy = clamp((event.clientY - cy) / (rect.height / 2), 1);
            const rotateX = clamp(dy * -profile.strength * profile.xFactor, profile.maxRotate);
            const rotateY = clamp(dx * profile.strength * profile.yFactor, profile.maxRotate);
            const glowX = +(((event.clientX - rect.left) / rect.width) * 100).toFixed(1);
            const glowY = +(((event.clientY - rect.top) / rect.height) * 100).toFixed(1);

            element.classList.add('card--tilted');
            element.style.setProperty('--glow-x', `${glowX}%`);
            element.style.setProperty('--glow-y', `${glowY}%`);
            element.style.transform =
                `perspective(${profile.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${profile.zLift}px)`;
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

    const cleanups = Array.from(root.querySelectorAll<HTMLElement>(selector)).map((element) => {
        const mode = element.dataset.cardPointer;
        if (mode === 'glow') {
            return bindCardGlow(element);
        }
        if (mode === 'gentle') {
            return bindCardPointer(element, { tiltStrength: 2.5 });
        }
        return bindCardPointer(element);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
}

/** 틸트 없이 글로우만 추적 */
function bindCardGlow(element: HTMLElement): () => void {
    let rafId = 0;

    const reset = () => {
        cancelAnimationFrame(rafId);
        element.style.removeProperty('--glow-x');
        element.style.removeProperty('--glow-y');
    };

    const onMove = (event: PointerEvent) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const glowX = +(((event.clientX - rect.left) / rect.width) * 100).toFixed(1);
            const glowY = +(((event.clientY - rect.top) / rect.height) * 100).toFixed(1);
            element.style.setProperty('--glow-x', `${glowX}%`);
            element.style.setProperty('--glow-y', `${glowY}%`);
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

export function canUseCardPointer(): boolean {
    if (typeof window === 'undefined') return false;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
}
