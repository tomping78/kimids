/* *******************************************************
 * filename : functions.js
 * description : �꾩껜�곸쑝濡� �ъ슜�섎뒗 JS
 * date :2020-11-25
******************************************************** */

/* ************************
  * 釉뚮씪�곗�瑜� 泥댄겕�좊븣 �ъ슜�섎뒗 �⑥닔
  * return browser(釉뚮씪�곗�name)
  ************************ */
function detectBrowser () {
	var agent = navigator.userAgent.toLowerCase(); 
	var browser; 
	
	if ( (agent.indexOf('msie') > -1) || (agent.indexOf('trident') > -1) || (agent.indexOf('edge') > -1) ) { 
		browser = 'ie'
	}else if(agent.indexOf('firefox') > -1) { 
		browser = 'firefox' 
	}else if(agent.indexOf('opr') > -1) { 
		browser = 'opera' 
	}else if(agent.indexOf('chrome') > -1) { 
		browser = 'chrome' 
	}else if(agent.indexOf('safari') > -1) { 
		browser = 'safari'
	}

	return browser;
}

 /* ************************
  * IE 踰꾩쟾�� 泥댄겕�좊븣 �ъ슜�섎뒗 �⑥닔
  * return : IE �꾨땺�� false / IE �쇰븣 9,10,11,"edge"
  ************************ */
function ieVersionCheck () {
	var word; 
	var version = "N/A"; 
	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName; 

	// IE old version ( IE 10 or Lower ) 
	if ( name == "Microsoft Internet Explorer" ) word = "msie "; 
	else { 
		// IE 11 
		if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 
		// Microsoft Edge  
		else if ( agent.search("edge/") > -1 ) word = "edge/"; 
	} 
	var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 
	if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2; 
	
	if ( version !="NaN" && version < 12 ) {
		return parseInt (version)
	}else if ( word === "edge/" ) {
		return	 false;
	}else {
		return false;
	}
}

 /* ************************
  * OS 泥댄겕 �⑥닔
  * android/ios 泥댄겕�좊븣 �ъ슜
  ************************ */
function detectOS(){
    var agent = navigator.userAgent.toLowerCase(); 
	var osCheck; 

    if ( agent.indexOf('android') > -1) {
        return "android";
    } else if ( agent.indexOf("iphone") > -1|| agent.indexOf("ipad") > -1|| agent.indexOf("ipod") > -1 || agent.indexOf("macintosh") > -1 ) {
        return "ios";
    } else {
        return "other";
    }

	return osCheck;
}

 /* ************************
  * 紐⑤컮�� 泥댄겕 �⑥닔
  * return : 紐⑤컮�� true / PC false
  * Ipad Safari userAgent 蹂�寃쎌쑝濡� �명빐 if臾� 異붽� (2020-07-17)
  * Mac Os - Big Sur, Safari(14.0) Macintosh 濡� 泥댄겕�섏뼱 mobile濡� 遺꾨쪟�섎뒗 �댁뒋濡� 媛�濡쒖궗�댁쫰 議곌굔臾� 異붽�(2021-06-15)
  ************************ */
function isMobile(){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPad|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return true;
	}else{
		// Ipad Safari Browser
		if ( detectIpad() ) {
			return true;
		}else {
			return false;
		} 
	}
}
function detectIpad() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	// Lying iOS13 iPad
	if (userAgent.match(/Macintosh/i) !== null && getWindowWidth () < 1025 ) {
		// need to distinguish between Macbook and iPad
		var canvas = document.createElement("canvas");
		if (canvas !== null) {
			var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			if (context) {
				var info = context.getExtension("WEBGL_debug_renderer_info");
				if (info) {
					var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
					if (renderer.indexOf("Apple") !== -1)
					return true;
				}
			}
		}
	}
	return false;
}

/* ************************
  * window �앹뾽 �ㅽ뵂 �⑥닔
  * @param src : "�앹뾽 �섏씠吏� 二쇱냼"
  * @param title : "�앹뾽 �섏씠吏� ���댄�"
  * @param option : "width=�덈퉬, height=�믪씠, left=x異� �꾩튂, top=y異� �꾩튂, resizable=由ъ궗�댁쫰 �щ�, scrollbars=�ㅽ겕濡ㅻ컮 �щ�, status=�곹깭 �쒖떆以� �щ�"
  ************************ */
function winPopupOpen(src,title,option){
	window.open(src,title,option);
}

 /* ************************
  * 釉뚮씪�곗��� 媛�濡쒓컪, �몃줈媛� 痢≪젙 �⑥닔
  * return 媛�濡쒓컪/�몃줈媛�
  ************************ */
