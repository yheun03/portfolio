<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/projects"
        :footer-text="t('footer.copyright')" :show-section-dock="false">
        <article class="gallery-page section">
            <header class="gallery-page__head">
                <p class="technical-label">{{ t("gallery.careerEyebrow") }}</p>
                <h1 class="gallery-page__title">{{ t("gallery.careerTitle") }}</h1>
                <p class="gallery-page__lead">{{ careerLead }}</p>
                <div class="gallery-page__tools" role="radiogroup"
                    :aria-label="locale === 'ko' ? '프로젝트 정렬 기준' : 'Project sort order'">
                    <p>{{ locale === 'ko' ? '정렬' : 'Sort' }}</p>
                    <button v-for="option in sortOptions" :key="option.value" type="button"
                        :class="{ 'is-active': sortMode === option.value }"
                        :aria-checked="sortMode === option.value" role="radio" @click="sortMode = option.value">
                        {{ option.label }}
                    </button>
                </div>
            </header>
            <div class="gallery-page__grid">
                <template v-for="entry in careerGalleryEntries" :key="entry.key">
                    <h2 v-if="entry.type === 'year'" class="gallery-page__year">{{ entry.year }}</h2>
                    <ProjectGalleryCard v-else :work="entry.work" :to="`/projects/${entry.work.id}`" />
                </template>
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/Layout/AppLayout.vue";
import ProjectGalleryCard from "~/components/Card/ProjectGalleryCard.vue";
import { careerWorks } from "~/core/data/works";
import {
    createWorkYearEntries,
    sortWorksByStartDesc,
    sortWorksByTitleAsc,
    type WorkSortMode,
} from "~/core/utils/workSort";

const { t, pick, locale } = useLocale();
const layoutLinks = useSubpageNavLinks();
const sortMode = ref<WorkSortMode>("start");

const sortOptions = computed<{ value: WorkSortMode; label: string }[]>(() => [
    { value: "start", label: locale.value === "ko" ? "시작시간" : "Start date" },
    { value: "title", label: locale.value === "ko" ? "가나다 순" : "A-Z" },
]);
const sortedCareerWorks = computed(() =>
    [...careerWorks].sort((a, b) =>
        sortMode.value === "start"
            ? sortWorksByStartDesc(a, b)
            : sortWorksByTitleAsc(a, b, pick, locale.value),
    ),
);
const careerGalleryEntries = computed(() =>
    sortMode.value === "start" ? createWorkYearEntries(sortedCareerWorks.value) : sortedCareerWorks.value.map((work) => ({
        type: "work" as const,
        key: work.id,
        work,
    })),
);

const careerLead = computed(() =>
    locale.value === "ko"
        ? `실무·내부 프로젝트 ${careerWorks.length}건을 캡처·소요 시간·언어 스택과 함께 정리했습니다.`
        : `${careerWorks.length} client and in-house projects with captures, duration, and language stack.`,
);

usePortfolioSeo(() => ({
    title: t("gallery.careerMetaTitle"),
    description: t("gallery.careerMetaDescription"),
    path: "/projects",
    locale: locale.value,
    keywords: careerWorks.flatMap((work) => [pick(work.title), ...work.languages, ...work.tech]),
    jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t("gallery.careerMetaTitle"),
        description: t("gallery.careerMetaDescription"),
        url: "https://yheun03.github.io/portfolio/projects",
        inLanguage: locale.value === "ko" ? "ko-KR" : "en-US",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: sortedCareerWorks.value.map((work, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: pick(work.title),
                url: `https://yheun03.github.io/portfolio/projects/${work.id}`,
            })),
        },
    },
}));
</script>
