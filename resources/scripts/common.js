$(document).ready(()=>{
    // NOTE: .area-history 내부의 경력 자동 세팅
    // 최초개발일 : 20230525
    // 수  정  일 : 20230814
    let year = new Date().getFullYear(); // 년도
    let month = new Date().getMonth() + 1  // 월
    const oldDate = new Date('2020-06');
    const newDate = new Date(year +"-"+ month);
    let diff = Math.abs((newDate.getFullYear() - oldDate.getFullYear())*12 + (newDate.getMonth() - oldDate.getMonth())) + 1;
    year = parseInt(diff/12);
    month = diff%12;
    let target = $("[data-hstryFg='career'] b span")
    if(month == 0){
        target.html(year+"년차")
    }else{
        target.html(year+"년 " + month+"개월차")
    }

    // NOTE: .area-project 내부의 기능  -- 삭제
    // 최초개발일 : 20230525
    // 수  정  일 : 20230627
    // 최종수정일 : 20230814
    $(".project-list").slick({
        fade: true,
        centerMode: true,
        dots: true,
        prevArrow: $('.nav.prev'),
        nextArrow: $('.nav.next')
    })

    var dom = $(".nav");
    dom.detach();
    $(".project-list").prepend(dom)
    
    $("a[href='#']").click(()=>{
        return false;
    })

    $("aside").click(()=>{
        $("aside").toggleClass("dark");
    })

    // NOTE: 유저 인터렉티브 효과 추가
    // 최초개발일 : 20230702
    // 수  정  일 : -
    AOS.init();
    // alert("안녕하세요. 은영환입니다.\n09월 중 전국대회와 10월 기사시험,\n중간고사 등 개인 일정을 마친 뒤\n11월부터 개발을 하도록 하겠습니다.\n기다려주셔서 감사합니다.")
})