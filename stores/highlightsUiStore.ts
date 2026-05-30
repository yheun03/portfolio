/**
 * 목표: 홈 Highlights 섹션의 탭 선택 상태를 전역으로 관리한다.
 * 기능: 현재 활성 탭을 보관하고, 탭 전환 액션을 제공한다.
 */
import { defineStore } from 'pinia';
import type { HighlightTabKey } from '@app-types/highlight-tabs';

export const useHighlightsUiStore = defineStore('highlightsUi', () => {
    const activeTab = ref<HighlightTabKey>('awards');

    function setTab(key: HighlightTabKey) {
        activeTab.value = key;
    }

    return { activeTab, setTab };
});
