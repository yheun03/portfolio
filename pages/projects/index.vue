<template>
    <GalleryArchivePage variant="career" :works="works" />
</template>

<script setup lang="ts">
const works = useGalleryRouteWorks('career');
</script>

<style lang="scss">
@use '~/assets/style/gallery.scss';
</style>
