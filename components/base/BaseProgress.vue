<template>
    <div class="base-progress" :class="variant ? `base-progress--${variant}` : undefined">
        <div v-if="label || showValue" class="base-progress__head">
            <span v-if="label" class="base-progress__label">{{ label }}</span>
            <strong v-if="showValue" class="base-progress__value">{{ clamped }}%</strong>
        </div>
        <div
            class="base-progress__track"
            role="progressbar"
            :aria-valuenow="clamped"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="ariaLabel ?? defaultAriaLabel"
        >
            <span class="base-progress__fill" :style="{ width: `${clamped}%` }" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        value: number;
        label?: string;
        ariaLabel?: string;
        showValue?: boolean;
        variant?: "panel";
    }>(),
    { showValue: true },
);

const clamped = computed(() => Math.min(100, Math.max(0, Math.round(props.value))));

const defaultAriaLabel = computed(() => {
    const pct = `${clamped.value}%`;
    return props.label ? `${props.label} ${pct}` : pct;
});
</script>
