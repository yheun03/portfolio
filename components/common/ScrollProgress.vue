<template>
    <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
</template>

<script setup lang="ts">
const progress = ref(0);
let ticking = false;

const update = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = maxScroll > 0 ? scrollTop / maxScroll : 0;
    ticking = false;
};

const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
};

onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
});
</script>
