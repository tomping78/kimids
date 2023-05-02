/* *******************************************************
 * filename : nav.js
 * description :
 ******************************************************** */

var $snb = $(".snb");
var $snbMenu = $(".cm-top-menu");
// PC
var $gnb = $("#gnb");
var $gnbList = $gnb.children("ul");
var $gnbItem = $gnbList.children("li");
var $gnb_dep2 = $gnbItem.children(".gnb-2dep");
var $gnbBg = $(".gnb-overlay-bg");

var $menuBtn = $("#header .nav-open-btn");
var $gnbM = $("#gnbM");
var $gnbMList = $gnbM.find("#navigation");
var $gnbMBg = $(".gnb-overlay-bg-m");
var menuState = false;

$(document).ready(function () {
  // PC 2depth init
  if ($gnb.is(".total-menu")) {
    openTotalMenu();
  } else if ($gnb.is(".each-menu")) {
    openEachMenu();
  }

  if ($gnbMList.data("menu-clone")) {
    cloneMenu();
  }

  $gnb_dep2.hover(
    function () {
      $(this).parent("li").addClass("on");
    },
    function () {
      $gnbItem.removeClass("on");
    }
  );

  // Mobile Menu
  if ($.exists("#gnbM")) {
    toggleNavButton();
    calcMenuHeight();
    toggleDepth2Menu();
    addClassFullMenu();
    toggleDepth3Menu();
  }

  if ($.exists(".sub-prev-page-btn") || $.exists(".sub-next-page-btn")) {
    checkPrevNextLink();
  }
  activeMenuIdx();
});

$(window).resize(function () {
  if (menuState) {
    if (getWindowWidth() > tabletWidth) {
      $("body").css({ height: "auto", overflow: "auto" });
    }
  }
  if ($.exists("#gnbM")) {
    calcMenuHeight();
  }
});

/* *********************** PC NAV ************************ */

function cloneMenu() {
  $gnbMList.html($gnbList.html());
}

function openTotalMenu() {
  $gnbItem.children("a").on("mouseenter focus", function () {
    $gnbItem.removeClass("on");
    $("#header").addClass("gnb-open");
    $(this).parent("li").addClass("on");
    if (!$gnb.is(".open")) {
      $gnb.addClass("open");
      $gnbBg.addClass("open");
    }
  });
  $gnbList.on("mouseleave", gnb_return);
  $gnbList.find("a").last().on("focusout", gnb_return);
  function gnb_return() {
    $("#header").removeClass("gnb-open");
    $gnb.removeClass("open");
    $gnbItem.removeClass("on");
    $gnbBg.removeClass("open");
    if (dep1 > 0 && dep2) {
      $gnbItem.eq(dep1 - 1).addClass("on");
    }
  }
}

function openEachMenu() {
  $gnbItem.children("a").on("mouseenter focus", function () {
    $gnbItem.removeClass("on").children(".gnb-2dep").removeClass("open");
    $(this)
      .parent("li")
      .addClass("on")
      .children(".gnb-2dep")
      .stop()
      .addClass("open");
  });

  $gnbItem.on("mouseleave", gnb_return);
  $gnbItem.find("a").last().on("focusout", gnb_return);

  function gnb_return() {
    $gnbItem.removeClass("on").children(".gnb-2dep").removeClass("open");
    if (dep1 > 0 && dep2) {
      $gnbItem.eq(dep1 - 1).addClass("on");
    }
  }
}

/* *********************** MOBILE NAV ************************ */
// gnbM Nav Button Click
function toggleNavButton() {
  $menuBtn.click(function () {
    if (menuState) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
    return false;
  });
  $gnbMBg.click(function () {
    closeMobileMenu();
  });
}

function openMobileMenu() {
  menuState = true;
  $menuBtn.addClass("active");
  $gnbM.addClass("open");
  $gnbMBg.fadeIn();
  $("body").css({ height: $(window).height(), overflow: "hidden" });
  if (dep1 > 0 && dep2 > 0) {
    $gnbMList
      .children("li")
      .eq(dep1 - 1)
      .addClass("active")
      .find(".gnb-2dep")
      .show()
      .find("li")
      .eq(dep2 - 1)
      .addClass("on");
  }
  if (dep3 > 0) {
    $gnbMList
      .children("li")
      .eq(dep1 - 1)
      .addClass("active")
      .find(".gnb-2dep")
      .show()
      .find("li")
      .eq(dep2 - 1)
      .addClass("on")
      .children(".gnb-3dep")
      .show()
      .children("li")
      .eq(dep3 - 1)
      .addClass("on");
  }
}

function closeMobileMenu() {
  menuState = false;
  $menuBtn.removeClass("active");
  $gnbM.removeClass("open");
  $gnbMBg.hide();
  $("body").css({ height: "auto", overflow: "auto" });
  if (dep1 > 0 && dep2 > 0) {
    $gnbMList.children("li").removeClass("active").find(".gnb-2dep").hide();
  }
}

