<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/personal"
        :footer-text="t('footer.copyright')" :show-section-dock="false">
        <article class="gallery-page section">
            <header class="gallery-page__head">
                <p class="technical-label">{{ t("gallery.personalEyebrow") }}</p>
                <h1 class="gallery-page__title">{{ t("gallery.personalTitle") }}</h1>
                <p class="gallery-page__lead">{{ personalLead }}</p>
                <div class="gallery-page__tools" role="radiogroup"
                    :aria-label="locale === 'ko' ? '개인 프로젝트 정렬 기준' : 'Personal project sort order'">
                    <p>{{ locale === 'ko' ? '정렬' : 'Sort' }}</p>
                    <button v-for="option in sortOptions" :key="option.value" type="button"
                        :class="{ 'is-active': sortMode === option.value }" :aria-checked="sortMode === option.value"
                        role="radio" @click="sortMode = option.value">
                        {{ option.label }}
                    </button>
                </div>
            </header>
            <div class="gallery-page__grid">
                <template v-for="entry in personalGalleryEntries" :key="entry.key">
                    <h2 v-if="entry.type === 'year'" class="gallery-page__year">{{ entry.year }}</h2>
                    <ProjectGalleryCard v-else :work="entry.work" :to="`/personal/${entry.work.id}`" />
                </template>
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/Layout/AppLayout.vue";
import ProjectGalleryCard from "~/components/Card/ProjectGalleryCard.vue";
import { personalWorksList } from "~/core/data/works";
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
const sortedPersonalWorks = computed(() =>
    [...personalWorksList].sort((a, b) =>
        sortMode.value === "start"
            ? sortWorksByStartDesc(a, b)
            : sortWorksByTitleAsc(a, b, pick, locale.value),
    ),
);
const personalGalleryEntries = computed(() =>
    sortMode.value === "start" ? createWorkYearEntries(sortedPersonalWorks.value) : sortedPersonalWorks.value.map((work) => ({
        type: "work" as const,
        key: work.id,
        work,
    })),
);

const personalLead = computed(() =>
    locale.value === "ko"
        ? `개인 프로젝트 ${personalWorksList.length}건을 갤러리 형식으로 정리했습니다.`
        : `${personalWorksList.length} personal projects in a gallery layout.`,
);

usePortfolioSeo(() => ({
    title: t("gallery.personalMetaTitle"),
    description: t("gallery.personalMetaDescription"),
    path: "/personal",
    locale: locale.value,
    keywords: personalWorksList.flatMap((work) => [pick(work.title), ...work.languages, ...work.tech]),
    jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t("gallery.personalMetaTitle"),
        description: t("gallery.personalMetaDescription"),
        url: "https://yheun03.github.io/portfolio/personal",
        inLanguage: locale.value === "ko" ? "ko-KR" : "en-US",
        mainEntity: {
            "@type": "ItemList",
            itemListElement: sortedPersonalWorks.value.map((work, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: pick(work.title),
                url: `https://yheun03.github.io/portfolio/personal/${work.id}`,
            })),
        },
    },
}));
</script>

<style scoped lang="scss">
.gallery-page__year {
    font-weight: 900;
    font-size: clamp(2.75rem, 6.5vw + 1.5rem, 3.25rem);

    @media (min-width: 768px) {
        font-size: clamp(3.75rem, 5vw + 2.5rem, 5rem);
    }

    @media (min-width: 1024px) {
        font-size: 104px;
    }
}
</style>
