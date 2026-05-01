<template>
    <section id="hello" class="section section--hero">
        <BaseSectionTitle eyebrow="Hello" :title="t('hero.title')" :description="t('hero.subtitle')" />
        <p class="hero__branding">{{ t("hero.branding") }}</p>

        <ul class="hero__badges">
            <li v-for="keyword in profile.keywords" :key="keyword" data-animate>
                <BaseBadge>{{ keyword }}</BaseBadge>
            </li>
        </ul>

        <div class="hero__stats">
            <StatCard v-for="(stat, idx) in convertedStats" :key="stat.label" :label="stat.label"
                :value="statValues[idx]" :suffix="stat.suffix" />
        </div>

        <div class="hero__cta">
            <a class="base-button base-button--primary" href="#works">{{ t("hero.ctaWorks") }}</a>
            <a class="base-button base-button--ghost" href="#journey">{{ t("hero.ctaJourney") }}</a>
            <a class="base-button base-button--ghost" href="#contact">{{ t("hero.ctaContact") }}</a>
        </div>
    </section>
</template>

<script setup lang="ts">
import { profile } from "~/core/data/profile";

const { t, pick } = useLocale();
const convertedStats = computed(() => profile.stats.map((item) => ({ ...item, label: pick(item.label) })));
const counters = convertedStats.value.map((item) => useCountUp(item.value));
const statValues = computed(() => counters.map((counter) => counter.value.value));

onMounted(() => counters.forEach((counter) => counter.start()));
</script>
