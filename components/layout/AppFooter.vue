<template>
    <footer class="app-footer">
        <p class="app-footer__emoji-line" aria-hidden="true">
            <span class="emoji emoji--soft">✦</span>
        </p>
        <p>{{ text }}</p>
    </footer>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
