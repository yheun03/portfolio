<template>
    <Teleport to="body">
        <transition name="mobile-menu-fade">
            <button v-if="open" type="button" class="mobile-menu__backdrop"
                :aria-label="locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'" @click="emitClose" />
        </transition>
        <transition name="mobile-menu-drawer">
            <nav v-if="open" :id="id" class="mobile-menu"
                :aria-label="locale === 'ko' ? '모바일 주요 메뉴' : 'Mobile primary menu'">
                <p class="mobile-menu__eyebrow">{{ locale === 'ko' ? '페이지' : 'Pages' }}</p>
                <template v-for="item in links" :key="item.href">
                    <NuxtLink v-if="isAppRoute(item.href)" :to="item.href" :class="linkClass(item.href)"
                        @click="emitClose">
                        {{ item.label }}
                    </NuxtLink>
                    <a v-else :href="item.href" :class="linkClass(item.href)" @click="emitClose">
                        {{ item.label }}
                    </a>
                </template>
            </nav>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
type NavLink = { href: string; label: string };

const { locale } = useLocale();
const route = useRoute();

const props = withDefaults(
    defineProps<{
        id?: string;
        open: boolean;
        links: NavLink[];
        activeId?: string;
        activePath?: string;
    }>(),
    { activeId: '' },
);

const emit = defineEmits(['close']);

function emitClose(): void {
    emit('close');
}

function isAppRoute(href: string): boolean {
    return href.startsWith('/') && !href.startsWith('//');
}

function isActive(href: string): boolean {
    if (href.startsWith('#')) {
        if (props.activePath) {
            return false;
        }
        const id = props.activeId;
        return Boolean(id) && id === href.slice(1);
    }
    if (href.startsWith('/')) {
        if (props.activePath) {
            if (href === '/') {
                return route.path === '/';
            }
            return props.activePath === href;
        }
        if (href === '/') {
            return route.path === '/';
        }
        const prefix = href + '/';
        return route.path === href || route.path.startsWith(prefix);
    }
    return false;
}

function linkClass(href: string): string {
    return isActive(href) ? 'is-active' : '';
}
</script>
