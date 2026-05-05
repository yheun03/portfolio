<template>
    <section id="journey" class="section section--journey">
        <span class="section__emoji section__emoji--journey accent-emoji accent-emoji--soft"
            aria-hidden="true">🧩</span>
        <BaseSectionTitle :eyebrow="t('nav.journey')" :title="t('journey.title')" :description="t('journey.summary')" />
        <div class="journey__flow">
            <BaseCard class="journey__summary">
                <p class="technical-label">Experience Timeline</p>
                <h3 class="journey__summary-company">{{ pick(journeySummary.company) }}</h3>
                <p class="journey__summary-meta">{{ pick(journeySummary.team) }} · {{ pick(journeySummary.period) }}</p>
                <p class="journey__summary-intro">{{ pick(journeySummary.intro) }}</p>
                <ul class="journey__summary-roles">
                    <li v-for="role in journeySummary.roles" :key="pick(role)">{{ pick(role) }}</li>
                </ul>
            </BaseCard>
            <ul class="journey__timeline">
                <TimelineItem v-for="item in journey" :key="item.period" :period="item.period" :title="pick(item.title)"
                    :description="pick(item.description)" />
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { journey, journeySummary } from "~/core/data/journey";
const { t, pick } = useLocale();
</script>
