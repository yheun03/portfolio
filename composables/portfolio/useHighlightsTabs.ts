// Highlights 섹션 탭 목록·활성 항목·설명 computed 및 탭 선택 액션 제공
import { storeToRefs } from 'pinia';
import { highlights } from '@data/site';
import { useHighlightsUiStore } from '@stores/highlights-ui';
import type { HighlightTabKey } from '@app-types/highlight-tabs';

const TAB_KEYS: HighlightTabKey[] = ['awards', 'certifications', 'roles', 'activities'];

export function useHighlightsTabs() {
    const store = useHighlightsUiStore();
    const { activeTab } = storeToRefs(store);
    const { t, pick } = useLocale();

    const tabs = computed(() => TAB_KEYS.map((key) => ({ key, label: t(`highlights.${key}`) })));

    const activeTabIndex = computed(() => {
        const i = TAB_KEYS.indexOf(activeTab.value);
        return String(i + 1).padStart(2, '0');
    });

    const activeItems = computed(() => highlights[activeTab.value].map((item) => pick(item)));
    const activeTabLabel = computed(() => t(`highlights.${activeTab.value}`));
    const activeDescription = computed(() => pick(highlights.descriptions[activeTab.value]));

    function selectTab(key: HighlightTabKey) {
        store.setTab(key);
    }

    return {
        activeTab,
        tabs,
        panelRenderKey: activeTab,
        activeTabIndex,
        activeItems,
        activeTabLabel,
        activeDescription,
        selectTab,
    };
}
