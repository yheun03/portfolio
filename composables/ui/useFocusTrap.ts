// 오버레이·드로어 내부 Tab 순환 및 Escape 닫기 처리 (APG focus trap 패턴)
import type { Ref } from 'vue';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type UseFocusTrapOptions = {
    onEscape?: () => void;
};

export function useFocusTrap(
    containerRef: Ref<HTMLElement | null | undefined>,
    isActive: Ref<boolean>,
    options: UseFocusTrapOptions = {},
) {
    function handleKeydown(event: KeyboardEvent) {
        if (!isActive.value) return;

        if (event.key === 'Escape') {
            options.onEscape?.();
            return;
        }

        if (event.key !== 'Tab' || !containerRef.value) return;

        const focusables = containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (!focusables.length) return;

        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const current = document.activeElement as HTMLElement | null;

        if (event.shiftKey && current === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && current === last) {
            event.preventDefault();
            first.focus();
        }
    }

    watch(isActive, (active) => {
        if (!import.meta.client) return;
        if (active) {
            window.addEventListener('keydown', handleKeydown);
        } else {
            window.removeEventListener('keydown', handleKeydown);
        }
    });

    onBeforeUnmount(() => {
        if (!import.meta.client) return;
        window.removeEventListener('keydown', handleKeydown);
    });
}
