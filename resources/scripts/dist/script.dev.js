"use strict";

$(document).ready(function () {
  // NOTE: .area-history 내부의 경력 자동 세팅
  // 최초개발일 : 20230525
  // 수  정  일 : 20230525
  var year = new Date().getFullYear(); // 년도

  var month = new Date().getMonth() + 1; // 월

  var oldDate = new Date('2020-06');
  var newDate = new Date(year + "-" + month);
  var diff = Math.abs((newDate.getFullYear() - oldDate.getFullYear()) * 12 + (newDate.getMonth() - oldDate.getMonth())) + 1;
  var diff_2 = diff + 13;
  year = parseInt(diff / 12);
  month = diff % 12;
  var year_2 = parseInt(diff_2 / 12);
  var month_2 = diff_2 % 12;
  var target = $(".career b span");

  if (month == 0) {
    target.html(year + "년차");
  } else {
    target.html(year + "년 " + month + "개월차");
  }

  if (month_2 == 0) {
    target.attr("title", "단순 입퇴사일 계산 : " + year_2 + "년차");
  } else {
    target.attr("title", "단순 입퇴사일 계산 : " + year_2 + "년 " + month_2 + "개월차");
  } // NOTE: .area-project 내부의 기능
  // 최초개발일 : 20230525
  // 수  정  일 : 20230528


  var project_list = $("[data-prjName]");

  for (var i = 0; i < project_list.length; i++) {
    $(".progress a:nth-child(" + i + ")").click(function () {
      $(".screen, .wrap-dscpt").children().children().show().siblings().hide();
    });
    console.log(project_list.get(i));
  }
});