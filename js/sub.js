/* *******************************************************
 * filename : sub.js
 ******************************************************** */

$(document).ready(function () {
  setTimeout(function () {
    addClassName($("#visual"), "active");
  }, 200);

  if ($.exists(".popup-gallery")) {
    magnificPopup($(".popup-gallery"));
  }

  /* Scrollbar object  */
  $(".custom-scrollbar-wrapper").each(function () {
    if ($("html").attr("lang") == "ko") {
      var dragTxt = "왼쪽이나 오른쪽으로 드래그 하세요.";
    } else {
      var dragTxt = "Drag left and right.";
    }
    $(this).append(
      "<div class='custom-scrollbar-cover'><div class='scroll-cover-txt'><i class='xi-touch'></i><p>" +
        dragTxt +
        "</p></div></div>"
    );
    var $scrollObject = $(this).find(".scroll-object-box");
    if ($.exists($scrollObject)) {
      customScrollX($scrollObject);
    }
    $(this).on("touchmove click", function () {
      $(this).find(".custom-scrollbar-cover").fadeOut(200);
    });
  });

  if ($.exists(".fixed-sub-menu")) {
    var $fixedSubMenu = $(".fixed-sub-menu");
    var topMenuStart = checkOffset($fixedSubMenu);
    $(window).resize(function () {
      if (getWindowWidth() > tabletWidth) {
        topMenuStart = checkOffset($fixedSubMenu);
      } else {
        $fixedSubMenu.removeClass("top-fixed");
      }
    });
    window.addEventListener(
      "scroll",
      toFit(function () {
        if (getWindowWidth() > tabletWidth) {
          objectFixed($fixedSubMenu, topMenuStart, "top-fixed");
        } else {
          $fixedSubMenu.removeClass("top-fixed");
        }
      }, {}),
      { passive: true }
    );
  }

  if ($.exists(".cm-fixed-tab-container-JS")) {
    var $fixedMoveTab = $(".cm-fixed-tab-list-JS");
    var $moveTabItem = $fixedMoveTab.find("li");
    var menuCount = $moveTabItem.size();
    var nav = [];

    $(window).on("load", function () {
      checkStartOffset();
      nav = checkTopOffset();

      if (getScrollTop() > checkStartOffset()) {
        $fixedMoveTab.addClass("top-fixed");
      } else if (getScrollTop() < checkStartOffset() + $fixedMoveTab.height()) {
        $fixedMoveTab.removeClass("top-fixed");
      }

      $moveTabItem.each(function (idx) {
        var eachOffset = nav[idx] - checkFixedHeight();
        if (getScrollTop() >= eachOffset) {
          $moveTabItem.removeClass("selected");
          $moveTabItem.eq(idx).addClass("selected");

          if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
            $fixedMoveTab
              .find(".cm-drop-open-btn-JS > span")
              .text($moveTabItem.eq(idx).find("em").text());
          }
        }
      });
    });
    $(window).on("resize", function () {
      checkStartOffset();
      nav = checkTopOffset();
    });

    function checkStartOffset() {
      var fixedStartPoint =
        $(".cm-fixed-tab-container-JS").offset().top - checkFixedHeight();
      return fixedStartPoint;
    }

    function checkTopOffset() {
      var arr = [];
      for (var i = 0; i < menuCount; i++) {
        arr[i] = $($moveTabItem.eq(i).children("a").attr("href")).offset().top;
      }
      return arr;
    }

    function checkFixedObjectHeight() {
      var fixedObjectTotalHeight = 0;
      for (var i = 0; i < $(".top-fixed-object").length; i++) {
        var fixedObjectTotalHeight =
          fixedObjectTotalHeight + $(".top-fixed-object").eq(i).outerHeight();
      }
      return fixedObjectTotalHeight;
    }

    window.addEventListener(
      "scroll",
      toFit(function () {
        // objectFixed($fixedMoveTab, checkStartOffset(), "top-fixed");

        if (getScrollTop() > checkStartOffset()) {
          $fixedMoveTab.addClass("top-fixed");
        } else if (
          getScrollTop() <
          checkStartOffset() + $fixedMoveTab.height()
        ) {
          $fixedMoveTab.removeClass("top-fixed");
        }

        $moveTabItem.each(function (idx) {
          var eachOffset = nav[idx] - checkFixedHeight();
          if (getScrollTop() >= eachOffset) {
            $moveTabItem.removeClass("selected");
            $moveTabItem.eq(idx).addClass("selected");

            if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
              $fixedMoveTab
                .find(".cm-drop-open-btn-JS > span")
                .text($moveTabItem.eq(idx).find("em").text());
            }
          }
        });
      }, {}),
      { passive: true }
    );

    $moveTabItem.find("a").click(function () {
      var goDivOffset =
        $($(this).attr("href")).offset().top - checkFixedHeight() + 1;
      if (getScrollTop() < checkStartOffset()) {
        if (getScrollTop() == 0) {
          var goDiv = goDivOffset - checkFixedObjectHeight();
        } else {
          var goDiv = goDivOffset - $fixedMoveTab.height();
        }
      } else {
        var goDiv = goDivOffset;
      }
      setTimeout(function () {
        moveScrollTop(goDiv);
      });

      if ($.exists($(this).parents(".cm-drop-menu-box-JS"))) {
        if (getWindowWidth() < $fixedMoveTab.data("drop-width") + 1) {
          $fixedMoveTab.find("ul").slideUp();
        }
      }

      return false;
    });
  }

  if ($.exists(".cm-tab-fixed-con")) {
    var $fixedMoveTab = $(".cm-fixed-tab");

    $(window).on("load", function () {
      checkStartOffset();
    });
    $(window).on("resize", function () {
      checkStartOffset();
    });

    function checkStartOffset() {
      var fixedStartPoint =
        $(".cm-tab-fixed-con").offset().top - checkFixedHeight();
      return fixedStartPoint;
    }

    window.addEventListener(
      "scroll",
      toFit(function () {
        if (getScrollTop() > checkStartOffset()) {
          $fixedMoveTab.addClass("top-fixed");
        } else if (
          getScrollTop() <
          checkStartOffset() + $fixedMoveTab.height()
        ) {
          $fixedMoveTab.removeClass("top-fixed");
        }
      }, {}),
      { passive: true }
    );
  }

  if ($.exists(".editor")) {
    $(".editor table").each(function () {
      $(this).wrap("<div class='editor-table-box'></div>");
    });

    $(".editor iframe").each(function () {
      var iframeSrc = $(this).attr("src");
      var findStr = "https://www.youtube.com/embed";

      if (iframeSrc.indexOf(findStr) != -1) {
        $(this).wrap("<div class='editor-iframe-box'></div>");
      }
    });
  }

  if ($.exists(".full-height")) {
    mainVisualHeight();
    $(window).on("resize", mainVisualHeight);

    function mainVisualHeight() {
      var visual_height = getWindowHeight();
      if (getWindowWidth() > 1220) {
        $(".full-height").height(visual_height);
      } else {
        $(".full-height").css("height", "auto");
      }
    }
  }
  if ($.exists(".parallax-fixed-container")) {
    var $scrollFixedWrapper = $(".parallax-fixed-wrapper");
    parallaxStart = checkOffset($scrollFixedWrapper);
    $(window).resize(function () {
      parallaxStart = checkOffset($scrollFixedWrapper);
    });
    window.addEventListener(
      "scroll",
      toFit(function () {
        objectFixed($scrollFixedWrapper, parallaxStart, "parallax-fixed");
      }, {}),
      { passive: true }
    );
  }

  $(".prd-big-img").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".prd-sub-img",
  });
  $(".prd-sub-img").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".prd-big-img",
    dots: false,
    arrows: false,
    focusOnSelect: true,
  });
});

