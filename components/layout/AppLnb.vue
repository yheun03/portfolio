<template>
    <Teleport to="body">
        <transition name="app-lnb-fade">
            <button v-if="open" type="button" class="app-lnb__backdrop"
                :aria-label="locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'" @click="emitClose" />
        </transition>
        <transition name="app-lnb-drawer">
            <div v-if="open" :id="id" ref="drawerRef" class="app-lnb" role="dialog" aria-modal="true"
                :aria-labelledby="`${id}-title`">
                <nav :aria-label="locale === 'ko' ? '모바일 주요 메뉴' : 'Mobile primary menu'">
                    <p :id="`${id}-title`" class="app-lnb__eyebrow">{{ locale === 'ko' ? '페이지' : 'Pages' }}</p>
                    <BaseLink v-for="item in links" :key="item.href" :href="item.href" class="app-lnb__link"
                        :class="{ 'app-lnb__link--active': isActive(item.href) }"
                        :aria-current="getAriaCurrent(item.href)" @click="emitClose">
                        {{ item.label }}
                    </BaseLink>
                </nav>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { AppNavLink } from '@composables/portfolio/useNavLinkState';

const { locale } = useLocale();
const drawerRef = ref<HTMLElement | null>(null);

const props = withDefaults(
    defineProps<{
        id?: string;
        open: boolean;
        links: AppNavLink[];
        activeId?: string;
        activePath?: string;
    }>(),
    { activeId: '' },
);

const menuOpen = computed(() => props.open);

const emit = defineEmits(['close']);

function emitClose(): void {
    emit('close');
}

const { isActive, getAriaCurrent } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});

useFocusTrap(drawerRef, menuOpen, { onEscape: emitClose });

watch(
    () => props.open,
    (open) => {
        if (!open) return;
        nextTick(() => {
            drawerRef.value?.querySelector<HTMLElement>('a, button')?.focus();
        });
    },
);

</script>
