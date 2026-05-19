<template>
    <section id="hello" class="section section--hero">
        <div class="hero__poster">
            <WelcomeCanvas v-if="heroCanvasReady" class="hero__canvas" aria-hidden="true" />

            <p class="hero__meta">
                <span>{{ profile.name }}</span>
                <span aria-hidden="true">·</span>
                <span>UI Publishing / Frontend</span>
            </p>

            <div class="hero__stage" data-animate>
                <p class="section-title__eyebrow hero__eyebrow">{{ t("nav.hello") }}</p>

                <h1 class="hero__display" :aria-label="heroAriaLabel">
                    <span v-for="(line, lineIndex) in heroLines" :key="`line-${lineIndex}`" class="hero__display-line"
                        :class="{ 'hero__display-line--accent': line.accent }">
                        <span v-for="(word, wordIndex) in line.words" :key="wordKey(`hero-${lineIndex}`, wordIndex)"
                            class="typo-word"
                            :class="{ 'typo-word--active': isActive(wordKey(`hero-${lineIndex}`, wordIndex)) }"
                            :style="{ '--word-index': wordIndex }" tabindex="0"
                            @mouseenter="setActive(wordKey(`hero-${lineIndex}`, wordIndex))"
                            @mouseleave="setActive(null)" @focus="setActive(wordKey(`hero-${lineIndex}`, wordIndex))"
                            @blur="setActive(null)">{{ word }}</span>
                    </span>
                </h1>

                <p class="hero__lead">{{ heroLead }}</p>
            </div>

            <section class="hero__essentials" data-animate :aria-label="locale === 'ko' ? '핵심 역량' : 'Core focus'">
                <header class="hero__essentials-head">
                    <h2 class="hero__essentials-title">{{ t("hero.kicker") }}</h2>
                    <p class="hero__essentials-lead">{{ t("hero.essentialsLead") }}</p>
                </header>

                <ul class="hero__focus-list">
                    <li v-for="(area, index) in heroFocusCards" :key="pick(area.label)" class="hero__focus-item">
                        <span class="hero__focus-index">{{ String(index + 1).padStart(2, "0") }}</span>
                        <div class="hero__focus-copy">
                            <strong>{{ pick(area.label) }}</strong>
                            <span>{{ pick(area.value) }}</span>
                        </div>
                    </li>
                </ul>

                <dl ref="statsRef" class="hero__metrics-bar" :aria-label="locale === 'ko' ? '핵심 지표' : 'Key metrics'">
                    <div v-for="(stat, idx) in convertedStats" :key="stat.label" class="hero__metric">
                        <dt>{{ stat.label }}</dt>
                        <dd>{{ statValues[idx] }}{{ stat.suffix }}</dd>
                    </div>
                </dl>
            </section>

            <nav class="hero__actions" :aria-label="locale === 'ko' ? '바로가기' : 'Quick links'">
                <a class="base-button base-button--primary" href="#works">{{ t("hero.ctaWorks") }}</a>
                <a class="base-button base-button--ghost" href="#toolbox">{{ t("hero.ctaToolbox") }}</a>
            </nav>
        </div>
    </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { profile } from "@content/site";
import { splitTypoWords, useTypoInteraction } from "~/core/composables/useTypoInteraction";

const WelcomeCanvas = defineAsyncComponent(() => import("~/components/Section/WelcomeCanvas.vue"));

const { t, pick, locale } = useLocale();
const { wordKey, setActive, isActive } = useTypoInteraction();

const heroCanvasReady = ref(false);
const heroFocusCards = computed(() => profile.focusAreas);

const heroLines = computed(() => {
    if (locale.value === "ko") {
        return [
            { words: splitTypoWords("기분 좋은"), accent: false },
            { words: splitTypoWords("화면 구조"), accent: true },
            { words: splitTypoWords("만듭니다"), accent: false },
        ];
    }

    return [
        { words: splitTypoWords("Interfaces"), accent: false },
        { words: splitTypoWords("with rhythm"), accent: true },
        { words: splitTypoWords("and structure"), accent: false },
    ];
});

const heroAriaLabel = computed(() => heroLines.value.map((line) => line.words.join(" ")).join(" "));

const heroLead = computed(() =>
    locale.value === "ko"
        ? "복잡한 요구를 단순한 흐름으로."
        : "Complex asks, clear flows."
);

const convertedStats = computed(() => profile.stats.map((item) => ({ ...item, label: pick(item.label) })));
const counters = convertedStats.value.map((item) => useCountUp(item.value));
const statValues = computed(() => counters.map((counter) => counter.value.value));
const statsRef = ref<HTMLElement | null>(null);
let statsObserver: IntersectionObserver | null = null;

onMounted(() => {
    const mountCanvas = () => {
        heroCanvasReady.value = true;
    };
    if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(mountCanvas, { timeout: 1800 });
    } else {
        window.setTimeout(mountCanvas, 600);
    }

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
