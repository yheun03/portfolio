<template>
    <!-- @vue-generic {import('@utils/workSort').WorkYearGroup} -->
    <BaseYearTimeline v-if="viewMode === 'editorial'" variant="gallery" :ariaLabel="listAriaLabel"
        :eras="editorialYearGroups" id-prefix="gallery-era" :flat-aria-label="flatAriaLabel">
        <template #era="{ era: group, index: groupIndex }">
            <ProjectGalleryCard v-for="(work, index) in group.works" :key="work.id" :work="work"
                :to="`${basePath}/${work.id}`" view-mode="editorial" :priority="groupIndex === 0 && index === 0"
                :entry-label="entryLabel" />
        </template>
    </BaseYearTimeline>
    <div v-else class="gallery-page__grid" :aria-label="listAriaLabel">
        <template v-for="entry in galleryEntries" :key="entry.key">
            <h2 v-if="entry.type === 'year'" class="gallery-page__year">{{ entry.year }}</h2>
            <ProjectGalleryCard v-else :work="entry.work" :to="`${basePath}/${entry.work.id}`" view-mode="grid"
                :priority="entry.firstWork" :entry-label="entryLabel" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { GalleryViewMode } from '@composables/gallery/useGallery';
import type { WorkYearEntry, WorkYearGroup } from '@utils/workSort';
import ProjectGalleryCard from '~/components/work/ProjectGalleryCard.vue';

defineProps<{
    viewMode: GalleryViewMode;
    editorialYearGroups: readonly WorkYearGroup[];
    galleryEntries: readonly WorkYearEntry[];
    basePath: string;
    listAriaLabel: string;
    flatAriaLabel: string;
    entryLabel: string;
}>();
</script>
