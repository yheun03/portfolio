<template>
    <GalleryDetailPage variant="career" :work="work" />
</template>

<script setup lang="ts">
const route = useRoute();
const work = useGalleryRouteWork('career', route.params.id as string);
</script>