/* �꾩쓽�� �곸뿭�� 留뚮뱾�� �ㅽ겕濡ㅻ컮 �ш린 痢≪젙 */ 
function getScrollBarWidth(){
	if($(document).height() > $(window).height()){
		$('body').append('<div id="fakescrollbar" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>');
		fakeScrollBar = $('#fakescrollbar');
		fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
		var w1 = fakeScrollBar.find('div').innerWidth();
		fakeScrollBar.css('overflow-y', 'scroll');
		var w2 = $('#fakescrollbar').find('div').html('html is required to init new width.').innerWidth();
		fakeScrollBar.remove();
		return (w1-w2);
	}
	return 0;
}
/* 釉뚮씪�곗� 媛�濡�, �몃줈�ш린 痢≪젙 */ 
function getWindowWidth () {
	return $(window).outerWidth() + getScrollBarWidth() ;
}
function getWindowHeight () {
	return $(window).height() ;
}

 /* ************************
  * 釉뚮씪�곗��� �ㅽ겕濡ㅻ컮�� �섏쭅 �꾩튂 痢≪젙 �⑥닔
  * return �ㅽ겕濡ㅻ컮 �꾩튂 媛�
  ************************ */
function getScrollTop () {
	return $(window).scrollTop();
}

 /* ************************
  * 釉뚮씪�곗��� �ㅽ겕濡ㅼ쓣 �대룞�쒗궎�� �⑥닔
  * @param top : �대룞吏���
  * @param speed : �대룞�띾룄
  ************************ */
function moveScrollTop (top, speed) {
	$("html, body").animate({scrollTop:top}, speed ,"easeInOutExpo");
}

 /* ************************
  * object toggleClass �⑥닔
  * @param object : �곸슜�섏빞�� �좏깮��
  * @param className : toggleClass Name
  ************************ */
/* addClass Active */
function addClassName (object, className) {
	$(object).addClass(className);
}
function removeClassName (object, className) {
	$(object).removeClass(className);
}

/* ************************
  * 媛�닔泥댄겕 �⑥닔
  * @param selector : �좏깮��
  * 1媛쒖씠�� �덉쑝硫� return true
  ************************ */
$.exists = function(selector) {
	return ($(selector).length > 0);
}

/* ************************
  * magnificPopup Plugin ( 紐⑤떖�앹뾽媛ㅻ윭由� )
  * jquery.magnific-popup.js �꾩슂
  ************************ */
function magnificPopup (popupGallery) {
	$(popupGallery).magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		mainClass: 'mfp-with-zoom',
		removalDelay: 500, //delay removal by X to allow out-animation
		  callbacks: {
			beforeOpen: function() {
			  // just a hack that adds mfp-anim class to markup 
			   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
			   this.st.mainClass = this.st.el.attr('data-effect');
			}
		  },
		closeOnContentClick: true,
		midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
}

/* ************************
  * mCustomScrollbar Plugin ( �ㅽ겕濡ㅻ컮 而ㅼ뒪�� )
  * jquery.mCustomScrollbar.concat.min.js �꾩슂
  * @param selector : �좏깮��
  ************************ */
/* Custom Scrollbar Plugin (x,y) */
function customScrollX (scrollObject) {
	$(scrollObject).mCustomScrollbar({
		axis:"x",
		theme:"dark"
	});
}
function customScrollY (scrollObject) {
	$(scrollObject).mCustomScrollbar({
		axis:"y",
		theme:"dark"
	});
}

/* ************************
  * PHP 二쇱냼 Parameter
  * @param strParamName : 媛��몄삱 �뚮씪誘명꽣媛�
  ************************ */
/* PHP Get Parameter  */
function getParameter(strParamName){
	var arrResult = null;
	if(strParamName){
		 arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
	}
	return arrResult && arrResult[1] ? arrResult[1] : null;
}
function toAnchorParameter (anchor) {
	if ( getParameter(anchor) ) {
		var anchorConTop = $("#"+getParameter(anchor)+"").offset().top;
		var headerHeight = $("#header").height();
		moveScrollTop(anchorConTop-headerHeight, 500);
	}
}

/* ************************
  * �쒖감�곸쑝濡� active�대옒�ㅺ� 遺숇뒗 �⑥닔
  * @param activeList : �좏깮��
  ************************ */
