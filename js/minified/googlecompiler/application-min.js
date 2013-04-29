$(function(){console.group("Scope Index started!");try{pool($("body"),"zoomLight",{openLayer:["#mainImage img","#mainImage button","#container h1"]}),pool($("#test"),"testPlugin",{})}catch(b){console.error("Scope Index error!"),console.error(b)}console.groupEnd()});var application={pool:pool,callApi:callApi,viewApi:viewApi,stack:[]};function pool(b,e,d){var g={};b[e](d);d=b.data(e);g.pluginName=e;g.api=d;g.target=b;application.stack[e]=g}function callApi(b,e,d){application.stack[b].api[e](d)}
function viewApi(b,e){if("undefined"!==typeof application.stack[b])if(0===Object.keys(application.stack[b].api).length)console.log("Sorry no API found!");else{if(console.log(application.stack[b].api),"undefined"!==typeof e&&e)for(var d in application.stack[b].api)console.log(application.stack[b].api[d])}else console.log("Sorry no PLUGIN found!")};(function(b){function e(d,e){function h(a){console.log("ZoomLight: OpenLayer");a=k(a,c.options.openLayer);l(a,"click",function(){c.options.$body.addClass(c.options.zoomOpenClass);b("body, html").scrollTop(0);c.options.isDesktop||(console.log("%cZoomLight: DesktopMode","font-weight:bold; color: green;"),q())})}function m(a){console.log("ZoomLight: CloseLayer");a=k(a,c.options.closeLayer);l(a,"click",function(){c.options.$body.removeClass(c.options.zoomOpenClass);c.options.isDesktop||(console.groupCollapsed("ZoomLight: Destroy"),
console.log("ZoomLight: UnbindMouse"),c.options.$zoomLayer.unbind("mousemove"),console.log("ZoomLight: ClearAnimation"),clearTimeout(c.options.interval),console.groupEnd())})}function k(a,b){console.groupCollapsed("ZoomLight: Test");var c=void 0!==typeof a&&("string"===typeof a||"object"===typeof a)?a:b;console.log("promise: ",c);console.groupEnd();return c}function l(a,c,e){console.groupCollapsed("ZoomLight: Handler");console.log("target: ",a);console.log("action:  %c"+c,"font-weight:bold; color: red;");
console.log("fallback:",e);if("string"===typeof a)b(a).bind(c,e);else for(var d=0;d<a.length;d++){var f=a[d].replace(/\s+/g,"");if("img"===f.substr(f.length-3,f.length-1))b(a[d]).bind(c,e);else{var g=b(a[d]).data("reference");"undefined"!=typeof g&&b(a[d]).bind(c,function(){b("#"+g)[c]()})}}console.groupEnd()}function q(){c.options.$zoomLayer.css({overflow:"hidden"});c.options.$zlImg.css("position","absolute");var a={imgW:c.options.$zlImg.width(),imgH:c.options.$zlImg.height(),wW:b(window).width(),
wH:b(window).height(),top:0,left:0,coordinate:{left:0,top:0}};a.top=(a.wH-a.imgH)/2;a.left=(a.wW-a.imgW)/2;a.coordinate.left=a.left;a.coordinate.top=a.top;n(a);setTimeout(function(){a=r(a);s(a);t(a)},500)}function n(a){c.options.$zlImg.css({top:a.top,left:a.left});console.groupCollapsed("ZoomLight: Image Centered!");console.log({top:a.top,left:a.left});console.groupEnd()}function r(a){console.groupCollapsed("ZoomLight: BindMouse");console.log(a);c.options.$zoomLayer.bind("mousemove",function(b){a.coordinate.left=
Math.floor(2*a.left*(b.pageX/a.wW));a.coordinate.top=Math.floor(2*a.top*(b.pageY/a.wH));return a.coordinate});console.groupEnd();return a}function s(a){console.groupCollapsed("ZoomLight: Animation");console.log(a);c.options.interval=setInterval(function(){a.wW>a.imgW?a.coordinate.left=a.left:null;a.wH>a.imgH?a.coordinate.top=a.top:null;c.options.$zlImg.css({top:a.coordinate.top,left:a.coordinate.left})},1);console.groupEnd()}function t(a){console.groupCollapsed("ZoomLight: Window resize");console.log(a);
b(window).resize(function(){p(a)});console.groupEnd()}function p(a){console.groupCollapsed("ZoomLight: Get Space");a.imgW=c.options.$zlImg.width();a.imgH=c.options.$zlImg.height();a.wW=b(window).width();a.wH=b(window).height();a.top=(a.wH-a.imgH)/2;a.left=(a.wW-a.imgW)/2;console.log("info:",a);console.groupEnd();return a}console.log("ZoomLight: Constructor");var c=this;c.$elem=b(d);console.log("ZoomLight: DetectAgent");var f={isDesktop:null!==navigator.userAgent.match(/mobile/i)||null!==navigator.userAgent.match(/Macintosh/i)?
!0:!1,zoomOpenClass:"zoomLayerVisible",openLayer:"#mainImage img",closeLayer:"#zoomLayer",$preloader:b("#preloader"),$body:b("body"),$zoomLayer:b("#zoomLayer"),$zlImg:b("#zoomLayer #zoomImage"),$mainImage:b("#mainImage"),$openZoomBtn:b("#mainImage").find("button"),interval:null};c.options=b.extend({},f,e);console.log("ZoomLight: Mobile mode %c"+c.options.isDesktop,"font-weight:bold; color: red;");console.log("ZoomLight: Init");h();m();f={};f.openLayer=h;f.closeLayer=m;f.changeSrc=function(a){console.groupCollapsed("ZoomLight: Change Source");
console.log("src: ",a);c.options.$zlImg.fadeOut("slow");c.options.$preloader.fadeIn("slow");var d=new Image;b(d).load(function(){setTimeout(function(){c.options.$preloader.fadeOut("slow");c.options.$zlImg.attr("src",a);b(window).resize();var d=p({});n(d);c.options.$zlImg.fadeIn("slow")},2E3)}).error(function(){c.options.$preloader.fadeOut("slow");c.options.$zlImg.fadeIn("slow");console.error("error")}).attr("src",a);console.groupEnd()};return f}b.fn.zoomLight=function(d){return this.each(function(){console.group("%cZoomLight Plugin started!",
"font-weight:bold; color: blue;");b(this).data("zoomLight")||b(this).data("zoomLight",new e(this,d));console.groupEnd()})}})(jQuery);(function(b){function e(d,e){console.log("TestPlugin: Constructor");this.$elem=b(d);console.log("TestPlugin: Init");return{testPublicMethod:function(){console.log("TestPlugin: Test Public Method")}}}b.fn.testPlugin=function(d){return this.each(function(){console.group("%cTestPlugin Plugin started!","font-weight:bold; color: blue;");b(this).data("testPlugin")||b(this).data("testPlugin",new e(this,d));console.groupEnd()})}})(jQuery);