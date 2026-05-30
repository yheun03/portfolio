<template>
    <section id="highlights" class="section section--highlights">
        <span class="section__emoji section__emoji--highlights emoji emoji--soft" aria-hidden="true">✨</span>

        <header class="highlights__head">
            <BaseSectionTitle :eyebrow="t('nav.highlights')" :title="t('highlights.title')" />
            <p class="section-title__description">{{ t("highlights.summary") }}</p>
        </header>

        <div class="highlights__workspace" data-animate>
            <BaseTabList :model-value="activeTab" :items="tabs" tab-id-prefix="highlights-tab-"
                panel-id-prefix="highlights-panel" :list-label="locale === 'ko' ? '하이라이트 카테고리' : 'Highlight categories'"
                scroll-anchor="#highlights" class="highlights__filters"
                @update:model-value="(key) => selectTab(key as HighlightTabKey)" />

            <HighlightsTabPanelRenderer :active-tab="activeTab" :panel-render-key="panelRenderKey"
                :active-tab-index="activeTabIndex" :active-tab-label="activeTabLabel"
                :active-description="activeDescription" :active-items="activeItems" />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { HighlightTabKey } from '@app-types/highlight-tabs';
import { useHighlightsTabRenderer } from '@composables/portfolio/useHighlightsTabRenderer';
import HighlightsTabPanelRenderer from '~/components/home/HighlightsTabPanelRenderer.vue';

const { t, locale } = useLocale();

const {
    activeTab,
    tabs,
    panelRenderKey,
    activeTabIndex,
    activeItems,
    activeTabLabel,
    activeDescription,
    selectTab,
} = useHighlightsTabRenderer();
</script>
