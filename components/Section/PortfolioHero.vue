<template>
    <section id="hello" class="section section--hero">
        <div class="hero__poster" data-animate>
            <WelcomeCanvas class="hero__canvas" aria-hidden="true" />

            <p class="hero__availability">
                <span>{{ profile.name }}</span>
                <span>{{ locale === "ko" ? "UI Publishing / Frontend" : "UI Publishing / Frontend" }}</span>
            </p>

            <div class="hero__copy-block">
                <p class="section-title__eyebrow">{{ t("nav.hello") }}</p>
                <h1 class="hero__mega-title">{{ t("hero.title") }}</h1>
                <p class="hero__subtitle">{{ t("hero.subtitle") }}</p>
                <p class="hero__role">{{ pick(profile.role) }}</p>
            </div>

            <aside class="hero__studio-card" :aria-label="locale === 'ko' ? '작업 방식 요약' : 'Work method summary'">
                <p class="technical-label">Publishing System</p>
                <strong>{{ locale === "ko" ? "구조를 먼저 잡고, 화면의 밀도를 조율합니다." : "Structure first, then tune the visual" +
                    "density." }}</strong>
                <span>{{ t("hero.branding") }}</span>
            </aside>

            <ul class="hero__floating-list" :aria-label="locale === 'ko' ? '작업 원칙' : 'Delivery principles'">
                <li v-for="item in profile.deliveryPillars" :key="pick(item)">
                    {{ pick(item) }}
                </li>
            </ul>

            <ul class="hero__keyword-cloud" aria-label="Core skills">
                <li v-for="keyword in featuredKeywords" :key="keyword">{{ keyword }}</li>
            </ul>

            <div class="hero__actions">
                <a class="base-button base-button--primary" href="#works">{{ t("hero.ctaWorks") }}</a>
                <a class="base-button base-button--ghost" href="#toolbox">{{ t("hero.ctaToolbox") }}</a>
                <a class="base-button base-button--ghost" href="#contact">{{ t("hero.ctaContact") }}</a>
            </div>

            <div ref="statsRef" class="hero__metric-strip" :aria-label="locale === 'ko' ? '핵심 지표' : 'Key metrics'">
                <StatCard v-for="(stat, idx) in convertedStats" :key="stat.label" :label="stat.label"
                    :value="statValues[idx]" :suffix="stat.suffix" data-motion="lift" />
            </div>

            <p class="hero__scroll-cue">
                {{ locale === "ko" ? "SCROLL FOR STRUCTURE" : "SCROLL FOR STRUCTURE" }}
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { profile } from "~/core/data/profile";

const { t, pick, locale } = useLocale();
const featuredKeywords = computed(() => profile.keywords.slice(0, 7));
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
