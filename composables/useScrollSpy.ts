export const useScrollSpy = (sectionIds: string[]) => {
    const activeId = ref(sectionIds[0] ?? "");

    onMounted(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) activeId.value = visible[0].target.id;
            },
            { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -60% 0px" }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
    });

    return { activeId };
};
