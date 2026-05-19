<template>
    <article class="promo-feature-card" :data-animate="animate ? '' : null">
        <p v-if="eyebrow" class="promo-feature-card__eyebrow">{{ eyebrow }}</p>
        <h3 class="promo-feature-card__title">{{ title }}</h3>
        <p v-if="description" class="promo-feature-card__description">{{ description }}</p>
        <slot />
    </article>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        eyebrow?: string;
        title: string;
        description?: string;
        animate?: boolean;
    }>(),
    { animate: true }
);
</script>
