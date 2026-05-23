<template>
    <GalleryArchivePage variant="personal" :works="works" />
</template>

<script setup lang="ts">
const works = useGalleryRouteWorks('personal');
</script>
