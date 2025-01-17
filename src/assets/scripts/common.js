document.addEventListener('DOMContentLoaded', () => {

    // .area-welcome의 움직이는 텍스트 애니메이션
    const canvas = document.getElementById('animatedCanvas');
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    const container = document.querySelector('.area-welcome');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // 고정 폰트 크기와 속도 설정 (비율에 상관없이 고정)
    const fontSize = canvas.height/4;
    const fixedFontSize = 80; // 고정된 폰트 크기
    const spd = 1; // 고정된 속도
    const wrd = "EUN YOUNG HWAN #ILLUSION__IS #APPLE #BASEBALL #ENTJ  ";

    const texts = [
        { text: wrd, y: fontSize * 0.8, speed: spd, offset: 0 },          // 첫 번째 줄
        { text: wrd, y: fontSize * 1.8, speed: spd, offset: -fixedFontSize * 10 }, // 두 번째 줄
        { text: wrd, y: fontSize * 2.8, speed: spd, offset: -fixedFontSize * 10 * 2 }, // 세 번째 줄
        { text: wrd, y: fontSize * 3.8, speed: spd, offset: -fixedFontSize * 10 * 3 }  // 네 번째 줄
    ];

    // 텍스트 그리기 함수
    function drawTexts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `900 ${fontSize}px Pretendard`; // 고정된 폰트 크기 설정
        ctx.lineWidth = 2; // 고정된 글자 두께 설정
        ctx.strokeStyle = "#000";

        texts.forEach((item) => {
            // 한 줄에 동일한 텍스트를 이어서 배치
            let x = item.offset;
            while (x < canvas.width) {
                ctx.strokeText(item.text, x, item.y);
                x += ctx.measureText(item.text).width; // 텍스트 폭만큼 간격 추가
            }

            // 텍스트 이동
            item.offset -= item.speed;

            // 텍스트가 화면 밖으로 나가면 오른쪽에서 다시 시작
            if (item.offset < -ctx.measureText(item.text).width) {
                item.offset += ctx.measureText(item.text).width;
            }
        });

        requestAnimationFrame(drawTexts);
    }

    // 애니메이션 시작
    drawTexts();

    //모달 컨트롤
    const closeButton = document.querySelector(".modal-close");
    const modal = document.querySelector(".modal");
  
    if (closeButton && modal) {
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,           // 한 번에 한 슬라이드만 보이게 설정
        autoplay: {
            delay: 10000,
        },
        autoHeight : true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: '.btn-gotoPrev',
            nextEl: '.btn-gotoNext',
        },
    });
    
    const modeToggleButton = document.querySelector('.btn.set-mode');

    // 사용자의 시스템 다크 모드 여부 확인
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 시스템이 다크 모드인 경우 body에 mode-dark 클래스 추가
    if (isDarkMode) {
        document.body.classList.add('mode-dark');
    }

    // 버튼 클릭 시 다크 모드 토글
    modeToggleButton.addEventListener('click', function() {
        document.body.classList.toggle('mode-dark');
    });

    // 시스템 다크 모드 설정이 변경될 때 실시간 반영
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (e.matches) {
        document.body.classList.add('mode-dark');
        } else {
        document.body.classList.remove('mode-dark');
        }
    });
});