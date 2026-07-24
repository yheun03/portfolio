<template>
    <article class="feature-card" :class="cardClass" :data-animate="animate ? '' : null" data-card-pointer>
        <p v-if="eyebrow" class="feature-card__eyebrow">{{ eyebrow }}</p>
        <p v-if="icon" class="feature-card__icon" aria-hidden="true">{{ icon }}</p>
        <h3 class="feature-card__title">{{ title }}</h3>
        <ul v-if="items.length" class="feature-card__tags">
            <li v-for="item in items" :key="item">
                <BaseBadge size="sm" tone="toolbox" plain>{{ item }}</BaseBadge>
            </li>
        </ul>
        <p v-if="description" class="feature-card__description">{{ description }}</p>
        <slot />
    </article>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        eyebrow?: string;
        icon?: string;
        title: string;
        description?: string;
        items?: readonly string[];
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
    'surface-card': props.variant === 'skill',
    'feature-card--skill': props.variant === 'skill',
}));
</script>
