<template>
    <Teleport to="body">
        <transition name="mobile-menu-fade">
            <button v-if="open" type="button" class="mobile-menu__backdrop"
                :aria-label="locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'" @click="$emit('close')" />
        </transition>
        <transition name="mobile-menu-drawer">
            <nav v-if="open" :id="id" class="mobile-menu"
                :aria-label="locale === 'ko' ? '모바일 섹션 메뉴' : 'Mobile section menu'">
                <p class="mobile-menu__eyebrow">{{ locale === "ko" ? "바로 이동" : "Jump to" }}</p>
                <a v-for="link in links" :key="link.href" :href="link.href" @click="$emit('close')">
                    {{ link.label }}
                </a>
            </nav>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
const { locale } = useLocale();
defineEmits<{ (e: "close"): void }>();
defineProps<{ id?: string; open: boolean; links: { href: string; label: string }[] }>();
</script>
