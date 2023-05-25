"use strict";

$(document).ready(function () {
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
  }
});