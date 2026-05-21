<template>
    <GalleryArchivePage variant="personal" :works="personalWorksList" />
</template>

<script setup lang="ts">
import GalleryArchivePage from '~/components/Gallery/GalleryArchivePage.vue';
import { personalWorksList } from '@data/works';
</script>
