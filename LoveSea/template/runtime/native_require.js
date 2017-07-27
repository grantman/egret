
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"polyfill/promise.js",
	"bin-debug/LineTest.js",
	"bin-debug/ADItemTest.js",
	"bin-debug/AnchorTest.js",
	"bin-debug/AnimTest.js",
	"bin-debug/ArcTest.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/BitmapTest.js",
	"bin-debug/Boy.js",
	"bin-debug/CacheBitmapTest.js",
	"bin-debug/CapabilitiesTest.js",
	"bin-debug/CircleTest.js",
	"bin-debug/CollideTest.js",
	"bin-debug/ContainerTest.js",
	"bin-debug/CurveTest.js",
	"bin-debug/DateEvent.js",
	"bin-debug/DelayCallTest.js",
	"bin-debug/DeviceOrientationTest.js",
	"bin-debug/DirtyRectangleDebugTest.js",
	"bin-debug/DisplayTest.js",
	"bin-debug/DynamicFrameRateTest.js",
	"bin-debug/ForceRefreshTest.js",
	"bin-debug/FpsMonitorTest.js",
	"bin-debug/GeolocationTest.js",
	"bin-debug/Girl.js",
	"bin-debug/GraphicsTest.js",
	"bin-debug/GridSprite.js",
	"bin-debug/HitTest.js",
	"bin-debug/IndexTest.js",
	"bin-debug/AdvanceArcTest.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MainView.js",
	"bin-debug/MaskTest.js",
	"bin-debug/MultPointsTouch.js",
	"bin-debug/MyGrid.js",
	"bin-debug/NetworkTest.js",
	"bin-debug/NewFile.js",
	"bin-debug/RectangleTest.js",
	"bin-debug/RectTest.js",
	"bin-debug/SampleDate.js",
	"bin-debug/ScopeTest.js",
	"bin-debug/ScreenDebugLogTest.js",
	"bin-debug/ScrollRectTest.js",
	"bin-debug/SoundTest.js",
	"bin-debug/StartTickerTest.js",
	"bin-debug/TextLayoutTest.js",
	"bin-debug/TextTest.js",
	"bin-debug/TextTest2.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/TimerTest.js",
	"bin-debug/TimerTestTwo.js",
	"bin-debug/TouchEventTest.js",
	"bin-debug/TweenBaseTest.js",
	"bin-debug/TweenComplexTest.js",
	"bin-debug/TweenEventTest.js",
	"bin-debug/TweenProcessTest.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};