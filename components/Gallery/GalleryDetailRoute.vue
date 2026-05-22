<template>
    <GalleryDetailPage :variant="variant" :work="work" />
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '@composables/useGallery';
import { getCareerWorkById, getPersonalWorkById } from '@data/works';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const route = useRoute();
const id = route.params.id as string;

const work =
    props.variant === 'career' ? getCareerWorkById(id) : getPersonalWorkById(id);

if (!work) {
    throw createError({
        statusCode: 404,
        statusMessage:
            props.variant === 'career' ? 'Project not found' : 'Personal project not found',
    });
}
</script>
