<template>
    <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
</template>

<script setup lang="ts">
const progress = ref(0);

onMounted(() => {
    const update = () => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progress.value = maxScroll > 0 ? scrollTop / maxScroll : 0;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
});
</script>
