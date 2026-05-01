<template>
    <transition name="fade">
        <div v-if="open" :id="id" class="mobile-menu" role="dialog" aria-modal="false">
            <a v-for="link in links" :key="link.href" :href="link.href" @click="$emit('close')">
                {{ link.label }}
            </a>
        </div>
    </transition>
</template>

<script setup lang="ts">
defineEmits<{ (e: "close"): void }>();
defineProps<{ id?: string; open: boolean; links: { href: string; label: string }[] }>();
</script>
