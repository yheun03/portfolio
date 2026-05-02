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

/**
 * 오버레이 모달 공통: body 스크롤 잠금, Esc 닫기, Tab 포커스 트랩
 */
export function useModal(options: UseModalOptions) {
    const { isOpen, onClose, containerRef, initialFocusRef } = options;

    const handleKeydown = (event: KeyboardEvent) => {
        if (!isOpen.value) return;

        if (event.key === 'Escape') {
            onClose();
            return;
        }

        if (event.key !== 'Tab' || !containerRef.value) return;

        const focusables = containerRef.value.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
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

    watch(isOpen, (open) => {
        if (!import.meta.client) return;
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
            nextTick(() => initialFocusRef?.value?.focus());
        }
    });

    onMounted(() => {
        if (!import.meta.client) return;
        window.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
        if (!import.meta.client) return;
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeydown);
    });
}
