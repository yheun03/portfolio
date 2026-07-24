<template>
    <HomeSection id="proof" section-class="section--proof" title-id="section-proof-title" :eyebrow="t('nav.proof')"
        :title="t('highlights.title')" :description="t('story.proofDescription')">
        <BaseStatList data-animate :stats="profile.stats.map((stat) => ({
            label: pick(stat.label),
            value: stat.value,
            suffix: stat.suffix,
        }))" :aria-label="t('story.proofMetricsAriaLabel')" />

        <nav class="proof__links" :aria-label="t('story.proofLinksAriaLabel')">
            <BaseButton to="/journey" :label="t('story.proofLinkJourney')" variant="ghost" />
            <BaseButton to="/journey#highlights" :label="t('story.proofLinkHighlights')" variant="ghost" />
        </nav>
    </HomeSection>
</template>

<script setup lang="ts">
import { profile } from '@data/site';

const { t, pick } = useLocale();
</script>
