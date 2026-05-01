<template>
    <footer class="app-footer">
        <p>{{ text }}</p>
    </footer>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
