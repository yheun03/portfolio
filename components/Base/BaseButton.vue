<template>
    <button v-if="!href" v-bind="$attrs" type="button" class="base-button" :class="`base-button--${variant}`"
        :aria-label="ariaLabel || label">
        <slot>{{ label }}</slot>
    </button>
    <BaseLink v-else v-bind="$attrs" class="base-button" :class="`base-button--${variant}`" :href="href"
        :aria-label="ariaLabel || label" external>
        <slot>{{ label }}</slot>
    </BaseLink>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        label: string;
        href?: string;
        ariaLabel?: string;
        variant?: "primary" | "ghost";
    }>(),
    { variant: "primary" }
);
</script>
