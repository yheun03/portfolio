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
            <!-- 카테고리: PC는 LNB 세로 / 좁은 화면은 가로 칩 레일 -->
            <div class="works__filters tab-list tab-rail" role="tablist"
                :aria-orientation="isNarrow ? 'horizontal' : 'vertical'"
                :aria-label="locale === 'ko' ? '프로젝트 필터' : 'Project filters'">
                <button v-for="category in workCategories" :key="category.key" :id="`works-tab-${category.key}`"
                    role="tab" :aria-controls="`works-panel-${category.key}`"
                    :aria-selected="selectedCategory === category.key"
                    :tabindex="selectedCategory === category.key ? 0 : -1" class="tab-list__tab"
                    :class="{ 'tab-list__tab--active': selectedCategory === category.key }"
                    @click="selectCategory(category.key)" @keydown="handleWorksTabKeydown($event, category.key)">
                    {{ pick(category.label) }}
                </button>
            </div>
            <p class="section-title__description">{{ t("works.sectionDescription") }}</p>
            <div class="works__archive-summary surface-card" :style="archiveSummaryStyle" aria-live="polite">
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
            </div>
        </div>

        <!-- 단일 패널 renderer: 탭마다 id·내용이 바뀌며 `:key`로 카드 트리 재생성 -->
        <div class="works__rail-wrap swipe-rail">
            <div class="swipe-rail__head">
                <p id="works-swipe-help" class="swipe-rail__hint">{{ swipeHint }}</p>
                <div class="swipe-rail__controls" :aria-label="swipeControlsLabel">
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
            <div :id="`works-panel-${selectedCategory}`" :key="panelRenderKey" ref="worksRailRef" class="works__grid"
                role="tabpanel" :aria-labelledby="`works-tab-${selectedCategory}`"
                :aria-describedby="isNarrow ? 'works-swipe-help' : undefined" :tabindex="isNarrow ? 0 : -1">
                <WorkCard v-for="work in visibleWorks" :key="`${panelRenderKey}-${work.id}`" :work="work"
                    :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                    :detail-label="t('works.detail')" @select="openWork(work)" />
            </div>
        </div>
        <div v-if="hasMoreWorks || canCollapseWorks" class="works__list-control" aria-live="polite">
            <p>
                {{ visibleCountLabel }}
            </p>
            <button v-if="hasMoreWorks" type="button" class="base-button base-button--ghost" @click="showMoreWorks">
                {{ t("works.showMore") }}
            </button>
            <button v-else-if="canCollapseWorks" type="button" class="base-button base-button--ghost"
                @click="collapseWorks">
                {{ t("works.collapse") }}
            </button>
        </div>

        <Teleport to="body">
            <div v-if="activeWork" class="works__modal" role="dialog" aria-modal="true"
                aria-labelledby="works-modal-title" aria-describedby="works-modal-description" @click.self="closeModal">
                <div ref="modalCardRef" class="works__modal-content" @click.stop>
                    <BaseCard :animate="false" class="works__modal-card">
                        <div class="works__modal-head">
                            <h3 id="works-modal-title">{{ pick(activeWork.title) }}</h3>
                            <button ref="closeButtonRef" type="button"
                                class="base-button base-button--ghost works__modal-close"
                                :aria-label="labels.closeModalAria" @click="closeModal">
                                {{ labels.close }}
                            </button>
                        </div>

                        <div class="works__modal-body">
                            <p id="works-modal-description" class="works__meta">{{ activeWork.period }} · {{
                                pick(activeWork.type) }}</p>
                            <p class="works__role"><strong>{{ labels.role }}:</strong> {{ pick(activeWork.role) }}</p>
                            <p class="works__intro">{{ pick(activeWork.introduction) }}</p>
                            <p class="works__section-title"><strong>{{ labels.contributions }}</strong></p>
                            <ul>
                                <li v-for="item in activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                            </ul>
                            <p v-if="activeWork.achievements.length" class="works__section-title"><strong>{{
                                labels.results
                                    }}</strong></p>
                            <ul v-if="activeWork.achievements.length">
                                <li v-for="item in activeWork.achievements" :key="pick(item)">{{ pick(item) }}</li>
                            </ul>
                            <p class="works__section-title"><strong>{{ labels.points }}</strong></p>
                            <ul>
                                <li v-for="item in activeWork.points" :key="pick(item)">{{ pick(item) }}</li>
                            </ul>
                        </div>

                        <div v-if="activeWork.links?.length" class="works__modal-links">
                            <template v-for="link in activeWork.links" :key="link.href">
                                <NuxtLink v-if="isAppRoute(link.href)" class="base-button base-button--primary"
                                    :to="link.href">
                                    {{ pick(link.label) }}
                                </NuxtLink>
                                <a v-else class="base-button base-button--primary" :href="link.href" target="_blank"
                                    rel="noopener noreferrer">
                                    {{ pick(link.label) }}
                                </a>
                            </template>
                        </div>
                    </BaseCard>
                </div>
            </div>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import { useWorksTabRenderer } from '@composables/useWorksTabRenderer';
