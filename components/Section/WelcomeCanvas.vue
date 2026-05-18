<template>
    <div class="area-welcome">
        <canvas ref="canvasRef" id="animatedCanvas" />
    </div>
</template>

<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null);
let frameId = 0;
let resizeRaf = 0;
let cleanup: (() => void) | null = null;

onMounted(() => {
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
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
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
        ctx.font = `900 ${base}px Pretendard`;
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

        frameId = requestAnimationFrame(draw);
    };

    const start = () => {
        if (running) return;
        running = true;
        draw();
    };

    const stop = () => {
        running = false;
        cancelAnimationFrame(frameId);
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

    cleanup = () => {
        visibilityObserver.disconnect();
        window.removeEventListener("resize", resize);
        stop();
        cancelAnimationFrame(resizeRaf);
    };
});

onBeforeUnmount(() => {
    cleanup?.();
});
</script>
