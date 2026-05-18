import { defineStore } from 'pinia';
import type { HighlightTabKey } from '@app-types/highlights';

export const useHighlightsUiStore = defineStore('highlightsUi', () => {
    const activeTab = ref<HighlightTabKey>('awards');

    function setTab(key: HighlightTabKey) {
        activeTab.value = key;
    }

    return { activeTab, setTab };
});
