$(document).ready(function () {

    //----------메인페이지----------//

    //웰컴페이지 위로올려서 안보이게 만듦
    $("#welcome").click(function () {
      $(this).animate({"top":"-100%"},1000)
    });

    //서브페이지 셀렉터를 호버했을때 가로길이 증가 나머지는 축소
    var getWidth = $("body").width();
    if(getWidth > 825){
      var sub_page_opener = $("#sub_page_select_page > a");
      sub_page_opener.mouseover(function () {
        $(this).css({"width":"28%"}).siblings().css({"width":"24%"})
      });
      sub_page_opener.mouseleave(function () {
        sub_page_opener.css({"width":"25%"})
      });
      //서브페이지 셀렉터를 호버했을때 검은배경 출현
      var sub_page_opener_bg = $("#sub_page_select_page > div > div");
      sub_page_opener_bg.mouseover(function () {
        $(this).css({"opacity":"1"}).siblings().css({"opacity":0})
      });
      sub_page_opener_bg.mouseleave(function () {
        sub_page_opener_bg.css({"opacity":0})
      });
    }

    // 타이틀 이미지보다 스크롤이 내려갈 때 셀렉트메뉴는 position fixed 주는 코드
    $(window).scroll(function() {
      const sub_height = $(".main_img").height();
      const height = $(document).scrollTop();
      console.log("sub_height : "+sub_height);
      console.log("height : "+height);
      if (height > sub_height-50) {
          $(".main_img > div").css({"position":"fixed","top":0});
      }
      else{
          $(".main_img > div").css({"position":"absolute","top":sub_height-50});
      }
    });

// NOTE: 메뉴
//pc
    $(".main_img > div > div > div:nth-child(2)").click(function () {
      $(".main_img > div > div > div:nth-child(2)").css({"display":"none"});
      $(".main_img > div > div > div:nth-child(3)").css({"display":"block"});
      $(".main_img > div > div > ul").css({"height":"160px"})
    });
    $(".main_img > div > div > div:nth-child(3)").click(function () {
      $(".main_img > div > div > div:nth-child(2)").css({"display":"block"});
      $(".main_img > div > div > div:nth-child(3)").css({"display":"none"});
      $(".main_img > div > div > ul").css({"height":0})
    });
    $(".main_img > div > div > ul").mouseleave(function(){
      $(".main_img > div > div > div:nth-child(2)").css({"display":"block"});
      $(".main_img > div > div > div:nth-child(3)").css({"display":"none"});
      $(".main_img > div > div > ul").css({"height":0})
    })
//mobile
    $(".open_menu").click(function(){
      $(".open_menu").css({"display":"none"});
      $(".close_menu").css({"display":"block"});
      $(".menu_wrap").animate({"left":"150px"},500);
      $(".menu_wrap").css({"background":"rgba(0,0,0,0.5)"});
      $(".menu_wrap").css({"padding-right":"100%"});
    })
    $(".close_menu").click(function(){
      $(".open_menu").css({"display":"block"});
      $(".close_menu").css({"display":"none"});
      $(".menu_wrap").animate({"left":0},200);
      setTimeout(function(){
        $(".menu_wrap").css({"padding":0});
      },100)
    })
});
