<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" active-path="/projects"
        :footer-text="t('footer.copyright')" :show-section-dock="false">
        <article class="gallery-detail section">
            <nav class="gallery-detail__breadcrumb" aria-label="Breadcrumb">
                <NuxtLink to="/projects">{{ t("gallery.backToCareerList") }}</NuxtLink>
                <span aria-hidden="true">/</span>
                <span>{{ pick(work.title) }}</span>
            </nav>

            <header class="gallery-detail__header">
                <h1 class="gallery-detail__title">{{ pick(work.title) }}</h1>
                <p class="gallery-detail__period">{{ work.period }} · {{ pick(work.type) }}</p>
                <dl class="gallery-detail__facts">
                    <div>
                        <dt>{{ t("gallery.duration") }}</dt>
                        <dd>{{ pick(work.duration) }}</dd>
                    </div>
                    <div>
                        <dt>{{ t("gallery.languages") }}</dt>
                        <dd>
                            <span v-for="lang in work.languages" :key="lang" class="gallery-detail__chip">{{ lang
                            }}</span>
                            <template v-if="!work.languages.length">—</template>
                        </dd>
                    </div>
                    <div class="gallery-detail__facts--wide">
                        <dt>{{ t("gallery.techFull") }}</dt>
                        <dd>
                            <span v-for="tech in work.tech" :key="tech"
                                class="gallery-detail__chip gallery-detail__chip--muted">{{
                                    tech }}</span>
                        </dd>
                    </div>
                </dl>
                <p class="gallery-detail__intro">{{ pick(work.introduction) }}</p>
            </header>

            <section class="gallery-detail__captures-section" :aria-label="t('gallery.captures')">
                <h2 class="gallery-detail__section-title">{{ t("gallery.captures") }}</h2>
                <div class="gallery-detail__captures">
                    <figure v-for="(src, index) in work.captures" :key="`${src}-${index}`"
                        class="gallery-detail__figure">
                        <img :src="resolveAppPath(src)" :alt="captureAlt(index)" loading="lazy" decoding="async"
                            fetchpriority="low" width="1200" height="675" />
                    </figure>
                </div>
            </section>

            <section class="gallery-detail__body" :aria-label="t('gallery.details')">
                <div class="gallery-detail__column">
                    <h2>{{ t("gallery.overview") }}</h2>
                    <p><strong>{{ t("gallery.role") }}:</strong> {{ pick(work.role) }}</p>
                    <p class="gallery-detail__section-title"><strong>{{ labels.contributions }}</strong></p>
                    <ul>
                        <li v-for="item in work.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                    <template v-if="work.achievements.length">
                        <p class="gallery-detail__section-title"><strong>{{ labels.results }}</strong></p>
                        <ul>
                            <li v-for="item in work.achievements" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                    </template>
                    <p class="gallery-detail__section-title"><strong>{{ labels.points }}</strong></p>
                    <ul>
                        <li v-for="item in work.points" :key="pick(item)">{{ pick(item) }}</li>
                    </ul>
                </div>
            </section>

            <p class="gallery-detail__footer-nav">
                <NuxtLink class="base-button base-button--ghost" to="/projects">{{ t("gallery.backToCareerList") }}
                </NuxtLink>
            </p>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/components/Layout/AppLayout.vue";
import { getCareerWorkById } from "~/core/data/works";

const route = useRoute();
const { t, pick, locale } = useLocale();
const { resolveAppPath } = useAppPathResolver();
const layoutLinks = useSubpageNavLinks();

const work = getCareerWorkById(route.params.id as string);

if (!work) {
    throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

const labels = computed(() => ({
    contributions: locale.value === "ko" ? "내가 한 일" : "My Contributions",
    results: locale.value === "ko" ? "성과" : "Results",
    points: locale.value === "ko" ? "포인트" : "Key Points",
}));

function captureAlt(index: number) {
    const base = pick(work!.title);
    return locale.value === "ko" ? `${base} 캡처 ${index + 1}` : `${base} screenshot ${index + 1}`;
}

usePortfolioSeo(() => ({
    title: `${pick(work.title)} | ${t("gallery.careerMetaTitle")}`,
    description: pick(work.introduction),
    path: `/projects/${work.id}`,
    locale: locale.value,
    type: "article",
    image: work.captures[0],
    imageAlt: captureAlt(0),
    keywords: [pick(work.title), pick(work.type), pick(work.role), ...work.languages, ...work.tech],
    jsonLd: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: pick(work.title),
        description: pick(work.introduction),
        url: `https://yheun03.github.io/portfolio/projects/${work.id}`,
        inLanguage: locale.value === "ko" ? "ko-KR" : "en-US",
        creator: {
            "@type": "Person",
            name: "은영환",
            jobTitle: locale.value === "ko" ? "웹 퍼블리셔 / 프론트엔드 개발자" : "Web Publisher / Frontend Developer",
        },
        keywords: [pick(work.type), pick(work.role), ...work.languages, ...work.tech].join(", "),
    },
}));
</script>
