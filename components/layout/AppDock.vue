<template>
    <div class="app-dock-ribbon">
        <nav class="app-dock" :aria-label="locale === 'ko' ? '빠른 페이지 이동' : 'Quick page navigation'">
            <BaseLink v-for="link in links" :key="link.href" :href="link.href" class="app-dock__item"
                :class="{ 'app-dock__item--active': isActive(link.href) }" :aria-current="getAriaCurrent(link.href)"
                :aria-disabled="isHashLinkDisabled(link.href) ? 'true' : undefined"
                :tabindex="isHashLinkDisabled(link.href) ? -1 : undefined" @click="onHashLinkClick($event, link.href)">
                <span class="app-dock__dot" aria-hidden="true" />
                <span class="app-dock__label">{{ link.label }}</span>
            </BaseLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { scrollToSectionHash, scrollToSectionHashWhenReady } from '@utils/section-anchor-scroll';

const { locale } = useLocale();
const route = useRoute();

const props = defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    activePath?: string;
}>();

const router = useRouter();
const isHashNavigationLocked = ref(false);
/** 브라우저 `window.setTimeout` 반환값 (DOM: number) */
let hashNavigationTimer: number | null = null;
const { isActive, getAriaCurrent } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});

function unlockHashNavigation() {
    isHashNavigationLocked.value = false;
    if (hashNavigationTimer) {
        window.clearTimeout(hashNavigationTimer);
        hashNavigationTimer = null;
    }
}

function isHashLinkDisabled(href: string) {
    return isHashNavigationLocked.value && href.startsWith('#');
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

</script>
