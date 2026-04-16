<template>
    <header class="header">
        <h1>{{ title }}</h1>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<style scoped lang="scss">
.header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(226, 232, 240, 0.18);

    h1 {
        margin: 0;
        font-size: 1.25rem;
    }
}
</style>
