// var isTouch = !!("ontouchstart" in document.documentElement);
// var isMobile =
//   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   ) && isTouch;
// var $document = $(document);
var $window = $(window);
// var $html = $("html");
// var $body = $("body");
// var $wrap = $("#wrap");
// var $header = $("#header");
// var hashURL = location.hash;
var scrollY = 0;
// var moSize = false;

// $(function () {
//   scrollMotion();
//   sliders();
// });

$window.on("scroll", () => {
  scrollY = $window.scrollTop();
});

// breakpoint
var matchMax = (num) => {
  var match = window.matchMedia("(max-width:" + num + "px)");
  return match;
};

var matchMin = (num) => {
  var match = window.matchMedia("(min-width:" + num + "px)");
  return match;
};

// smooth scroll
// if (!isMobile) {
//   var lenis = new Lenis({
//     lerp: 0.01,
//     smooth: true,
//   });

//   var scrollFn = (time) => {
//     lenis.raf(time);
//     requestAnimationFrame(scrollFn);
//   };

//   requestAnimationFrame(scrollFn);

//   lenis.on("scroll", () => ScrollTrigger.update());
// }

// function commonInit() {
//   if (isMobile) {
//     $html.addClass("is-mobile");
//   }

//   var breakpoint = (e) => {
//     if (e.currentTarget.matches) {
//       moSize = false;
//     } else {
//       moSize = true;
//     }
//   };

//   $(matchMin(1201)).on("change", breakpoint).change();

//   function setScreenSize() {
//     var vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty("--vh", `${vh}px`);
//   }

//   setScreenSize();

//   // scroll detector
//   // $document.on("scrollUp", () => {
//   //   $body.removeClass("down");
//   //   $body.addClass("up");
//   // });

//   // $document.on("scrollDown", () => {
//   //   $body.removeClass("up");
//   //   $body.addClass("down");
//   // });

//   // scroll target
//   // function gotoTarget() {
//   //   var options = {
//   //     easing: (t) => 1 - Math.pow(1 - t, 3),
//   //   };

//   //   $document.on("click", ".moveTo", (e) => {
//   //     e.preventDefault();

//   //     if (hashURL.length > 0) {
//   //       history.replaceState("", document.title, window.location.pathname);
//   //     }

//   //     var target = e.currentTarget.hash;

//   //     if (target === undefined || target === "#") return;

//   //     if (isMobile) {
//   //       $("html, body").animate(
//   //         {
//   //           scrollTop: $(target).offset().top,
//   //         },
//   //         500
//   //       );
//   //     } else {
//   //       lenis.scrollTo(target, options);
//   //     }
//   //   });
//   // }

//   // gotoTarget();

//   // if (!isMobile) {
//   //   scrollStop();
//   // }
// }

// function scrollMotion() {
//   // scroll animation
//   function scrollAnim() {
//     var anims = [...document.querySelectorAll("[data-anim], [data-anim-txt]")];
//     var height = $window.innerHeight();
//     var point = height * 0.8;

//     if (anims.length < 1) {
//       return;
//     }

//     function observerFun(item) {
//       var pos = $(item).offset().top;
//       var dataOffset = $(item).data("anim-offset");
//       var $offset = dataOffset ? dataOffset : 0;

//       if (pos < scrollY + point + $offset) {
//         $(item).addClass("on");
//       } else if (pos > scrollY + height) {
//         $(item).removeClass("on");
//       }
//     }

//     anims.forEach((anim) => {
//       observerFun(anim);
//     });
//   }

//   // scrollTrigger
//   var triggerSet = {
//     end: "+=100%",
//     scrub: true,
//     ease: "Power1.inOut",
//   };

//   // zoom in
//   function zoomInImg() {
//     var imgs = gsap.utils.toArray("[data-scroll-zoomIn]");

//     if (imgs.length < 1) return;

//     imgs.forEach((box) => {
//       var img = $(box).find(".zoomImg");
//       var startVal = $(box).data("start")
//         ? `"+=${$(box).data("start")}%"`
//         : '"+=30%"';

//       tl = gsap
//         .timeline({
//           scrollTrigger: {
//             trigger: box,
//             start: startVal,
//             ...triggerSet,
//           },
//           defaults: {
//             transformOrigin: "center bottom",
//           },
//         })
//         .to(box, {
//           scale: 0.8,
//         })
//         .to(
//           img,
//           {
//             y: 150,
//           },
//           0
//         );
//     });
//   }

//   // scroll img
//   function scrollImg() {
//     var imgs = gsap.utils.toArray("[data-scroll-img]");

//     if (imgs.length < 1) return;

//     imgs.forEach((img) => {
//       var box = $(img).parents(".scroll_wrap");

//       tl = gsap
//         .timeline({
//           scrollTrigger: {
//             trigger: box,
//             start: "+=0%",
//             ...triggerSet,
//           },
//           defaults: {
//             transformOrigin: "center bottom",
//           },
//         })
//         .to(img, {
//           y: 150,
//         });
//     });
//   }

//   zoomInImg();
//   scrollImg();

//   $window
//     .on("scroll resize", () => {
//       scrollAnim();
//     })
//     .trigger("resize");
// }
