<template>
    <li class="timeline-item" data-animate>
        <p v-if="period && !hidePeriod" class="timeline-item__period">{{ period }}</p>
        <p v-if="affiliation" class="timeline-item__affiliation">{{ affiliation }}</p>
        <h4 class="timeline-item__title">{{ title }}</h4>
        <p class="timeline-item__description">{{ description }}</p>
    </li>
</template>

<script setup lang="ts">
defineProps<{
    period: string;
    title: string;
    description: string;
    /** 시간순 보기에서 소속 표시 */
    affiliation?: string;
    /** 연도 헤더가 있을 때 항목 period 숨김 */
    hidePeriod?: boolean;
}>();
</script>
