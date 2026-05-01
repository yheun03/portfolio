import { defineStore } from "pinia";

type ThemeMode = "light" | "dark";

export const useThemeStore = defineStore("theme", {
    state: () => ({
        mode: "light" as ThemeMode,
    }),
    actions: {
        initTheme() {
            if (import.meta.server) return;
            const saved = localStorage.getItem("portfolio-theme") as ThemeMode | null;
            if (saved === "light" || saved === "dark") {
                this.mode = saved;
            } else {
                this.mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            }
            document.documentElement.setAttribute("data-theme", this.mode);
        },
        setTheme(mode: ThemeMode) {
            this.mode = mode;
            if (import.meta.client) {
                localStorage.setItem("portfolio-theme", mode);
                document.documentElement.setAttribute("data-theme", mode);
            }
        },
        toggleTheme() {
            this.setTheme(this.mode === "dark" ? "light" : "dark");
        },
    },
});
