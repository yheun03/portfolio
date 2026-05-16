<template>
    <section id="works" class="section section--works">
        <span class="section__emoji section__emoji--works accent-emoji accent-emoji--soft" aria-hidden="true">🗂️</span>
        <div class="works__total-badge" aria-live="polite">
            <span>{{ locale === 'ko' ? '총' : 'Total' }} {{ totalPortfolioWorkCount }}{{ locale === 'ko' ? '건' : '' }}</span>
            <small>
                {{ locale === 'ko'
                    ? `실무 ${totalCareerWorkCount} + 개인 ${personalWorkCount}`
                    : `${totalCareerWorkCount} client + ${personalWorkCount} personal` }}
            </small>
        </div>
        <div class="works__title-col">
            <BaseSectionTitle :eyebrow="t('nav.works')" :title="t('works.title')" />
            <!-- 카테고리: PC는 LNB 세로 / 좁은 화면은 가로 칩 레일 -->
            <div class="works__filters lnb-tablist" role="tablist"
                :aria-orientation="isNarrow ? 'horizontal' : 'vertical'"
                :aria-label="locale === 'ko' ? '프로젝트 필터' : 'Project filters'">
                <button v-for="category in workCategories" :key="category.key" :id="`works-tab-${category.key}`"
                    role="tab" :aria-controls="`works-panel-${category.key}`"
                    :aria-selected="selectedCategory === category.key"
                    :tabindex="selectedCategory === category.key ? 0 : -1" class="ui-tab-button"
                    :class="{ 'is-active': selectedCategory === category.key }" @click="selectCategory(category.key)">
                    {{ pick(category.label) }}
                </button>
            </div>
            <p class="section-title__description">{{ worksSectionDescription }}</p>
            <div class="works__archive-summary" :style="archiveSummaryStyle" aria-live="polite">
                <p class="works__archive-meta">
                    <strong>{{ totalCareerWorkCount }}</strong>
                    <span>{{ locale === 'ko' ? '개 실무 프로젝트 아카이브' : 'client project archive' }}</span>
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
        <div :id="`works-panel-${selectedCategory}`" :key="panelRenderKey" class="works__grid" role="tabpanel"
            :aria-labelledby="`works-tab-${selectedCategory}`">
            <WorkCard v-for="work in visibleWorks" :key="`${panelRenderKey}-${work.id}`" :work="work"
                :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                :detail-label="t('works.detail')" :detail-aria-label="`${pick(work.title)} ${t('works.detail')}`"
                @select="openWork(work)" />
        </div>
        <div v-if="hasMoreWorks || canCollapseWorks" class="works__list-control" aria-live="polite">
            <p>
                {{ locale === 'ko'
                    ? `${visibleWorks.length} / ${pinnedFilteredWorks.length}개 대표 사례 표시 중`
                    : `Showing ${visibleWorks.length} of ${pinnedFilteredWorks.length} pinned projects` }}
            </p>
            <button v-if="hasMoreWorks" type="button" class="base-button base-button--ghost" @click="showMoreWorks">
                {{ locale === 'ko' ? '프로젝트 더 보기' : 'Show more projects' }}
            </button>
            <button v-else-if="canCollapseWorks" type="button" class="base-button base-button--ghost"
                @click="collapseWorks">
                {{ locale === 'ko' ? '프로젝트 접기' : 'Collapse projects' }}
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
                        <p id="works-modal-description" class="works__meta">{{ activeWork.period }} · {{
                            pick(activeWork.type) }}</p>
                        <p class="works__role"><strong>{{ labels.role }}:</strong> {{ pick(activeWork.role) }}</p>
                        <p class="works__intro">{{ pick(activeWork.introduction) }}</p>
                        <p class="works__section-title"><strong>{{ labels.contributions }}</strong></p>
                        <ul>
                            <li v-for="item in activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                        <p v-if="activeWork.achievements.length" class="works__section-title"><strong>{{ labels.results
                                }}</strong></p>
                        <ul v-if="activeWork.achievements.length">
                            <li v-for="item in activeWork.achievements" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                        <p class="works__section-title"><strong>{{ labels.points }}</strong></p>
                        <ul>
                            <li v-for="item in activeWork.points" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                        <p v-if="activeWork.links?.length" class="works__modal-links">
                            <template v-for="link in activeWork.links" :key="link.href">
                                <NuxtLink v-if="isAppRoute(link.href)" class="base-button base-button--primary"
                                    :to="link.href">
                                    {{ pick(link.label) }}
                                </NuxtLink>
                                <a v-else class="base-button base-button--primary" :href="link.href"
                                    target="_blank" rel="noopener noreferrer">
                                    {{ pick(link.label) }}
                                </a>
                            </template>
                        </p>
                    </BaseCard>
                </div>
            </div>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import { useWorksTabRenderer } from '~/core/composables/useWorksTabRenderer';
import { careerWorks, personalWorksList } from '~/core/data/works';

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
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const modalCardRef = ref<HTMLElement | null>(null);
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
    locale.value === "ko"
        ? `메인에는 현재 탭의 대표 ${pinnedFilteredWorks.value.length}건만 보여주고, 전체 ${currentTabTotalCount.value}건은 갤러리에 정리했습니다.`
        : `This page shows ${pinnedFilteredWorks.value.length} representative highlights in this tab; ${currentTabTotalCount.value} total items are organized in the gallery.`,
);

const worksSectionDescription = computed(() =>
    locale.value === "ko"
        ? `여러 SI·SM·솔루션 프로젝트 중 핵심 사례만 인덱스에 선별했습니다. 전체 목록·캡처·소요 시간은 프로젝트 페이지에서 확인할 수 있습니다.`
        : `The index curates key SI, SM, and solution cases. The full list, captures, and durations are available on the Projects page.`,
);

const visibleWorks = computed(() => pinnedFilteredWorks.value.slice(0, visibleCount.value));
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

const showMoreWorks = () => {
    visibleCount.value = Math.min(visibleCount.value + visibleStep, pinnedFilteredWorks.value.length);
};

const collapseWorks = () => {
    visibleCount.value = initialVisibleCount;
    if (import.meta.client) document.querySelector("#works")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

watch(selectedCategory, () => {
    visibleCount.value = initialVisibleCount;
});

useModal({
    isOpen: modalOpen,
    onClose: () => closeModal(),
    containerRef: modalCardRef,
    initialFocusRef: closeButtonRef,
});
</script>
