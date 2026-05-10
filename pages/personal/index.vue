<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/personal"
        :footer-text="t('footer.copyright')" :show-section-dock="false">
        <article class="gallery-page section">
            <header class="gallery-page__head">
                <p class="technical-label">{{ t("gallery.personalEyebrow") }}</p>
                <h1 class="gallery-page__title">{{ t("gallery.personalTitle") }}</h1>
                <p class="gallery-page__lead">{{ personalLead }}</p>
            </header>
            <div class="gallery-page__grid">
                <ProjectGalleryCard v-for="w in personalWorksList" :key="w.id" :work="w" :to="`/personal/${w.id}`" />
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/Layout/AppLayout.vue";
import ProjectGalleryCard from "~/components/Card/ProjectGalleryCard.vue";
import { personalWorksList } from "~/core/data/works";

const { t, pick, locale } = useLocale();
const layoutLinks = useSubpageNavLinks();

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
            itemListElement: personalWorksList.map((work, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: pick(work.title),
                url: `https://yheun03.github.io/portfolio/personal/${work.id}`,
            })),
        },
    },
}));
</script>
