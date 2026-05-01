<template>
    <section id="works" class="section">
        <BaseSectionTitle eyebrow="Works" :title="t('works.title')" />

        <div class="works__filters" role="tablist" aria-label="프로젝트 필터">
            <button
                v-for="category in workCategories"
                :key="category.key"
                :id="`works-tab-${category.key}`"
                role="tab"
                :aria-controls="`works-panel-${category.key}`"
                :aria-selected="selected === category.key"
                :tabindex="selected === category.key ? 0 : -1"
                :class="{ 'is-active': selected === category.key }"
                @click="selected = category.key"
            >
                {{ pick(category.label) }}
            </button>
        </div>

        <div
            :id="`works-panel-${selected}`"
            class="works__grid"
            role="tabpanel"
            :aria-labelledby="`works-tab-${selected}`"
        >
            <WorkCard
                v-for="work in filteredWorks"
                :key="work.id"
                :work="work"
                :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                :detail-label="t('works.detail')"
                @select="activeWork = work"
            />
        </div>

        <div v-if="activeWork" class="works__modal" role="dialog" aria-modal="true" aria-label="프로젝트 상세 정보">
            <BaseCard>
                <h3>{{ pick(activeWork.title) }}</h3>
                <p style="margin-top: 0.25rem">{{ activeWork.period }} · {{ pick(activeWork.type) }}</p>
                <p style="margin-top: 0.5rem"><strong>Role:</strong> {{ pick(activeWork.role) }}</p>
                <p style="margin-top: 0.5rem">{{ pick(activeWork.introduction) }}</p>
                <p style="margin-top: 0.75rem"><strong>내가 한 일</strong></p>
                <ul>
                    <li v-for="item in activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <p v-if="activeWork.achievements.length" style="margin-top: 0.75rem"><strong>성과</strong></p>
                <ul v-if="activeWork.achievements.length">
                    <li v-for="item in activeWork.achievements" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <p style="margin-top: 0.75rem"><strong>포인트</strong></p>
                <ul>
                    <li v-for="item in activeWork.points" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <button class="base-button base-button--ghost" aria-label="상세 모달 닫기" @click="activeWork = null">Close</button>
            </BaseCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import { workCategories, works, type WorkItem, type WorkCategory } from "~/data/works";

const { t, pick } = useLocale();
const selected = ref<WorkCategory>("all");
const activeWork = ref<WorkItem | null>(null);

const filteredWorks = computed(() => {
    if (selected.value === "all") return works;
    return works.filter((work) => work.category === selected.value);
});
</script>
