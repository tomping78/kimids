/* *******************************************************
 * filename : layer_popup.js
 ******************************************************** */

// Modal Open
$(document).on("click", ".cm-modal-open-btn", function () {
  ajaxLoad($(this).attr("href"));
  return false;
});

/* ************************
 * html Scroll Controls
 ************************ */
function htmlScrollControl(toggle) {
  if (toggle) {
    if (!$.exists("#fullpage") || $.exists(".fp-responsive")) {
      $("html").css({
        "margin-right": "17px",
        "overflow-y": "hidden",
      });
    } else {
      $.fn.fullpage.setAllowScrolling(false);
      $.fn.fullpage.setKeyboardScrolling(false);
    }
  } else {
    if (!$.exists("#fullpage") || $.exists(".fp-responsive")) {
      $("html").css({
        "margin-right": "0",
        "overflow-y": "scroll",
      });
    } else {
      $.fn.fullpage.setAllowScrolling(true);
      $.fn.fullpage.setKeyboardScrolling(true);
    }
  }
}

/* ************************
 * Modal
 ************************ */
function addModalLayer() {
  var modalHtml = "";
  modalHtml += '<article class="modal-fixed-pop-wrapper">';
  modalHtml += '<div class="modal-loading"><span class="loading"></span></div>';
  modalHtml += '<div class="modal-fixed-pop-inner">';
  modalHtml += '<div class="modal-inner-box">';
  modalHtml += '<div class="modal-inner-content">';
  modalHtml += "</div>";
  modalHtml += "</div>";
  modalHtml += "</div>";
  modalHtml += "</div>";
  modalHtml += "</article>";

  $("body").append(modalHtml);
}

/* ************************
 * Ajax Load
 ************************ */
// Ajax Load
function ajaxLoad(strUrl) {
  addModalLayer();
  var $modalWrap = $(".modal-fixed-pop-wrapper");
  $modalWrap.fadeIn();
  htmlScrollControl(true);
  $.ajax({
    type: "POST",
    url: strUrl,
    data: "",
    success: function (resultText) {
      $modalWrap
        .find(".modal-inner-content")
        .html(resultText)
        .find(".modal-close-btn")
        .focus();
      $(document).keydown(function (event) {
        if (event.keyCode == 27 || event.which == 27) {
          if ($modalWrap.css("display") == "block") {
            ajaxUnLoad();
          }
        }
      });
    },
    error: function () {
      if ($("html").attr("lang") == "ko") {
        alert("�몄텧�� �ㅽ뙣�섏��듬땲��.");
      } else {
        alert("Please try again.");
      }

      $(".modal-fixed-pop-wrapper").hide();
      htmlScrollControl(false);
    },
    beforeSend: function () {
      $(".modal-loading").show();
    },
    complete: function () {
      $(".modal-loading").hide();
    },
  });
}
function layerLoad(strUrl) {
  ajaxLoad(strUrl);
}

/* ************************
 * Ajax UnLoad
 ************************ */
function ajaxUnLoad() {
  htmlScrollControl(false);
  $(".modal-fixed-pop-wrapper").fadeOut(100, function () {
    $(this).remove();
  });
}
