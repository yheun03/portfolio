<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/projects"
        :footer-text="t('footer.copyright')" :show-section-dock="false">
        <article class="gallery-page section">
            <header class="gallery-page__head">
                <p class="technical-label">{{ t("gallery.careerEyebrow") }}</p>
                <h1 class="gallery-page__title">{{ t("gallery.careerTitle") }}</h1>
                <p class="gallery-page__lead">{{ careerLead }}</p>
            </header>
            <div class="gallery-page__grid">
                <ProjectGalleryCard v-for="w in careerWorks" :key="w.id" :work="w" :to="`/projects/${w.id}`" />
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/Layout/AppLayout.vue";
import ProjectGalleryCard from "~/components/Card/ProjectGalleryCard.vue";
import { careerWorks } from "~/core/data/works";

const { t, pick, locale } = useLocale();
const layoutLinks = useSubpageNavLinks();

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
            itemListElement: careerWorks.map((work, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: pick(work.title),
                url: `https://yheun03.github.io/portfolio/projects/${work.id}`,
            })),
        },
    },
}));
</script>
