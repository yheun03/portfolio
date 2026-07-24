import { initHomeAnimations } from '@core/motion/home-animations';

export function useHomeMotion() {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    onMounted(async () => {
        if (!import.meta.client) return;

        const root = document.getElementById('main-content');
        if (!root) return;

        cleanup = await initHomeAnimations(root);
        if (cancelled) {
            cleanup();
            cleanup = null;
        }
    });

    onBeforeUnmount(() => {
        cancelled = true;
        cleanup?.();
        cleanup = null;
    });
}
