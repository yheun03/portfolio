<template>
    <section id="journey" class="section section--journey" aria-labelledby="section-journey-title">
        <header class="section-head section-head--start">
            <BaseSectionTitle title-id="section-journey-title" :eyebrow="t('nav.journey')" :title="t('journey.title')"
                :description="t('journey.summary')" />
        </header>

        <div class="journey__flow" data-animate>
            <div class="journey__view-switch">
                <p class="journey__view-kicker" aria-hidden="true">{{ t("journey.kicker") }}</p>
                <BaseSegmentControl :model-value="viewMode" :options="resolvedViewOptions"
                    :label-text="t('journey.viewLegend')" label-id="journey-view-label" label-hidden
                    @update:model-value="setViewMode($event as typeof viewMode)" />
            </div>

            <JourneyViewRenderer :view-mode="viewMode" :affiliation-blocks="affiliationBlocks"
                :chronological-year-groups="chronologicalYearGroups"
                :affiliation-aria-label="t('journey.viewAffiliation')"
                :chronological-aria-label="t('journey.viewChronological')" :temp-label="tempLabel"
                :clients-aria-label="locale === 'ko' ? '참여 고객사' : 'Clients served'" />
        </div>
    </section>
</template>

<script setup lang="ts">
import JourneyViewRenderer from '~/components/renderers/Page_Home/JourneyViewRenderer.vue';

const { t, locale } = useLocale();
const {
    viewMode,
    viewOptions,
    affiliationBlocks,
    chronologicalYearGroups,
    setViewMode,
} = useJourneyView();

const resolvedViewOptions = computed(() => viewOptions.value.map((o) => ({ value: o.value, label: t(o.labelKey) })));
const tempLabel = computed(() => t("journey.tempLabel"));
</script>