$(window).load(function () {
  $(".scroll-active").each(function () {
    var top_object = $(this).offset().top;
    var top_window = $(window).scrollTop();

    if (top_window > top_object - 200) {
      $(this).addClass("on");
    }
  });
});
$(window).scroll(function () {
  $(".scroll-active").each(function () {
    var top_object = $(this).offset().top;
    var top_window = $(window).scrollTop();

    if (top_window > top_object - 200) {
      $(this).addClass("on");
    }
  });
});

/* *********************** parallax scroll ************************ */
$(window).load(function (e) {
  if ($(".parallax-container").length == 0) {
    smoothScroll();
  }
  var isParallaxScroll = false;
  var $contentSelector = $(".parallax-container");
  var wheel_move;
  var visual_num = $contentSelector.length;
  var reactiveHeight = 0;
  var parallaxStartPoint = $("#visual").height();

  var windowHeightCheck = function () {
    return $(window).scrollTop();
  };

  var scrollStop = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  $contentSelector.mousewheel(function (event) {
    var $curContent = $(this);
    if (getWindowWidth() > 1220) {
      smoothScroll_destory();
      scrolling($(this), event.deltaY);
    } else {
      $contentSelector.off("mousewheel");
    }

    event.preventDefault();
  });

  $("#visual").mousewheel(function (event) {
    if (getWindowWidth() > 1220) {
      if (event.deltaY < 0) {
        if (visual_num > 1) {
          $("#fieldContent1").addClass("on");
          moveScrollContent($("#visual").height(), 0.8, false);
          smoothScroll_destory();
        }
      } else {
        moveScrollContent(0, 0.8, true);
      }
    }
    event.preventDefault();
  });

  function moveScrollContent(top, duration, scrollState) {
    if (scrollState) {
      smoothScroll();
    }
    if (wheel_move && wheel_move.progress() < 1) {
      return;
    }
    TweenMax.to($(window), duration, {
      scrollTo: {
        y: top,
        autoKill: true,
      },
      ease: Sine.easeInOut,
      onComplete: function () {},
    });
  }

  function scrolling(contents, delta) {
    if (delta < 0) {
      // down
      reactiveHeight = windowHeightCheck();
      parallaxStartPoint = 610;
      if (reactiveHeight < 610) {
        moveScrollContent(parallaxStartPoint, 0.8, false);
        $("#fieldContent1").addClass("on");
      } else if (contents.index() == visual_num - 1) {
        moveScrollContent(contents.offset().top + contents.height(), 1.2, true);
      } else {
        if (visual_num == 1) {
          moveScrollContent(
            contents.offset().top + contents.height(),
            1.2,
            true
          );
        } else if (visual_num >= 3) {
          moveScrollContent(
            contents.next(".parallax-container").offset().top,
            1.2,
            false
          );
        } else {
          moveScrollContent(
            contents.next(".parallax-container").offset().top,
            1.2,
            false
          );
        }
      }
    } else {
      // up
      if (contents.index() === 0) {
        // fixed wheel
        moveScrollContent(0, 0.8, true);
      } else if (contents.index() === 1) {
        $("#fieldContent1").addClass("on");
        if (visual_num == 1) {
          moveScrollContent(0, 0.8, true);
        } else {
          moveScrollContent(parallaxStartPoint, 1.2, false);
        }
      } else if (contents.index() == visual_num - 1) {
        // wheel
        if (
          $(window).scrollTop() >
          contents.last(".parallax-container").offset().top + 10
        ) {
          moveScrollContent(contents.offset().top, 0.8, false);
        } else {
          moveScrollContent(
            contents.prev(".parallax-container").offset().top,
            1.2,
            false
          );
        }
      } else {
        moveScrollContent(
          contents.prev(".parallax-container").offset().top,
          1.2,
          false
        );
      }
    }
  }

  function removeScroll() {
    if (isPassive()) {
      window.removeEventListener("wheel", scrollStop, { passive: false });
    } else {
      $("body").off("scroll touchmove mousewheel", scrollStop);
    }
    TweenMax.killChildTweensOf($(window), { scrollTo: true });
  }

  function scrollIndexCheck(top) {
    var init = 610;
    var number = 0;
    $(".parallax-container").each(function (val) {
      if (top >= init && top < $(this).offset().top) {
        number = val;
        init = $(this).offset().top;
      } else if (top >= $(this).offset().top) {
        number = val + 1;
      }
    });

    return number;
  }

  // event
  window.addEventListener(
    "scroll",
    toFit(function () {
      if (windowHeightCheck() > $("#visual").height() / 3) {
        TweenMax.to($(".visual-img-con"), 0, { autoAlpha: 0.3 });
        $(".visual-img-con").addClass("active");
      } else {
        TweenMax.to($(".visual-img-con"), 0, { autoAlpha: 1 });
        $(".visual-img-con").removeClass("active");
      }
    }, {}),
    { passive: true }
  );
});

