<template>
    <section id="personal" class="section section--personal">
        <span class="section__emoji section__emoji--personal accent-emoji accent-emoji--soft"
            aria-hidden="true">✦</span>
        <div class="personal__head">
            <BaseSectionTitle :eyebrow="t('nav.personal')" :title="t('personal.title')"
                :description="sectionDescription" />
            <p class="personal__archive-link">
                <NuxtLink to="/personal">{{ t('personal.fullArchiveLink') }}</NuxtLink>
            </p>
        </div>

        <div class="personal__grid">
            <WorkCard v-for="work in personalWorks" :key="work.id" variant="personal" :work="work"
                :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                :detail-label="t('works.detail')" :detail-aria-label="`${pick(work.title)} ${t('works.detail')}`"
                @select="openWork(work)" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { personalWorksList } from "@content/works";
import { useWorksUiStore } from "@stores/worksUiStore";

const { t, pick, locale } = useLocale();
const worksUi = useWorksUiStore();

const personalWorks = computed(() => personalWorksList.filter((w) => w.pin));

const sectionDescription = computed(() =>
    locale.value === "ko"
        ? `메인에는 pin으로 고정된 개인 작업만 보입니다. 전체·캡처·소요 시간은 개인 프로젝트 페이지에서 확인할 수 있습니다. (${personalWorks.value.length}건)`
        : `Only pinned personal work appears here. Full gallery is on the Personal projects page. (${personalWorks.value.length} items)`,
);

const openWork = worksUi.openWork;
</script>
