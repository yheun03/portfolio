<template>
    <!-- TEMP_MAIN_PROGRESS_MODAL: 완성 시 이 파일과 index.vue의 렌더러 태그를 삭제 -->
    <Teleport to="body">
        <Transition name="temp-main-modal">
            <div v-if="isOpen" class="temp-main-modal" role="dialog" aria-modal="true"
                aria-labelledby="temp-main-modal-title" aria-describedby="temp-main-modal-description"
                @click.self="close">
                <section ref="modalRef" class="temp-main-modal__panel" tabindex="-1">
                    <button ref="initialFocusRef" type="button" class="temp-main-modal__close"
                        :aria-label="modalText.closeAria" @click="close">
                        {{ modalText.close }}
                    </button>

                    <p class="temp-main-modal__eyebrow">{{ modalText.eyebrow }}</p>
                    <h2 id="temp-main-modal-title" class="temp-main-modal__title">
                        {{ modalText.title }}
                    </h2>
                    <p id="temp-main-modal-description" class="temp-main-modal__description">
                        {{ modalText.description }}
                    </p>

                    <div class="temp-main-modal__progress" :aria-label="progressAriaLabel">
                        <div class="temp-main-modal__progress-head">
                            <span>{{ modalText.progressLabel }}</span>
                            <strong>{{ TEMP_MAIN_MODAL_PROGRESS }}%</strong>
                        </div>
                        <div class="temp-main-modal__progress-track" role="progressbar"
                            :aria-valuenow="TEMP_MAIN_MODAL_PROGRESS" aria-valuemin="0" aria-valuemax="100">
                            <span :style="{ width: `${TEMP_MAIN_MODAL_PROGRESS}%` }" />
                        </div>
                    </div>

                    <p class="temp-main-modal__note">{{ modalText.note }}</p>

                    <div class="temp-main-modal__actions">
                        <button type="button" class="temp-main-modal__button temp-main-modal__button--ghost"
                            @click="close">
                            {{ modalText.dismiss }}
                        </button>
                        <button type="button" class="temp-main-modal__button temp-main-modal__button--primary"
                            @click="closeForToday">
                            {{ modalText.dismissToday }}
                        </button>
                    </div>
                </section>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const TEMP_MAIN_MODAL_PROGRESS = 92;
const TEMP_MAIN_MODAL_STORAGE_KEY = 'portfolio-temp-main-modal-dismissed-date';

const TEMP_MAIN_MODAL_MESSAGES = {
    ko: {
        eyebrow: '아직 다듬는 중이에요',
        title: '거의 다 왔습니다.',
        description:
            '완성 전 포트폴리오까지 관심을 가지고 들어와 주셔서 감사합니다. 지금은 마지막 8%를 정리하는 중이라, 몇몇 화면은 조금 더 좋아질 예정입니다.',
        progressLabel: '현재 완성도',
        progressAria: '포트폴리오 제작 진행률 {progress}%',
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
            'Thanks for taking a look before the portfolio is fully finished. I am cleaning up the last 8%, so a few screens may still get a little sharper.',
        progressLabel: 'Current progress',
        progressAria: 'Portfolio production progress {progress}%',
        note: 'A few corners are still warm from the oven, but the direction is already here.',
        close: 'Close',
        closeAria: 'Close notice modal',
        dismiss: 'Close now',
        dismissToday: 'Close for today',
    },
} as const;

const { locale } = useLocale();

const isOpen = ref(false);
const modalRef = ref<HTMLElement | null>(null);
const initialFocusRef = ref<HTMLButtonElement | null>(null);
const modalText = computed(() => TEMP_MAIN_MODAL_MESSAGES[locale.value]);

const progressAriaLabel = computed(() =>
    modalText.value.progressAria.replace('{progress}', String(TEMP_MAIN_MODAL_PROGRESS))
);

const getTodayKey = () => {
    const today = new Date();
    return [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
    ].join('-');
};

const close = () => {
    isOpen.value = false;
};

const closeForToday = () => {
    localStorage.setItem(TEMP_MAIN_MODAL_STORAGE_KEY, getTodayKey());
    close();
};

useModal({
    isOpen: computed(() => isOpen.value),
    onClose: close,
    containerRef: modalRef,
    initialFocusRef,
});

onMounted(() => {
    const dismissedDate = localStorage.getItem(TEMP_MAIN_MODAL_STORAGE_KEY);
    isOpen.value = dismissedDate !== getTodayKey();
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
    background: color-mix(in srgb, var(--grayscale-950) 62%, transparent);
    backdrop-filter: blur(18px) saturate(1.2);
}

.temp-main-modal__panel {
    position: relative;
    display: grid;
    gap: clamp(1rem, 3vw, 1.45rem);
    width: min(100%, 36rem);
    padding: clamp(1.35rem, 4.5vw, 2.75rem);
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--color-surface) 62%, var(--color-border));
    border-radius: clamp(1.35rem, 4vw, 2rem);
    background:
        radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 42%),
        linear-gradient(180deg,
            color-mix(in srgb, var(--color-surface) 98%, transparent),
            color-mix(in srgb, var(--color-surface) 90%, var(--color-primary) 4%));
    box-shadow:
        0 30px 90px color-mix(in srgb, var(--grayscale-950) 24%, transparent),
        0 1px 0 color-mix(in srgb, var(--color-surface) 80%, transparent) inset,
        var(--shadow-glow);
    color: var(--color-text);
}

