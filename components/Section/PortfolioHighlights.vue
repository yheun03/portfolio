<template>
    <section id="highlights" class="section">
        <BaseSectionTitle :eyebrow="t('nav.highlights')" :title="t('highlights.title')" />
        <div class="highlights__tabs" role="tablist" :aria-label="locale === 'ko' ? '하이라이트 탭' : 'Highlights tabs'">
            <button v-for="tab in tabs" :key="tab.key" :id="`highlights-tab-${tab.key}`" role="tab"
                :aria-controls="`highlights-panel-${tab.key}`" :aria-selected="activeTab === tab.key"
                :tabindex="activeTab === tab.key ? 0 : -1" class="ui-tab-button"
                :class="{ 'is-active': activeTab === tab.key }" @click="activeTab = tab.key">
                {{ tab.label }}
            </button>
        </div>

        <div :id="`highlights-panel-${activeTab}`" class="highlights__panel" role="tabpanel"
            :aria-labelledby="`highlights-tab-${activeTab}`">
            <HighlightCard :title="activeTabLabel" :items="activeItems" />
            <p class="highlights__description">{{ activeDescription }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
type TabKey = "awards" | "certifications" | "roles" | "activities";
import { highlights } from "~/core/data/highlights";

const { t, pick, locale } = useLocale();
const tabs = computed<{ key: TabKey; label: string }[]>(() => [
    { key: "awards", label: t("highlights.awards") },
    { key: "certifications", label: t("highlights.certifications") },
    { key: "roles", label: t("highlights.roles") },
    { key: "activities", label: t("highlights.activities") },
]);

const activeTab = ref<TabKey>("awards");
const activeItems = computed(() => highlights[activeTab.value].map((item) => pick(item)));
const activeTabLabel = computed(() => tabs.value.find((tab) => tab.key as TabKey === activeTab.value)?.label ?? "");
const activeDescription = computed(() => pick(highlights.descriptions[activeTab.value]));
</script>
