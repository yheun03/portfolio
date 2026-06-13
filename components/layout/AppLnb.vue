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
                        <p class="app-lnb__subtitle">{{ t('lnb.subtitle') }}</p>
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
                <footer class="app-lnb__foot">
                    <p class="app-lnb__foot-eyebrow">{{ t('lnb.connect') }}</p>
                    <div class="app-lnb__socials">
                        <a class="app-lnb__social" :href="`mailto:${profile.contacts.email}`">
                            <span class="app-lnb__social-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m4 7 8 6 8-6" />
                                </svg>
                            </span>
                            <span class="app-lnb__social-text">{{ t('lnb.email') }}</span>
                        </a>
                        <a class="app-lnb__social" :href="profile.contacts.github" target="_blank"
                            rel="noopener noreferrer">
                            <span class="app-lnb__social-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.79.62-3.38-1.37-3.38-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                                </svg>
                            </span>
                            <span class="app-lnb__social-text">{{ t('lnb.github') }}</span>
                        </a>
                    </div>
                    <p class="app-lnb__signature">{{ t('lnb.signature') }}</p>
                </footer>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { AppNavLink } from '@composables/portfolio/useNavLinkState';
import { profile } from '@data/site';

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
