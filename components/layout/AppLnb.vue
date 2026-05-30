<template>
    <Teleport to="body">
        <transition name="app-lnb-fade">
            <div v-if="open" class="app-lnb__backdrop" aria-hidden="true" @click="emitClose" />
        </transition>
        <transition name="app-lnb-drawer">
            <div v-if="open" :id="id" ref="drawerRef" class="app-lnb" role="dialog" aria-modal="true"
                :aria-labelledby="`${id}-title`">
                <div class="app-lnb__glow" aria-hidden="true" />
                <header class="app-lnb__head">
                    <div class="app-lnb__head-copy">
                        <p class="app-lnb__eyebrow">{{ t('lnb.eyebrow') }}</p>
                        <p :id="`${id}-title`" class="app-lnb__title">{{ t('lnb.title') }}</p>
                    </div>
                    <button type="button" class="app-lnb__close"
                        :aria-label="locale === 'ko' ? '모바일 메뉴 닫기' : 'Close mobile menu'" @click="emitClose">
                        <span class="app-lnb__close-icon" aria-hidden="true">
                            <span />
                            <span />
                        </span>
                    </button>
                </header>
                <nav class="app-lnb__nav" :aria-label="locale === 'ko' ? '모바일 주요 메뉴' : 'Mobile primary menu'">
                    <BaseLink v-for="(item, index) in links" :key="item.href" :href="item.href" class="app-lnb__link"
                        :class="{ 'app-lnb__link--active': isActive(item.href) }"
                        :aria-current="getAriaCurrent(item.href)" :style="{ '--lnb-item-delay': `${index * 45}ms` }"
                        @click="emitClose">
                        <span class="app-lnb__index" aria-hidden="true">{{ formatLinkIndex(index) }}</span>
                        <span class="app-lnb__link-text">{{ item.label }}</span>
                        <span class="app-lnb__link-arrow" aria-hidden="true" />
                    </BaseLink>
                </nav>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { AppNavLink } from '@composables/portfolio/useNavLinkState';

const { locale, t } = useLocale();
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

function formatLinkIndex(index: number): string {
    return String(index + 1).padStart(2, '0');
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
            drawerRef.value?.querySelector<HTMLElement>('.app-lnb__close')?.focus();
        });
    },
);

</script>
