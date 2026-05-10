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
                <a v-for="link in links" :key="link.href" :href="link.href"
                    :class="{ 'is-active': isActive(link.href) }" @click="$emit('close')">
                    {{ link.label }}
                </a>
            </nav>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const route = useRoute();
defineEmits<{ (e: "close"): void }>();
const props = withDefaults(
    defineProps<{
        id?: string;
        open: boolean;
        links: { href: string; label: string }[];
        activeId?: string;
        activePath?: string;
    }>(),
    { activeId: "" }
);

function isActive(href: string) {
    if (props.activePath) {
        if (href === "/") return route.path === "/";
        return props.activePath === href;
    }
    if (href.startsWith("#") && props.activeId) {
        return props.activeId === href.slice(1);
    }
    return false;
}
</script>
