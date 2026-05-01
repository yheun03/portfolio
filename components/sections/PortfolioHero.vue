<template>
    <section id="hello" class="section section--hero">
        <div class="hero__intro-card" data-animate>
            <BaseSectionTitle :eyebrow="t('nav.hello')" :title="t('hero.title')" :description="t('hero.subtitle')" />
            <p class="hero__branding">{{ t("hero.branding") }}</p>
            <p class="hero__role">{{ pick(profile.role) }}</p>
        </div>

        <ul class="hero__badges">
            <li v-for="keyword in profile.keywords" :key="keyword" data-animate data-motion="lift">
                <BaseBadge>{{ keyword }}</BaseBadge>
            </li>
        </ul>

        <div ref="statsRef" class="hero__stats">
            <StatCard v-for="(stat, idx) in convertedStats" :key="stat.label" :label="stat.label"
                :value="statValues[idx]" :suffix="stat.suffix" data-motion="lift" />
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
const statsRef = ref<HTMLElement | null>(null);
let statsObserver: IntersectionObserver | null = null;

onMounted(() => {
    if (!statsRef.value) return;
    statsObserver = new IntersectionObserver(
        (entries) => {
            const isVisible = entries.some((entry) => entry.isIntersecting);
            if (!isVisible) return;
            counters.forEach((counter) => counter.start());
            statsObserver?.disconnect();
            statsObserver = null;
        },
        { threshold: 0.35 }
    );
    statsObserver.observe(statsRef.value);
});

onBeforeUnmount(() => {
    statsObserver?.disconnect();
    statsObserver = null;
});
</script>
