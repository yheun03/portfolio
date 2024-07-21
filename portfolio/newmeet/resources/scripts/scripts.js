$(document).ready(function(){
    // NOTE: 홈 화면 광고배너
    $('.banner ul').slick({
        arrows: false,
        centerMode: true,
        centerPadding: '12px',
    })
    
    // NOTE: 레시피 등록 화면 추가 설명 Toggle
    $(".recipeInsertSteps .btn-wrap label").click(function(){
        $(this).toggleClass("active")
    })
})