<template>
    <GalleryArchivePage variant="career" :works="careerWorks" />
</template>

<script setup lang="ts">
import GalleryArchivePage from '~/components/Gallery/GalleryArchivePage.vue';
import { careerWorks } from '@content/works';
</script>
