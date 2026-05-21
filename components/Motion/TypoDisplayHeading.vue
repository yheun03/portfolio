<template>
    <component :is="tag" :class="headingClass">
        <span v-for="(line, lineIndex) in lines" :key="`${groupId}-line-${lineIndex}`" :class="[
            lineClass,
            { [lineAccentClass]: line.accent },
        ]">
            <span v-for="(word, wordIndex) in line.words" :key="wordKey(`${groupId}-${lineIndex}`, wordIndex)"
                class="typo-word"
                :class="{ 'typo-word--active': isActive(wordKey(`${groupId}-${lineIndex}`, wordIndex)) }"
                :style="{ '--word-index': wordIndex }"
                @mouseenter="setActive(wordKey(`${groupId}-${lineIndex}`, wordIndex))" @mouseleave="setActive(null)">{{
                    word }}</span>
        </span>
    </component>
</template>

<script setup lang="ts">
import { useTypoInteraction } from '@composables/useTypoInteraction';

export type TypoDisplayLine = {
    words: string[];
    accent?: boolean;
};

defineProps<{
    tag: 'h1' | 'h2' | 'h3';
    lines: TypoDisplayLine[];
    groupId: string;
    headingClass: string;
    lineClass: string;
    lineAccentClass: string;
}>();

const { wordKey, setActive, isActive } = useTypoInteraction();
</script>
