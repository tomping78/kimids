/* *******************************************************
 * filename : common.js
 ******************************************************** */

$(window).load(function () {
  if (detectBrowser() !== "ie") {
    smoothScroll();
  }
});

var laptopWidth = 1366;
var tabletWidth = 1220;
var mobileWidth = 800;

$(window).load(function () {
  /* ************************
   * Func : Waypoint.js
   ************************ */
  if ($.exists("[data-scroll]")) {
    if (isMobile()) {
      startOffset = "100%";
    } else {
      startOffset = "90%";
    }
    $("[data-scroll]").waypoint(
      function () {
        $(this).addClass("animated");
      },
      {
        offset: startOffset,
      }
    );
  }
});

$(document).ready(function () {
  checkOsBrowser();
  $(window).on("resize", checkOsBrowser);
  function checkOsBrowser() {
    if (isMobile()) {
      $("body")
        .removeClass("is-pc")
        .addClass("is-mobile")
        .addClass(detectOS() + "-os");
    } else {
      $("body")
        .removeClass("is-mobile")
        .addClass("is-pc")
        .addClass(detectBrowser() + "-browser");
    }
  }

  if ($("html").attr("lang") != "ko") {
    $(".cm-accessibility a").text("Skip to content");
  }

  if (detectBrowser() !== "ie" && !isMobile()) {
    mouseCheck();
  }
  function mouseCheck() {
    $("body").mousemove(function (event) {
      $(this).addClass("mouse");
    });
    $("body").on("keydown touchstart", function (event) {
      $(this).removeClass("mouse");
    });
  }

  $(".cm-drop-menu-box-JS").each(function () {
    var $dropBox = $(this);
    var $dropOpenBtn = $(this).find(".cm-drop-open-btn-JS");
    var $dropList = $(this).find(".cm-drop-list-JS");
    var eventState = $dropBox.data("drop-event");

    if (eventState === "click") {
      $dropOpenBtn.click(function () {
        $dropList.slideToggle(500);
        $dropBox.toggleClass("open");
        $dropBox.on("mouseleave", function () {
          dropClose();
        });
        return false;
      });
      $("body").click(function () {
        dropClose();
      });
    } else if (eventState === "hover") {
      $dropBox.hover(
        function () {
          $dropList.slideDown(500);
          $dropBox.addClass("open");
        },
        function () {
          dropClose();
        }
      );
    }
    function dropClose() {
      if ($dropBox.data("drop-width")) {
        if (getWindowWidth() < $dropBox.data("drop-width") + 1) {
          $dropList.slideUp(500);
          $dropBox.removeClass("open");
        }
      } else {
        $dropList.slideUp(500);
        $dropBox.removeClass("open");
      }
    }
    $(window).resize(function () {
      if (getWindowWidth() > $dropBox.data("drop-width")) {
        $dropList.removeAttr("style");
      } else {
        $dropList.hide();
      }
    });
  });

  $(".cm-tab-container-JS").each(function () {
    var $cmTabList = $(this).find(".cm-tab-list-JS");
    var $cmTabListli = $cmTabList.find("li");
    var $cmConWrapper = $(this).children(".cm-tab-content-wrapper-JS");
    var $cmContent = $cmConWrapper.children();

    var $selectCon = $cmTabList.find("li.selected").find("a").attr("href");
    var selectTxt = $cmTabList.find("li.selected").find("em").text();
    $cmContent.hide();
    $($selectCon).show();

    $cmTabListli.children("a").click(function () {
      if (!$(this).parent().hasClass("selected")) {
        var visibleCon = $(this).attr("href");
        $cmTabListli.removeClass("selected");
        $(this).parent("li").addClass("selected");
        $cmContent.hide();
        $(visibleCon).fadeIn();
      }
      return false;
    });

    var $cmTabMobileBtn = $(this).find(".cm-tab-select-btn-JS");
    if ($.exists($cmTabMobileBtn)) {
      $cmTabMobileBtn.find("span").text(selectTxt);
      // Mobile Btn Click
      $cmTabMobileBtn.click(function () {
        $(this).toggleClass("open").siblings().slideToggle();
        return false;
      });

      // Mobile List Click
      $cmTabListli.children("a").click(function () {
        $cmTabMobileBtn.find("span").text($(this).find("em").text());
        tabListClose();
      });
      $("body").click(function () {
        tabListClose();
      });
      function tabListClose() {
        if (getWindowWidth() < 801) {
          $cmTabMobileBtn.removeClass("open").siblings().slideUp();
        }
      }
      $(window).resize(function () {
        if (getWindowWidth() > 800) {
          $cmTabMobileBtn.siblings().removeAttr("style");
        } else {
          $cmTabMobileBtn.siblings().hide(); //.css("display","none");
        }
      });
    }
  });

  if ($.exists(".cm-word-split")) {
    var $mainTxt = ".cm-word-split";

    splittingText($mainTxt);

    $($mainTxt).each(function () {
      splittingTextDelay(
        $(this),
        $(this).data("speed"),
        $(this).data("speed-delay")
      );
    });
  }
  /* -------- Split :: Splitting Plugin -------- */
  if ($.exists(".cm-word-split-JS")) {
    if (detectBrowser() !== "ie" || ieVersionCheck() > 9) {
      Splitting();
      var $splittingTxt = $(".cm-word-split-JS");
      $($splittingTxt).each(function () {
        splittingTextDelay(
          $(this),
          $(this).data("speed"),
          $(this).data("speed-delay")
        );
      });
    }
  }

  if ($.exists("#header")) {
    $(window).scroll(function () {
      if (getWindowWidth() < tabletWidth - 1) {
        objectFixed($("#header"), 0, "top-fixed");
      }
    });
    $(window).resize(function () {
      if (getWindowWidth() > tabletWidth) {
        $("#header").removeClass("top-fixed");
      }
    });
  }

  $(".header-search-box").each(function () {
    var $searchBox = $(this);
    var $openBtn = $(this).find(".header-search-open-btn");
    var $closeBtn = $(this).find(".header-search-close-btn");

    $openBtn.click(function () {
      $searchBox.addClass("open");
    });
    $closeBtn.click(function () {
      $searchBox.removeClass("open");
    });
  });

  if ($.exists(".sitemap-open-btn")) {
    var sitemapState = false;
    var $sitemapOpenbtn = $(".sitemap-open-btn");

    var sitemapState = false;
    var $sitemapOpenbtn = $(".sitemap-open-btn");

    //  Toggle
    $(".sitemap-open-btn").click(function () {
      setTimeout(function () {
        $("#sitemapContent03").addClass("open");
      }, 0);
    });
    $(".sitemap-close-btn").click(function () {
      setTimeout(function () {
        $("#sitemapContent03").removeClass("open");
      }, 0);
    });
  }

  $(".to-top-btn").each(function () {
    if ($(this).length > 0) {
      $(window).scroll(function () {
        objectFixed($(".to-top-btn"), 0, "bottom-fixed");
      });
    }
    $(this).on("click", function () {
      if ($.exists("#fullpage")) {
        $.fn.fullpage.moveTo(1);
      } else {
        $("html, body").animate(
          { scrollTop: 0 },
          300,
          "easeInOutExpo",
          function () {
            $(".logo > a").focus();
          }
        );
      }

      return false;
    });
  });

  if ($.exists(".footer-partner-list")) {
    $(".footer-partner-list").slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      dots: false,
      autoplay: true,
      speed: 500,
      infinite: true,
      autoplaySpeed: 3000,
      easing: "easeInOutQuint",
      pauseOnHover: false,
      prevArrow:
        '<button type="button" data-role="none" class="slick-prev" aria-label="Prev" tabindex="0" role="button"><i class="xi-angle-left-min"></i></button>',
      nextArrow:
        '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="xi-angle-right-min"></i></button>',
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    });
  }

  if ($.exists(".footer-sitemap-list-con")) {
    cloneFooterSitemap();

    function cloneFooterSitemap() {
      var $sitemapGnbList = $("#gnb > ul > li");
      var gnbLength = $sitemapGnbList.length;
      $(".footer-sitemap-list-con").append("<ul></ul>");

      for (var i = 0; i < gnbLength; i++) {
        var $gnb1depItem = $sitemapGnbList.eq(i).children("a");
        var $gnb2depList = $sitemapGnbList.eq(i).find(".gnb-2dep > ul").html()
          ? $sitemapGnbList.eq(i).find(".gnb-2dep > ul").html()
          : '<a href="' +
            $gnb1depItem.attr("href") +
            '">' +
            $gnb1depItem.text() +
            "</a>";
        $(".footer-sitemap-list-con > ul").append(
          "<li><h3>" +
            $gnb1depItem.text() +
            '</h3><ul class="sitemap-2dep">' +
            $gnb2depList +
            "</ul></li>"
        );
      }
    }
  }

  if ($.exists(".custom-select-box .custom-select")) {
    $(".custom-select-box .custom-select").each(function () {
      var classes = $(this).attr("class");
      var id = $(this).attr("id");
      var name = $(this).attr("name");
      var template = '<div class="' + classes + '">';
      template +=
        '<span class="custom-select-trigger">' +
        $(this).attr("placeholder") +
        "</span>";
      template += '<ul class="custom-option-drop-list">';
      $(this)
        .find("option")
        .each(function () {
          template +=
            '<li class="custom-option-item ' +
            $(this).attr("class") +
            '" data-value="' +
            $(this).attr("value") +
            '">' +
            $(this).html() +
            "</li>";
        });
      template += "</ul></div>";
      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(
      function () {
        $(this).parents(".custom-option-drop-list").addClass("option-hover");
      },
      function () {
        $(this).parents(".custom-option-drop-list").removeClass("option-hover");
      }
    );
    $(".custom-select-trigger").on("click", function (event) {
      $("html").one("click", function () {
        $(".custom-select").removeClass("opened");
      });
      $(this).parents(".custom-select").toggleClass("opened");
      event.stopPropagation();
    });
    $(".custom-option-item").on("click", function () {
      $(this)
        .parents(".custom-select-wrapper")
        .find("select")
        .val($(this).data("value"));
      $(this)
        .parents(".custom-option-drop-list")
        .find(".custom-option-item")
        .removeClass("selection");
      $(this).addClass("selection");
      $(this).parents(".custom-select").removeClass("opened");
      $(this)
        .parents(".custom-select")
        .find(".custom-select-trigger")
        .text($(this).text());
    });
  }
});

customScrollY(".footer-inner.editor");
