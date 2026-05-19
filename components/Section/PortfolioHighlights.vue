<template>
    <section id="highlights" class="section section--highlights">
        <span class="section__emoji section__emoji--highlights accent-emoji accent-emoji--soft"
            aria-hidden="true">✨</span>

        <header class="highlights__head">
            <BaseSectionTitle :eyebrow="t('nav.highlights')" :title="t('highlights.title')" />
            <p class="section-title__description">{{ t("highlights.summary") }}</p>
        </header>

        <div class="highlights__workspace" data-animate>
            <nav class="highlights__nav" role="tablist"
                :aria-label="locale === 'ko' ? '하이라이트 카테고리' : 'Highlight categories'">
                <button v-for="(tab, index) in tabs" :key="tab.key" :id="`highlights-tab-${tab.key}`" type="button"
                    role="tab" :aria-controls="`highlights-panel-${tab.key}`"
                    :aria-selected="highlightsUi.activeTab === tab.key"
                    :tabindex="highlightsUi.activeTab === tab.key ? 0 : -1" class="highlights__nav-item"
                    :class="{ 'is-active': highlightsUi.activeTab === tab.key }" @click="highlightsUi.setTab(tab.key)">
                    <span class="highlights__nav-index">{{ String(index + 1).padStart(2, "0") }}</span>
                    <span class="highlights__nav-label">{{ tab.label }}</span>
                    <span class="highlights__nav-count">{{ tab.countLabel }}</span>
                </button>
            </nav>

            <article :id="`highlights-panel-${highlightsUi.activeTab}`" :key="highlightsUi.activeTab"
                class="highlights__panel" role="tabpanel" :aria-labelledby="`highlights-tab-${highlightsUi.activeTab}`">
                <div class="highlights__panel-aside">
                    <p class="highlights__panel-index">{{ activeTabIndex }}</p>
                    <h3 class="highlights__panel-title">{{ activeTabLabel }}</h3>
                    <p class="highlights__panel-lead">{{ activeDescription }}</p>
                </div>

                <ul class="highlights__entries" :aria-label="activeTabLabel">
                    <li v-for="item in activeItems" :key="item">{{ item }}</li>
                </ul>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
import { highlights } from "@content/site";
import { useHighlightsUiStore } from "@stores/highlightsUiStore";
import type { HighlightTabKey } from "@app-types/highlights";

const highlightsUi = useHighlightsUiStore();
const { t, pick, locale } = useLocale();

const tabs = computed(() => {
    const entries: { key: HighlightTabKey; label: string }[] = [
        { key: "awards", label: t("highlights.awards") },
        { key: "certifications", label: t("highlights.certifications") },
        { key: "roles", label: t("highlights.roles") },
        { key: "activities", label: t("highlights.activities") },
    ];

    return entries.map((tab) => ({
        ...tab,
        countLabel:
            locale.value === "ko"
                ? `${highlights[tab.key].length}개`
                : `${highlights[tab.key].length}`,
    }));
});

const activeTabIndex = computed(() => {
    const index = tabs.value.findIndex((tab) => tab.key === highlightsUi.activeTab);
    return String(index + 1).padStart(2, "0");
});

const activeItems = computed(() => highlights[highlightsUi.activeTab].map((item) => pick(item)));
const activeTabLabel = computed(
    () => tabs.value.find((tab) => tab.key === highlightsUi.activeTab)?.label ?? ""
);
const activeDescription = computed(() => pick(highlights.descriptions[highlightsUi.activeTab]));
</script>
