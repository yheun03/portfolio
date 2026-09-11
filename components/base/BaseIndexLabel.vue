<template>
    <component :is="tag" class="base-index-label" :class="variant ? `base-index-label--${variant}` : undefined">
        <slot>{{ value }}</slot>
    </component>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        value?: string | number;
        variant?: "default" | "tag";
        tag?: "span" | "p";
    }>(),
    { tag: "span", variant: "default" },
);
</script>
