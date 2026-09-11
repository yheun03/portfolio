<template>
    <p class="base-label" :class="tone ? `base-label--${tone}` : undefined">
        <slot>{{ label }}</slot>
    </p>
</template>

<script setup lang="ts">
defineProps<{
    label?: string;
    tone?: "default" | "work" | "personal" | "toolbox" | "highlight" | "journey" | "contact" | "profile" | "technical";
}>();
</script>
