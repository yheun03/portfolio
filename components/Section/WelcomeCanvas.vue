<template>
    <div class="area-welcome">
        <canvas ref="canvasRef" id="animatedCanvas" />
    </div>
</template>

<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null);
let frameId = 0;
let cleanup: (() => void) | null = null;

onMounted(() => {
    const canvas = canvasRef.value;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const wrd = "EUN YOUNG HWAN #ILLUSION__IS #APPLE #BASEBALL #ENTJ  ";
    const base = Math.max(canvas.height / 4, 48);
    const texts = [
        { text: wrd, y: base * 0.8, speed: 1, offset: 0 },
        { text: wrd, y: base * 1.8, speed: 1, offset: -800 },
        { text: wrd, y: base * 2.8, speed: 1, offset: -1600 },
        { text: wrd, y: base * 3.8, speed: 1, offset: -2400 }
    ];

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `900 ${base}px Pretendard`;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";

        for (const item of texts) {
            let x = item.offset;
            while (x < canvas.width) {
                ctx.strokeText(item.text, x, item.y);
                x += ctx.measureText(item.text).width;
            }
            item.offset -= item.speed;
            if (item.offset < -ctx.measureText(item.text).width) {
                item.offset += ctx.measureText(item.text).width;
            }
        }

        frameId = requestAnimationFrame(draw);
    };

    draw();

    cleanup = () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(frameId);
    };
});

onBeforeUnmount(() => {
    cleanup?.();
});
</script>
