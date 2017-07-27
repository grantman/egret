// TypeScript file
class RectTest extends egret.DisplayObjectContainer
{
    private shape:egret.Shape = new egret.Shape();
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        this.initGraphics();
        this.changeGraphics();
    }
    private drawRect(x:number,y:number):void{
        var shape:egret.Shape = this.shape;
        var w:number = Math.random()*200+100;
        var h:number = Math.random()*200+100;

        shape.graphics.beginFill(0xff0000+Math.floor(Math.random()*100)*(0xffffff/100),1);
        shape.graphics.lineStyle(2,0xff0000+Math.floor(Math.random()*100)*(0xffffff/100));
        shape.graphics.drawRect(x-w/2,y-h/2,w,h);
        shape.graphics.endFill();
    }

    private initGraphics():void{
        var shape:egret.Shape = this.shape;
        this.addChild(shape);

        this.drawRect(this.stage.stageWidth/2,this.stage.stageHeight/2);
    }

    private changeGraphics():void{
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.drawRect(e.stageX,e.stageY);
        },this);
    }

}