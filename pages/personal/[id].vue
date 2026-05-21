<template>
    <GalleryDetailPage variant="personal" :work="work" />
</template>

<script setup lang="ts">
import GalleryDetailPage from '~/components/Gallery/GalleryDetailPage.vue';
import { getPersonalWorkById } from '@data/works';

const route = useRoute();
const work = getPersonalWorkById(route.params.id as string);

if (!work) {
    throw createError({ statusCode: 404, statusMessage: 'Personal project not found' });
}
</script>
