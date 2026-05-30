<template>
    <section id="works" class="section section--works">
        <span class="section__emoji section__emoji--works emoji emoji--soft" aria-hidden="true">🗂️</span>
        <div class="works__total-badge" aria-live="polite">
            <span>{{ locale === 'ko' ? '총' : 'Total' }} {{ totalPortfolioWorkCount }}{{ locale === 'ko' ? '건' : ''
            }}</span>
            <small>
                {{ locale === 'ko'
                    ? `실무 ${totalCareerWorkCount} + 개인 ${personalWorkCount}`
                    : `${totalCareerWorkCount} client + ${personalWorkCount} personal` }}
            </small>
        </div>
        <div class="works__title-col">
            <BaseSectionTitle :eyebrow="t('nav.works')" :title="t('works.title')" />
            <BaseTabList v-model="selectedCategory" :items="workTabItems" tab-id-prefix="works-tab-"
                panel-id-prefix="works-panel" :list-label="locale === 'ko' ? '프로젝트 필터' : 'Project filters'"
                scroll-anchor="#works" class="works__filters" />
            <p class="section-title__description">{{ t("works.sectionDescription") }}</p>
            <aside class="works__archive-summary surface-card" :style="archiveSummaryStyle" aria-live="polite"
                :aria-label="locale === 'ko' ? '작업 아카이브 요약' : 'Work archive summary'">
                <p class="works__archive-meta">
                    <strong>{{ totalCareerWorkCount }}</strong>
                    <span>{{ t("works.archiveCountLabel") }}</span>
                </p>
                <div class="works__archive-meter" aria-hidden="true">
                    <span />
                </div>
                <p class="works__archive-caption">
                    {{ archiveSummaryText }}
                </p>
                <NuxtLink class="works__archive-cta" to="/projects">{{ t('works.fullArchiveLink') }}</NuxtLink>
            </aside>
        </div>

        <div class="works__rail-wrap swipe-rail">
            <div class="swipe-rail__head">
                <p id="works-swipe-help" class="swipe-rail__hint">{{ swipeHint }}</p>
                <div class="swipe-rail__controls" role="group" :aria-label="swipeControlsLabel">
                    <button type="button" class="swipe-rail__button" :aria-label="swipePrevLabel"
                        @click="scrollWorksRail(-1)">
                        <span aria-hidden="true">‹</span>
                    </button>
                    <button type="button" class="swipe-rail__button" :aria-label="swipeNextLabel"
                        @click="scrollWorksRail(1)">
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
            </div>
            <WorksTabPanelRenderer ref="worksPanelRef" :selected-category="selectedCategory"
                :panel-render-key="panelRenderKey" :works="visibleWorks" :detail-label="t('works.detail')"
                swipe-help-id="works-swipe-help" @select="openWork" />
        </div>
        <div v-if="hasMoreWorks || canCollapseWorks" class="works__list-control" aria-live="polite">
            <p>
                {{ visibleCountLabel }}
            </p>
            <button v-if="hasMoreWorks" type="button" class="base-button base-button--ghost"
                :aria-label="showMoreAriaLabel" @click="showMoreWorks">
                {{ t("works.showMore") }}
            </button>
            <button v-else-if="canCollapseWorks" type="button" class="base-button base-button--ghost"
                :aria-label="collapseAriaLabel" @click="collapseWorks">
                {{ t("works.collapse") }}
            </button>
        </div>

        <WorksDetailModalRenderer />
    </section>
</template>

<script setup lang="ts">
import { useWorksTabs } from '@composables/portfolio/useWorksTabs';
import { careerWorks, personalWorksList } from '@data/works';
import WorksDetailModalRenderer from '~/components/renderers/Page_Home/WorksDetailModalRenderer.vue';
import WorksTabPanelRenderer from '~/components/renderers/Page_Home/WorksTabPanelRenderer.vue';

const { t, pick, locale } = useLocale();
const { isNarrow } = useNarrowLayout();

