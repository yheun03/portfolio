<template>
    <span class="base-accent-badge">
        <slot>{{ label }}</slot>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    label?: string;
}>();
</script>
