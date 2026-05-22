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
                    :aria-disabled="isHashNavigationLocked ? 'true' : undefined"
                    @click="onHashLinkClick($event, link.href)">
                    <span class="app-dock__dot" aria-hidden="true" />
                    <span class="app-dock__label">{{ link.label }}</span>
                </a>
            </template>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { scrollToSectionHash, scrollToSectionHashWhenReady } from '@utils/sectionAnchorScroll';

const { locale } = useLocale();
const route = useRoute();
const { isAppRoute } = useAppPathResolver();

const props = defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    activePath?: string;
}>();

const router = useRouter();
const isHashNavigationLocked = ref(false);
let hashNavigationTimer: ReturnType<typeof setTimeout> | null = null;

function unlockHashNavigation() {
    isHashNavigationLocked.value = false;
    if (hashNavigationTimer) {
        window.clearTimeout(hashNavigationTimer);
        hashNavigationTimer = null;
    }
}

function lockHashNavigation() {
    isHashNavigationLocked.value = true;
    if (hashNavigationTimer) window.clearTimeout(hashNavigationTimer);
    hashNavigationTimer = window.setTimeout(unlockHashNavigation, 900);
}

async function onHashLinkClick(event: MouseEvent, href: string) {
    if (!href.startsWith('#') || !import.meta.client) return;

    event.preventDefault();
    if (isHashNavigationLocked.value) return;

    lockHashNavigation();

    if (route.hash === href) {
        scrollToSectionHash(href);
        window.setTimeout(unlockHashNavigation, 650);
        return;
    }

    await router.push({ hash: href });
    await scrollToSectionHashWhenReady(href);
    window.setTimeout(unlockHashNavigation, 650);
}

onBeforeUnmount(unlockHashNavigation);

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
