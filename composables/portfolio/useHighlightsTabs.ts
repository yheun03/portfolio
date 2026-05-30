/**
 * 목표: 홈 Highlights 섹션의 탭 UI와 패널 렌더링 데이터를 연결한다.
 * 기능: 탭 목록, 활성 항목/설명, 렌더 key, 탭 선택 액션을 제공한다.
 */
import { storeToRefs } from 'pinia';
import { highlights } from '@data/site';
import { useHighlightsUiStore } from '@stores/highlights-ui';
import type { HighlightTabKey } from '@app-types/highlight-tabs';

export function useHighlightsTabs() {
    const highlightsUi = useHighlightsUiStore();
    const { activeTab } = storeToRefs(highlightsUi);
    const { t, pick } = useLocale();

    const panelRenderKey = computed(() => activeTab.value);

    const tabs = computed(() => {
        const entries: { key: HighlightTabKey; label: string }[] = [
            { key: 'awards', label: t('highlights.awards') },
            { key: 'certifications', label: t('highlights.certifications') },
            { key: 'roles', label: t('highlights.roles') },
            { key: 'activities', label: t('highlights.activities') },
        ];

        return entries;
    });

    const activeTabIndex = computed(() => {
        const index = tabs.value.findIndex((tab) => tab.key === activeTab.value);
        return String(index + 1).padStart(2, '0');
    });

    const activeItems = computed(() => highlights[activeTab.value].map((item) => pick(item)));
    const activeTabLabel = computed(() => tabs.value.find((tab) => tab.key === activeTab.value)?.label ?? '');
    const activeDescription = computed(() => pick(highlights.descriptions[activeTab.value]));

    function selectTab(key: HighlightTabKey) {
        highlightsUi.setTab(key);
    }

    return {
        activeTab,
        tabs,
        panelRenderKey,
        activeTabIndex,
        activeItems,
        activeTabLabel,
        activeDescription,
        selectTab,
    };
}
