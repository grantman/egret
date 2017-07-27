// TypeScript file
class LineTest extends egret.DisplayObjectContainer
{
    private _shage:egret.Shape;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        this._shage = new egret.Shape();
        this.addChild(this._shage);
        //this.initGraphics();
        this.drawCone();
        this.changeGraphics();
    }
    private initGraphics():void
    {
        var shape:egret.Shape = this._shage;
        shape.graphics.lineStyle(2,0xff00ff);
        shape.graphics.moveTo(320,400);
        shape.graphics.lineTo(380,300);
    }
    private changeGraphics():void{
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            this.drawCone();
        },this);
    }
    private drawCone():void
    {
        var shape:egret.Shape = this._shage;
        var array = [{x:320-200,y:400},{x:320+200,y:400},{x:Math.random()*300+180,y:200},{x:Math.random()*300+180,y:600}];
        shape.graphics.clear();
        for(var i:number=0;i<array.length;i++){
            for(var j:number=i;j<array.length;j++){
                shape.graphics.lineStyle(2,0xff0000+Math.floor(Math.random()*100)*(0xffffff/100));
                shape.graphics.moveTo(array[i]["x"],array[i]["y"]);
                shape.graphics.lineTo(array[j]["x"],array[j]["y"]);
            }
        }
    }

}