<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="basePath"
        :footer-text="t('footer.copyright')" :show-app-dock="true">
        <article ref="galleryPageRef" class="gallery-page section gallery-page--editorial" :class="galleryVariantClass"
            :aria-label="t(titleKey)">
            <GalleryPageHeader :view-mode="viewMode" :title="t(titleKey)" :dek="lead" :kicker="editorialKicker"
                :hero-number="heroNumber" :hero-aria-label="heroAriaLabel" :status-label="t('gallery.indexLabel')"
                :stats="editorialStats" :sort-legend="sortLegend" :sort-aria-label="sortAriaLabel"
                :view-legend="viewLegend" :view-aria-label="viewAriaLabel" :sort-options="sortOptions"
                :view-options="viewOptions" :sort-mode="sortMode" @update:sort-mode="sortMode = $event"
                @update:view-mode="viewMode = $event" />

            <!-- @vue-generic {import('@utils/workSort').WorkYearGroup} -->
            <EditorialYearTimeline v-if="viewMode === 'editorial'" variant="gallery"
                :ariaLabel="t('gallery.projectList')" :eras="editorialYearGroups" id-prefix="gallery-era"
                :flat-aria-label="t('gallery.otherProjects')">
                <template #era="{ era: group, index: groupIndex }">
                    <ProjectGalleryCard v-for="(work, index) in group.works" :key="work.id" :work="work"
                        :to="`${basePath}/${work.id}`" view-mode="editorial" :priority="groupIndex === 0 && index === 0"
                        :entry-label="t('gallery.viewEntry')" />
                </template>
            </EditorialYearTimeline>
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
import type { GalleryArchiveVariant } from '@composables/gallery/useGallery';
import GalleryPageHeader from '~/components/Gallery/GalleryPageHeader.vue';
import ProjectGalleryCard from '~/components/work/ProjectGalleryCard.vue';

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
    titleKey,
    basePath,
} = useGalleryArchive(props.variant, props.works);

const galleryPageRef = ref<HTMLElement | null>(null);
useGalleryEntryFocusScope(galleryPageRef);
</script>
