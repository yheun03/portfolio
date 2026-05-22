<template>
    <GalleryArchivePage :variant="variant" :works="works" />
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '@composables/gallery/useGallery';
import type { WorkItem } from '@data/works';
import { careerWorks, personalWorksList } from '@data/works';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const works: readonly WorkItem[] = props.variant === 'career' ? careerWorks : personalWorksList;
</script>
