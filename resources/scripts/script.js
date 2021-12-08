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
        $(".sidebar-control").toggleClass("active")
        if($(this).hasClass("active")){
            $(".page-wrapper").addClass("toggled");
        }else{
            $(".page-wrapper").removeClass("toggled");
        }
      })

      // MODAL
    $('.datepricker_t01').datepicker({
        onSelect: function (selectedDate) {
            $('#datepickerValue').html(selectedDate);
        },
        minDate: 0
    });
    
    // 일반적인 팝업 호출
    $("body").on("click", ".openModal", function(){
        $(".modal-wrap").hide()
        modal($(this))
    })
    // NOTE: [영환] 1019 모달 닫기
    $(".modal").on("click", ".modal-close", function(){
        if($(".modal-wrap[data-show='1']").length == 1) {
            $(".modal").hide()
            scrollAble()
        }
        $(this).closest($(".modal-wrap")).attr("data-show", "0")
        $(this).closest($(".modal-wrap")).hide()
    })
    // NOTE: [영환] 1019 select 2 모달에서 modal_selectList의 아이템을 클릭할 때 scrollX에 해당 값이 들어간 .deleteItem를 추가함
    $(".modal").on("click", ".modal-select_t02 .modal_selectList li", function(){
        $(".modal-select_t02 .scrollX ul").append("<li class='deleteItem' data-ismodfy='1'><span class='excpt'>"+$(this).find(".excpt").text()+"<span class='deleteItem-icon'><svg style='width: 0.5rem; height: 0.5rem' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 6.75L7 0.75' stroke='#222222'/><path d='M7 6.75L1 0.75' stroke='#222222'/></svg></span></li>")
    })
    // NOTE: [영환] 1019 select 2 모달에서 deleteItem을 클릭할 때 해당 deleteItem을 지움
    $(".modal").on("click", ".modal-select_t02 .deleteItem", function(){
        if($(".modal-select_t02 .deleteItem").length == 1){
            return false
        }
        $(this).closest("li").remove()
    })

    // NOTE: [영환] 1019 select 3 모달에서 modal_selectList의 아이템을 클릭할 때 scrollX에 해당 값이 들어간 .deleteItem를 추가함
    
    
    
    $(".openModal[data-modal='select_t03']").click(function(){
        let deleteItemLength = $(this).data("col");
        $('.modal-select_t03 .cntryCWrap li').remove()
        for(let deleteItemLengthCnt = 1; deleteItemLengthCnt <= deleteItemLength; deleteItemLengthCnt++){
            $(".modal-select_t03 .cntryCWrap ul").append("<li class='deleteItem' data-ismodfy='0'><span class='excpt'></span></li>")
            $('.modal-select_t03 .cntryCWrap li').first().addClass("focus")
        }
        $(".modal").on("click", ".modal-select_t03 .modal_selectList li", function(){
            if($(".modal-select_t03 *[data-ismodfy='1']").length < deleteItemLength){
                $('.modal-select_t03 *[data-ismodfy="1"]').find(".deleteItem-icon").remove() //추가되면 추가 된 li 바로 직전 li의 삭제 아이콘 지우기
                $('.modal-select_t03 *[data-ismodfy="0"]').remove()
                $(".modal-select_t03 .cntryCWrap ul").append("<li class='deleteItem' data-ismodfy='1'><span class='excpt'>"+$(this).find(".excpt").text()+"</span><span class='deleteItem-icon'><svg style='width: 0.5rem; height: 0.5rem' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 6.75L7 0.75' stroke='#222222'/><path d='M7 6.75L1 0.75' stroke='#222222'/></svg></span></li>")
            }
            for(let i = $(".modal-select_t03 *[data-ismodfy='1']").length; i < deleteItemLength; i++){
                $(".modal-select_t03 .cntryCWrap ul").append("<li class='deleteItem' data-ismodfy='0'><span class='excpt'></span></li>")
            }
            $('.modal-select_t03 *[data-ismodfy="0"]').first().addClass("focus")
        })
    })

    // NOTE: [영환] 1019 select 3 모달에서 deleteItem을 클릭할 때 해당 deleteItem을 지움
    $(".modal").on("click", ".modal-select_t03 .deleteItem", function(){
        if($(this).text() == "" || !$(this).find("span").is(".deleteItem-icon")) return false
        if($(".modal-select_t03 .deleteItem").length <= 7){
            $(this).parent().last().append("<li class='deleteItem' data-ismodfy='0'><span class='excpt'></span></li>")
        }
        $(this).remove()
        $('.modal-select_t03 *[data-ismodfy="1"]').last().append("<span class='deleteItem-icon'><svg style='width: 0.5rem; height: 0.5rem' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 6.75L7 0.75' stroke='#222222'/><path d='M7 6.75L1 0.75' stroke='#222222'/></svg></span>")
        $('.modal-select_t03 *[data-ismodfy="0"]').first().addClass("focus")
    })
    
    // // NOTE: [영환] 1019 select 3 모달에서 modal_selectList의 아이템을 클릭할 때 scrollX에 해당 값이 들어간 .deleteItem를 추가함
    // $(".modal").on("click", ".modal-select_t03 .modal_selectList li", function(){
    //     $('.modal-select_t03 *[data-ismodfy="0"').remove()
    //     $(".modal-select_t03 .scrollX ul").append("<li class='deleteItem' data-ismodfy='1'><span class='excpt'>"+$(this).find(".excpt").text()+"<span class='deleteItem-icon'><svg style='width: 0.5rem; height: 0.5rem' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 6.75L7 0.75' stroke='#222222'/><path d='M7 6.75L1 0.75' stroke='#222222'/></svg></span></li>")
    //     for(let i = $(".modal-select_t03 *[data-ismodfy='1'").length; i < 7; i++){
    //         $(".modal-select_t03 .scrollX ul").append("<li class='deleteItem' data-ismodfy='0'><span class='excpt'></span></li>")
    //     }
    // })
    // // NOTE: [영환] 1019 select 3 모달에서 deleteItem을 클릭할 때 해당 deleteItem을 지움
    // $(".modal").on("click", ".modal-select_t03 .deleteItem", function(){
    //     if($(this).text() == "") return false
    //     if($(".modal-select_t03 .deleteItem").length <= 7){
    //         $(this).parent().last().append("<li class='deleteItem' data-ismodfy='0'><span class='excpt'></span></li>")
    //     }
    //     $(this).remove()
    // })
    // NOTE: [영환] 1019 number 2 모달에서 상자입력 방식 변경
    $(".modal").on("click", ".switchBoxScoreCol", function(){
        $(this).addClass("active").siblings().removeClass("active")
        if($(this).data("ismodify") == "1"){
            $(".boxWrap").show()
            $(".scoreWrap").hide()
        }else{
            $(".boxWrap").hide()
            $(".scoreWrap").show()
        }
    })
    // NOTE: [영환] 1025 input 2 모달에서 검색 시 높이 변경
    $(".modal").on("click", ".modal-input_t02 .btn.ftr", function(){
        // $(".modal-input_t02").css({"min-height":"80vh"})
        $(".modal-input_t02 .hide").show()
    })
    
    // webView에서 maxlength 적용 안되는 경우 있어서 추가
    $(".ipt").on("input", function() {
    	var maxLen = $(this).attr("maxlength");
    	if(!isEmpty(maxLen) && $(this).val().length > maxLen) $(this).val($(this).val().slice(0, maxLen));
    });
    
    // 모달팝업 인풋필드에서 엔터키 이벤트 > 팝업 버튼 클릭
    $(".enterPopBtnClk").on("keypress", function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code && (code == 13)) {
			$(this).parents(".modal-content-wrap").find(".modal-btn-wrap").find(".btn").trigger("click");
		}
	});

    // datepicker 한국어 세팅
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

    $(window).bind("pageshow", function (event) {
        if (event.originalEvent.persisted) { // 뒤로가기 시 submit하면서 show 처리했던 로딩중 숨기기
            $(".ldxWrap").hide();
        }
    });

    // 본문 스크롤 막기
    function scrollDisable(){
        $('body').addClass('scr_hidden').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
        });
    }
    // 본문 스크롤 가능
    function scrollAble(){
        $('body').removeClass('scr_hidden').off('scroll touchmove mousewheel');
    }

    let seq = 0;
    function modal(modalType){
        scrollDisable()
        $(".modal-"+modalType.attr("data-modal")).closest($(".modal-wrap")).css("z-index", seq++)
        // $(".modal-"+modalType.data("modal")).closest($(".modal-wrap")).attr("data-sqnc", "1")
        $(".modal").show()
        $(".modal-"+modalType.attr("data-modal")).closest($(".modal-wrap")).attr("data-show", "1")
        $(".modal-"+modalType.attr("data-modal")).closest($(".modal-wrap")).show()
        $(".modal-"+modalType.attr("data-modal")+" .modal-content .dscpt").html(modalType.attr("data-script"))
        $(".modal-"+modalType.attr("data-modal")+" .modal-header .dscpt").html(modalType.attr("data-title"))
        $(".modal-"+modalType.attr("data-modal")+".modal_t02 .dscpt").html(modalType.attr("data-script"))

        if(modalType.attr("data-next-modal") != undefined){
            $(".modal-btn-wrap .btn").addClass("openModal").attr("data-modal", modalType.attr("data-next-modal"))
        }

        $(".modal-"+modalType.attr("data-modal")).find("input").first().focus()
    }

    function modalByNm(modalNm){
        scrollDisable()
        $(".modal-"+modalNm).closest($(".modal-wrap")).css("z-index", seq++)
        $(".modal").show()
        $(".modal-"+modalNm).closest($(".modal-wrap")).attr("data-show", "1")
        $(".modal-"+modalNm).closest($(".modal-wrap")).show()
        $(".modal-"+modalNm).find("input").focus()
    }

    function closeModal(){
        if($(".modal-wrap[data-show='1']").length == 1) {
            $(".modal").hide();
            scrollAble();
        }
        $(".modal-wrap").attr("data-show", "0");
        $(".modal-wrap").hide();
    }
})