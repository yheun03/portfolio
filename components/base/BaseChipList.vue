<template>
    <ul class="base-chip-list" :aria-label="ariaLabel">
        <li v-for="item in items" :key="item" class="base-chip">{{ item }}</li>
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    items: string[];
    ariaLabel?: string;
}>();
</script>
