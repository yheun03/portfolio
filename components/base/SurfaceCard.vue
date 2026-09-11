<template>
    <component :is="tag" class="surface-card" :class="surfaceClass" v-bind="$attrs">
        <h3 v-if="title" class="surface-card__title">{{ title }}</h3>
        <slot />
    </component>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        tag?: 'div' | 'section' | 'article';
        title?: string;
        flow?: boolean;
    }>(),
    { tag: 'div', flow: false },
);

const surfaceClass = computed(() => (props.flow ? 'surface-card--flow' : undefined));
</script>
