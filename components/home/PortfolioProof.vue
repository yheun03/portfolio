<template>
    <section id="proof" class="section section--proof" aria-labelledby="section-proof-title">
        <BaseSectionTitle title-id="section-proof-title" :eyebrow="t('nav.proof')" :title="t('highlights.title')"
            :description="t('story.proofDescription')" />

        <dl ref="statsRef" class="proof__metrics" data-animate
            :aria-label="locale === 'ko' ? '핵심 지표' : 'Key metrics'">
            <div v-for="(stat, idx) in convertedStats" :key="stat.label" :style="{ '--stagger-i': idx }" data-stagger>
                <dd>{{ statValues[idx] }}{{ stat.suffix }}</dd>
                <dt>{{ stat.label }}</dt>
            </div>
        </dl>

        <nav class="proof__links" :aria-label="locale === 'ko' ? '이력 상세 페이지' : 'Career detail pages'">
            <NuxtLink class="base-button base-button--ghost" to="/journey">{{ t("story.proofLinkJourney") }}</NuxtLink>
            <NuxtLink class="base-button base-button--ghost" to="/journey#highlights">{{ t("story.proofLinkHighlights") }}</NuxtLink>
        </nav>
    </section>
</template>

<script setup lang="ts">
import { profile } from '@data/site';

const { t, pick, locale } = useLocale();

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
