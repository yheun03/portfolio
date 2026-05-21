<template>
    <Teleport to="body">
        <transition name="app-lnb-fade">
            <button v-if="open" type="button" class="app-lnb__backdrop"
                :aria-label="locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'" @click="emitClose" />
        </transition>
        <transition name="app-lnb-drawer">
            <nav v-if="open" :id="id" class="app-lnb"
                :aria-label="locale === 'ko' ? '모바일 주요 메뉴' : 'Mobile primary menu'">
                <p class="app-lnb__eyebrow">{{ locale === 'ko' ? '페이지' : 'Pages' }}</p>
                <template v-for="item in links" :key="item.href">
                    <NuxtLink v-if="isAppRoute(item.href)" :to="item.href" class="app-lnb__link"
                        :class="{ 'app-lnb__link--active': isActive(item.href) }" @click="emitClose">
                        {{ item.label }}
                    </NuxtLink>
                    <a v-else :href="item.href" class="app-lnb__link"
                        :class="{ 'app-lnb__link--active': isActive(item.href) }" @click="emitClose">
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

const { isAppRoute } = useAppPathResolver();

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

</script>
