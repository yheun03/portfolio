$(document).ready(function(){

    $('html, body').animate({
        scrollTop: 0
    }, 1);
    setTimeout(function () {
        $('#loading').remove();
        $('#loading').off('scroll touchmove mousewheel');
    }, 1000)

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

    var fileTarget = $('.ipt-select-file input[type=file]');
    fileTarget.on('change', function(){ // 값이 변경되면
        if(window.FileReader){ // modern browser
            var filename = $(this)[0].files[0].name;
        } else { // old IE
                var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
        } // 추출한 파일명 삽입
        $(this).siblings('.upload-name').text(filename);
    });
    var imgTarget = $('.preview-image input[type="file"]');
    imgTarget.on('change', function(){
        var parent = $(this).parent().find(".img-wrap");
        parent.children('.upload-display').remove();
        if(window.FileReader){ //image 파일만
            if (!$(this)[0].files[0].type.match(/image\//)) return;
            var reader = new FileReader();
            reader.onload = function(e){
                var src = e.target.result;
                parent.append('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"></div></div>');
            }
            reader.readAsDataURL($(this)[0].files[0]);
        } else { $(this)[0].select(); $(this)[0].blur();
            var imgSrc = document.selection.createRange().text;
            parent.append('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');
            var img = $(this).siblings('.upload-display').find('img');
            img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
        }
    });


    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this).parent().hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this).parent().removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }
    });

    $(".sidebar-control").click(function(){
        $(".sidebar-wrapper").toggleClass("toggled")
    })

    $(window).scroll(function () {
        var scrollValue = $(document).scrollTop();
        let section2Top = $(".section-2").offset().top;
        let opacityStart = 800
        let opacityEnd = 1300
        let pTitleOpacity = (scrollValue - opacityStart) / (opacityEnd - opacityStart)

        console.log(scrollValue);
        if(scrollValue >= section2Top){ // 만약 현재 스크롤 값이 .section-2의 시작값보다 크면
            $(".section-2").css({"background-attachment":"fixed", "background-position":"bottom"})

            $(".section-1 p.title").css({"opacity":pTitleOpacity})

        }else{$(".section-2").css({"background-attachment":"unset", "background-position":"top"})}
        if(scrollValue >= section2Top + ($(".section-2").height() - $("body").height())){
            $(".section-2").css({"background-attachment":"unset"})
            $(".section-1 p").css({"position":"absolute", "top":"calc("+ (section2Top + ($(".section-2").height() - $("body").height()) + 285) + "px)"})
            $(".section-1 p.title").css({"top":"unset", "bottom":"calc("+ (section2Top + ($(".section-2").height() - $("body").height()) + 285) + "px)"})
        }else{
            $(".section-1 p").css({"position":"fixed", "top":"unset"})
        }
    });

})