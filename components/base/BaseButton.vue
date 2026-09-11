<template>
    <button v-if="!linkTarget" v-bind="$attrs" type="button" class="base-button" :class="`base-button--${variant}`"
        :aria-label="ariaLabel || label">
        <slot>{{ label }}</slot>
    </button>
    <BaseLink v-else v-bind="$attrs" class="base-button" :class="`base-button--${variant}`" :href="linkTarget"
        :external="external || isExternalHref" :target="target" :rel="rel" :aria-label="ariaLabel || label">
        <slot>{{ label }}</slot>
    </BaseLink>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        label?: string;
        href?: string;
        to?: string;
        ariaLabel?: string;
        variant?: "primary" | "ghost";
        external?: boolean;
        target?: string;
        rel?: string;
    }>(),
    { variant: "primary" },
);

const linkTarget = computed(() => props.to ?? props.href);
const isExternalHref = computed(() => {
    const target = linkTarget.value;
    return !!target && (/^(https?:|mailto:|tel:)/i.test(target) || target.startsWith("//"));
});
</script>
