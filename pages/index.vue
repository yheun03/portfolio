<template>
    <section>
        <button class="btn set-mode" aria-label="다크모드, 라이트모드 전환" @click="toggleTheme" />
        <SectionsWelcomeCanvas />
        <SectionsIntroSection />
        <SectionsInformationSection />
        <SectionsProjectsSection />
        <SectionsHistorySection />
    </section>
    <SectionsSiteFooter />
</template>

<script setup lang="ts">
useHead({
    title: "웹 퍼블리셔 은영환 포트폴리오",
    meta: [
        { name: "description", content: "더 나은 내일을 위해 쉼 없이 달려가는 웹 퍼블리셔 은영환입니다." },
        { property: "og:title", content: "웹 퍼블리셔 은영환 포트폴리오" },
        { property: "og:description", content: "더 나은 내일을 위해 쉼 없이 달려가는 웹 퍼블리셔 은영환입니다." }
    ]
});

const { theme, setTheme, initTheme } = useTheme();

onMounted(() => {
    initTheme();
    const body = document.body;
    if (theme.value === "dark") body.classList.add("mode-dark");
});

watch(theme, (value) => {
    const body = document.body;
    if (value === "dark") {
        body.classList.add("mode-dark");
    } else {
        body.classList.remove("mode-dark");
    }
});

const toggleTheme = () => {
    setTheme(theme.value === "dark" ? "light" : "dark");
};
</script>
