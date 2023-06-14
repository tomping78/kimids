$(function () {
  scrollSection();
  historyMotion();
});

// anchor menu
function scrollSection() {
  var sections = [...document.querySelectorAll("[scroll-section]")];
  if (sections.length < 1) return;

  var menuLis = [...document.querySelectorAll(".page_menu_list > li")];
  var $slider = document.querySelector(".page_menu_slider");
  var toggleLis;

  var options = {
    slidesPerView: "auto",
    freeMode: {
      enabled: true,
      sticky: true,
    },
  };

  var swiper = new Swiper($slider, options);

  cloneMenu();

  function menuActive() {
    toggleLis = [...document.querySelectorAll(".page_menu_toggle ul > li")];

    $(menuLis).eq(0).addClass("active");

    // mobile
    if ($(toggleLis).length > 0) {
      $(toggleLis).eq(0).addClass("active");
    }

    sections.forEach((sec, idx) => {
      var target = $(sec).find(".anchor");
      var posTop = $(target).offset().top - 1;
      var activeLi = $(menuLis).eq(idx);
      var activeLi2;

      if (posTop - 10 < scrollY) {
        $(activeLi).addClass("active");
        $(activeLi).siblings("li").removeClass("active");
        swiper.slideTo(idx, 0);

        // mobile
        if ($(toggleLis).length < 1) return;
        activeLi2 = $(toggleLis).eq(idx);

        $(toggleLis).eq(idx).addClass("active");
        $(activeLi2).siblings("li").removeClass("active");
      }
    });
  }

  function cloneMenu() {
    var $menu = $(".page_menu_list")
      .clone(true, true)
      .removeClass("swiper-wrapper");
    var newMenu;

    var breakpoint = (e) => {
      if (e.currentTarget.matches) {
        createMenu();
      } else {
        if ($(newMenu).length < 1) return;
        $(newMenu).remove();
      }
    };

    $(matchMax(992)).on("change", breakpoint).change();

    function createMenu() {
      $menu
        .appendTo(".page_menu .inner")
        .wrap(
          '<div class="dropdown basic page_menu_toggle"><div class="drop_content"></div></div>'
        );
      newMenu = $(".page_menu_toggle");
      newMenu.prepend(
        '<button aria-expanded="false" class="drop_btn" aria-label="�닿린"><span class="el_ico"></span></button>'
      );
      newMenu
        .find(".drop_content")
        .attr("hidden", "hidden")
        .find(".page_menu_list")
        .removeClass()
        .removeAttr("id")
        .find("li")
        .removeAttr("class");
    }
  }

  $window
    .on("scroll resize", () => {
      menuActive();
    })
    .trigger("resize");
}

function historyMotion() {
  var $history = $(".history_content");

  if ($history.length < 1) return;

  var $items = $history.find(".month");
  var currPos = 0;

  $items.eq(0).addClass("on");

  function itemOn() {
    var winHh = $window.innerHeight();

    $($items).each((idx, item) => {
      var $item = $(item);
      var itemPos = $item.offset().top;

      if (itemPos - winHh / 1.7 < scrollY) {
        $items.eq(idx).addClass("on");
        currPos = $items.eq(idx).offset().top;
      } else {
        if (idx === 0) return;
        $item.removeClass("on");
      }
    });
  }

  function scrollBar() {
    var $line = $history.find(".line");
    var $bar = $line.find(".bar");
    var first = $items.eq(0);
    var reset = first.offset().top - $line.offset().top + 10;
    var scollHh = currPos - $line.offset().top + 10;

    var progress = scollHh < reset ? reset : scollHh;

    $bar.css("height", progress);
  }

  $window
    .on("scroll resize", () => {
      itemOn();
      scrollBar();
    })
    .trigger("resize");
}
