<template>
    <section id="works" class="section">
        <BaseSectionTitle :eyebrow="t('nav.works')" :title="t('works.title')" />
        <p class="works__lead" data-animate>
            {{ locale === "ko" ? `총 ${filteredWorks.length}개의 프로젝트를 인터랙티브 카드로 확인할 수 있습니다.` : `Explore
            ${filteredWorks.length} projects through interactive cards.` }}
        </p>

        <div class="works__filters" role="tablist" :aria-label="locale === 'ko' ? '프로젝트 필터' : 'Project filters'">
            <button v-for="category in workCategories" :key="category.key" :id="`works-tab-${category.key}`" role="tab"
                :aria-controls="`works-panel-${category.key}`" :aria-selected="worksUi.selectedCategory === category.key"
                :tabindex="worksUi.selectedCategory === category.key ? 0 : -1" class="ui-tab-button"
                :class="{ 'is-active': worksUi.selectedCategory === category.key }"
                @click="worksUi.setCategory(category.key)">
                {{ pick(category.label) }}
            </button>
        </div>

        <div :id="`works-panel-${worksUi.selectedCategory}`" class="works__grid" role="tabpanel"
            :aria-labelledby="`works-tab-${worksUi.selectedCategory}`">
            <WorkCard v-for="work in filteredWorks" :key="work.id" :work="work"
                :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                :detail-label="t('works.detail')" :detail-aria-label="`${pick(work.title)} ${t('works.detail')}`"
                @select="worksUi.openWork(work)" />
        </div>

        <div v-if="worksUi.activeWork" class="works__modal" role="dialog" aria-modal="true"
            aria-labelledby="works-modal-title" aria-describedby="works-modal-description"
            @click.self="worksUi.closeModal">
            <div ref="modalCardRef" class="works__modal-content" @click.stop>
                <BaseCard :animate="false" class="works__modal-card">
                    <div class="works__modal-head">
                        <h3 id="works-modal-title">{{ pick(worksUi.activeWork.title) }}</h3>
                        <button ref="closeButtonRef" type="button"
                            class="base-button base-button--ghost works__modal-close"
                            :aria-label="labels.closeModalAria" @click="worksUi.closeModal">
                            {{ labels.close }}
                        </button>
                    </div>
                    <p id="works-modal-description" class="works__meta">{{ worksUi.activeWork.period }} · {{
                        pick(worksUi.activeWork.type) }}</p>
                    <p class="works__role"><strong>{{ labels.role }}:</strong> {{ pick(worksUi.activeWork.role) }}</p>
                    <p class="works__intro">{{ pick(worksUi.activeWork.introduction) }}</p>
                    <p class="works__section-title"><strong>{{ labels.contributions }}</strong></p>
                    <ul>
                        <li v-for="item in worksUi.activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                    <p v-if="worksUi.activeWork.achievements.length" class="works__section-title"><strong>{{ labels.results
                    }}</strong></p>
                    <ul v-if="worksUi.activeWork.achievements.length">
                        <li v-for="item in worksUi.activeWork.achievements" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                    <p class="works__section-title"><strong>{{ labels.points }}</strong></p>
                    <ul>
                        <li v-for="item in worksUi.activeWork.points" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                </BaseCard>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { workCategories } from '~/core/data/works';
import { useWorksUiStore } from '~/core/stores/worksUiStore';

const worksUi = useWorksUiStore();
const { filteredWorks } = storeToRefs(worksUi);

const { t, pick, locale } = useLocale();
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const modalCardRef = ref<HTMLElement | null>(null);

const labels = computed(() => ({
    close: locale.value === 'ko' ? '닫기' : 'Close',
    closeModalAria: locale.value === 'ko' ? '상세 모달 닫기' : 'Close detail modal',
    role: locale.value === 'ko' ? '역할' : 'Role',
    contributions: locale.value === 'ko' ? '내가 한 일' : 'My Contributions',
    results: locale.value === 'ko' ? '성과' : 'Results',
    points: locale.value === 'ko' ? '포인트' : 'Key Points',
}));

const modalOpen = computed(() => !!worksUi.activeWork);

useModal({
    isOpen: modalOpen,
    onClose: () => worksUi.closeModal(),
    containerRef: modalCardRef,
    initialFocusRef: closeButtonRef,
});
</script>
