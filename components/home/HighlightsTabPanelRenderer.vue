<template>
    <article :id="`highlights-panel-${activeTab}`" :key="panelRenderKey" class="highlights__panel" role="tabpanel"
        :aria-labelledby="`highlights-tab-${activeTab}`">
        <div class="highlights__panel-aside">
            <p class="highlights__panel-index">{{ activeTabIndex }}</p>
            <h3 class="highlights__panel-title">{{ activeTabLabel }}</h3>
            <p class="highlights__panel-lead">{{ activeDescription }}</p>
        </div>

        <ul class="highlights__entries" :aria-label="activeTabLabel">
            <li v-for="item in activeItems" :key="item">{{ item }}</li>
        </ul>
    </article>
</template>

<script setup lang="ts">
import type { HighlightTabKey } from '@app-types/highlights';

defineProps<{
    activeTab: HighlightTabKey;
    panelRenderKey: string;
    activeTabIndex: string;
    activeTabLabel: string;
    activeDescription: string;
    activeItems: readonly string[];
}>();
</script>
