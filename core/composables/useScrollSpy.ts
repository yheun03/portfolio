export const useScrollSpy = (sectionIds: string[]) => {
    const activeId = ref(sectionIds[0] ?? '');
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let scrollTicking = false;

    const getSections = () => sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));

    const computeActiveFromViewport = () => {
        const sections = getSections();
        if (!sections.length) return;

        const viewportAnchor = window.innerHeight * 0.32;
        const closest = sections
            .map((section) => ({
                id: section.id,
                distance: Math.abs(section.getBoundingClientRect().top - viewportAnchor),
            }))
            .sort((a, b) => a.distance - b.distance)[0];

        if (closest?.id) {
            activeId.value = closest.id;
        }
    };

    const onScroll = () => {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(() => {
            computeActiveFromViewport();
            scrollTicking = false;
        });
    };

    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) activeId.value = visible[0].target.id;
            },
            { threshold: [0.12, 0.3, 0.5, 0.72], rootMargin: '-12% 0px -52% 0px' },
        );

        const observeSections = () => {
            const sections = getSections();
            sections.forEach((el) => observer?.observe(el));
            if (sections.length === sectionIds.length) {
                mutationObserver?.disconnect();
                mutationObserver = null;
            }
            computeActiveFromViewport();
        };

        observeSections();
        mutationObserver = new MutationObserver(() => observeSections());
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
        mutationObserver?.disconnect();
        mutationObserver = null;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
    });

    return { activeId };
};
