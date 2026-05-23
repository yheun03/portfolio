<template>
    <GalleryArchivePage variant="career" :works="works" />
</template>

<script setup lang="ts">
const works = useGalleryRouteWorks('career');
</script>
