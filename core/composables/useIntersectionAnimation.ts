export const useIntersectionAnimation = () => {
    let observer: IntersectionObserver | null = null;

    onMounted(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const targets = document.querySelectorAll<HTMLElement>("[data-animate]");
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        targets.forEach((el) => observer?.observe(el));
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
    });
};
