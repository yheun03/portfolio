<template>
    <div :id="`works-panel-${selectedCategory}`" :key="panelRenderKey" ref="panelRef" class="works__grid"
        role="tabpanel" :aria-labelledby="`works-tab-${selectedCategory}`"
        :aria-describedby="isNarrow ? swipeHelpId : undefined" :aria-busy="false" :tabindex="isNarrow ? 0 : -1">
        <WorkCard v-for="(work, index) in works" :key="`${panelRenderKey}-${work.id}`" :work="work"
            :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
            :detail-label="detailLabel" :style="{ '--animate-delay': `${Math.min(index * 90, 360)}ms` }"
            @select="emit('select', work)" />
    </div>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
import type { WorkCategory } from '@data/works';

defineProps<{
    selectedCategory: WorkCategory;
    panelRenderKey: WorkCategory;
    works: readonly WorkItem[];
    detailLabel: string;
    swipeHelpId?: string;
}>();

const emit = defineEmits<{
    select: [work: WorkItem];
}>();

const { pick } = useLocale();
const { isNarrow } = useNarrowLayout();

const panelRef = ref<HTMLElement | null>(null);

defineExpose({ panelRef });
</script>
