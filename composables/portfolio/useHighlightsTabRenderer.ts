import { storeToRefs } from 'pinia';
import { highlights } from '@data/site';
import { useHighlightsUiStore } from '@stores/portfolioUiStore';
import type { HighlightTabKey } from '@app-types/highlights';

/**
 * 하이라이트 섹션 탭 → 패널 렌더링.
 * 스토어와 탭 목록을 묶고, 패널 `:key`용 값을 제공해 탭 전환 시 리스트를 안정적으로 갱신한다.
 */
export function useHighlightsTabRenderer() {
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
    const activeTabLabel = computed(
        () => tabs.value.find((tab) => tab.key === activeTab.value)?.label ?? '',
    );
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
