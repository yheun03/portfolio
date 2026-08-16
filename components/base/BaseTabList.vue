<template>
    <div ref="tabListRef" role="tablist" class="tab-list tab-list--rail" :class="$attrs.class" :aria-label="listLabel">
        <button v-for="item in items" :key="item.key" :id="`${tabIdPrefix}${item.key}`" type="button" role="tab"
            :aria-controls="`${panelIdPrefix}-${item.key}`" :aria-selected="modelValue === item.key"
            :tabindex="modelValue === item.key ? 0 : -1" class="tab-list__tab"
            :class="{ 'tab-list__tab--active': modelValue === item.key }" @click="handleTabSelect(item.key)"
            @focus="handleTabFocus" @keydown="handleTabKeydown($event, item.key)">
            <slot name="tab" :item="item" :active="modelValue === item.key">
                {{ item.label }}
            </slot>
        </button>
    </div>
</template>

<script setup lang="ts">
export type TabListItem = {
    key: string;
    label: string;
};

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    modelValue: string;
    items: readonly TabListItem[];
    tabIdPrefix: string;
    panelIdPrefix: string;
    listLabel: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const tabListRef = ref<HTMLElement | null>(null);
const tabKeys = computed(() => props.items.map((item) => item.key));

function handleTabKeydown(event: KeyboardEvent, currentKey: string) {
    const currentIndex = tabKeys.value.indexOf(currentKey);
    if (currentIndex < 0) return;

    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = currentIndex + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabKeys.value.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const key = tabKeys.value[(nextIndex + tabKeys.value.length) % tabKeys.value.length];
    if (!key) return;
    emit('update:modelValue', key);
    nextTick(() => document.getElementById(`${props.tabIdPrefix}${key}`)?.focus());
}

function handleTabSelect(key: string) {
    emit('update:modelValue', key);
}

function handleTabFocus(event: FocusEvent) {
    const tab = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    const tabList = tabListRef.value;
    if (!tab || !tabList) return;

    const scrollPaddingStart = Number.parseFloat(
        getComputedStyle(tabList).getPropertyValue('scroll-padding-inline-start'),
    ) || 0;

    tabList.scrollTo({
        left: Math.max(0, tab.offsetLeft - scrollPaddingStart),
        behavior: 'smooth',
    });
}
</script>
