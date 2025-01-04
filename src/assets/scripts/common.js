document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('animatedCanvas');
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    const container = document.querySelector('.area-wel');

    function resizeCanvas() {
        const containerWidth = container.offsetWidth;
        const containerHeight = containerWidth * 0.5; // 가로:세로 비율을 2:1로 고정
        container.style.height = `${containerHeight}px`; // 컨테이너 높이 설정
        canvas.width = containerWidth;
        canvas.height = containerHeight;
    }

    // 고정 폰트 크기와 속도 설정
    const fixedFontSize = 80; // 고정된 폰트 크기
    const spd = 1; // 고정된 속도
    const wrd = "EUN YOUNG HWAN #ILLUSION__IS #APPLE #BASEBALL #ENTJ  ";

    const texts = [
        { text: wrd, y: fixedFontSize, speed: spd, offset: 0 },          // 첫 번째 줄
        { text: wrd, y: fixedFontSize * 2, speed: spd, offset: -fixedFontSize }, // 두 번째 줄
        { text: wrd, y: fixedFontSize * 3, speed: spd, offset: -fixedFontSize * 2 }, // 세 번째 줄
        { text: wrd, y: fixedFontSize * 4, speed: spd, offset: -fixedFontSize * 3 }  // 네 번째 줄
    ];

    // 텍스트 그리기 함수
    function drawTexts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `900 ${fixedFontSize}px Pretendard`;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";

        texts.forEach((item) => {
            let x = item.offset;
            while (x < canvas.width) {
                ctx.strokeText(item.text, x, item.y);
                x += ctx.measureText(item.text).width;
            }

            item.offset -= item.speed;

            if (item.offset < -ctx.measureText(item.text).width) {
                item.offset += ctx.measureText(item.text).width;
            }
        });

        requestAnimationFrame(drawTexts);
    }

    // 창 크기 조정 시 비율 유지
    window.addEventListener('resize', () => {
        resizeCanvas();
        drawTexts(); // 캔버스를 다시 그리기
    });

    // 초기 설정
    resizeCanvas();
    drawTexts();
});