function toggleDepth2Menu() {
  $gnbMList.children("li:has('.gnb-2dep')").addClass("has-2dep");
  $gnbMList
    .children("li:has('.gnb-2dep')")
    .children("a")
    .click(function (event) {
      if ($(this).parent("li").hasClass("active")) {
        $(this).parent("li").removeClass("active");
        $(this).children(".open-icon").hide();
        $(this).children(".close-icon").show();
        $(this).find(".gnb-3dep").slideUp(400);
      } else {
        $gnbMList.children("li:has('.gnb-2dep')").each(function () {
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find(".open-icon").hide();
            $(this).find(".close-icon").show();
            $(this).children(".gnb-2dep").slideUp(400);
            $(this).find(".gnb-3dep").slideUp(400);
          }
        });
        $(this).parent("li").addClass("active");
        $(this).children(".close-icon").hide();
        $(this).children(".open-icon").show();
        $(this).siblings(".gnb-2dep").slideDown(400);
        $(this).find(".gnb-3dep").slideDown(400);
      }
      return false;
    });
}

function toggleDepth3Menu() {
  $("#navigation .gnb-2dep .has-3dep").click(function (event) {
    if ($(this).parent("li").hasClass("on")) {
      $(this).parent("li").removeClass("on");
      $(this).siblings(".gnb-3dep").slideUp(400);
      $(this).find(".gnb-3dep").slideUp(400);
    } else {
      $gnbMList.find("li:has('.gnb-3dep')").each(function () {
        if ($(this).hasClass("on")) {
          $(this).removeClass("on");
          $(this).children(".gnb-3dep").slideUp(400);
          $(this).find(".gnb-3dep").slideUp(400);
        }
      });
      $(this).parent("li").addClass("on");
      $(this).siblings(".gnb-3dep").slideDown(400);
      $(this).find(".gnb-3dep").slideDown(400);
    }
    return false;
  });
}

function calcMenuHeight() {
  if ($.exists(".header-util-menu-box") && !$.exists(".gnb-style-full")) {
    $(".gnb-navigation-wrapper").height(
      getWindowHeight() - $(".header-util-menu-box").height()
    );
  }
}

function addClassFullMenu() {
  if ($.exists(".gnb-style-full") && $.exists(".member-menu-box")) {
    $(".gnb-style-full").addClass("gnb-style-full-member");
  }
}

/* *********************** Sub ************************ */

function checkPrevNextLink() {
  var $sub_prev_page_btn = $(".sub-prev-page-btn");
  var $sub_next_page_btn = $(".sub-next-page-btn");
  var dep1_menu_lang = $gnbItem.length;

  $sub_prev_page_btn
    .attr(
      "href",
      $gnbItem
        .eq(dep1 - 2)
        .children("a")
        .attr("href")
    )
    .find(".sub-page-name")
    .text(
      $gnbItem
        .eq(dep1 - 2)
        .children("a")
        .text()
    );
  $sub_next_page_btn
    .attr("href", $gnbItem.eq(dep1).children("a").attr("href"))
    .find(".sub-page-name")
    .text($gnbItem.eq(dep1).children("a").text());

  if (dep1 == dep1_menu_lang) {
    $sub_next_page_btn.attr("href", $gnbItem.eq(0).children("a").attr("href"));
    $sub_next_page_btn
      .find(".sub-page-name")
      .text($gnbItem.eq(0).children("a").text());
  } else if (dep1 == 1) {
    $sub_prev_page_btn.attr(
      "href",
      $gnbItem
        .eq(dep1_menu_lang - 1)
        .children("a")
        .attr("href")
    );
    $sub_prev_page_btn.find(".sub-page-name").text(
      $gnbItem
        .eq(dep1_menu_lang - 1)
        .children("a")
        .text()
    );
  }
}

function activeMenuIdx() {
  if (dep1 > 0 && dep2 > 0) {
    $gnbItem.eq(dep1 - 1).addClass("on");
    $gnbMList.eq(dep1 - 1).addClass("on");
    $snb.each(function () {
      $(this)
        .children("li")
        .eq(dep2 - 1)
        .addClass("on");
    });
    $snbMenu.find(".menu-location").each(function () {
      // 2depth ON
      if ($(this).is(".location1")) {
        $(this)
          .find(".location-menu-con")
          .children("li")
          .eq(dep1 - 1)
          .addClass("on");
      } else if ($(this).is(".location2")) {
        $(this)
          .find(".location-menu-con")
          .children("li")
          .eq(dep2 - 1)
          .addClass("on");
      } else if ($(this).is(".location3")) {
        $(this)
          .find(".location-menu-con")
          .children("li")
          .eq(dep3 - 1)
          .addClass("on");
      }
    });
  }
}
