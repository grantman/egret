// TypeScript file
class CircleTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.initGraphics();
        this.changeGraphics();
    }
    private shape:egret.Shape = new egret.Shape();
    private drawCircle(x:number,y:number):void{
        var shape:egret.Shape = this.shape;
        shape.graphics.beginFill(0xff0000+Math.floor(Math.random()*100)*(0xffffff/100),1);
        shape.graphics.lineStyle(2,0xff0000+Math.floor(Math.random()*100)*(0xffffff/100));
        shape.graphics.drawCircle(x,y,Math.random()*50+50);
        shape.graphics.endFill();
    }

    private initGraphics():void{
        var shape:egret.Shape = this.shape;
        this.addChild(shape);
        this.drawCircle(this.stage.stageWidth/2,this.stage.stageHeight/2);
    }
    private changeGraphics():void{
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.drawCircle(e.stageX,e.stageY);
        },this);
    }

}