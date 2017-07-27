// TypeScript file
class RectangleTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    public onAddToStage(event:egret.Event)
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(50,50,200,200);
        shp.graphics.endFill();
        this.addChild(shp);

        var shp2:egret.Shape = new egret.Shape();
        shp2.graphics.beginFill(0x00ff00);
        shp2.graphics.drawCircle(50,50,30);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;

        var rect:egret.Rectangle = new egret.Rectangle(10,20,80,100);
        shp.mask = rect;

        //画一个红色的正方形
        var square:egret.Shape = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0,0,100,100);
        square.graphics.endFill();
        this.addChild(square);
        //画一个蓝色的圆形
        var circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(25,25,80);
        circle.graphics.endFill();
        this.addChild(circle);
        circle.mask = square;

    }

}