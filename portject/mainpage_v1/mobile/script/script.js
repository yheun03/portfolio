$(document).ready(function () {
    // NOTE : 랜덤 별
    var min = 5;
    var max = 15;
    var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
    for (var j = 1; j <= RandVal; j++) {
        $("#header").append("<span class='star'></span>");
        for (var i = 1; i <= RandVal + 2; i++) {
            w_max = $("body").width();
            h_max = $("#header > div").offset().top
            var w = Math.floor(Math.random() * (w_max - 10 + 1)) + 10;
            var h = Math.floor(Math.random() * (h_max - 10 + 1)) + 10;
            $(".star:nth-child(" + i + ")").css({
                "top": h,
                "left": w
            });
            $(".star:nth-child(1) , .star:nth-child(8) , .star:nth-child(9) , .star:nth-child(10)").css({
                "opacity": "0.25"
            });
            $(".star:nth-child(2) , .star:nth-child(4) , .star:nth-child(5) , .star:nth-child(6)").css({
                "opacity": "0.5"
            });
            $(".star:nth-child(3) , .star:nth-child(11) , .star:nth-child(13) , .star:nth-child(15)").css({
                "opacity": "0.75"
            });
        }
    }
    // setInterval(function () {
    //     for (var i = 1; i <= RandVal + 2; i++) {
    //         var w = Math.floor(Math.random() * (w_max - 10 + 1)) + 10;
    //         var h = Math.floor(Math.random() * (h_max - 10 + 1)) + 10;
    //         $(".star:nth-child(" + i + ")").animate({
    //             "top": h,
    //             "left": w
    //         }, 30000, "linear");
    //     }
    // }, 1000);

    // NOTE : PORTFOLIO의 메뉴바
    $("#open_menu").click(function () {
        if ($(this).is(":animated")) return false;
        $(".menu > span").animate({
            "top": "50%"
        }, 100);
        setTimeout(function () {
            $(".menu > span:nth-child(1)").animate({
                deg: 40
            }, {
                duration: 100,
                step: function (now) {
                    $(this).css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
            $(".menu > span:nth-child(2)").animate({
                deg: -40
            }, {
                duration: 100,
                step: function (now) {
                    $(this).css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                }
            });
            $(".menu > span:nth-child(3)").css({
                "display": "none"
            });
            $("#open_menu").css({
                "display": "none"
            })
            $("#close_menu").css({
                "display": "block"
            })
        }, 100)
    })
    $("#close_menu").click(function () {
        if ($(this).is(":animated")) return false;
        $(".menu > span").animate({
            deg: 0
        }, {
            duration: 100,
            step: function (now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });
        setTimeout(function () {
            $(".menu > span:nth-child(3)").css({
                "display": "block"
            });
            $(".menu > span:nth-child(1)").animate({
                "top": "40%"
            })
            $(".menu > span:nth-child(3)").animate({
                "top": "60%"
            })
            $("#open_menu").css({
                "display": "block"
            })
            $("#close_menu").css({
                "display": "none"
            })
        }, 100)
    })

    // NOTE : 드레그 방지
    $(document).on("contextmenu dragstart selectstart", function (e) {
        return false;
    });

    // NOTE : NAV클릭 시 section의 마지막 위치로 자동 스크롤
    const pos = $("#infor_wrap_4").offset().top;
    $("#nav").click(function () {
        $('section').animate({
            scrollTop: pos
        }, 500);

    });

    var b_width = $("body").width();
    if(b_width > 880){
        window.location.replace("../")
    }
    $(window).resize(function() {
        var b_width = $("body").width();
        console.log(b_width)
        if(b_width > 880){
            window.location.replace("../")
        }
    });


    // var con = confirm("진짜로 보내시겠습니까?");
    // if(con === true){
    //     var con2 = confirm(' "확인"버튼을 누르시면 개인정보처리방침에 동의하시는 것으로 간주합니다. ');
    //     if(con2 === true){
    //         alert("보냈습니다.")
    //     }else{
    //         alert("뭐야")
    //     }
    // }else{
    //     return 0;
    // }
})