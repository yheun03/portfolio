<template>
    <article class="promo-card promo-feature-card skill-card" :data-animate="animate">
        <p v-if="eyebrow" class="promo-feature-card__eyebrow">{{ eyebrow }}</p>
        <h3 class="promo-feature-card__title">{{ title }}</h3>
        <ul v-if="items.length" class="skill-card__tags">
            <li v-for="item in items" :key="item">
                <BaseBadge size="sm" tone="toolbox" plain>{{ item }}</BaseBadge>
            </li>
        </ul>
        <p class="promo-feature-card__description">{{ description }}</p>
    </article>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string;
        items: string[];
        description: string;
        eyebrow?: string;
        animate?: boolean;
    }>(),
    { animate: true }
);
</script>
