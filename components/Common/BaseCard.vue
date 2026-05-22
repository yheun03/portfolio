<template>
    <article class="base-card" :data-animate="animate ? '' : null">
        <slot />
    </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ animate?: boolean }>(), {
    animate: true,
});
</script>
