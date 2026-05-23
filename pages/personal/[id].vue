<template>
    <GalleryDetailPage variant="personal" :work="work" />
</template>

<script setup lang="ts">
const route = useRoute();
const work = useGalleryRouteWork('personal', route.params.id as string);
</script>
