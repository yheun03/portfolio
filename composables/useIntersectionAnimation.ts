export const useIntersectionAnimation = () => {
    onMounted(() => {
        const targets = document.querySelectorAll<HTMLElement>("[data-animate]");
        const observer = new IntersectionObserver(
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
        targets.forEach((el) => observer.observe(el));
    });
};
