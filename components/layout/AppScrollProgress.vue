<template>
    <div class="scroll-progress" aria-hidden="true">
        <div class="scroll-progress__bar" :style="{ transform: `scaleX(${progress})` }" />
    </div>
</template>

<script setup lang="ts">
const progress = ref(0);

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

onMounted(() => {
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateProgress);
});
</script>
