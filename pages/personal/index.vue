<template>
    <GalleryArchivePage variant="personal" :works="works" />
</template>

<script setup lang="ts">
const works = useGalleryRouteWorks('personal');
</script>

<style lang="scss">
@use '~/assets/style/gallery.scss';
</style>
