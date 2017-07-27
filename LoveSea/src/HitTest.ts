// TypeScript file
class HitTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xfff000);
        shp.graphics.drawRect(0,0,100,100);
        shp.graphics.endFill();
        shp.width = 100;
        shp.height = 100;
        this.addChild(shp);
        var ishit:boolean = shp.hitTestPoint(10,10);
        this.drawText();
        this.infoText.text = "碰撞结果:"+ishit;
    }
    private infoText:egret.TextField;
    private drawText(){
        this.infoText = new egret.TextField();
        this.y = 200;
        this.infoText.text = "碰撞结果";
        this.addChild(this.infoText);
    }

}