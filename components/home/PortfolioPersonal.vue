<template>
    <section id="personal" class="section section--personal">
        <span class="section__emoji section__emoji--personal emoji emoji--soft" aria-hidden="true">✦</span>
        <div class="personal__head">
            <BaseSectionTitle :eyebrow="t('nav.personal')" :title="t('personal.title')"
                :description="sectionDescription" />
            <p class="personal__archive-link">
                <NuxtLink to="/personal">{{ t('personal.fullArchiveLink') }}</NuxtLink>
                <NuxtLink to="/personal/design-tokens">{{ t('personal.designTokensLink') }}</NuxtLink>
            </p>
        </div>

        <div class="personal__rail-wrap swipe-rail">
            <div class="swipe-rail__head">
                <p id="personal-swipe-help" class="swipe-rail__hint">{{ swipeHint }}</p>
                <div class="swipe-rail__controls" role="group" :aria-label="swipeControlsLabel">
                    <button type="button" class="swipe-rail__button" :aria-label="swipePrevLabel"
                        @click="scrollPersonalRail(-1)">
                        <span aria-hidden="true">‹</span>
                    </button>
                    <button type="button" class="swipe-rail__button" :aria-label="swipeNextLabel"
                        @click="scrollPersonalRail(1)">
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
            </div>
            <div ref="personalRailRef" class="personal__grid" :aria-label="personalRailLabel"
                :aria-describedby="isNarrow ? 'personal-swipe-help' : undefined" :tabindex="isNarrow ? 0 : -1">
                <WorkCard v-for="work in personalWorks" :key="work.id" variant="personal" :work="work"
                    :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                    :detail-label="t('works.detail')" @select="openWork(work)" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { personalWorksList } from "@data/works";
import { useWorksUiStore } from "@stores/worksUiStore";

const { t, pick, locale } = useLocale();
const { isNarrow } = useNarrowLayout();
const worksUi = useWorksUiStore();
const personalRailRef = ref<HTMLElement | null>(null);

const personalWorks = computed(() => personalWorksList.filter((w) => w.pin));

const sectionDescription = computed(() =>
    locale.value === "ko"
        ? `메인에는 pin으로 고정된 개인 작업만 보입니다. 전체·캡처·소요 시간은 개인 프로젝트 페이지에서 확인할 수 있습니다. (${personalWorks.value.length}건)`
        : `Only pinned personal work appears here. Full gallery is on the Personal projects page. (${personalWorks.value.length} items)`,
);

const swipeHint = computed(() => locale.value === "ko" ? "좌우로 스와이프해 개인 작업을 넘겨보세요." : "Swipe horizontally to browse personal work.");
const swipeControlsLabel = computed(() => locale.value === "ko" ? "개인 작업 슬라이드 이동" : "Personal work carousel controls");
const swipePrevLabel = computed(() => locale.value === "ko" ? "이전 개인 작업 보기" : "Show previous personal work");
const swipeNextLabel = computed(() => locale.value === "ko" ? "다음 개인 작업 보기" : "Show next personal work");
const personalRailLabel = computed(() => locale.value === "ko" ? "대표 개인 작업 목록" : "Featured personal work list");

const scrollPersonalRail = (direction: -1 | 1) => {
    const rail = personalRailRef.value;
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>(".work-card");
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap || "0");
    const distance = firstCard ? firstCard.offsetWidth + gap : rail.clientWidth * 0.86;

    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
};

const openWork = worksUi.openWork;
</script>
