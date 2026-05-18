<template>
    <div class="section-dock-ribbon">
        <nav class="section-dock" :aria-label="locale === 'ko' ? '빠른 페이지 이동' : 'Quick page navigation'">
            <template v-for="link in links" :key="link.href">
                <NuxtLink v-if="isAppRoute(link.href)" :to="link.href" class="section-dock__item"
                    :class="{ 'is-active': isLinkActive(link.href) }"
                    :aria-current="isLinkActive(link.href) ? 'page' : undefined">
                    <span class="section-dock__dot" aria-hidden="true" />
                    <span class="section-dock__label">{{ link.label }}</span>
                </NuxtLink>
                <a v-else class="section-dock__item" :class="{ 'is-active': isLinkActive(link.href) }" :href="link.href"
                    :aria-current="isLinkActive(link.href) ? 'page' : undefined">
                    <span class="section-dock__dot" aria-hidden="true" />
                    <span class="section-dock__label">{{ link.label }}</span>
                </a>
            </template>
        </nav>
    </div>
</template>

<script setup lang="ts">
const { locale } = useLocale();
const route = useRoute();
const { isAppRoute } = useAppPathResolver();

const props = defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    activePath?: string;
}>();

function isLinkActive(href: string) {
    if (href.startsWith('#')) {
        if (props.activePath) return false;
        return props.activeId === href.slice(1);
    }
    if (href === '/') {
        return route.path === '/';
    }
    if (props.activePath) {
        return props.activePath === href;
    }
    return route.path === href || route.path.startsWith(`${href}/`);
}
</script>
