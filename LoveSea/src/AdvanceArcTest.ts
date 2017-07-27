// TypeScript file
class AdvanceArcTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private _shape:egret.Shape;
    private onAddToStage(event:egret.Event){
        this.initGraphics();
        this.changeGraphics();
    }
    private initGraphics():void{
        var shape:egret.Shape = this._shape = new egret.Shape();
        shape.x = this.stage.stageWidth/2;
        shape.y = this.stage.stageHeight/2;
        this.addChild(shape);

        var bitmap:egret.Bitmap = new egret.Bitmap();
        this.addChild(bitmap);
        bitmap.width = 228;
        bitmap.height = 380;
        bitmap.x = shape.x -bitmap.width/2;
        bitmap.y = shape.y -bitmap.height/2;

        bitmap.mask = shape;

        var loader:egret.ImageLoader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE,function(e:egret.Event){
            var bitmapData:egret.BitmapData = loader.data;
            bitmap.bitmapData = bitmapData;
        },this);

        loader.load("resource/assets/egret_icon.png");
    }

    private changeGraphics():void{
        var shape:egret.Shape = this._shape;

        var angle:number = 0;
        var i:number = 1;

        egret.startTick(function(timeStamp:number):boolean{
            changeGraphics(angle);
            angle+=1;
            if(angle>=360){
                angle = angle%360;
                i*=-1;
            }
            return false;
        },this);

        function changeGraphics(angle:number):void{
            shape.graphics.clear();
         
            shape.graphics.beginFill(0x00ffff,1);
            shape.graphics.moveTo(0,0);
            shape.graphics.lineTo(200,0);
            shape.graphics.drawArc(0,0,200,(angle*Math.PI/180),i=-1);
            shape.graphics.lineTo(0,0);
            shape.graphics.endFill();
        }
    }
     

}