$(document).ready(function () {
  /* *********************** Brand  ************************ */
  if ($.exists(".accordion-list-box")) {
    function accordion_width() {
      $(".accordion-list").each(function () {
        $accordionList = $(this);
        $accordionItem = $(this).find(".accordion-item");
        itemTotalWidth = $accordionList.outerWidth();
        itemBoxLength = $accordionItem.length;
        mobileWidth = 800;
        // itemWidth = 158;
        if ($(window).width() > 1367) {
          itemWidth = 320;
        } else {
          itemWidth = 180;
        }
        activeWidth = itemTotalWidth - itemWidth * (itemBoxLength - 1);

        // console.log("Total width : " + itemTotalWidth + "px, None Active width :  " + itemWidth + "px, Active width :  " + activeWidth + "px");

        if ($(window).width() + 17 > mobileWidth) {
          $accordionItem.each(function () {
            $accordionItem.not(".active").css("width", itemWidth);
            $accordionList
              .find(".accordion-item.active")
              .css("width", activeWidth);
          });
        } else {
          $accordionItem.removeAttr("style");
        }
      });
    }
    accordion_width();
    $(window).on("resize", accordion_width);

    $accordionItem.on("click", function () {
      if ($(window).width() > mobileWidth && !$(this).is(".active")) {
        $(this)
          .addClass("active")
          .stop()
          .animate({ width: activeWidth }, 300, "swing");
        $accordionItem
          .not($(this))
          .removeClass("active")
          .stop()
          .animate({ width: itemWidth }, 300, "swing");
        // $accordionItem.not($(this)).removeClass("active");
        // TweenMax.to($accordionItem.not($(this)), 0.5, {width:itemWidth, ease:Power2.easeOut })
      }
    });

    $accordionItem.on("click", function () {
      if ($(window).width() < mobileWidth + 1) {
        $(".accordion-list .accordion-item").not($(this)).removeClass("active");
        $(this).addClass("active");
      }
    });
  }

  /* *********************** Solution ************************ */
  var $examVisual = $("#examVisual");
  var $examVisualItem = $examVisual.find(".exam-slider-item");
  var $examLoadingBar = $examVisual.find(".exam-visual-loading-bar > span");
  var $examCounter = $examVisual.find(".exam-visual-conuter");
  var examVisualLength = $examVisualItem.length;

  var autoPlaySpeed = 5000;
  var interleaveOffset = 0.5;
  var swiperOptions = {
    loop: true,
    //effect: "fade",
    parallax: true,
    speed: 1000,
    autoplay: {
      delay: autoPlaySpeed,
      disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".exam-visual-control .main-slide-next",
      prevEl: ".exam-visual-control .main-slide-prev",
    },
    on: {
      progress: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.height * interleaveOffset;
        }
      },
      init: function () {
        $examCounter.find(".total-num").text("0" + examVisualLength);
      },
      slideChangeTransitionStart: function () {
        var cur_idx = $(this.slides[this.activeIndex]).data(
          "swiper-slide-index"
        );

        // Counter
        $examCounter.find(".cur-num").text("0" + (cur_idx + 1));

        // Loading Motion
        TweenMax.killTweensOf($examLoadingBar);
        TweenMax.set($examLoadingBar, { width: "0%" });
        TweenMax.to($examLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
      },
      slideChange: function () {
        var activeIndex = this.activeIndex;
        var realIndex = this.slides
          .eq(activeIndex)
          .attr("data-swiper-slide-index");
        $(".exam-slider-item").removeClass("active-item");
        $(
          '.exam-slider-item[data-swiper-slide-index="' + realIndex + '"]'
        ).addClass("active-item");
      },
    },
  };

  var swiper = new Swiper(".exam-visual-container", swiperOptions);
});

customScrollY(".cm-scroll-con");

$(function () {
  $(".table_scroll").each(function () {
    $(this).scroll(function () {
      var tableScrollLeft = $(this).scrollLeft();
      if (tableScrollLeft > 0) {
        $(this).addClass("table_scroll_acitve");
      } else {
        $(this).removeClass("table_scroll_acitve");
      }

      //console.log(tableScrollLeft)
    });
  });
});
