// APG Tabs 패턴 키보드 조작 — 방향키·Home·End 포커스 이동, 선택 시 스크롤 고정 지원
import type { MaybeRef } from 'vue';
import { tablistKeyboardA11y, type TablistA11yOptions } from '@config/tablist-a11y';

export type TablistOrientation = 'horizontal' | 'vertical';

export type TablistKeyboardConfig = TablistA11yOptions & {
    // id 접두사: `${tabIdPrefix}${key}` 형태로 탭 요소를 찾음 (예: 'works-tab-')
    tabIdPrefix: string;
    orientation?: MaybeRef<TablistOrientation>;
    // 방향키·Home·End 이동 후 이 섹션 top에 스크롤을 고정 (예: '#works')
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

export function useTablistKeyboard<T extends string>(
    keys: MaybeRef<readonly T[]>,
    onSelect: (key: T) => void,
    config: TablistKeyboardConfig,
) {
    const a11y = {
        arrowKeys: config.arrowKeys ?? tablistKeyboardA11y.arrowKeys,
        tabCyclesTabs: config.tabCyclesTabs ?? tablistKeyboardA11y.tabCyclesTabs,
    };

    function focusTab(key: T) {
        if (!import.meta.client) return;
        document.getElementById(`${config.tabIdPrefix}${key}`)?.focus({ preventScroll: true });
    }

    function selectAndFocus(key: T, opts?: { pinScroll?: boolean }) {
        onSelect(key);
        nextTick(() => {
            focusTab(key);
            if (opts?.pinScroll && config.scrollAnchorSelector) {
                pinScrollAnchor(config.scrollAnchorSelector);
            }
        });
    }

    function handleTabKeydown(event: KeyboardEvent, currentKey: T) {
        const list = unref(keys);
        const index = list.indexOf(currentKey);
        if (index < 0 || list.length === 0) return;

        const orientation = unref(config.orientation) ?? 'horizontal';
        const pinScroll = Boolean(config.scrollAnchorSelector);

        if (a11y.arrowKeys) {
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
                selectAndFocus(list[(index + delta + list.length) % list.length]!, { pinScroll });
                return;
            }
        }

        if (a11y.tabCyclesTabs && event.key === 'Tab') {
            event.preventDefault();
            const step = event.shiftKey ? -1 : 1;
            selectAndFocus(list[(index + step + list.length) % list.length]!);
        }
    }

    return { handleTabKeydown };
}
