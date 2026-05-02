<template>
    <section id="highlights" class="section">
        <BaseSectionTitle :eyebrow="t('nav.highlights')" :title="t('highlights.title')" />
        <div class="highlights__tabs" role="tablist" :aria-label="locale === 'ko' ? '하이라이트 탭' : 'Highlights tabs'">
            <button v-for="tab in tabs" :key="tab.key" :id="`highlights-tab-${tab.key}`" role="tab"
                :aria-controls="`highlights-panel-${tab.key}`" :aria-selected="highlightsUi.activeTab === tab.key"
                :tabindex="highlightsUi.activeTab === tab.key ? 0 : -1" class="ui-tab-button"
                :class="{ 'is-active': highlightsUi.activeTab === tab.key }" @click="highlightsUi.setTab(tab.key)">
                {{ tab.label }}
            </button>
        </div>

        <div :id="`highlights-panel-${highlightsUi.activeTab}`" class="highlights__panel" role="tabpanel"
            :aria-labelledby="`highlights-tab-${highlightsUi.activeTab}`">
            <HighlightCard :title="activeTabLabel" :items="activeItems" />
            <p class="highlights__description">{{ activeDescription }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { highlights } from '~/core/data/highlights';
import { useHighlightsUiStore } from '~/core/stores/highlightsUiStore';
import type { HighlightTabKey } from '~/core/types/highlights';

const highlightsUi = useHighlightsUiStore();
const { t, pick, locale } = useLocale();

const tabs = computed<{ key: HighlightTabKey; label: string }[]>(() => [
    { key: 'awards', label: t('highlights.awards') },
    { key: 'certifications', label: t('highlights.certifications') },
    { key: 'roles', label: t('highlights.roles') },
    { key: 'activities', label: t('highlights.activities') },
]);

const activeItems = computed(() => highlights[highlightsUi.activeTab].map((item) => pick(item)));
const activeTabLabel = computed(
    () => tabs.value.find((tab) => tab.key === highlightsUi.activeTab)?.label ?? ''
);
const activeDescription = computed(() => pick(highlights.descriptions[highlightsUi.activeTab]));
</script>
