<template>
    <NuxtLink v-if="isAppRoute(href)" v-bind="$attrs" :to="href">
        <slot />
    </NuxtLink>
    <a v-else v-bind="$attrs" :href="resolvedHref" :target="targetAttr" :rel="relAttr">
        <slot />
    </a>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        href: string;
        external?: boolean;
        target?: string;
        rel?: string;
    }>(),
    {
        external: false,
        target: undefined,
        rel: undefined,
    },
);

const { isAppRoute, resolveAppPath } = useAppPathResolver();

const resolvedHref = computed(() => resolveAppPath(props.href));
const isExternalUrl = computed(() => props.external || /^(https?:)?\/\//i.test(props.href));
const targetAttr = computed(() => props.target ?? (isExternalUrl.value ? '_blank' : undefined));
const relAttr = computed(() => props.rel ?? (targetAttr.value === '_blank' ? 'noopener noreferrer' : undefined));
</script>
