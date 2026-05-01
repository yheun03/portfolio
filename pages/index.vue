<template>
    <PortfolioView />
</template>

<script setup lang="ts">
import PortfolioView from "~/views/PortfolioView.vue";

const { initTheme } = useTheme();
const { initLocale } = useLocale();

useHead({
    title: "2026 포트폴리오 | 은영환",
    meta: [
        { name: "description", content: "기분 좋은 인터랙션과 탄탄한 구조를 함께 만드는 웹 퍼블리셔 포트폴리오" },
        { property: "og:title", content: "Eunyounghwan Portfolio 2026" },
        { property: "og:description", content: "Publishing 기반으로 Frontend까지 확장 중인 UI 중심 실무형 인재" }
    ]
});

onMounted(() => {
    initTheme();
    initLocale();
});
</script>
