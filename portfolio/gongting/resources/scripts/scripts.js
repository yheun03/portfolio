$(document).ready(function(){

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
    console.log("resize");
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    var $setting = $('.setting');
    var $dotsButton = $('.setting-dots')
    var $prevButton = $('.setting-prev');
    var $nextButton = $('.setting-next');
    
    $setting.slick({
        dots: true,
        appendDots: $dotsButton,
        prevArrow: $prevButton,
        nextArrow: $nextButton,
        infinite: false,
        swipe: false,           // 터치 스와이프 비활성화
        draggable: false,       // 마우스 드래그 비활성화
        adaptiveHeight: true // 아이템 별로 높이를 자동으로 조정
    });

    $(".list").on("click", ".dept1 > li", function() {
        const classNm = "open";
        $(this).toggleClass(classNm).siblings().removeClass(classNm);
    })
})