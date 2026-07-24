<template>
    <section id="highlights" class="section section--highlights highlights" aria-labelledby="section-highlights-title">
        <div class="highlights__total-badge" aria-live="polite">
            <span>{{ locale === 'ko' ? '총' : 'Total' }} {{ totalHighlightCount }}{{ locale === 'ko' ? '건' : '' }}</span>
            <small>
                {{ locale === 'ko'
                    ? `수상 ${tabCounts.awards} · 자격 ${tabCounts.certifications} · 역할 ${tabCounts.roles} · 활동
                ${tabCounts.activities}`
                    : `${tabCounts.awards} awards · ${tabCounts.certifications} certs · ${tabCounts.roles} roles ·
                ${tabCounts.activities} activities` }}
            </small>
        </div>
        <div class="highlights__title-col">
            <BaseSectionTitle title-id="section-highlights-title" :eyebrow="t('nav.highlights')"
                :title="t('highlights.title')" />
            <BaseTabList :model-value="activeTab" :items="tabs" tab-id-prefix="highlights-tab-"
                panel-id-prefix="highlights-panel" :list-label="locale === 'ko' ? '하이라이트 카테고리' : 'Highlight categories'"
                scroll-anchor="#highlights" class="highlights__filters"
                @update:model-value="handleHighlightTabChange" />
            <p class="section-title__description">{{ t('highlights.summary') }}</p>
            <aside class="highlights__archive-summary surface-card" data-card-pointer :style="archiveSummaryStyle" aria-live="polite"
                :aria-label="locale === 'ko' ? '하이라이트 요약' : 'Highlights summary'">
                <p class="highlights__archive-meta">
                    <strong>{{ activeItems.length }}</strong>
                    <span>{{ activeTabLabel }}</span>
                </p>
                <div class="highlights__archive-meter" aria-hidden="true">
                    <span />
                </div>
                <p class="highlights__archive-caption">
                    {{ archiveSummaryText }}
                </p>
            </aside>
        </div>

        <div class="highlights__workspace" data-animate>
            <HighlightsTabPanelRenderer :active-tab="activeTab" :panel-render-key="panelRenderKey"
                :active-tab-index="activeTabIndex" :active-tab-label="activeTabLabel"
                :active-description="activeDescription" :active-items="activeItems" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { highlights } from '@data/site';
import type { HighlightTabKey } from '@app-types/highlight-tabs';
import { useHighlightsTabs } from '@composables/portfolio/useHighlightsTabs';
import HighlightsTabPanelRenderer from '~/components/renderers/Page_Home/HighlightsTabPanelRenderer.vue';

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
} = useHighlightsTabs();

const tabCounts = {
    awards: highlights.awards.length,
    certifications: highlights.certifications.length,
    roles: highlights.roles.length,
    activities: highlights.activities.length,
} as const;

const totalHighlightCount = tabCounts.awards + tabCounts.certifications + tabCounts.roles + tabCounts.activities;

const archiveSummaryStyle = computed(() => ({
    '--highlights-highlight-ratio':
        totalHighlightCount > 0 ? `${Math.round((activeItems.value.length / totalHighlightCount) * 100)}%` : '0%',
}));

const archiveSummaryText = computed(() =>
    t('highlights.tabSummary')
        .replace('{visible}', String(activeItems.value.length))
        .replace('{total}', String(totalHighlightCount)),
);

function handleHighlightTabChange(key: string) {
    selectTab(key as HighlightTabKey);
}
</script>
