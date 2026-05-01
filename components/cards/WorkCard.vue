<template>
    <BaseCard class="work-card" data-motion="lift">
        <h3>{{ item.title }}</h3>
        <p class="work-card__meta">{{ work.period }} · {{ item.type }}</p>
        <p>{{ item.summary }}</p>
        <ul class="work-card__tech">
            <li v-for="tech in work.tech" :key="tech">{{ tech }}</li>
        </ul>
        <div class="work-card__footer">
            <button type="button" class="base-button base-button--primary work-card__button" :aria-label="detailAriaLabel || `${item.title} ${detailLabel}`"
                @click="$emit('select')">
                {{ detailLabel }}
            </button>
        </div>
    </BaseCard>
</template>

<script setup lang="ts">
import type { WorkItem } from "~/core/data/works";

defineEmits<{ (e: "select"): void }>();
defineProps<{
    work: WorkItem;
    item: { title: string; type: string; summary: string };
    detailLabel: string;
    detailAriaLabel?: string;
}>();
</script>
