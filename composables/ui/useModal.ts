/**
 * 목표: 오버레이 모달의 접근성과 스크롤 제어를 공통 처리한다.
 * 기능: body scroll lock, Escape 닫기, Tab focus trap, 외부 스크롤 차단을 제공한다.
 */
import type { ComputedRef, Ref } from 'vue';

export interface UseModalOptions {
    /** 모달이 열려 있는지 여부 */
    isOpen: ComputedRef<boolean>;
    onClose: () => void;
    /** 포커스 트랩을 적용할 컨테이너(모달 패널 루트) */
    containerRef: Ref<HTMLElement | null>;
    /** 열릴 때 초기 포커스(보통 닫기 버튼) */
    initialFocusRef?: Ref<HTMLElement | null>;
}

export function useModal(options: UseModalOptions) {
    const { isOpen, onClose, containerRef, initialFocusRef } = options;
    let scrollY = 0;
    let scrollLocked = false;
    let previouslyFocused: HTMLElement | null = null;

    const handleKeydown = (event: KeyboardEvent) => {
        if (!isOpen.value) return;

        if (event.key === 'Escape') {
            onClose();
            return;
        }

        if (event.key !== 'Tab' || !containerRef.value) return;

        const focusables = containerRef.value.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const current = document.activeElement as HTMLElement | null;

        if (event.shiftKey && current === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && current === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const preventOutsideScroll = (event: WheelEvent | TouchEvent) => {
        if (!isOpen.value) return;
        const target = event.target;
        if (target instanceof Node && containerRef.value?.contains(target)) return;
        event.preventDefault();
    };

    const lockScroll = () => {
        if (scrollLocked) return;
        scrollLocked = true;
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        if (!scrollLocked) return;
        scrollLocked = false;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo({ top: scrollY, behavior: 'instant' });
    };

    watch(isOpen, (open) => {
        if (!import.meta.client) return;
        if (open) {
            previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            lockScroll();
            nextTick(() => initialFocusRef?.value?.focus({ preventScroll: true }));
        } else {
            unlockScroll();
            if (previouslyFocused?.isConnected) {
                previouslyFocused.focus({ preventScroll: true });
            }
            previouslyFocused = null;
        }
    });

    onMounted(() => {
        if (!import.meta.client) return;
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('wheel', preventOutsideScroll, { passive: false });
        window.addEventListener('touchmove', preventOutsideScroll, { passive: false });
    });

    onBeforeUnmount(() => {
        if (!import.meta.client) return;
        unlockScroll();
        window.removeEventListener('keydown', handleKeydown);
        window.removeEventListener('wheel', preventOutsideScroll);
        window.removeEventListener('touchmove', preventOutsideScroll);
    });
}
