<template>
    <!-- TEMP: 완성 시 이 파일과 pages/index.vue의 렌더러 태그 삭제 -->
    <Teleport to="body">
        <Transition name="temp-main-modal">
            <div v-if="isOpen" class="temp-main-modal" role="dialog" aria-modal="true"
                aria-labelledby="temp-main-modal-title" aria-describedby="temp-main-modal-description"
                @click.self="close">
                <div ref="panelRef" class="temp-main-modal__content" tabindex="-1" @click.stop>
                    <BaseCard :animate="false" class="temp-main-modal__card">
                        <header class="temp-main-modal__head">
                            <BaseSectionTitle class="temp-main-modal__intro" :eyebrow="t.eyebrow" :title="t.title"
                                :description="t.description" title-id="temp-main-modal-title"
                                description-id="temp-main-modal-description" :spark="false" :animate="false" />
                            <button ref="focusRef" type="button"
                                class="base-button base-button--ghost temp-main-modal__close" :aria-label="t.closeAria"
                                @click="close">
                                {{ t.close }}
                            </button>
                        </header>

                        <BaseProgress variant="panel" :value="PROGRESS" :label="t.progressLabel"
                            :aria-label="t.progressAria" />

                        <p class="temp-main-modal__note">{{ t.note }}</p>

                        <div class="temp-main-modal__actions">
                            <BaseButton variant="ghost" :label="t.dismiss" @click="close" />
                            <BaseButton variant="primary" :label="t.dismissToday" @click="dismissToday" />
                        </div>
                    </BaseCard>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const PROGRESS = 98;
const STORAGE_KEY = 'portfolio-temp-main-modal-dismissed-date';

const COPY = {
    ko: {
        eyebrow: '아직 다듬는 중이에요',
        title: '거의 다 왔습니다.',
        description:
            '완성 전에도 들러주셔서 감사합니다. 마지막 2%를 정리하는 중이라 일부 화면은 조금 더 다듬어질 예정입니다.',
        progressLabel: '현재 완성도',
        progressAria: '포트폴리오 제작 진행률 98%',
        note: '조금 덜 익은 부분은 있어도, 보여드리고 싶은 방향은 또렷하게 담아두었습니다.',
        close: '닫기',
        closeAria: '안내 모달 닫기',
        dismiss: '지금 닫기',
        dismissToday: '오늘 하루만 닫기',
    },
    en: {
        eyebrow: 'Still getting polished',
        title: 'Almost there.',
        description:
            'Thanks for visiting before launch. I am finishing the last 2%, so a few screens may still sharpen up.',
        progressLabel: 'Current progress',
        progressAria: 'Portfolio production progress 98%',
        note: 'A few corners are still warm from the oven, but the direction is already here.',
        close: 'Close',
        closeAria: 'Close notice modal',
        dismiss: 'Close now',
        dismissToday: 'Close for today',
    },
} as const;

const { locale } = useLocale();

const isOpen = ref(false);
const panelRef = ref<HTMLElement | null>(null);
const focusRef = ref<HTMLButtonElement | null>(null);

const t = computed(() => COPY[locale.value]);

const todayKey = () => new Date().toISOString().slice(0, 10);

const close = () => {
    isOpen.value = false;
};

const dismissToday = () => {
    localStorage.setItem(STORAGE_KEY, todayKey());
    close();
};

useModal({
    isOpen: computed(() => isOpen.value),
    onClose: close,
    containerRef: panelRef,
    initialFocusRef: focusRef,
});

onMounted(() => {
    isOpen.value = localStorage.getItem(STORAGE_KEY) !== todayKey();
});
</script>

<style scoped lang="scss">
.temp-main-modal {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: grid;
    place-items: center;
    padding: clamp(1rem, 4vw, 2rem);
    background: var(--color-scrim);
    backdrop-filter: blur(18px) saturate(1.2);

    &__content {
        width: min(100%, 36rem);
        max-height: min(92dvh, 44rem);
    }

    &__card {
        display: grid;
        gap: var(--space-6);
        max-height: inherit;
        overflow-y: auto;
    }

    &__head {
        display: flex;
        gap: var(--space-4);
        align-items: flex-start;
        justify-content: space-between;
    }

    &__intro {
        flex: 1;
        min-width: 0;
        margin-bottom: 0;

        :deep(.section-title__title) {
            max-width: 9.6em;
            font-size: clamp(2rem, 7vw, 3.25rem);
            line-height: 1.02;
        }

        :deep(.section-title__eyebrow::after) {
            display: none;
        }
    }

    &__close {
        flex-shrink: 0;
        min-width: auto;
        min-height: auto;
        padding: 0.45rem 0.85rem;
        font-size: var(--font-size-xs);
    }

    &__note {
        margin: 0;
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        line-height: 1.6;
        text-wrap: pretty;
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-3);
        justify-content: flex-end;
    }
}

.temp-main-modal-enter-active,
.temp-main-modal-leave-active {
    transition: opacity 0.24s ease;

    .temp-main-modal__content {
        transition: transform 0.24s cubic-bezier(0.2, 0.9, 0.2, 1);
    }
}

.temp-main-modal-enter-from,
.temp-main-modal-leave-to {
    opacity: 0;

    .temp-main-modal__content {
        transform: translateY(0.9rem) scale(0.985);
    }
}

@media (max-width: 520px) {
    .temp-main-modal {
        align-items: end;
        padding: var(--space-4);

        &__content {
            width: 100%;
        }

        &__actions {
            flex-direction: column-reverse;

            :deep(.base-button) {
                width: 100%;
            }
        }
    }
}

@media (prefers-reduced-motion: reduce) {

    .temp-main-modal-enter-active,
    .temp-main-modal-leave-active,
    .temp-main-modal-enter-active .temp-main-modal__content,
    .temp-main-modal-leave-active .temp-main-modal__content {
        transition: none;
    }
}
</style>
