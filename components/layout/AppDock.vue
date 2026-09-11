<template>
    <div class="app-dock-ribbon">
        <nav class="app-dock" :aria-label="t('a11y.quickNavigation')">
            <BaseLink v-for="link in links" :key="link.href" :href="link.href" class="app-dock__item"
                :class="{ 'app-dock__item--active': isActive(link.href) }" :aria-current="getAriaCurrent(link.href)">
                <span class="app-dock__dot" aria-hidden="true" />
                <span class="app-dock__label">{{ link.label }}</span>
            </BaseLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
const { t } = useLocale();

const props = defineProps<{
    links: { href: string; label: string }[];
    activeId: string;
    activePath?: string;
}>();

const { isActive, getAriaCurrent } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});
</script>
