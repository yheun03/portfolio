<template>
    <section id="works" class="section">
        <BaseSectionTitle :eyebrow="t('nav.works')" :title="t('works.title')" />

        <div class="works__filters" role="tablist" :aria-label="locale === 'ko' ? '프로젝트 필터' : 'Project filters'">
            <button v-for="category in workCategories" :key="category.key" :id="`works-tab-${category.key}`" role="tab"
                :aria-controls="`works-panel-${category.key}`" :aria-selected="selected === category.key"
                :tabindex="selected === category.key ? 0 : -1" :class="{ 'is-active': selected === category.key }"
                @click="selected = category.key">
                {{ pick(category.label) }}
            </button>
        </div>

        <div :id="`works-panel-${selected}`" class="works__grid" role="tabpanel"
            :aria-labelledby="`works-tab-${selected}`">
            <WorkCard v-for="work in filteredWorks" :key="work.id" :work="work"
                :item="{ title: pick(work.title), type: pick(work.type), summary: pick(work.introduction) }"
                :detail-label="t('works.detail')" :detail-aria-label="`${pick(work.title)} ${t('works.detail')}`"
                @select="activeWork = work" />
        </div>

        <div v-if="activeWork" class="works__modal" role="dialog" aria-modal="true"
            :aria-label="locale === 'ko' ? '프로젝트 상세 정보' : 'Project detail information'">
            <BaseCard :animate="false">
                <h3>{{ pick(activeWork.title) }}</h3>
                <p style="margin-top: 0.25rem">{{ activeWork.period }} · {{ pick(activeWork.type) }}</p>
                <p style="margin-top: 0.5rem"><strong>{{ locale === 'ko' ? '역할' : 'Role' }}:</strong> {{ pick(activeWork.role) }}</p>
                <p style="margin-top: 0.5rem">{{ pick(activeWork.introduction) }}</p>
                <p style="margin-top: 0.75rem"><strong>{{ locale === 'ko' ? '내가 한 일' : 'My Contributions' }}</strong></p>
                <ul>
                    <li v-for="item in activeWork.myWorks" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <p v-if="activeWork.achievements.length" style="margin-top: 0.75rem"><strong>{{ locale === 'ko' ? '성과' : 'Results' }}</strong></p>
                <ul v-if="activeWork.achievements.length">
                    <li v-for="item in activeWork.achievements" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <p style="margin-top: 0.75rem"><strong>{{ locale === 'ko' ? '포인트' : 'Key Points' }}</strong></p>
                <ul>
                    <li v-for="item in activeWork.points" :key="pick(item)">{{ pick(item) }}</li>
                </ul>
                <button type="button" class="base-button base-button--ghost"
                    :aria-label="locale === 'ko' ? '상세 모달 닫기' : 'Close detail modal'"
                    @click="activeWork = null">{{ locale === 'ko' ? '닫기' : 'Close' }}</button>
            </BaseCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import { workCategories, works, type WorkItem, type WorkCategory } from "~/core/data/works";

const { t, pick, locale } = useLocale();
const selected = ref<WorkCategory>("all");
const activeWork = ref<WorkItem | null>(null);

const filteredWorks = computed(() => {
    if (selected.value === "all") return works;
    return works.filter((work) => work.category === selected.value);
});
</script>
