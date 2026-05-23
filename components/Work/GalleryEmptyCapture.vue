<template>
    <span class="gallery-card__empty-capture" role="img" :aria-label="emptyCaptureLabel">
        <span class="gallery-card__empty-capture-kicker">{{ emptyCaptureKicker }}</span>
        <span class="gallery-card__empty-capture-copy">{{ emptyCaptureCopy }}</span>
    </span>
</template>

<script setup lang="ts">
const { locale } = useLocale();

const emptyCaptureKicker = computed(() => (locale.value === 'ko' ? '이미지 준비 중' : 'Image pending'));
const emptyCaptureCopy = computed(() => (
    locale.value === 'ko'
        ? '대신 설명은 먼저 열어뒀어요.'
        : 'The context is already open.'
));
const emptyCaptureLabel = computed(() => `${emptyCaptureKicker.value}. ${emptyCaptureCopy.value}`);
</script>