.temp-main-modal__panel::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(135deg, color-mix(in srgb, #fff 22%, transparent), transparent 34%);
    opacity: 0.55;
}

.temp-main-modal__close,
.temp-main-modal__eyebrow,
.temp-main-modal__title,
.temp-main-modal__description,
.temp-main-modal__progress,
.temp-main-modal__note,
.temp-main-modal__actions {
    position: relative;
    z-index: 1;
}

.temp-main-modal__close {
    position: absolute;
    top: var(--space-5);
    right: var(--space-5);
    min-width: auto;
    min-height: auto;
    padding: 0.45rem 0.7rem;
    border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-surface) 72%, transparent);
    color: var(--color-text-muted);
    font: inherit;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.01em;
    cursor: pointer;
    backdrop-filter: blur(14px);
}

.temp-main-modal__eyebrow {
    max-width: calc(100% - 5rem);
    margin: 0;
    color: var(--color-primary);
    font-family: -apple-system, BlinkMacSystemFont, var(--font-display);
    font-size: clamp(0.78rem, 2vw, 0.9rem);
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.3;
}

.temp-main-modal__title {
    max-width: 9.6em;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, var(--font-display);
    font-size: clamp(2.15rem, 8vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.055em;
    line-height: 0.98;
    text-wrap: balance;
}

.temp-main-modal__description {
    max-width: 33rem;
    margin: 0;
    color: color-mix(in srgb, var(--color-text) 72%, var(--color-text-muted));
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    font-weight: 520;
    letter-spacing: -0.015em;
    line-height: 1.62;
    text-wrap: pretty;
}

.temp-main-modal__progress {
    display: grid;
    gap: var(--space-3);
    padding: clamp(1rem, 3vw, 1.25rem);
    border: 1px solid color-mix(in srgb, var(--color-primary) 16%, var(--color-border));
    border-radius: var(--radius-xl);
    background: color-mix(in srgb, var(--color-primary) 7%, var(--color-surface));
}

.temp-main-modal__progress-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-4);

    span {
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        letter-spacing: -0.01em;
    }

    strong {
        font-family: -apple-system, BlinkMacSystemFont, var(--font-display);
        font-size: clamp(1.5rem, 5vw, 2.25rem);
        font-weight: 800;
        letter-spacing: -0.04em;
        line-height: 1;
    }
}

.temp-main-modal__progress-track {
    height: 0.62rem;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-border) 68%, transparent);

    span {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg,
                color-mix(in srgb, var(--color-primary) 72%, var(--color-surface)),
                var(--color-primary));
        box-shadow: 0 0 24px color-mix(in srgb, var(--color-primary) 30%, transparent);
    }
}

.temp-main-modal__note {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    font-weight: 520;
    line-height: 1.6;
}

.temp-main-modal__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    justify-content: flex-end;
}

.temp-main-modal__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--size-touch);
    padding: 0.8rem 1.25rem;
    border: 1px solid color-mix(in srgb, var(--color-primary) 22%, var(--color-border));
    border-radius: 999px;
    font-family: -apple-system, BlinkMacSystemFont, var(--font-display);
    font-size: var(--font-size-sm);
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.2;
    cursor: pointer;
    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;

    &:hover {
        box-shadow: var(--shadow-soft);
        transform: translateY(-2px);
    }

    &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 3px;
    }
}

.temp-main-modal__button--ghost {
    background: color-mix(in srgb, var(--color-surface) 84%, transparent);
    color: var(--color-text);
}

.temp-main-modal__button--primary {
    background: var(--color-text);
    color: var(--color-surface);
    border-color: color-mix(in srgb, var(--color-text) 74%, var(--color-border));
}

.temp-main-modal-enter-active,
.temp-main-modal-leave-active {
    transition: opacity 0.24s ease;

    .temp-main-modal__panel {
        transition: transform 0.24s cubic-bezier(0.2, 0.9, 0.2, 1);
    }
}

.temp-main-modal-enter-from,
.temp-main-modal-leave-to {
    opacity: 0;

    .temp-main-modal__panel {
        transform: translateY(0.9rem) scale(0.985);
    }
}

@media (max-width: 520px) {
    .temp-main-modal {
        align-items: end;
        padding: var(--space-4);
    }

    .temp-main-modal__panel {
        width: 100%;
        max-height: min(92dvh, 44rem);
        overflow-y: auto;
    }

    .temp-main-modal__title {
        max-width: 8em;
    }

    .temp-main-modal__actions {
        flex-direction: column-reverse;
    }

    .temp-main-modal__button {
        width: 100%;
    }
}

@media (prefers-reduced-motion: reduce) {

    .temp-main-modal-enter-active,
    .temp-main-modal-leave-active,
    .temp-main-modal-enter-active .temp-main-modal__panel,
    .temp-main-modal-leave-active .temp-main-modal__panel {
        transition: none;
    }
}
</style>
