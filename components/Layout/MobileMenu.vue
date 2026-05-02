<template>
    <transition name="fade">
        <nav v-if="open" :id="id" class="mobile-menu"
            :aria-label="locale === 'ko' ? '모바일 섹션 메뉴' : 'Mobile section menu'">
            <a v-for="link in links" :key="link.href" :href="link.href" @click="$emit('close')">
                {{ link.label }}
            </a>
        </nav>
    </transition>
</template>

<script setup lang="ts">
const { locale } = useLocale();
defineEmits<{ (e: "close"): void }>();
defineProps<{ id?: string; open: boolean; links: { href: string; label: string }[] }>();
</script>
