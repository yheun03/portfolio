<template>
    <section id="works" class="section">
        <BaseSectionTitle :eyebrow="t('nav.works')" :title="t('works.title')" />
        <p class="works__lead" data-animate>
            {{ locale === "ko" ? `총 ${filteredWorks.length}개의 프로젝트를 인터랙티브 카드로 확인할 수 있습니다.` : `Explore ${filteredWorks.length} projects through interactive cards.` }}
        </p>

        <div class="works__filters" role="tablist" :aria-label="locale === 'ko' ? '프로젝트 필터' : 'Project filters'">
            <button v-for="category in workCategories" :key="category.key" :id="`works-tab-${category.key}`" role="tab"
                :aria-controls="`works-panel-${category.key}`" :aria-selected="selected === category.key"
                :tabindex="selected === category.key ? 0 : -1"
                class="ui-tab-button"
                :class="{ 'is-active': selected === category.key }"
                @click="selected = category.key">
                {{ pick(category.label) }}
            </button>
        </div>

        <div :id="`works-panel-${selected}`" class="works__grid" role="tabpanel"
            :aria-labelledby="`works-tab-${selected}`">
            <WorkCard v-for="work in filteredWorks" :key="work.id" :work="work"
                :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                :detail-label="t('works.detail')" :detail-aria-label="`${pick(work.title)} ${t('works.detail')}`"
                @select="activeWork = work" />
        </div>

        <div v-if="activeWork" class="works__modal" role="dialog" aria-modal="true" aria-labelledby="works-modal-title"
            aria-describedby="works-modal-description" @click.self="closeModal">
            <div ref="modalCardRef" class="works__modal-content" @click.stop>
            <BaseCard :animate="false" class="works__modal-card">
                <div class="works__modal-head">
                    <h3 id="works-modal-title">{{ pick(activeWork.title) }}</h3>
                    <button ref="closeButtonRef" type="button" class="base-button base-button--ghost works__modal-close"
                        :aria-label="labels.closeModalAria"
                        @click="closeModal">
                        {{ labels.close }}
                    </button>
                </div>
                <p id="works-modal-description" class="works__meta">{{ activeWork.period }} · {{ pick(activeWork.type) }}</p>
                <p class="works__role"><strong>{{ labels.role }}:</strong> {{ pick(activeWork.role) }}</p>
                <p class="works__intro">{{ pick(activeWork.introduction) }}</p>
                <p class="works__section-title"><strong>{{ labels.contributions }}</strong></p>
                <ul>
                    <li v-for="item in activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <p v-if="activeWork.achievements.length" class="works__section-title"><strong>{{ labels.results }}</strong></p>
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
    </section>
</template>

<script setup lang="ts">
import { workCategories, works, type WorkItem, type WorkCategory } from "~/core/data/works";

const { t, pick, locale } = useLocale();
const selected = ref<WorkCategory>("all");
const activeWork = ref<WorkItem | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const modalCardRef = ref<HTMLElement | null>(null);
const labels = computed(() => ({
    close: locale.value === "ko" ? "닫기" : "Close",
    closeModalAria: locale.value === "ko" ? "상세 모달 닫기" : "Close detail modal",
    role: locale.value === "ko" ? "역할" : "Role",
    contributions: locale.value === "ko" ? "내가 한 일" : "My Contributions",
    results: locale.value === "ko" ? "성과" : "Results",
    points: locale.value === "ko" ? "포인트" : "Key Points",
}));

const filteredWorks = computed(() => {
    if (selected.value === "all") return works;
    return works.filter((work) => work.category === selected.value);
});

const closeModal = () => {
    activeWork.value = null;
};

const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && activeWork.value) {
        closeModal();
    }
    if (event.key !== "Tab" || !activeWork.value || !modalCardRef.value) return;

    const focusables = modalCardRef.value.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const current = document.activeElement as HTMLElement | null;

    if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
    }
};

watch(
    () => activeWork.value,
    (work) => {
        if (!import.meta.client) return;
        document.body.style.overflow = work ? "hidden" : "";
        if (work) {
            nextTick(() => closeButtonRef.value?.focus());
        }
    }
);

onBeforeUnmount(() => {
    if (!import.meta.client) return;
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleEscape);
});

onMounted(() => {
    if (!import.meta.client) return;
    window.addEventListener("keydown", handleEscape);
});
</script>
