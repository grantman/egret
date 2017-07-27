// TypeScript file
class AnchorTest extends egret.DisplayObjectContainer
{
    

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x00ff00);
        shp.graphics.drawRect(0,0,100,100);
        shp.graphics.endFill();
        shp.x = 100;
        shp.y = 100;
        shp.scaleX=2;
        shp.scaleY=2;
        shp.rotation = 45;
        shp.skewX=10;
        shp.skewY=10;
        shp.anchorOffsetX = 50;
        shp.anchorOffsetY = 50;
        this.addChild(shp);

        var container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        container.x = 200;
        container.y = 200;
        this.addChild(container);

        var circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0xff0000);
        circle.graphics.drawCircle(25,25,25);
        circle.graphics.endFill();
        container.addChild(circle);
        //事件
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_TAP,onClick,this); 
        function onClick():void{
            //把舞台左上角的坐标(0,0)转换为container内部的坐标
            var targetPoint:egret.Point = container.globalToLocal(0,0);
            circle.x = targetPoint.x;
            circle.y = targetPoint.y;
            
        }
        
        var draggedObject:egret.Shape;
        //设定2个偏移量
        var offsetX:number;
        var offsetY:number;
        //红色的圆
        var circle2:egret.Shape = new egret.Shape();
        circle2.graphics.beginFill(0xff0000);
        circle2.graphics.drawCircle(30,30,30);
        circle2.graphics.endFill();
        this.addChild(circle2);
        //蓝色的正方形
        var square:egret.Shape = new egret.Shape();
        square.graphics.beginFill(0x0000ff);
        square.graphics.drawRect(0,0,100,100);
        square.graphics.endFill();
        this.addChild(square);
        //手指按到屏幕，触发startMove方法 //手指离开屏幕，触发stopMove方法
        circle2.touchEnabled = true;
        circle2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
        circle2.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
        //方形触摸监听
        square.touchEnabled = true;
        square.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
        square.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);

        function startMove(e:egret.TouchEvent):void{
            //把手指按到的对象记录下来
            draggedObject = e.currentTarget;
            //计算手指和圆形的距离
            offsetX = e.stageX-draggedObject.x;
            offsetY = e.stageY-draggedObject.y;
            //把触摸的对象现实在列表的顶层
            this.addChild(draggedObject);
            //手指在屏幕上移动，会触发onMove方法
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
        }
        function stopMove(e:egret.TouchEvent):void{
            //手指离开屏幕，一处手指移动的监听
            this.stage.removeEventListenr(egret.TouchEvent.TOUCH_MOVE,onMove,this);
        }
        function onMove(e:egret.TouchEvent):void{
            //通过计算手指在名目上的位置，计算当前对象的坐标，达到跟随手指移动的效果
            draggedObject.x = e.stageX - offsetX;
            draggedObject.y = e.stageY - offsetY;
        }





    }

    

}