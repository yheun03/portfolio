// Highlights 섹션 탭 선택 상태 — 활성 탭 key 관리
import { defineStore } from 'pinia';
import type { HighlightTabKey } from '@app-types/highlight-tabs';

export const useHighlightsUiStore = defineStore('highlightsUi', () => {
    const activeTab = ref<HighlightTabKey>('awards');

    function setTab(key: HighlightTabKey) {
        activeTab.value = key;
    }

    return { activeTab, setTab };
});
