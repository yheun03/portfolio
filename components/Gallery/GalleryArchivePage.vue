<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="basePath"
        :footer-text="t('footer.copyright')" :show-section-dock="false">
        <article class="gallery-page section" :class="`gallery-page--${viewMode}`">
            <GalleryPageHeader :view-mode="viewMode" :title="t(titleKey)" :dek="lead" :kicker="editorialKicker"
                :hero-number="heroNumber" :hero-aria-label="heroAriaLabel" :status-label="t('gallery.indexLabel')"
                :stats="editorialStats" :grid-eyebrow="gridEyebrow" :sort-legend="sortLegend"
                :sort-aria-label="sortAriaLabel" :view-legend="viewLegend" :view-aria-label="viewAriaLabel"
                :sort-options="sortOptions" :view-options="viewOptions" :sort-mode="sortMode"
                @update:sort-mode="sortMode = $event" @update:view-mode="viewMode = $event" />

            <div :class="viewMode === 'editorial' ? 'gallery-editorial__feed' : 'gallery-page__grid'">
                <template v-for="entry in galleryEntries" :key="entry.key">
                    <h2 v-if="entry.type === 'year'"
                        :class="viewMode === 'editorial' ? 'gallery-editorial__year' : 'gallery-page__year'">
                        {{ entry.year }}
                    </h2>
                    <ProjectGalleryCard v-else :work="entry.work" :to="`${basePath}/${entry.work.id}`"
                        :view-mode="viewMode" :entry-label="t('gallery.viewEntry')" />
                </template>
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { WorkItem } from '~/core/data/works';
import type { GalleryArchiveVariant } from '~/core/composables/useGalleryArchive';
import AppLayout from '~/components/Layout/AppLayout.vue';
import GalleryPageHeader from '~/components/Gallery/GalleryPageHeader.vue';
import ProjectGalleryCard from '~/components/Card/ProjectGalleryCard.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
    works: WorkItem[];
}>();

const layoutLinks = useSubpageNavLinks();

const {
    t,
    sortMode,
    viewMode,
    sortOptions,
    viewOptions,
    galleryEntries,
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
