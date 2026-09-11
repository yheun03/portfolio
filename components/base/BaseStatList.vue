<template>
    <dl class="base-stat-list" :aria-label="ariaLabel">
        <div v-for="(stat, index) in stats" :key="stat.label" :style="{ '--stagger-i': index }" data-stagger>
            <dd>{{ stat.value }}{{ stat.suffix ?? "" }}</dd>
            <dt>{{ stat.label }}</dt>
        </div>
    </dl>
</template>

<script setup lang="ts">
export type BaseStatItem = {
    label: string;
    value: string | number;
    suffix?: string;
};

defineProps<{
    stats: BaseStatItem[];
    ariaLabel?: string;
}>();
</script>
