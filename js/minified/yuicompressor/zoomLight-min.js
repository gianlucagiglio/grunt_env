(function(b){function a(t,d){console.log("ZoomLight: Constructor");var k=this;k.$elem=b(t);var f={isDesktop:g(),zoomOpenClass:"zoomLayerVisible",openLayer:"#mainImage img",closeLayer:"#zoomLayer",$preloader:b("#preloader"),$body:b("body"),$zoomLayer:b("#zoomLayer"),$zlImg:b("#zoomLayer #zoomImage"),$mainImage:b("#mainImage"),$openZoomBtn:b("#mainImage").find("button"),interval:null};k.options=b.extend({},f,d);console.log("ZoomLight: Mobile mode %c"+k.options.isDesktop,"font-weight:bold; color: red;");n();function n(){console.log("ZoomLight: Init");i();h()}function g(){console.log("ZoomLight: DetectAgent");var y=false;if(navigator.userAgent.match(/mobile/i)!==null){return y=true}else{if(navigator.userAgent.match(/Macintosh/i)!==null){return y=true}}return y}function i(z){console.log("ZoomLight: OpenLayer");var y=p(z,k.options.openLayer);c(y,"click",function(){k.options.$body.addClass(k.options.zoomOpenClass);if(!k.options.isDesktop){s()}})}function h(z){console.log("ZoomLight: CloseLayer");var y=p(z,k.options.closeLayer);c(y,"click",function(){k.options.$body.removeClass(k.options.zoomOpenClass);if(!k.options.isDesktop){u()}})}function p(z,y){console.groupCollapsed("ZoomLight: Test");var A=typeof(z)!==undefined&&(typeof(z)==="string"||typeof(z)==="object")?z:y;console.log("promise: ",A);console.groupEnd();return A}function c(B,A,D){console.groupCollapsed("ZoomLight: Handler");console.log("target: ",B);console.log("action:  %c"+A,"font-weight:bold; color: red;");console.log("fallback:",D);if(typeof(B)==="string"){b(B).bind(A,D)}else{for(var z=0;z<B.length;z++){var y=B[z].replace(/\s+/g,"");if(y.substr(y.length-3,y.length-1)==="img"){b(B[z]).bind(A,D)}else{var C=b(B[z]).data("reference");if(typeof(C)!="undefined"){b(B[z]).bind(A,function(){b("#"+C)[A]()})}}}}console.groupEnd()}function x(z){console.groupCollapsed("ZoomLight: Change Source");console.log("src: ",z);k.options.$zlImg.fadeOut("slow");k.options.$preloader.fadeIn("slow");var y=new Image();b(y).load(function(){setTimeout(function(){k.options.$preloader.fadeOut("slow");k.options.$zlImg.attr("src",z);b(window).resize();var A=e({});l(A);k.options.$zlImg.fadeIn("slow")},2000)}).error(function(){k.options.$preloader.fadeOut("slow");k.options.$zlImg.fadeIn("slow");console.error("error")}).attr("src",z);console.groupEnd()}function s(){console.log("%cZoomLight: DesktopMode","font-weight:bold; color: green;");o()}function o(){b("body, html").scrollTop(0);k.options.$zoomLayer.css({overflow:"hidden"});k.options.$zlImg.css("position","absolute");var y={imgW:k.options.$zlImg.width(),imgH:k.options.$zlImg.height(),wW:b(window).width(),wH:b(window).height(),top:0,left:0,coordinate:{left:0,top:0}};y.top=(y.wH-y.imgH)/2;y.left=(y.wW-y.imgW)/2;y.coordinate.left=y.left;y.coordinate.top=y.top;l(y);setTimeout(function(){y=w(y);q(y);v(y)},500)}function l(y){k.options.$zlImg.css({top:y.top,left:y.left});console.groupCollapsed("ZoomLight: Image Centered!");console.log({top:y.top,left:y.left});console.groupEnd()}function w(y){console.groupCollapsed("ZoomLight: BindMouse");console.log(y);k.options.$zoomLayer.bind("mousemove",function(z){y.coordinate.left=Math.floor((y.left*2)*(z.pageX/y.wW));y.coordinate.top=Math.floor((y.top*2)*(z.pageY/y.wH));return y.coordinate});console.groupEnd();return y}function q(y){console.groupCollapsed("ZoomLight: Animation");console.log(y);k.options.interval=setInterval(function(){y.wW>y.imgW?y.coordinate.left=y.left:null;y.wH>y.imgH?y.coordinate.top=y.top:null;k.options.$zlImg.css({top:y.coordinate.top,left:y.coordinate.left})},1);console.groupEnd()}function v(y){console.groupCollapsed("ZoomLight: Window resize");console.log(y);b(window).resize(function(){e(y)});console.groupEnd()}function e(y){console.groupCollapsed("ZoomLight: Get Space");y.imgW=k.options.$zlImg.width();y.imgH=k.options.$zlImg.height();y.wW=b(window).width();y.wH=b(window).height();y.top=(y.wH-y.imgH)/2;y.left=(y.wW-y.imgW)/2;console.log("info:",y);console.groupEnd();return y}function u(){console.groupCollapsed("ZoomLight: Destroy");r();j();console.groupEnd()}function r(){console.log("ZoomLight: UnbindMouse");k.options.$zoomLayer.unbind("mousemove")}function j(){console.log("ZoomLight: ClearAnimation");clearTimeout(k.options.interval)}var m={};m.openLayer=i;m.closeLayer=h;m.changeSrc=x;return m}b.fn.zoomLight=function(c){return this.each(function(){console.group("%cZoomLight Plugin started!","font-weight:bold; color: blue;");if(!b(this).data("zoomLight")){b(this).data("zoomLight",new a(this,c))}console.groupEnd()})}})(jQuery);