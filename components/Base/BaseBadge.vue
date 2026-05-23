<template>
    <span class="base-badge" :class="[
        size ? `base-badge--${size}` : undefined,
        tone ? `base-badge--${tone}` : undefined,
        { 'base-badge--plain': plain },
    ]">
        <slot />
    </span>
</template>

<script setup lang="ts">
defineProps<{
    size?: "sm" | "md";
    tone?: "default" | "toolbox" | "work";
    plain?: boolean;
}>();
</script>
