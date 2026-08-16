<template>
    <NuxtLink :to="to" class="story-case surface-card" :aria-label="ariaLabel">
        <span class="story-case__watermark" aria-hidden="true">{{ indexLabel }}</span>

        <p class="story-case__head">
            <BaseIndexLabel variant="tag" tag="span">
                {{ tag }}
                <BaseAccentBadge v-if="featured">{{ featuredBadge }}</BaseAccentBadge>
            </BaseIndexLabel>
            <span class="story-case__period">{{ period }}</span>
        </p>

        <h3>{{ title }}</h3>
        <p class="story-case__summary">{{ summary }}</p>

        <BaseChipList :items="tech" :aria-label="techAriaLabel" />

        <span class="story-case__cta" aria-hidden="true">
            {{ ctaLabel }}
            <span class="story-case__cta-arrow">→</span>
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    to: string;
    ariaLabel: string;
    indexLabel: string;
    tag: string;
    period: string;
    title: string;
    summary: string;
    tech: string[];
    ctaLabel: string;
    techAriaLabel?: string;
    featured?: boolean;
    featuredBadge?: string;
}>();
</script>
