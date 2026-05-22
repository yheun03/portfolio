<template>
    <div class="app-dock-ribbon">
        <nav class="app-dock" :aria-label="locale === 'ko' ? '빠른 페이지 이동' : 'Quick page navigation'">
            <template v-for="link in links" :key="link.href">
                <NuxtLink v-if="isAppRoute(link.href)" :to="link.href" class="app-dock__item"
                    :class="{ 'app-dock__item--active': isLinkActive(link.href) }"
                    :aria-current="isLinkActive(link.href) ? 'page' : undefined">
                    <span class="app-dock__dot" aria-hidden="true" />
                    <span class="app-dock__label">{{ link.label }}</span>
                </NuxtLink>
                <a v-else class="app-dock__item" :class="{ 'app-dock__item--active': isLinkActive(link.href) }"
                    :href="link.href" :aria-current="isLinkActive(link.href) ? 'page' : undefined"
                    @click="onHashLinkClick($event, link.href)">
                    <span class="app-dock__dot" aria-hidden="true" />
                    <span class="app-dock__label">{{ link.label }}</span>
                </a>
            </template>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { scrollToSectionHash } from '@utils/sectionAnchorScroll';

const { locale } = useLocale();
const route = useRoute();
const { isAppRoute } = useAppPathResolver();

const props = defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    activePath?: string;
}>();

const router = useRouter();

async function onHashLinkClick(event: MouseEvent, href: string) {
    if (!href.startsWith('#') || !import.meta.client) return;

    event.preventDefault();

    if (route.hash === href) {
        scrollToSectionHash(href);
        return;
    }

    await router.push({ hash: href });
}

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
