<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="basePath"
        :footer-text="t('footer.copyright')" :show-section-dock="true">
        <article class="gallery-page section" :class="[`gallery-page--${viewMode}`, galleryVariantClass]"
            :aria-label="t(titleKey)">
            <GalleryPageHeader :view-mode="viewMode" :title="t(titleKey)" :dek="lead" :kicker="editorialKicker"
                :hero-number="heroNumber" :hero-aria-label="heroAriaLabel" :status-label="t('gallery.indexLabel')"
                :stats="editorialStats" :grid-eyebrow="gridEyebrow" :sort-legend="sortLegend"
                :sort-aria-label="sortAriaLabel" :view-legend="viewLegend" :view-aria-label="viewAriaLabel"
                :sort-options="sortOptions" :view-options="viewOptions" :sort-mode="sortMode"
                @update:sort-mode="sortMode = $event" @update:view-mode="viewMode = $event" />

            <div v-if="viewMode === 'editorial'" class="gallery-editorial__timeline"
                :aria-label="t('gallery.projectList')">
                <section v-for="(group, groupIndex) in editorialYearGroups" :key="group.key"
                    class="gallery-editorial__era" :class="{ 'gallery-editorial__era--flat': !group.year }"
                    :aria-labelledby="group.year ? `gallery-era-${group.key}` : undefined"
                    :aria-label="group.year ? undefined : t('gallery.otherProjects')">
                    <h2 v-if="group.year" :id="`gallery-era-${group.key}`" class="gallery-editorial__year">
                        {{ group.year }}
                    </h2>
                    <div class="gallery-editorial__era-body">
                        <ProjectGalleryCard v-for="(work, index) in group.works" :key="work.id" :work="work"
                            :to="`${basePath}/${work.id}`" view-mode="editorial"
                            :priority="groupIndex === 0 && index === 0" :entry-label="t('gallery.viewEntry')" />
                    </div>
                </section>
            </div>
            <div v-else class="gallery-page__grid" :aria-label="t('gallery.projectList')">
                <template v-for="entry in galleryEntries" :key="entry.key">
                    <h2 v-if="entry.type === 'year'" class="gallery-page__year">{{ entry.year }}</h2>
                    <ProjectGalleryCard v-else :work="entry.work" :to="`${basePath}/${entry.work.id}`" view-mode="grid"
                        :priority="entry.firstWork" :entry-label="t('gallery.viewEntry')" />
                </template>
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';
import type { GalleryArchiveVariant } from '@composables/useGallery';
import GalleryPageHeader from '~/components/Gallery/GalleryPageHeader.vue';
import ProjectGalleryCard from '~/components/Card/ProjectGalleryCard.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    works: readonly WorkItem[];
}>();

const layoutLinks = useSubpageNavLinks();
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);

const {
    t,
    sortMode,
    viewMode,
    sortOptions,
    viewOptions,
    galleryEntries,
    editorialYearGroups,
    lead,
    editorialKicker,
    editorialStats,
    heroNumber,
    heroAriaLabel,
    sortLegend,
    sortAriaLabel,
    viewLegend,
    viewAriaLabel,
    gridEyebrow,
    titleKey,
    basePath,
} = useGalleryArchive(props.variant, props.works);
</script>
