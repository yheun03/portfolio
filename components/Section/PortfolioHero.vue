<template>
    <section id="hello" class="section section--hero">
        <div ref="posterRef" class="hero__poster" @pointermove="handlePosterPointerMove" @pointerleave="resetPosterPointer">
            <WelcomeCanvas v-if="heroCanvasReady" class="hero__canvas" aria-hidden="true" />

            <p class="hero__meta">
                <span>{{ profile.name }}</span>
                <span aria-hidden="true">·</span>
                <span>UI Publishing / Frontend</span>
            </p>

            <div class="hero__stage" data-animate>
                <p class="section-title__eyebrow hero__eyebrow">{{ t("nav.hello") }}</p>

                <h1 class="hero__display" :aria-label="heroAriaLabel">
                    <span
                        v-for="(line, lineIndex) in heroLines"
                        :key="`line-${lineIndex}`"
                        class="hero__display-line"
                        :class="{ 'hero__display-line--accent': line.accent }"
                    >
                        <span
                            v-for="(word, wordIndex) in line.words"
                            :key="wordKey(`hero-${lineIndex}`, wordIndex)"
                            class="typo-word"
                            :class="{ 'typo-word--active': isActive(wordKey(`hero-${lineIndex}`, wordIndex)) }"
                            :style="{ '--word-index': wordIndex }"
                            tabindex="0"
                            @mouseenter="setActive(wordKey(`hero-${lineIndex}`, wordIndex))"
                            @mouseleave="setActive(null)"
                            @focus="setActive(wordKey(`hero-${lineIndex}`, wordIndex))"
                            @blur="setActive(null)"
                        >{{ word }}</span>
                    </span>
                </h1>

                <p class="hero__lead">{{ heroLead }}</p>
            </div>

            <ul class="hero__lexicon" :aria-label="locale === 'ko' ? '핵심 키워드' : 'Core keywords'">
                <li v-for="(word, index) in lexiconWords" :key="word">
                    <span
                        class="typo-word typo-word--lexicon"
                        :class="{ 'typo-word--active': isActive(wordKey('lexicon', index)) }"
                        :style="{ '--word-index': index }"
                        tabindex="0"
                        @mouseenter="setActive(wordKey('lexicon', index))"
                        @mouseleave="setActive(null)"
                        @focus="setActive(wordKey('lexicon', index))"
                        @blur="setActive(null)"
                    >{{ word }}</span>
                </li>
            </ul>

            <aside class="hero__aside" :aria-label="locale === 'ko' ? '작업 방식' : 'Approach'">
                <p
                    v-for="(phrase, phraseIndex) in asidePhrases"
                    :key="`aside-${phraseIndex}`"
                    class="hero__aside-line"
                >
                    <span
                        v-for="(word, wordIndex) in phrase"
                        :key="wordKey(`aside-${phraseIndex}`, wordIndex)"
                        class="typo-word typo-word--ghost"
                        :class="{ 'typo-word--active': isActive(wordKey(`aside-${phraseIndex}`, wordIndex)) }"
                        tabindex="0"
                        @mouseenter="setActive(wordKey(`aside-${phraseIndex}`, wordIndex))"
                        @mouseleave="setActive(null)"
                        @focus="setActive(wordKey(`aside-${phraseIndex}`, wordIndex))"
                        @blur="setActive(null)"
                    >{{ word }}</span>
                </p>
            </aside>

            <nav class="hero__actions" :aria-label="locale === 'ko' ? '바로가기' : 'Quick links'">
                <a class="base-button base-button--primary" href="#works">{{ t("hero.ctaWorks") }}</a>
                <a class="base-button base-button--ghost" href="#toolbox">{{ t("hero.ctaToolbox") }}</a>
            </nav>

            <dl ref="statsRef" class="hero__metrics" :aria-label="locale === 'ko' ? '핵심 지표' : 'Key metrics'">
                <div v-for="(stat, idx) in convertedStats" :key="stat.label" class="hero__metric">
                    <dt>{{ stat.label }}</dt>
                    <dd>{{ statValues[idx] }}{{ stat.suffix }}</dd>
                </div>
            </dl>

            <p class="hero__scroll-hint" aria-hidden="true">
                {{ locale === "ko" ? "Scroll" : "Scroll" }}
            </p>
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
const posterRef = ref<HTMLElement | null>(null);

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

const lexiconWords = computed(() =>
    locale.value === "ko"
        ? ["구조", "접근성", "반응형", "모션", "유지보수"]
        : ["Structure", "A11y", "Responsive", "Motion", "Maintain"]
);

const asidePhrases = computed(() => {
    if (locale.value === "ko") {
        return [splitTypoWords("구조 먼저"), splitTypoWords("의도 있는 모션")];
    }

    return [splitTypoWords("Structure first"), splitTypoWords("Motion with purpose")];
});

const convertedStats = computed(() => profile.stats.map((item) => ({ ...item, label: pick(item.label) })));
const counters = convertedStats.value.map((item) => useCountUp(item.value));
const statValues = computed(() => counters.map((counter) => counter.value.value));
const statsRef = ref<HTMLElement | null>(null);
let statsObserver: IntersectionObserver | null = null;

const updatePosterLight = (clientX: number, clientY: number) => {
    const element = posterRef.value;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--hero-x", `${Math.round(x)}%`);
    element.style.setProperty("--hero-y", `${Math.round(y)}%`);
};

const handlePosterPointerMove = (event: PointerEvent) => {
    updatePosterLight(event.clientX, event.clientY);
};

const resetPosterPointer = () => {
    const element = posterRef.value;
    if (!element) return;
    element.style.setProperty("--hero-x", "72%");
    element.style.setProperty("--hero-y", "28%");
};

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
