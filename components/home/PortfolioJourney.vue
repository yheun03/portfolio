<template>
    <section id="journey" class="section section--journey" aria-labelledby="section-journey-title">
        <span class="section__emoji section__emoji--journey emoji emoji--soft" aria-hidden="true">🧩</span>

        <header class="journey__head">
            <BaseSectionTitle title-id="section-journey-title" :eyebrow="t('nav.journey')" :title="t('journey.title')"
                :description="t('journey.summary')" />
        </header>

        <div class="journey__flow" data-animate>
            <div class="journey__flow-header">
                <div class="journey__toolbar">
                    <span :id="journeyViewLabelId" class="journey__control-label">{{ t('journey.viewLegend') }}</span>
                    <div class="journey__segments" role="radiogroup" :aria-labelledby="journeyViewLabelId"
                        :style="{ '--segment-count': viewOptions.length }">
                        <button v-for="option in viewOptions" :key="option.value" type="button" class="journey__segment"
                            :class="{ 'journey__segment--active': viewMode === option.value }" role="radio"
                            :aria-checked="viewMode === option.value" :tabindex="viewMode === option.value ? 0 : -1"
                            @click="setViewMode(option.value)" @keydown="handleViewKeydown($event, viewMode)">
                            {{ t(option.labelKey) }}
                        </button>
                    </div>
                </div>
                <p class="journey__kicker">{{ t("journey.kicker") }}</p>
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
    handleViewKeydown,
} = useJourneyView();

const journeyViewLabelId = "journey-view-label";
const tempLabel = computed(() => t("journey.tempLabel"));
</script>
