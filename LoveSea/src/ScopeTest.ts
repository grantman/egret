// TypeScript file
class ScopeTest extends egret.DisplayObjectContainer
{
    private static NUM:number=32;
    private static SCALE_BASE:number = .5;
    private static SCALE_RANGE:number = .5;
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(evt:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }
    private _vcBird:Array<egret.Bitmap>;
    private _vcMotion:Array<number>;
    private _iMotionMode:number;
    private _nScaleBase:number;

    private _txInfo:egret.TextField;
    private _bgInfo:egret.Shape;

    private _rectScope:egret.Rectangle;
    private imgLoadHandler(evt:egret.Event):void{
        var bmd:egret.BitmapData = evt.currentTarget.data;

        var wHalfBird:number = bmd.width/2;
        var hHalfBird:number = bmd.height/2;

        this._rectScope = new egret.Rectangle(
            wHalfBird*ScopeTest.SCALE_BASE,hHalfBird*ScopeTest.SCALE_BASE
            ,this.stage.stageWidth-wHalfBird*ScopeTest.SCALE_BASE*2
            ,this.stage.stageHeight-hHalfBird*ScopeTest.SCALE_BASE*2
        );

        this._vcBird = new Array<egret.Bitmap>();
        for(var i=0;i<ScopeTest.NUM;++i){
            var bird:egret.Bitmap = new egret.Bitmap(bmd);

            bird.anchorOffsetX = wHalfBird;
            bird.anchorOffsetY = hHalfBird;

            bird.x = this._rectScope.x + this._rectScope.width*Math.random();
            bird.y = this._rectScope.y + this._rectScope.height*Math.random();

            bird.scaleX = bird.scaleY = ScopeTest.SCALE_BASE;

            this._vcBird.push(bird);
            this.addChild(bird);
        }

        //提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.width = this.stage.stageWidth-100;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.backgroundColor = 0xffffff;
        this._txInfo.text = "轻触改变小鸟运动模式";

        this._bgInfo = new egret.Shape;
        this.addChild(this._bgInfo);

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff,.5);
        this._bgInfo.graphics.drawRect(0,0,this._txInfo.width,this._txInfo.height);
        this._bgInfo.graphics.endFill();
        this._bgInfo.cacheAsBitmap = true;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            this.planRdmMotion();
        },this);
        this.planRdmMotion();
        this._nScaleBase = 0;
        //产生动画
        this.stage.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
            switch(this._iMotionMode){
                case MotionMode.ROT:
                    this._vcBird[this._vcMotion[0]].rotation +=3;
                    this._vcBird[this._vcMotion[1]].rotation -=3;
                    this._vcBird[this._vcMotion[2]].rotation +=3;

                    var scale:number = ScopeTest.SCALE_BASE+Math.abs(Math.sin(this._nScaleBase+=0.03))*ScopeTest.SCALE_RANGE;
                    this._vcBird[this._vcMotion[0]].scaleX = this._vcBird[this._vcMotion[0]].scaleY = scale;
                    this._vcBird[this._vcMotion[1]].scaleX = this._vcBird[this._vcMotion[1]].scaleY = scale;
                    this._vcBird[this._vcMotion[2]].scaleX = this._vcBird[this._vcMotion[2]].scaleY = scale;
                    
                    break;
                case MotionMode.MOV:
                    var xTo:number;
                    if((xTo=this._vcBird[this._vcMotion[0]].x-3)<this._rectScope.left) xTo=this._rectScope.right;
                    this._vcBird[this._vcMotion[0]].x = xTo;
                    if((xTo=this._vcBird[this._vcMotion[1]].x+3)<this._rectScope.right) xTo=this._rectScope.left;
                    this._vcBird[this._vcMotion[1]].x = xTo;
                    if((xTo=this._vcBird[this._vcMotion[2]].x-3)<this._rectScope.left) xTo=this._rectScope.right;
                    this._vcBird[this._vcMotion[2]].x = xTo;
                    break;
            }
        },this);

    }

    private planRdmMotion():void
    {
        this._iMotionMode = Math.random()>.5?0:1;
        if(this._vcMotion && this._vcMotion.length==3){
            this._vcBird[this._vcMotion[0]].scaleX = this._vcBird[this._vcMotion[0]].scaleY = ScopeTest.SCALE_BASE;
            this._vcBird[this._vcMotion[1]].scaleX = this._vcBird[this._vcMotion[1]].scaleY = ScopeTest.SCALE_BASE;
            this._vcBird[this._vcMotion[2]].scaleX = this._vcBird[this._vcMotion[2]].scaleY = ScopeTest.SCALE_BASE;
            
        }
        this.setChildIndex(this._txInfo,this.numChildren-1);
        this.setChildIndex(this._bgInfo,this.numChildren-2);

        this._vcMotion = new Array<number>();
        this._vcMotion.push(Math.floor(ScopeTest.NUM*Math.random()));
        this._vcMotion.push(Math.floor(ScopeTest.NUM*Math.random()));
        this._vcMotion.push(Math.floor(ScopeTest.NUM*Math.random()));
        this.setChildIndex(this._vcBird[this._vcMotion[0]],this.numChildren-3);
        this.setChildIndex(this._vcBird[this._vcMotion[1]],this.numChildren-4);
        this.setChildIndex(this._vcBird[this._vcMotion[2]],this.numChildren-5);

    }

}

class MotionMode{
    public static ROT:number = 0;
    public static MOV:number = 1;
    
    public static TOTAL:number = 2;
}