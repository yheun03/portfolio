<template>
    <button v-if="!href" class="base-button" :class="`base-button--${variant}`" :aria-label="ariaLabel || label">
        <slot>{{ label }}</slot>
    </button>
    <NuxtLink v-else-if="isAppRoute(href)" class="base-button" :class="`base-button--${variant}`" :to="href"
        :aria-label="ariaLabel || label">
        <slot>{{ label }}</slot>
    </NuxtLink>
    <a v-else class="base-button" :class="`base-button--${variant}`" :href="externalLinkHref"
        :aria-label="ariaLabel || label" target="_blank" rel="noopener noreferrer">
        <slot>{{ label }}</slot>
    </a>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        label: string;
        href?: string;
        ariaLabel?: string;
        variant?: "primary" | "ghost";
    }>(),
    { variant: "primary" }
);

const { isAppRoute, resolveAppPath } = useAppPathResolver();

const externalLinkHref = computed(() => (props.href ? resolveAppPath(props.href) : ""));
</script>
