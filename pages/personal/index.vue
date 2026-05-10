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

const { t, locale } = useLocale();
const layoutLinks = useSubpageNavLinks();

const personalLead = computed(() =>
    locale.value === "ko"
        ? `개인 프로젝트 ${personalWorksList.length}건을 갤러리 형식으로 정리했습니다.`
        : `${personalWorksList.length} personal projects in a gallery layout.`,
);

useHead(() => ({
    title: t("gallery.personalMetaTitle"),
    meta: [{ name: "description", content: t("gallery.personalMetaDescription") }],
}));
</script>
