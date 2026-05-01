<template>
    <button v-if="!href" class="base-button" :class="`base-button--${variant}`" :aria-label="ariaLabel || label">
        <slot>{{ label }}</slot>
    </button>
    <a v-else class="base-button" :class="`base-button--${variant}`" :href="href" :aria-label="ariaLabel || label"
        target="_blank" rel="noopener noreferrer">
        <slot>{{ label }}</slot>
    </a>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        label: string;
        href?: string;
        ariaLabel?: string;
        variant?: "primary" | "ghost";
    }>(),
    { variant: "primary" }
);
</script>