const {
    workCategories,
    selectedCategory,
    filteredWorks,
    panelRenderKey,
    openWork,
} = useWorksTabs();

const workTabItems = computed(() =>
    workCategories.map((category) => ({
        key: category.key,
        label: pick(category.label),
    })),
);

const worksPanelRef = ref<InstanceType<typeof WorksTabPanelRenderer> | null>(null);
const visibleCount = ref(6);
const initialVisibleCount = 6;
const visibleStep = 6;

/** 메인 페이지에는 JSON 의 pin === true 인 항목만 노출 */
const pinnedFilteredWorks = computed(() => filteredWorks.value.filter((w) => w.pin));
const totalCareerWorkCount = computed(() => careerWorks.length);
const personalWorkCount = computed(() => personalWorksList.length);
const totalPortfolioWorkCount = computed(() => totalCareerWorkCount.value + personalWorkCount.value);
const currentTabTotalCount = computed(() => filteredWorks.value.length);
const highlightedWorkRatio = computed(() => {
    if (!currentTabTotalCount.value) return 0;

    return Math.min(100, Math.max(8, Math.round((pinnedFilteredWorks.value.length / currentTabTotalCount.value) * 100)));
});
const archiveSummaryStyle = computed(() => ({
    "--works-highlight-ratio": `${highlightedWorkRatio.value}%`,
}));
const archiveSummaryText = computed(() =>
    t("works.archiveSummary")
        .replace("{pinned}", String(pinnedFilteredWorks.value.length))
        .replace("{total}", String(currentTabTotalCount.value)),
);

const visibleWorks = computed(() => pinnedFilteredWorks.value.slice(0, visibleCount.value));

const visibleCountLabel = computed(() =>
    t("works.visibleCount")
        .replace("{visible}", String(visibleWorks.value.length))
        .replace("{total}", String(pinnedFilteredWorks.value.length)),
);
const hasMoreWorks = computed(() => visibleCount.value < pinnedFilteredWorks.value.length);
const canCollapseWorks = computed(() => pinnedFilteredWorks.value.length > initialVisibleCount);

const swipeHint = computed(() => locale.value === "ko" ? "좌우로 스와이프해 대표 작업을 넘겨보세요." : "Swipe horizontally to browse featured work.");
const swipeControlsLabel = computed(() => locale.value === "ko" ? "대표 작업 슬라이드 이동" : "Featured work carousel controls");
const swipePrevLabel = computed(() => locale.value === "ko" ? "이전 작업 보기" : "Show previous work");
const swipeNextLabel = computed(() => locale.value === "ko" ? "다음 작업 보기" : "Show next work");
const showMoreAriaLabel = computed(() =>
    locale.value === "ko"
        ? `대표 작업 ${Math.min(visibleStep, pinnedFilteredWorks.value.length - visibleWorks.value.length)}건 더 보기`
        : `Show ${Math.min(visibleStep, pinnedFilteredWorks.value.length - visibleWorks.value.length)} more featured work items`,
);
const collapseAriaLabel = computed(() =>
    locale.value === "ko" ? "대표 작업 목록 처음 개수로 접기" : "Collapse featured work list to the initial count",
);

const scrollRail = (rail: HTMLElement | null, direction: -1 | 1) => {
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>(".work-card");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || "0");
    const distance = firstCard ? firstCard.offsetWidth + gap : rail.clientWidth * 0.86;

    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
};

const scrollWorksRail = (direction: -1 | 1) => scrollRail(worksPanelRef.value?.panelRef ?? null, direction);

const showMoreWorks = () => {
    visibleCount.value = Math.min(visibleCount.value + visibleStep, pinnedFilteredWorks.value.length);
};

const collapseWorks = () => {
    visibleCount.value = initialVisibleCount;
    if (import.meta.client) document.querySelector("#works")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

watch(selectedCategory, () => {
    visibleCount.value = initialVisibleCount;
    nextTick(() => {
        const panel = worksPanelRef.value?.panelRef;
        if (panel) panel.scrollLeft = 0;
    });
});
</script>
