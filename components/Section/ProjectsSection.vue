<template>
    <div class="area-projects">
        <button class="swiper-btn btn-gotoPrev" aria-label="이전 포트폴리오 정보로 이동하는 버튼"></button>
        <button class="swiper-btn btn-gotoNext" aria-label="다음 포트폴리오 정보로 이동하는 버튼"></button>

        <Swiper class="swiper" :modules="modules" :slides-per-view="1" :auto-height="true" :autoplay="{ delay: 10000 }"
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :navigation="{ prevEl: '.btn-gotoPrev', nextEl: '.btn-gotoNext' }">
            <SwiperSlide v-for="project in showcaseProjects" :key="project.id" class="proj">
                <div class="content">
                    <div class="proj-screen">
                        <div class="proj-screen-mockup-wrap">
                            <div class="proj-screen-mockup">
                                <img :src="project.thumbnail" :alt="project.thumbnailAlt" />
                            </div>
                        </div>
                    </div>
                    <div class="proj-information">
                        <div>
                            <h2 v-html="project.headline" />
                            <p class="title">{{ project.title }}</p>
                            <p>{{ project.description }}</p>
                            <ul>
                                <li v-for="item in project.contributions" :key="`${project.id}-${item}`">{{ item }}</li>
                            </ul>
                        </div>
                        <button class="btn type-round bg-primary" @click="projectsUi.openProject(project)">상세보기</button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="swiper-pagination"></div>
    </div>

    <div v-if="projectsUi.activeProject" class="modal" role="dialog" aria-modal="true"
        @click.self="projectsUi.closeModal">
        <div ref="modalPanelRef" class="modal-content active" @click.stop>
            <div class="modal-header">
                <h4>{{ projectsUi.activeProject.headline.replaceAll("<br>", " ") }}</h4>
                <ul>
                    <li v-for="tag in projectsUi.activeProject.detailTags" :key="tag">{{ tag }}</li>
                </ul>
                <button ref="closeBtnRef" class="btn type-round bg-black modal-close" aria-label="모달 닫기 버튼"
                    @click="projectsUi.closeModal">닫기</button>
            </div>
            <div class="modal-body">
                <div class="wrap">
                    <section v-for="section in projectsUi.activeProject.detailSections" :key="section.title">
                        <h5>{{ section.title }}</h5>
                        <p>{{ section.description }}</p>
                        <div v-if="section.image" class="wrap-img">
                            <img :src="section.image" :alt="section.imageAlt || section.title" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { showcaseProjects } from '~/core/data/projects';
import { useProjectsUiStore } from '~/core/stores/projectsUiStore';

const modules = [Navigation, Pagination, Autoplay];
const projectsUi = useProjectsUiStore();

const modalPanelRef = ref<HTMLElement | null>(null);
const closeBtnRef = ref<HTMLButtonElement | null>(null);

const modalOpen = computed(() => !!projectsUi.activeProject);

useModal({
    isOpen: modalOpen,
    onClose: () => projectsUi.closeModal(),
    containerRef: modalPanelRef,
    initialFocusRef: closeBtnRef,
});
</script>
