<template>
    <GalleryDetailPage variant="career" :work="work" />
</template>

<script setup lang="ts">
import GalleryDetailPage from '~/components/Gallery/GalleryDetailPage.vue';
import { getCareerWorkById } from '@data/works';

const route = useRoute();
const work = getCareerWorkById(route.params.id as string);

if (!work) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' });
}
</script>
