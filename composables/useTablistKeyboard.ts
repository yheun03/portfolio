import type { MaybeRef } from 'vue';
import { tablistA11y, type TablistA11yOptions } from '@config/tablistA11y';

export type TablistOrientation = 'horizontal' | 'vertical';

export type TablistKeyboardConfig = TablistA11yOptions & {
    /** `works-tab-${key}` 등 — id 접두사 (끝에 key가 붙음) */
    tabIdPrefix: string;
    orientation?: MaybeRef<TablistOrientation>;
    /** 방향키·Home/End 후 스크롤을 해당 섹션 top에 고정 (예: `#works`) */
    scrollAnchorSelector?: string;
};

function pinScrollAnchor(selector: string) {
    const target = document.querySelector(selector);
    if (!target) return;

    const scrollMargin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - scrollMargin;

    window.scrollTo({ top, behavior: 'instant' });
}

function resolveNavigationDelta(key: string, orientation: TablistOrientation): number | null {
    if (orientation === 'vertical') {
        if (key === 'ArrowDown') return 1;
        if (key === 'ArrowUp') return -1;
        return null;
    }

    if (key === 'ArrowRight') return 1;
    if (key === 'ArrowLeft') return -1;
    return null;
}

/**
 * role="tablist" 키보드 내비게이션.
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export function useTablistKeyboard<T extends string>(keys: MaybeRef<readonly T[]>, onSelect: (key: T) => void, config: TablistKeyboardConfig) {
    const options = {
        arrowKeys: config.arrowKeys ?? tablistA11y.arrowKeys,
        tabCyclesTabs: config.tabCyclesTabs ?? tablistA11y.tabCyclesTabs,
    };

    function focusTab(key: T) {
        if (!import.meta.client) return;
        document.getElementById(`${config.tabIdPrefix}${key}`)?.focus({ preventScroll: true });
    }

    function selectAndFocus(key: T, options?: { pinScroll?: boolean }) {
        onSelect(key);
        nextTick(() => {
            focusTab(key);
            if (options?.pinScroll && config.scrollAnchorSelector) {
                pinScrollAnchor(config.scrollAnchorSelector);
            }
        });
    }

    function handleTabKeydown(event: KeyboardEvent, currentKey: T) {
        const list = unref(keys);
        const index = list.indexOf(currentKey);
        if (index < 0 || list.length === 0) return;

        const orientation = unref(config.orientation) ?? 'horizontal';

        if (options.arrowKeys) {
            const pinScroll = Boolean(config.scrollAnchorSelector);

            if (event.key === 'Home') {
                event.preventDefault();
                selectAndFocus(list[0]!, { pinScroll });
                return;
            }

            if (event.key === 'End') {
                event.preventDefault();
                selectAndFocus(list[list.length - 1]!, { pinScroll });
                return;
            }

            const delta = resolveNavigationDelta(event.key, orientation);
            if (delta !== null) {
                event.preventDefault();
                const nextIndex = (index + delta + list.length) % list.length;
                selectAndFocus(list[nextIndex]!, { pinScroll });
                return;
            }
        }

        if (options.tabCyclesTabs && event.key === 'Tab') {
            event.preventDefault();
            const step = event.shiftKey ? -1 : 1;
            const nextIndex = (index + step + list.length) % list.length;
            selectAndFocus(list[nextIndex]!);
        }
    }

    return { handleTabKeydown };
}
