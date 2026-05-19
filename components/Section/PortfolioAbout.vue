<template>
    <section id="about" class="section section--about">
        <span class="section__emoji section__emoji--about accent-emoji accent-emoji--soft" aria-hidden="true">🧭</span>

        <div class="about__stage">
            <header class="about__intro" data-animate>
                <p class="section-title__eyebrow">{{ t("nav.about") }}</p>

                <h2 class="about__display">
                    <span
                        v-for="(line, lineIndex) in displayLines"
                        :key="`about-line-${lineIndex}`"
                        class="about__display-line"
                        :class="{ 'about__display-line--accent': line.accent }"
                    >
                        <span
                            v-for="(word, wordIndex) in line.words"
                            :key="wordKey(`about-${lineIndex}`, wordIndex)"
                            class="typo-word"
                            :class="{ 'typo-word--active': isActive(wordKey(`about-${lineIndex}`, wordIndex)) }"
                            :style="{ '--word-index': wordIndex }"
                            tabindex="0"
                            @mouseenter="setActive(wordKey(`about-${lineIndex}`, wordIndex))"
                            @mouseleave="setActive(null)"
                            @focus="setActive(wordKey(`about-${lineIndex}`, wordIndex))"
                            @blur="setActive(null)"
                        >{{ word }}</span>
                    </span>
                </h2>

                <p class="about__lead">{{ profileTagline }}</p>
            </header>

            <ul class="about__word-grid" data-animate :aria-label="locale === 'ko' ? '작업 원칙' : 'Work principles'">
                <li v-for="(principle, index) in principleWords" :key="principle">
                    <button
                        type="button"
                        class="typo-word typo-word--panel"
                        :class="{ 'typo-word--active': activePrinciple === index }"
                        :style="{ '--word-index': index }"
                        :aria-pressed="activePrinciple === index"
                        @mouseenter="activePrinciple = index"
                        @mouseleave="activePrinciple = null"
                        @focus="activePrinciple = index"
                        @blur="activePrinciple = null"
                        @click="activePrinciple = activePrinciple === index ? null : index"
                    >
                        {{ principle }}
                    </button>
                </li>
            </ul>

            <ol class="about__flow" data-animate :aria-label="locale === 'ko' ? '작업 흐름' : 'Workflow'">
                <li v-for="(step, index) in workflowSteps" :key="step">
                    <span class="about__flow-index">{{ String(index + 1).padStart(2, "0") }}</span>
                    <span class="about__flow-label">{{ step }}</span>
                </li>
            </ol>
        </div>
    </section>
</template>

<script setup lang="ts">
import { aboutContent } from "@content/site";
import { splitTypoWords, useTypoInteraction } from "~/core/composables/useTypoInteraction";

const { t, pick, locale } = useLocale();
const { wordKey, setActive, isActive } = useTypoInteraction();

const activePrinciple = ref<number | null>(null);

const displayLines = computed(() => {
    if (locale.value === "ko") {
        return [
            { words: splitTypoWords("쉽게 읽히고"), accent: false },
            { words: splitTypoWords("빠르게 쓰이는"), accent: true },
            { words: splitTypoWords("화면을 만듭니다"), accent: false },
        ];
    }

    return [
        { words: splitTypoWords("Easy to read"), accent: false },
        { words: splitTypoWords("Fast to use"), accent: true },
        { words: splitTypoWords("Built to last"), accent: false },
    ];
});

const profileTagline = computed(() =>
    locale.value === "ko" ? "구조는 단순하게. 사용감은 가볍게." : "Simple structure. Light feel."
);

const principleWords = computed(() =>
    aboutContent.principles.map((principle) => pick(principle.title))
);

const workflowSteps = computed(() =>
    locale.value === "ko" ? ["파악", "정리", "구현", "검증"] : ["Read", "Shape", "Build", "Check"]
);
</script>
