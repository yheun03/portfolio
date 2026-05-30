<template>
    <section id="hello" ref="heroSectionRef" class="section section--hero">
        <div class="hero__poster">
            <div v-if="heroCanvasVisible" class="hero__canvas" aria-hidden="true">
                <canvas ref="canvasRef" id="animatedCanvas" />
            </div>

            <p class="hero__meta">
                <span>{{ profile.name }}</span>
                <span aria-hidden="true">·</span>
                <span>UI Publishing / Frontend</span>
            </p>

            <div class="hero__stage" data-animate>
                <p class="section-title__eyebrow hero__eyebrow">{{ t("nav.hello") }}</p>

                <TypoDisplayHeading tag="h1" group-id="hero" :lines="heroLines" heading-class="hero__display"
                    line-class="hero__display-line" line-accent-class="hero__display-line--accent" />

                <p class="hero__lead">{{ heroLead }}</p>
            </div>

            <section class="hero__essentials" data-animate :aria-label="locale === 'ko' ? '핵심 역량' : 'Core focus'">
                <header class="hero__essentials-head">
                    <h2 class="hero__essentials-title">{{ t("hero.kicker") }}</h2>
                    <p class="hero__essentials-lead">{{ t("hero.essentialsLead") }}</p>
                </header>

                <ul class="hero__focus-list">
                    <li v-for="(area, index) in heroFocusCards" :key="pick(area.label)" class="hero__focus-item">
                        <span class="hero__focus-index">{{ String(index + 1).padStart(2, "0") }}</span>
                        <div class="hero__focus-copy">
                            <h3 class="hero__focus-title">{{ pick(area.label) }}</h3>
                            <span>{{ pick(area.value) }}</span>
                        </div>
                    </li>
                </ul>

                <dl ref="statsRef" class="hero__metrics-bar" :aria-label="locale === 'ko' ? '핵심 지표' : 'Key metrics'">
                    <div v-for="(stat, idx) in convertedStats" :key="stat.label" class="hero__metric">
                        <dt>{{ stat.label }}</dt>
                        <dd>{{ statValues[idx] }}{{ stat.suffix }}</dd>
                    </div>
                </dl>
            </section>

            <nav class="hero__actions" :aria-label="locale === 'ko' ? '바로가기' : 'Quick links'">
                <a class="base-button base-button--primary" href="#works">{{ t("hero.ctaWorks") }}</a>
                <a class="base-button base-button--ghost" href="#toolbox">{{ t("hero.ctaToolbox") }}</a>
            </nav>
        </div>
    </section>
</template>

<script setup lang="ts">
import { profile } from "@data/site";
import { splitTypoWords } from '@composables/ui/useTypoInteraction';
import { scheduleAfterFirstPaint } from '@utils/schedule-idle';

const { t, pick, locale } = useLocale();

const heroSectionRef = ref<HTMLElement | null>(null);
const heroCanvasVisible = ref(false);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const heroFocusCards = computed(() => profile.focusAreas);

let canvasFrameId = 0;
let canvasResizeRaf = 0;
let canvasCleanup: (() => void) | null = null;

function setupHeroCanvas() {
    const canvas = canvasRef.value;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let running = false;
    let textWidth = 0;

    const resize = () => {
        cancelAnimationFrame(canvasResizeRaf);
        canvasResizeRaf = requestAnimationFrame(() => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width < 1 || height < 1) return;
            canvas.width = width;
            canvas.height = height;
        });
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const wrd = "EUN YOUNG HWAN #ILLUSION__IS #APPLE #BASEBALL #ENTJ  ";
    const texts = [
        { text: wrd, y: 0, speed: 1, offset: 0 },
        { text: wrd, y: 0, speed: 1, offset: -800 },
        { text: wrd, y: 0, speed: 1, offset: -1600 },
        { text: wrd, y: 0, speed: 1, offset: -2400 },
    ];

    const draw = () => {
        if (!running) return;

        const base = Math.max(canvas.height / 4, 48);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `800 ${base}px Pretendard`;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";

        if (!textWidth) {
            textWidth = ctx.measureText(wrd).width;
        }

        texts.forEach((item, index) => {
            item.y = base * (0.8 + index * 1);
            let x = item.offset;
            while (x < canvas.width) {
                ctx.strokeText(item.text, x, item.y);
                x += textWidth;
            }
            item.offset -= item.speed;
            if (item.offset < -textWidth) {
                item.offset += textWidth;
            }
        });

        canvasFrameId = requestAnimationFrame(draw);
    };

    const start = () => {
        if (running) return;
        running = true;
        draw();
    };

    const stop = () => {
        running = false;
        cancelAnimationFrame(canvasFrameId);
    };

    const visibilityObserver = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                start();
            } else {
                stop();
            }
        },
        { threshold: 0.05 },
    );

    visibilityObserver.observe(container);

    canvasCleanup = () => {
        visibilityObserver.disconnect();
        window.removeEventListener("resize", resize);
        stop();
        cancelAnimationFrame(canvasResizeRaf);
    };
}

const heroLines = computed(() => {
    if (locale.value === "ko") {
        return [
            { words: splitTypoWords("기분 좋은"), accent: false },
            { words: splitTypoWords("화면 구조"), accent: true },
            { words: splitTypoWords("만듭니다"), accent: false },
        ];
    }

    return [
        { words: splitTypoWords("Interfaces"), accent: false },
        { words: splitTypoWords("with rhythm"), accent: true },
        { words: splitTypoWords("and structure"), accent: false },
    ];
});

const heroLead = computed(() =>
    locale.value === "ko"
        ? "복잡한 요구를 단순한 흐름으로."
        : "Complex asks, clear flows."
);

const convertedStats = computed(() => profile.stats.map((item) => ({ ...item, label: pick(item.label) })));
const counters = convertedStats.value.map((item) => useCountUp(item.value));
const statValues = computed(() => counters.map((counter) => counter.value.value));
const statsRef = ref<HTMLElement | null>(null);
let statsObserver: IntersectionObserver | null = null;

watch(heroCanvasVisible, async (visible) => {
    if (!visible) return;
    await nextTick();
    setupHeroCanvas();
});

onMounted(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && heroSectionRef.value) {
        const heroObserver = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                scheduleAfterFirstPaint(() => {
                    heroCanvasVisible.value = true;
                }, 1600);
                heroObserver.disconnect();
            },
            { rootMargin: "120px 0px", threshold: 0 },
        );
        heroObserver.observe(heroSectionRef.value);
    }

    if (!statsRef.value) return;
    statsObserver = new IntersectionObserver(
        (entries) => {
            const isVisible = entries.some((entry) => entry.isIntersecting);
            if (!isVisible) return;
            counters.forEach((counter) => counter.start());
            statsObserver?.disconnect();
            statsObserver = null;
        },
        { threshold: 0.35 }
    );
    statsObserver.observe(statsRef.value);
});

onBeforeUnmount(() => {
    canvasCleanup?.();
    canvasCleanup = null;
    statsObserver?.disconnect();
    statsObserver = null;
});
</script>
