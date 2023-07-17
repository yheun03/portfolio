"use strict";

$(document).ready(function () {
  var controller = new ScrollMagic.Controller();
  var header__mail__rotate = TweenMax.to('.email', 0.5, {
    alpha: 1,
    rotation: 90,
    x: 100,
    y: 60
  });
  var header__mail__original = TweenMax.to('.email', 0.5, {
    rotation: 0,
    x: 0,
    y: 0
  });
  var scene = new ScrollMagic.Scene({
    triggerElement: ".area-intro",
    duration: "25%",
    triggerHook: 0
  }).setTween(header__mail__rotate).addTo(controller);
  var scene = new ScrollMagic.Scene({
    triggerElement: ".area-projects",
    duration: "5%",
    triggerHook: 0
  }).setTween(header__mail__original).addTo(controller);
});