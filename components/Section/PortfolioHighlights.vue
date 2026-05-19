<template>
    <section id="highlights" class="section section--highlights">
        <span class="section__emoji section__emoji--highlights accent-emoji accent-emoji--soft" aria-hidden="true">✨</span>

        <header class="highlights__head">
            <BaseSectionTitle :eyebrow="t('nav.highlights')" :title="t('highlights.title')" />
            <p class="section-title__description">{{ t("highlights.summary") }}</p>
        </header>

        <section
            class="highlights__spotlight promo-spotlight"
            data-animate
            :aria-label="locale === 'ko' ? '하이라이트 카테고리' : 'Highlight categories'"
        >
            <h2 class="promo-spotlight__kicker">{{ locale === "ko" ? "한눈에." : "At a glance." }}</h2>

            <ul
                class="highlights__picker promo-feature-grid promo-feature-grid--highlights"
                role="tablist"
                :aria-label="locale === 'ko' ? '하이라이트 탭' : 'Highlights tabs'"
            >
                <li v-for="(tab, index) in tabs" :key="tab.key">
                    <button
                        :id="`highlights-tab-${tab.key}`"
                        type="button"
                        role="tab"
                        :aria-controls="`highlights-panel-${tab.key}`"
                        :aria-selected="highlightsUi.activeTab === tab.key"
                        :tabindex="highlightsUi.activeTab === tab.key ? 0 : -1"
                        class="highlights__picker-card promo-card"
                        :class="{ 'is-active': highlightsUi.activeTab === tab.key }"
                        @click="highlightsUi.setTab(tab.key)"
                    >
                        <span class="promo-feature-card__eyebrow">{{ String(index + 1).padStart(2, "0") }}</span>
                        <span class="promo-feature-card__title">{{ tab.label }}</span>
                        <span class="promo-feature-card__description">{{ tab.teaser }}</span>
                    </button>
                </li>
            </ul>
        </section>

        <article
            :id="`highlights-panel-${highlightsUi.activeTab}`"
            :key="highlightsUi.activeTab"
            class="highlights__detail"
            role="tabpanel"
            :aria-labelledby="`highlights-tab-${highlightsUi.activeTab}`"
            data-animate
        >
            <p class="highlights__detail-index">{{ activeTabIndex }}</p>
            <h3 class="highlights__detail-title">{{ activeTabLabel }}</h3>
            <ul class="highlights__spec-list">
                <li v-for="item in activeItems" :key="item">{{ item }}</li>
            </ul>
            <p class="highlights__detail-lead">{{ activeDescription }}</p>
        </article>
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
        teaser: teaserForTab(tab.key),
    }));
});

function teaserForTab(key: HighlightTabKey): string {
    const count = highlights[key].length;
    const first = pick(highlights[key][0] ?? { ko: "", en: "" });
    const countLabel =
        locale.value === "ko" ? `${count}개 항목` : `${count} entries`;

    if (!first) {
        return countLabel;
    }

    const preview = first.length > 42 ? `${first.slice(0, 39)}…` : first;
    return `${countLabel} · ${preview}`;
}

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