import { careerWorks, personalWorksList } from '@data/works';

const { t, pick, locale } = useLocale();
const { isAppRoute } = useAppPathResolver();
const { isNarrow } = useNarrowLayout();

const {
    workCategories,
    selectedCategory,
    filteredWorks,
    activeWork,
    panelRenderKey,
    selectCategory,
    openWork,
    closeModal,
} = useWorksTabRenderer();

const worksTabKeys = computed(() => workCategories.map((category) => category.key));

const { handleTabKeydown: handleWorksTabKeydown } = useTablistKeyboard(
    worksTabKeys,
    selectCategory,
    {
        tabIdPrefix: 'works-tab-',
        orientation: computed(() => (isNarrow.value ? 'horizontal' : 'vertical')),
        scrollAnchorSelector: '#works',
    },
);

const closeButtonRef = ref<HTMLButtonElement | null>(null);
const modalCardRef = ref<HTMLElement | null>(null);
const worksRailRef = ref<HTMLElement | null>(null);
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

const labels = computed(() => ({
    close: locale.value === 'ko' ? '닫기' : 'Close',
    closeModalAria: locale.value === 'ko' ? '상세 모달 닫기' : 'Close detail modal',
    role: locale.value === 'ko' ? '역할' : 'Role',
    contributions: locale.value === 'ko' ? '내가 한 일' : 'My Contributions',
    results: locale.value === 'ko' ? '성과' : 'Results',
    points: locale.value === 'ko' ? '포인트' : 'Key Points',
}));

const modalOpen = computed(() => !!activeWork.value);
const swipeHint = computed(() => locale.value === "ko" ? "좌우로 스와이프해 대표 작업을 넘겨보세요." : "Swipe horizontally to browse featured work.");
const swipeControlsLabel = computed(() => locale.value === "ko" ? "대표 작업 슬라이드 이동" : "Featured work carousel controls");
const swipePrevLabel = computed(() => locale.value === "ko" ? "이전 작업 보기" : "Show previous work");
const swipeNextLabel = computed(() => locale.value === "ko" ? "다음 작업 보기" : "Show next work");

const scrollRail = (rail: HTMLElement | null, direction: -1 | 1) => {
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>(".work-card");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || "0");
    const distance = firstCard ? firstCard.offsetWidth + gap : rail.clientWidth * 0.86;

    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
};

const scrollWorksRail = (direction: -1 | 1) => scrollRail(worksRailRef.value, direction);

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
        if (worksRailRef.value) worksRailRef.value.scrollLeft = 0;
    });
});

useModal({
    isOpen: modalOpen,
    onClose: () => closeModal(),
    containerRef: modalCardRef,
    initialFocusRef: closeButtonRef,
});
</script>
