import { defineStore } from 'pinia';
import type { HighlightTabKey } from '~/core/types/highlights';

export const useHighlightsUiStore = defineStore('highlightsUi', () => {
    const activeTab = ref<HighlightTabKey>('awards');

    function setTab(key: HighlightTabKey) {
        activeTab.value = key;
    }

    return { activeTab, setTab };
});
