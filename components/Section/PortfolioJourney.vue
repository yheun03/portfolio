<template>
    <section id="journey" class="section section--journey">
        <span class="section__emoji section__emoji--journey accent-emoji accent-emoji--soft"
            aria-hidden="true">🧩</span>
        <BaseSectionTitle :eyebrow="t('nav.journey')" :title="t('journey.title')" :description="t('journey.summary')" />
        <div class="journey__flow">
            <div v-for="(block, companyIndex) in journeyCompanies" :key="companyKey(block, companyIndex)"
                class="journey__company-block">
                <BaseCard class="journey__summary" :class="{ 'journey__summary--temp': block.temp }">
                    <BaseLabel tone="journey" label="Experience Timeline" />
                    <p v-if="block.temp" class="journey__temp-label">{{ tempLabel }}</p>
                    <h3 class="journey__summary-company">{{ pick(block.summary.company) }}</h3>
                    <p class="journey__summary-meta">{{ pick(block.summary.team) }} · {{ pick(block.summary.period) }}
                    </p>
                    <p class="journey__summary-intro">{{ pick(block.summary.intro) }}</p>
                    <ul class="journey__summary-roles">
                        <li v-for="role in block.summary.roles" :key="`${companyIndex}-${pick(role)}`">{{ pick(role) }}
                        </li>
                    </ul>
                </BaseCard>
                <ul class="journey__timeline">
                    <TimelineItem v-for="(item, ti) in block.timeline" :key="`${companyIndex}-${ti}-${item.period}`"
                        :period="item.period" :title="pick(item.title)" :description="pick(item.description)" />
                </ul>
            </div>
            <a class="journey__next-link base-button base-button--ghost" href="#toolbox">
                {{ locale === "ko" ? "이력은 충분히 봤어요. 기술 스택으로 이동" : "Enough timeline. Jump to toolbox" }}
            </a>
        </div>
    </section>
</template>

<script setup lang="ts">
import { journeyCompanies, type JourneyCompanyBlock } from "~/core/data/journey";

const { t, pick, locale } = useLocale();

const tempLabel = computed(() =>
    locale.value === "ko" ? "임시 예시 데이터" : "Sample (temporary)",
);

function companyKey(block: JourneyCompanyBlock, index: number) {
    return `${index}-${pick(block.summary.company)}`;
}
</script>
