// 오버레이 모달 공통 처리 — body 스크롤 잠금·Escape 닫기·Tab 포커스 트랩·외부 스크롤 차단
import type { ComputedRef, Ref } from 'vue';
import { useFocusTrap } from './useFocusTrap';

export interface UseModalOptions {
    isOpen: ComputedRef<boolean>;
    onClose: () => void;
    containerRef: Ref<HTMLElement | null>;
    initialFocusRef?: Ref<HTMLElement | null>;
}

export function useModal(options: UseModalOptions) {
    const { isOpen, onClose, containerRef, initialFocusRef } = options;

    let scrollY = 0;
    let scrollLocked = false;
    let previouslyFocused: HTMLElement | null = null;

    function lockScroll() {
        if (scrollLocked) return;
        scrollLocked = true;
        scrollY = window.scrollY;
        Object.assign(document.body.style, {
            position: 'fixed',
            top: `-${scrollY}px`,
            left: '0',
            right: '0',
            width: '100%',
            overflow: 'hidden',
        });
    }

    function unlockScroll() {
        if (!scrollLocked) return;
        scrollLocked = false;
        Object.assign(document.body.style, {
            position: '',
            top: '',
            left: '',
            right: '',
            width: '',
            overflow: '',
        });
        window.scrollTo({ top: scrollY, behavior: 'instant' });
    }

    useFocusTrap(containerRef, isOpen, { onEscape: onClose });

    function preventOutsideScroll(event: WheelEvent | TouchEvent) {
        if (!isOpen.value) return;
        if (event.target instanceof Node && containerRef.value?.contains(event.target)) return;
        event.preventDefault();
    }

    watch(isOpen, (open) => {
        if (!import.meta.client) return;
        if (open) {
            previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            lockScroll();
            nextTick(() => initialFocusRef?.value?.focus({ preventScroll: true }));
        } else {
            unlockScroll();
            if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
            previouslyFocused = null;
        }
    });

    onMounted(() => {
        if (!import.meta.client) return;
        window.addEventListener('wheel', preventOutsideScroll, { passive: false });
        window.addEventListener('touchmove', preventOutsideScroll, { passive: false });
    });

    onBeforeUnmount(() => {
        if (!import.meta.client) return;
        unlockScroll();
        window.removeEventListener('wheel', preventOutsideScroll);
        window.removeEventListener('touchmove', preventOutsideScroll);
    });
}
