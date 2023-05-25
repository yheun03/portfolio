$("document").ready(function(){
    var pos = 0;
    var len = $(".section").length-1;
    function sc_mo(){
        $("#fullpage").animate({"top":-pos*100+"%"},500);
        $("#scroll_bar").animate({"top":pos * 75+"px"},500);
        if(pos === 0){
            $("#header > h1 > span").html("")
        }else if(pos === 1){
            $("#header > h1 > span").html("PORTFOLIO")
        }else if(pos === 2){
            $("#header > h1 > span").html("COMMUNITY")
        }else if(pos === 3){
            $("#header > h1 > span").html("MARKET")
        }
    }
    for (let i = 0; i <= $("#nav > div > span").length; i++) {
        $("#nav > div > span:nth-child(" + i + ") > img").click(function(){
            pos = i - 1;
            sc_mo();
        })
    }
    $("#header img").click(function(){
        pos = 0;
        sc_mo();
    });
//note : 핵심 소스
    $(document).on("scroll touchmove mousewheel",function(e){
        if( $("#fullpage").is(":animated") ) return false; //note : 스크롤을 막는 코드 -아래-
        var y = e.originalEvent.deltaY;
        if(pos == -1){
            pos++;
        }else{
            if( y > 0 && pos < len  ) pos++;
            else if( y < 0 && pos > 0) pos--;
        }
        sc_mo();
    })

    $(".m_select").click(function(){
        $(this).addClass("m_Yselect").removeClass("m_Nselect").siblings().removeClass("m_Yselect").addClass("m_Nselect")
    });
    
    for (let i = 1; i <= $("div#pos3.section .m_select").length; i++) {
        $("div#pos3.section .m_select:nth-child(" + i + ")").click(function(){
            $(".chatting:nth-child(" + i + ")").css({"display":"block"}).siblings().css({"display":"none"})
        })
    }
    for (let i = 1; i <= $("div#pos4.section .m_select").length; i++) {
        $("div#pos4.section .m_select:nth-child(" + i + ")").click(function(){
            $(".market_area:nth-child(" + i + ")").css({"display":"block"}).siblings().css({"display":"none"})
        })
    }
})


