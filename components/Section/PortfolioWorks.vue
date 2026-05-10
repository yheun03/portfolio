<template>
    <section id="works" class="section section--works">
        <span class="section__emoji section__emoji--works accent-emoji accent-emoji--soft" aria-hidden="true">🗂️</span>
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
            <p class="works__archive-link">
                <NuxtLink to="/projects">{{ t('works.fullArchiveLink') }}</NuxtLink>
            </p>
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
                    ? `${visibleWorks.length} / ${pinnedFilteredWorks.length}개 대표(pin) 프로젝트 표시 중`
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
                    </BaseCard>
                </div>
            </div>
        </Teleport>
    </section>
</template>

<script setup lang="ts">
import { useWorksTabRenderer } from '~/core/composables/useWorksTabRenderer';

const { t, pick, locale } = useLocale();
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

const worksSectionDescription = computed(() =>
    locale.value === "ko"
        ? `메인에는 pin으로 고정된 대표 실무 사례만 보입니다. 전체 목록·캡처·소요 시간은 프로젝트 페이지에서 확인할 수 있습니다. (현재 탭 기준 ${pinnedFilteredWorks.value.length}건)`
        : `Only pinned highlights appear here. Full gallery with captures and duration is on the Projects page. (${pinnedFilteredWorks.value.length} in this tab.)`,
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