/* Active cycle */ 
function rollingActive (activeList) {
	$(activeList).each(function  (index) {
		$itemList = $(this);
		$item = $itemList.find("li");
		itemLength = $item.length;
		startNum = 0;
		rollingSpeed = $itemList.data("rolling-time");
		
		function visualTime(){
			if(startNum < ( itemLength - 1)){
				startNum++;
			}else{
				startNum = 0;
			}
			visualPlay();
		}
		function visualPlay(){
			$item.each(function(id){
				if(id == startNum){
					$(this).addClass("active"); // li�� �대옒�� 遺숈씠湲�
				}else{
					$(this).removeClass("active");
				}
			});
		};
		visualPlay();
		visual_timer = setInterval(visualTime,rollingSpeed);
	});
}

/* ************************
  * �ㅽ겕濡ㅺ컪�� �곕씪 �대옒�ㅺ� 遺숇뒗 �⑥닔
  * @param object : �좏깮��
  * @param fixedStartTop : �대옒�ㅺ� 遺숇뒗 �쒖옉�섎뒗吏���
  * @param className : 遺숈뿬�쇳븯�� �대옒�ㅼ씠由�
  * getScrollTop() �⑥닔 �꾩슂
  ************************ */
/* Fixed Object */ 
function objectFixed ( object, fixedStartTop, className ) {
	if ( getScrollTop() >  fixedStartTop ) {
		if (!($(object).hasClass(className))) {	
			$(object).addClass(className);
		}
	}else {
		if ($(object).hasClass(className)) {
			$(object).removeClass(className);
		}
	}
}

/* ************************
  * splittingText : �띿뒪�� Split �⑥닔
  *  @param object : �좏깮��
  * splittingTextDelay : Split �띿뒪�� delay
  * @param object : �좏깮��
  * @param speed : speed 媛꾧꺽
  * @param delay_speed : delay�쒓컙
  ************************ */
  function splittingText (object) {
		var split_word;
		var splitWordEvent = {
			settings: {
				letters: $(object),
			},
			init: function() {
				split_word = this.settings;
				this.bindEvents();
			},
			bindEvents: function(){
				split_word.letters.html(function (i, el) {
					var word_item = $.trim(el).split("");
					// console.log(word_item);
					return '<em class="char">' + word_item.join('</em><em class="char">') + '</em>';
				});
			},
		};
		splitWordEvent.init();
}
function splittingTextDelay (object, speed, delay_speed) {
	var splitLength = $(object).find(".char").length;
	for (var i=0; i<splitLength; i++) {
		if (  $(object).data("css-property") == "animation" ) {
			$(object).find(".char").eq(i).css("animation-delay",delay_speed+(i*speed)+"s");
		}else if( $(object).data("css-property") == "transition" ) {
			$(object).find(".char").eq(i).css("transition-delay",delay_speed+(i*speed)+"s");
		}
	}
}

/* ************************
  * object�� offset 泥댄겕 �⑥닔
  *  @param object : �좏깮��
  * return : offset.top 媛�
  ************************ */
function checkOffset (object) {
	return $(object).offset().top;
}

/* ************************
  * �곷떒�� fixed瑜� �섍퀬�덈뒗 object�� �믪씠媛� 泥댄겕 �⑥닔
  * return : top-fixed �섍퀬�덈뒗 �믪씠�� total媛�
  ************************ */
function checkFixedHeight () {
	var fixedTotalHeight = null;
	for (var i=0; i<$(".top-fixed").length; i++) {
		var fixedTotalHeight = fixedTotalHeight + $(".top-fixed").eq(i).outerHeight();
	}
	return fixedTotalHeight;
}

/* ************************
  * event 理쒖쟻��(requestAnimationFrame)
  ************************ */
function toFit(cb, _ref) {
	var _ref$dismissCondition = _ref.dismissCondition,
		dismissCondition = _ref$dismissCondition === void 0 ? function () {
		return false;
	} : _ref$dismissCondition,
	  _ref$triggerCondition = _ref.triggerCondition,
	  triggerCondition = _ref$triggerCondition === void 0 ? function () {
	return true;
	} : _ref$triggerCondition;

		if (!cb) {
			throw Error('Invalid required arguments');
		}

		var tick = false;
		return function () {
		//  console.log('scroll call')
		if (tick) {
			return;
		}

		tick = true;
		return requestAnimationFrame(function () {
			if (dismissCondition()) {
				tick = false;
				return;
			}

			if (triggerCondition()) {
				//console.log('real call')
				tick = false;
				return cb();
			}
		});
	};
}