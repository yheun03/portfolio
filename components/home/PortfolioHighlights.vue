<template>
    <section id="highlights" class="section section--highlights highlights" aria-labelledby="section-highlights-title">
        <div class="highlights__total-badge" aria-live="polite">
            <span>{{ totalCountLabel }}</span>
            <small>{{ countSummary }}</small>
        </div>
        <div class="highlights__title-col">
            <BaseSectionTitle title-id="section-highlights-title" :eyebrow="t('nav.highlights')"
                :title="t('highlights.title')" />
            <BaseTabList :model-value="activeTab" :items="tabs" tab-id-prefix="highlights-tab-"
                panel-id-prefix="highlights-panel" :list-label="t('highlights.categoriesAriaLabel')"
                class="highlights__filters" @update:model-value="handleHighlightTabChange" />
            <p class="section-title__description">{{ t('highlights.summary') }}</p>
            <aside class="highlights__archive-summary surface-card" :style="archiveSummaryStyle" aria-live="polite"
                :aria-label="t('highlights.summaryAriaLabel')">
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
            <HighlightsTabPanelRenderer :active-tab="activeTab" :panel-render-key="activeTab"
                :active-tab-index="activeTabIndex" :active-tab-label="activeTabLabel"
                :active-description="activeDescription" :active-items="activeItems" />
        </div>
    </section>
</template>

<script setup lang="ts">
import HighlightsTabPanelRenderer from '~/components/renderers/Page_Home/HighlightsTabPanelRenderer.vue';

type HighlightTabKey = 'awards' | 'certifications' | 'roles' | 'activities';

const tabKeys: HighlightTabKey[] = ['awards', 'certifications', 'roles', 'activities'];
const { t, content } = useLocale();
const highlights = computed(() => content.value.highlights);
const activeTab = ref<HighlightTabKey>('awards');
const tabs = computed(() => tabKeys.map((key) => ({ key, label: t(`highlights.${key}`) })));
const activeTabIndex = computed(() => String(tabKeys.indexOf(activeTab.value) + 1).padStart(2, '0'));
const activeItems = computed(() => highlights.value[activeTab.value]);
const activeTabLabel = computed(() => t(`highlights.${activeTab.value}`));
const activeDescription = computed(() => highlights.value.descriptions[activeTab.value]);

const tabCounts = computed(() => ({
    awards: highlights.value.awards.length,
    certifications: highlights.value.certifications.length,
    roles: highlights.value.roles.length,
    activities: highlights.value.activities.length,
}));

const totalHighlightCount = computed(() =>
    tabCounts.value.awards + tabCounts.value.certifications + tabCounts.value.roles + tabCounts.value.activities,
);
const totalCountLabel = computed(() => t('highlights.totalCount').replace('{total}', String(totalHighlightCount.value)));
const countSummary = computed(() =>
    t('highlights.countSummary')
        .replace('{awards}', String(tabCounts.value.awards))
        .replace('{certifications}', String(tabCounts.value.certifications))
        .replace('{roles}', String(tabCounts.value.roles))
        .replace('{activities}', String(tabCounts.value.activities)),
);

const archiveSummaryStyle = computed(() => ({
    '--highlights-highlight-ratio':
        totalHighlightCount.value > 0 ? `${Math.round((activeItems.value.length / totalHighlightCount.value) * 100)}%` : '0%',
}));

const archiveSummaryText = computed(() =>
    t('highlights.tabSummary')
        .replace('{visible}', String(activeItems.value.length))
        .replace('{total}', String(totalHighlightCount.value)),
);

function handleHighlightTabChange(key: string) {
    activeTab.value = key as HighlightTabKey;
}
</script>
