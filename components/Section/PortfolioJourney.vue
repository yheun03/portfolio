<template>
    <section id="journey" class="section section--journey">
        <span class="section__emoji section__emoji--journey accent-emoji accent-emoji--soft"
            aria-hidden="true">🧩</span>

        <header class="journey__head">
            <BaseSectionTitle :eyebrow="t('nav.journey')" :title="t('journey.title')"
                :description="t('journey.summary')" />
        </header>

        <div class="journey__flow" data-animate>
            <p class="journey__kicker">{{ t("journey.kicker") }}</p>

            <article v-for="(block, companyIndex) in journeyCompanies" :key="companyKey(block, companyIndex)"
                class="journey__chapter" :class="{ 'journey__chapter--temp': block.temp }">
                <div class="journey__chapter-card">
                    <p class="journey__chapter-index">{{ String(companyIndex + 1).padStart(2, "0") }}</p>
                    <p v-if="block.temp" class="journey__temp-label">{{ tempLabel }}</p>
                    <h3 class="journey__chapter-title">{{ pick(block.summary.company) }}</h3>
                    <p class="journey__chapter-meta">
                        {{ pick(block.summary.team) }} · {{ pick(block.summary.period) }}
                    </p>
                    <p class="journey__chapter-intro">{{ pick(block.summary.intro) }}</p>
                    <ul v-if="block.summary.roles.length" class="journey__chapter-roles">
                        <li v-for="role in block.summary.roles" :key="`${companyIndex}-${pick(role)}`">
                            {{ pick(role) }}
                        </li>
                    </ul>
                    <ul v-if="block.summary.clients.length" class="journey__clients"
                        :aria-label="locale === 'ko' ? '참여 고객사' : 'Clients served'">
                        <li v-for="client in block.summary.clients" :key="`${companyIndex}-${pick(client)}`">
                            {{ pick(client) }}
                        </li>
                    </ul>
                </div>

                <ol class="journey__steps">
                    <TimelineItem v-for="(item, ti) in block.timeline" :key="`${companyIndex}-${ti}-${item.period}`"
                        :period="item.period" :title="pick(item.title)" :description="pick(item.description)" />
                </ol>
            </article>

        </div>
    </section>
</template>

<script setup lang="ts">
import { journeyCompanies, type JourneyCompanyBlock } from "@data/site";

const { t, pick, locale } = useLocale();

const tempLabel = computed(() => t("journey.tempLabel"));

function companyKey(block: JourneyCompanyBlock, index: number) {
    return `${index}-${pick(block.summary.company)}`;
}
</script>
