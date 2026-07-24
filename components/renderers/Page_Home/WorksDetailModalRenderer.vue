<template>
    <Teleport to="body">
        <div v-if="activeWork" class="works__modal" role="dialog" aria-modal="true" aria-labelledby="works-modal-title"
            aria-describedby="works-modal-description" @click.self="closeModal">
            <div ref="modalCardRef" class="works__modal-content" @click.stop>
                <BaseCard :animate="false" class="works__modal-card">
                    <div class="works__modal-head">
                        <h2 id="works-modal-title" class="works__modal-title">{{ pick(activeWork.title) }}</h2>
                        <button ref="closeButtonRef" type="button" class="base-button base-button--ghost works__modal-close"
                            :aria-label="labels.closeModalAria" @click="closeModal">
                            {{ labels.close }}
                        </button>
                    </div>

                    <div class="works__modal-body">
                        <p id="works-modal-description" class="works__meta">{{ activeWork.period }} · {{
                            pick(activeWork.type) }}</p>
                        <p class="works__role"><strong>{{ labels.role }}:</strong> {{ pick(activeWork.role) }}</p>
                        <p class="works__intro">{{ pick(activeWork.introduction) }}</p>
                        <p class="works__section-title"><strong>{{ labels.contributions }}</strong></p>
                        <ul>
                            <li v-for="item in activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                        <p v-if="activeWork.achievements.length" class="works__section-title"><strong>{{
                            labels.results
                                }}</strong></p>
                        <ul v-if="activeWork.achievements.length">
                            <li v-for="item in activeWork.achievements" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                        <p class="works__section-title"><strong>{{ labels.points }}</strong></p>
                        <ul>
                            <li v-for="item in activeWork.points" :key="pick(item)">{{ pick(item) }}</li>
                        </ul>
                    </div>

                    <div v-if="activeWork.links?.length" class="works__modal-links">
                        <BaseButton v-for="link in activeWork.links" :key="link.href" :href="link.href"
                            :label="pick(link.label)" :aria-label="workLinkAriaLabel(link)"
                            :external="!isAppRoute(link.href)" />
                    </div>
                </BaseCard>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWorksUiStore } from '@stores/works-ui';
import type { WorkItem } from '@data/works';

const { pick } = useLocale();
const { isAppRoute } = useAppPath();
const labels = useWorkDetailLabels();

const worksUi = useWorksUiStore();
const { activeWork } = storeToRefs(worksUi);
const { closeModal } = worksUi;

const closeButtonRef = ref<HTMLButtonElement | null>(null);
const modalCardRef = ref<HTMLElement | null>(null);
const modalOpen = computed(() => !!activeWork.value);

useModal({
    isOpen: modalOpen,
    onClose: closeModal,
    containerRef: modalCardRef,
    initialFocusRef: closeButtonRef,
});

function workLinkAriaLabel(link: NonNullable<WorkItem['links']>[number]) {
    if (!activeWork.value) return pick(link.label);

    return `${pick(activeWork.value.title)} ${pick(link.label)}`;
}
</script>
