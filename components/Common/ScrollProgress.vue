<template>
    <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
</template>

<script setup lang="ts">
const progress = ref(0);
let ticking = false;
let mutationObserver: MutationObserver | null = null;

const computeProgress = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const nextValue = maxScroll > 0 ? scrollTop / maxScroll : 0;
    progress.value = Math.max(0, Math.min(1, nextValue));
};

const update = () => {
    computeProgress();
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
    window.addEventListener("load", onScroll);
    mutationObserver = new MutationObserver(onScroll);
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
    update();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("load", onScroll);
    mutationObserver?.disconnect();
    mutationObserver = null;
});
</script>
