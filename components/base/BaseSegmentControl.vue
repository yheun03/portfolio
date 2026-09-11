<template>
    <div class="segment-control">
        <span :id="labelId" class="segment-control__label" :class="{ 'visually-hidden': labelHidden }">{{ labelText
            }}</span>
        <div class="segment-control__group" role="radiogroup" :aria-labelledby="labelId"
            :style="{ '--segment-count': options.length }">
            <button v-for="option in options" :key="option.value" type="button" class="segment-control__button"
                :class="{ 'segment-control__button--active': modelValue === option.value }" role="radio"
                :aria-checked="modelValue === option.value" :tabindex="modelValue === option.value ? 0 : -1"
                @click="emit('update:modelValue', option.value)" @keydown="handleKeydown($event, option.value)">
                {{ option.label }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
export type SegmentOption = {
    value: string;
    label: string;
};

const props = defineProps<{
    modelValue: string;
    options: readonly SegmentOption[];
    labelText: string;
    labelId: string;
    labelHidden?: boolean;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

function handleKeydown(event: KeyboardEvent, current: string) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const list = props.options.map((o) => o.value);
    const index = list.indexOf(current);
    if (index < 0) return;

    let nextIndex = index;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = list.length - 1;
    else if (event.key === 'ArrowRight') nextIndex = (index + 1) % list.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + list.length) % list.length;

    const next = list[nextIndex];
    if (!next) return;

    emit('update:modelValue', next);

    nextTick(() => {
        const buttons = (event.currentTarget as HTMLElement)
            ?.closest('.segment-control__group')
            ?.querySelectorAll<HTMLElement>('[role="radio"]');
        buttons?.[nextIndex]?.focus();
    });
}
</script>
