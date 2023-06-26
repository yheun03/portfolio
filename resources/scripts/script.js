$(document).ready(()=>{
    // NOTE: .area-history 내부의 경력 자동 세팅
    // 최초개발일 : 20230525
    // 수  정  일 : 20230530
    let year = new Date().getFullYear(); // 년도
    let month = new Date().getMonth() + 1  // 월
    const oldDate = new Date('2020-06');
    const newDate = new Date(year +"-"+ month);
    let diff = Math.abs((newDate.getFullYear() - oldDate.getFullYear())*12 + (newDate.getMonth() - oldDate.getMonth())) + 1;
    let diff_2 = diff + 13
    year = parseInt(diff/12);
    month = diff%12;
    let year_2 = parseInt(diff_2/12);
    let month_2 = diff_2%12;
    let target = $("[data-hstryFg='career'] b span")
    if(month == 0){
        target.html(year+"년차")
    }else{
        target.html(year+"년 " + month+"개월차")
    }
    if(month_2 == 0){
        target.attr("title", "단순 입퇴사일 계산 : "+year_2+"년차")
    }else{
        target.attr("title", "단순 입퇴사일 계산 : "+year_2+"년 "+month_2+"개월차")
    }

    // NOTE: .area-project 내부의 기능
    // 최초개발일 : 20230525
    // 수  정  일 : 20230627
    $(".slick").slick({
        dots: true,
        customPaging : function(slider, i) {
            return $(".slick-slide:nth-child("+ (i + 2) +") p b").text();
        },
        prevArrow: $('.nav.prev'),
        nextArrow: $('.nav.next')
    })

    var dom = $(".nav");
    dom.detach();
    $(".slick").prepend(dom)
    $(".slick-list").before($(".nav"))
    $(".prev").before($(".slick-dots"))
    
    $("a[href='#']").click(()=>{
        return false;
    })

    // alert("모바일 반응형과 애니메이션, 기능은 개발 중입니다.\n기다려 주셔서 감사합니다.")


})