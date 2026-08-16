<template>
    <section v-if="viewMode === 'affiliation'" class="journey__chapters" :aria-label="affiliationAriaLabel">
        <article v-for="(block, companyIndex) in affiliationBlocks" :key="companyKey(block, companyIndex)"
            class="journey__chapter" :class="{ 'journey__chapter--temp': block.temp }">
            <div class="journey__chapter-card">
                <p class="journey__chapter-index">{{ String(companyIndex + 1).padStart(2, "0") }}</p>
                <p v-if="block.temp" class="journey__temp-label">{{ tempLabel }}</p>
                <h3 class="journey__chapter-title">{{ block.summary.company }}</h3>
                <p class="journey__chapter-meta">
                    {{ block.summary.team }} · {{ block.summary.period }}
                </p>
                <p class="journey__chapter-intro">{{ block.summary.intro }}</p>
                <ul v-if="block.summary.roles.length" class="journey__chapter-roles">
                    <li v-for="role in block.summary.roles" :key="`${companyIndex}-${role}`">
                        {{ role }}
                    </li>
                </ul>
                <ul v-if="block.summary.clients.length" class="journey__clients" :aria-label="clientsAriaLabel">
                    <li v-for="client in block.summary.clients" :key="`${companyIndex}-${client}`">
                        {{ client }}
                    </li>
                </ul>
            </div>

            <ol class="journey__steps">
                <TimelineItem v-for="(item, ti) in block.timeline" :key="`${companyIndex}-${ti}-${item.period}`"
                    :period="item.period" :title="item.title" :description="item.description" />
            </ol>
        </article>
    </section>

    <!-- @vue-generic {import('~/composables/portfolio/useJourneyView').JourneyYearGroup} -->
    <BaseYearTimeline v-else variant="home" :ariaLabel="chronologicalAriaLabel" :eras="chronologicalYearGroups"
        id-prefix="journey-year" entries-tag="ol">
        <template #era="{ era: group }">
            <TimelineItem v-for="entry in group.entries" :key="entry.key" hide-period :title="entry.title"
                :description="entry.description" :affiliation="entry.company" heading-tag="h3" />
        </template>
    </BaseYearTimeline>
</template>

<script setup lang="ts">
import type { JourneyCompanyBlock, JourneyViewMode, JourneyYearGroup } from '~/composables/portfolio/useJourneyView';

defineProps<{
    viewMode: JourneyViewMode;
    affiliationBlocks: readonly JourneyCompanyBlock[];
    chronologicalYearGroups: readonly JourneyYearGroup[];
    affiliationAriaLabel: string;
    chronologicalAriaLabel: string;
    tempLabel: string;
    clientsAriaLabel: string;
}>();

function companyKey(block: JourneyCompanyBlock, index: number) {
    return `${index}-${block.summary.company}`;
}
</script>
