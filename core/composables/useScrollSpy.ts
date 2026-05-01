export const useScrollSpy = (sectionIds: string[]) => {
    const activeId = ref(sectionIds[0] ?? "");
    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) activeId.value = visible[0].target.id;
            },
            { threshold: [0.2, 0.45, 0.7], rootMargin: "-18% 0px -58% 0px" }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer?.observe(el);
        });
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
    });

    return { activeId };
};
