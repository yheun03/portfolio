<template>
    <section id="journey" class="section">
        <BaseSectionTitle eyebrow="Journey" :title="t('journey.title')" :description="t('journey.summary')" />
        <BaseCard style="margin-bottom: 1rem">
            <h3>{{ journeySummary.company }}</h3>
            <p>{{ journeySummary.team }} · {{ journeySummary.period }}</p>
            <p style="margin-top: 0.75rem">{{ pick(journeySummary.intro) }}</p>
            <ul style="margin-top: 0.75rem">
                <li v-for="role in journeySummary.roles" :key="role">{{ role }}</li>
            </ul>
        </BaseCard>
        <ul class="journey__timeline">
            <TimelineItem
                v-for="item in journey"
                :key="item.period"
                :period="item.period"
                :title="pick(item.title)"
                :description="pick(item.description)"
            />
        </ul>
    </section>
</template>

<script setup lang="ts">
import { journey, journeySummary } from "~/data/journey";
const { t, pick } = useLocale();
</script>
