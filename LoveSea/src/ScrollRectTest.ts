// TypeScript file
class ScrollRectTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //创建一个文本框,设定一个scrollrect限制显示范围
        var bigText:egret.TextField = new egret.TextField();
        bigText.text = "平移和滚动显示对象,平移和滚东显示对象";
        bigText.scrollRect = new egret.Rectangle(0,0,200,50);
        bigText.cacheAsBitmap = true;
        this.addChild(bigText);
        //创建一个按钮,点击后控制为本内容向左移动
        var btnLeft:egret.Shape = new egret.Shape();
        btnLeft.graphics.beginFill(0xcccc01);
        btnLeft.graphics.drawRect(0,0,50,50);
        btnLeft.graphics.endFill();
        btnLeft.x = 50;
        btnLeft.y = 100;
        this.addChild(btnLeft);
        btnLeft.touchEnabled = true;
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
        //创建一个按钮,点击后控制文本内容向右移动
        var btnRight:egret.Shape = new egret.Shape();
        btnRight.graphics.beginFill(0x01cccc);
        btnRight.graphics.drawRect(0,0,50,50);
        btnRight.graphics.endFill();
        btnRight.x = 150;
        btnRight.y = 100;
        this.addChild(btnRight);
        btnRight.touchEnabled = true;
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
        //点击按钮后,控制文本左右移动的方法
        function onScroll(e:egret.TouchEvent){
            var rect:egret.Rectangle = bigText.scrollRect;
            switch(e.currentTarget){
                case btnLeft:
                    rect.x += 20;
                    break;
                case btnRight:
                    rect.x -= 20;
                    break;
            }
            bigText.scrollRect = rect;


        }



    }



}