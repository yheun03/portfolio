<template>
    <article class="promo-feature-card" :class="cardClass" :data-animate="animate ? '' : null">
        <p v-if="eyebrow" class="promo-feature-card__eyebrow">{{ eyebrow }}</p>
        <h3 class="promo-feature-card__title">{{ title }}</h3>
        <ul v-if="items.length" class="skill-card__tags">
            <li v-for="item in items" :key="item">
                <BaseBadge size="sm" tone="toolbox" plain>{{ item }}</BaseBadge>
            </li>
        </ul>
        <p v-if="description" class="promo-feature-card__description">{{ description }}</p>
        <slot />
    </article>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        eyebrow?: string;
        title: string;
        description?: string;
        items?: string[];
        variant?: 'plain' | 'skill';
        animate?: boolean;
    }>(),
    {
        items: () => [],
        variant: 'plain',
        animate: true,
    },
);

const cardClass = computed(() => ({
    'promo-card': props.variant === 'skill',
    'skill-card': props.variant === 'skill',
}));
</script>
