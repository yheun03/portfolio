<template>
    <button class="language-toggle" aria-label="언어 전환" @click="toggleLocale">
        {{ locale.toUpperCase() }}
    </button>
</template>

<script setup lang="ts">
const { locale, toggleLocale } = useLocale();
</script>
