var application = {
	"pool": pool,
	"callApi": callApi,
	"viewApi": viewApi,
	"stack": []
};
//console.log(application)

/**
 *
 **/

function pool($target, pluginName, options) {
	//console.group ( "Pool requested"  );
	//console.log ( "target: 		", $target );
	//console.log ( "pluginName:  ", pluginName );
	//console.log ( "options: 	", options );
	//console.groupEnd();
	//	
	var tmpStack = {};
	$target[pluginName](options);
	// Get the API to the plugin object
	var api = $target.data(pluginName);
	tmpStack.pluginName = pluginName;
	tmpStack.api = api;
	tmpStack.target = $target;
	//
	application.stack[pluginName] = tmpStack;
	tmpStack = null;
}

/**
 *
 **/

function callApi(pluginName, method, option) {
	//console.group ( "Call Api requested"  );
	//console.log ( "pluginName:  ", pluginName );
	//console.log ( "method:  	", method );
	//console.log ( "options: 	", option );
	//console.groupEnd();
	application.stack[pluginName].api[method](option);
}

/**
 *
 **/

function viewApi(pluginName, functionShow) {
	//console.group ( "View Api requested"  );
	//console.log ( "pluginName:  ", pluginName );
	//console.log ( "method:  	", method );
	//console.log ( "options: 	", option );
	//console.groupEnd();
	if (typeof(application.stack[pluginName]) !== "undefined") {
		if (Object.keys(application.stack[pluginName].api).length === 0) {
			console.log("Sorry no API found!");
		} else {
			console.log(application.stack[pluginName].api);
			if (typeof(functionShow) !== "undefined" && functionShow) {
				for (var i in application.stack[pluginName].api) {
					console.log(application.stack[pluginName].api[i]);
				}
			}
		}
	} else {
		console.log("Sorry no PLUGIN found!");
	}

}
;
(function($) {
    // wrap code within anonymous function: a private namespace

    // replace 'testPlugin' and 'testPlugin' below in your own plugin...

    // constructor function for the logical object bound to a
    // single DOM element

    function testPlugin(elem, options) {

        console.log("TestPlugin: Constructor");

        // remember this object as self
        var self = this;
        // remember the DOM element that this object is bound to
        self.$elem = $(elem);
        //
        init();

        // initialize this plugin

        function init() {
            console.log("TestPlugin: Init");
        }

        //---

        function testPublicMethod() {
            console.log("TestPlugin: Test Public Method"); //
        }

        //---
        var API = {};
        API.testPublicMethod = testPublicMethod;
        return API;

    }

    // attach the plugin to jquery namespace
    $.fn.testPlugin = function(options) {
        return this.each(function() {
            console.group("%cTestPlugin Plugin started!", "font-weight:bold; color: blue;"); //groupCollapsed
            // prevent multiple instantiation
            if (!$(this).data('testPlugin')) {
                $(this).data('testPlugin', new testPlugin(this, options));
            }
            console.groupEnd();
        });

    };

})(jQuery);
;
(function($) {
    // wrap code within anonymous function: a private namespace

    // replace 'zoomLight' and 'zoomLight' below in your own plugin...

    // constructor function for the logical object bound to a
    // single DOM element

    function zoomLight(elem, options) {

        console.log("ZoomLight: Constructor");

        // remember this object as self
        var self = this;
        // remember the DOM element that this object is bound to
        self.$elem = $(elem);

        // default options
        var defaults = {
            isDesktop: detectAgent(),
            zoomOpenClass: 'zoomLayerVisible',
            openLayer: '#mainImage img',
            closeLayer: '#zoomLayer',
            $preloader: $('#preloader'),
            $body: $('body'),
            $zoomLayer: $('#zoomLayer'),
            $zlImg: $("#zoomLayer #zoomImage"),
            $mainImage: $('#mainImage'),
            $openZoomBtn: $('#mainImage').find('button'),
            interval: null
        };

        // mix in the passed-in options with the default options
        self.options = $.extend({}, defaults, options);

        //Trace if is mobile
        console.log("ZoomLight: Mobile mode %c" + self.options.isDesktop, "font-weight:bold; color: red;");

        // just some private data
        //self.count = 1;

        //
        init();

        // initialize plugin

        function init() {
            console.log("ZoomLight: Init");
            // Set listener open layer
            openLayer();
            // Set listener close layer
            closeLayer();
        }

        //---

        function detectAgent() {
            console.log("ZoomLight: DetectAgent");
            var promise = false;
            if (navigator.userAgent.match(/mobile/i) !== null) {
                return promise = true;
            } else if (navigator.userAgent.match(/Macintosh/i) !== null) {
                return promise = true;
            }
            return promise;
        }

        //---

        function openLayer(target) {
            console.log("ZoomLight: OpenLayer");
            var tmpTarget = test(target, self.options.openLayer);
            handler(tmpTarget, "click", function() {
                self.options.$body.addClass(self.options.zoomOpenClass);
                //Do not delete
                $("body, html").scrollTop(0);
                //Desktop mode
                if (!self.options.isDesktop) {
                    desktopMode();
                }
            });
        }

        //---

        function closeLayer(target) {
            console.log("ZoomLight: CloseLayer");
            var tmpTarget = test(target, self.options.closeLayer);
            handler(tmpTarget, "click", function() {
                self.options.$body.removeClass(self.options.zoomOpenClass);
                //Desktop mode
                if (!self.options.isDesktop) {
                    destroy();
                }
            });
        }

        //---

        function test(target, def) {
            console.groupCollapsed("ZoomLight: Test");
            var promise = typeof(target) !== undefined && (typeof(target) === "string" || typeof(target) === "object") ? target : def
            console.log("promise: ", promise);
            console.groupEnd();
            return promise;
        }

        //--- 

        function handler(target, action, fallback) {
            console.groupCollapsed("ZoomLight: Handler");
            console.log("target: ", target);
            console.log("action:  %c" + action, "font-weight:bold; color: red;");
            console.log("fallback:", fallback);

            if (typeof(target) === "string") {
                $(target).bind(action, fallback);
            } else {
                for (var i = 0; i < target.length; i++) {
                    var tmp = target[i].replace(/\s+/g, '');
                    //console.log( tmp.substr(tmp.length-3,tmp.length-1) );
                    if (tmp.substr(tmp.length - 3, tmp.length - 1) === "img") {
                        $(target[i]).bind(action, fallback);
                    } else {
                        var id = $(target[i]).data("reference");
                        if (typeof(id) != "undefined") {
                            $(target[i]).bind(action, function() {
                                $("#" + id)[action]();
                            });
                        }
                    }
                }
            }

            console.groupEnd();

        }

        //---

        function changeSrc(src) {
            console.groupCollapsed("ZoomLight: Change Source");
            console.log("src: ", src);

            //
            self.options.$zlImg.fadeOut('slow'); //.css("opacity",0.01);
            self.options.$preloader.fadeIn('slow');
            var img = new Image();
            $(img).load(function() {
                setTimeout(function() {
                    self.options.$preloader.fadeOut('slow');
                    self.options.$zlImg.attr("src", src);
                    $(window).resize();

                    var info = getSpace({});
                    centerImage(info);

                    self.options.$zlImg.fadeIn('slow') //.css("opacity",1);
                }, 2000);
            }).error(function() {
                // notify the user that the image could not be loaded
                self.options.$preloader.fadeOut('slow');
                self.options.$zlImg.fadeIn('slow') //.css("opacity",1);
                console.error("error");
            }).attr('src', src);
            console.groupEnd();
        }

        //---

        function desktopMode() {
            console.log("%cZoomLight: DesktopMode", "font-weight:bold; color: green;");
            setupMoveImage();
        }

        //---

        function setupMoveImage() {

            //temporary
            self.options.$zoomLayer.css({
                "overflow": "hidden"
            }); //"display":"block", 
            self.options.$zlImg.css("position", "absolute");


            //Setup info object
            var info = {
                imgW: self.options.$zlImg.width(),
                imgH: self.options.$zlImg.height(),
                wW: $(window).width(),
                wH: $(window).height(),
                top: 0,
                left: 0,
                coordinate: {
                    "left": 0,
                    "top": 0
                }
            }
            info.top = (info.wH - info.imgH) / 2;
            info.left = (info.wW - info.imgW) / 2;
            info.coordinate.left = info.left;
            info.coordinate.top = info.top;

            //---
            centerImage(info);

            //---
            setTimeout(function() {

                //
                info = bindMouse(info);
                //
                animation(info);
                //
                resize(info);

            }, 500);
        }

        //---

        function centerImage(info) {
            //Center image
            self.options.$zlImg.css({
                "top": info.top,
                "left": info.left
            });
            console.groupCollapsed("ZoomLight: Image Centered!");
            console.log({
                "top": info.top,
                "left": info.left
            });
            console.groupEnd();
        }

        //---

        function bindMouse(info) {
            console.groupCollapsed("ZoomLight: BindMouse"); //
            console.log(info);
            //---
            self.options.$zoomLayer.bind("mousemove", function(event) {
                info.coordinate.left = Math.floor((info.left * 2) * (event.pageX / info.wW));
                info.coordinate.top = Math.floor((info.top * 2) * (event.pageY / info.wH));
                return info.coordinate;
            });
            console.groupEnd();
            return info;
        }

        //---

        function animation(info) {
            console.groupCollapsed("ZoomLight: Animation"); //
            console.log(info);
            //Set interval animation without jquery animation
            self.options.interval = setInterval(function() {
                //console.log ( "ZoomLight: SetInterval work!" );
                info.wW > info.imgW ? info.coordinate.left = info.left : null;
                info.wH > info.imgH ? info.coordinate.top = info.top : null;
                //
                self.options.$zlImg.css({
                    "top": info.coordinate.top,
                    "left": info.coordinate.left
                });
            }, 1); //not enter values ​​below 1, IE7 / 8 do not support it
            console.groupEnd();
        }

        //---

        function resize(info) {
            console.groupCollapsed("ZoomLight: Window resize"); //
            console.log(info);
            //Update space
            $(window).resize(function() {
                getSpace(info);
            });
            console.groupEnd();
        }

        //---

        function getSpace(info) {
            console.groupCollapsed("ZoomLight: Get Space");
            info.imgW = self.options.$zlImg.width();
            info.imgH = self.options.$zlImg.height();
            info.wW = $(window).width();
            info.wH = $(window).height();
            info.top = (info.wH - info.imgH) / 2;
            info.left = (info.wW - info.imgW) / 2;
            console.log("info:", info);
            console.groupEnd();
            return info;
        }

        //---

        function destroy() {
            console.groupCollapsed("ZoomLight: Destroy"); //
            //
            unbindMouse();
            //
            clearAnimation();

            console.groupEnd();
        }

        //---

        function unbindMouse() {
            console.log("ZoomLight: UnbindMouse"); //
            //---
            self.options.$zoomLayer.unbind("mousemove");
        }

        //---

        function clearAnimation() {
            console.log("ZoomLight: ClearAnimation"); //
            //Clear interval animation 
            clearTimeout(self.options.interval);
        }

        //---
        var API = {};
        API.openLayer = openLayer;
        API.closeLayer = closeLayer;
        API.changeSrc = changeSrc;
        return API;

    }

    // attach the plugin to jquery namespace
    $.fn.zoomLight = function(options) {
        return this.each(function() {
            console.group("%cZoomLight Plugin started!", "font-weight:bold; color: blue;"); //groupCollapsed
            // prevent multiple instantiation
            if (!$(this).data('zoomLight')) {
                $(this).data('zoomLight', new zoomLight(this, options));
            }
            console.groupEnd();
        });

    };

})(jQuery);
/**
 *
 **/
$(function() {

	console.group("Scope Index started!");

	try {

		//---
		var options = {
			openLayer: ['#mainImage img', "#mainImage button", "#container h1"]
		};
		//---
		pool($("body"), "zoomLight", options);
		//---
		pool($("#test"), "testPlugin", {});

		//Example button enabled open layer
		//callApi ( "zoomLight", "openLayer", "#mainImage button" );

		//Example delayed button enabled open layer
		/*setTimeout ( function (){
			callApi ( "zoomLight", "openLayer", "#mainImage button" );
		}, 10000);*/

		//Example delayed change src
		/*setTimeout ( function (){
			//callApi ( "zoomLight", "changeSrc", "images/41340481nd_15n_fsad_h.jpg" );//Error
			callApi ( "zoomLight", "changeSrc", "images/41340481nd_15n_f_h.jpg" );
		}, 3000);*/

	} catch (e) {
		//console.error(e);
		console.error("Scope Index error!");
		console.error(e);
	}

	console.groupEnd();

});