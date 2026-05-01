<template>
    <section id="highlights" class="section">
        <BaseSectionTitle eyebrow="Highlights" :title="t('highlights.title')" />
        <div class="highlights__tabs" role="tablist" aria-label="하이라이트 탭">
            <button
                v-for="tab in tabs"
                :key="tab.key"
                :id="`highlights-tab-${tab.key}`"
                role="tab"
                :aria-controls="`highlights-panel-${tab.key}`"
                :aria-selected="activeTab === tab.key"
                :tabindex="activeTab === tab.key ? 0 : -1"
                :class="{ 'is-active': activeTab === tab.key }"
                @click="activeTab = tab.key"
            >
                {{ tab.label }}
            </button>
        </div>

        <div
            :id="`highlights-panel-${activeTab}`"
            class="highlights__panel"
            role="tabpanel"
            :aria-labelledby="`highlights-tab-${activeTab}`"
        >
            <HighlightCard :title="activeTabLabel" :items="activeItems" />
            <p style="margin-top: 0.75rem">{{ activeDescription }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
type TabKey = "awards" | "certifications" | "roles" | "activities";
import { highlights } from "~/data/highlights";

const { t } = useLocale();
const tabs = computed<{ key: TabKey; label: string }[]>(() => [
    { key: "awards", label: t("highlights.awards") },
    { key: "certifications", label: t("highlights.certifications") },
    { key: "roles", label: t("highlights.roles") },
    { key: "activities", label: t("highlights.activities") },
]);

const activeTab = ref<TabKey>("awards");
const activeItems = computed(() => highlights[activeTab.value]);
const activeTabLabel = computed(() => tabs.value.find((tab) => tab.key as TabKey === activeTab.value)?.label ?? "");
const activeDescription = computed(() => highlights.descriptions[activeTab.value]);
</script>
