// TypeScript file
class AnimTest extends egret.DisplayObjectContainer
{
    //旋转及缩放步长设定
    private static STEP_ROT:number = 3;
    private static STEP_SCALE:number = .03;

    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var imgLoad:egret.ImageLoader = new egret.ImageLoader;
        imgLoad.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoad.load("resource/assets/egret_icon.png");
    }
    private _bird:egret.Bitmap;
    private _txInfo:egret.TextField;
    private imgLoadHandler(evt:egret.Event):void
    {
        //展示显示对象
        this._bird = new egret.Bitmap(evt.currentTarget.data);
        this.addChild(this._bird);

        this._bird.anchorOffsetX = this._bird.width/2;
        this._bird.anchorOffsetY = this._bird.height/2;
        this._bird.x = this.stage.stageWidth/2;
        this._bird.y = this.stage.stageHeight * 0.618;

        //提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;

        this.launchAnimations();

    }

    //记录当前的模式.模式切换通过触摸舞台触发
    private _iAnimMode:number;
    private _nScaleBase:number;

    private launchAnimations():void
    {
        this._iAnimMode = AnimModes.ANIM_ROT;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,
        ()=>{this._iAnimMode = (this._iAnimMode+1)%3;}
        ,this);
        this._nScaleBase = 0;
        //根当前模式调整旋转度数或缩放正弦基数形成相应动画
        this.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>
        {
            switch(this._iAnimMode){
                case AnimModes.ANIM_ROT:
                    this._bird.rotation += AnimTest.STEP_ROT;
                    break;
                case AnimModes.ANIM_SCALE:
                    this._bird.scaleX = this._bird.scaleY = 0.5+0.5*Math.abs(Math.sin(this._nScaleBase+=AnimTest.STEP_SCALE));
                    break;

            }
            
            this._txInfo.text = "旋转角度:"+this._bird.rotation
            +"\n缩放比例:"+this._bird.scaleX.toFixed(2)
            +"\n\n轻触进入"+(["缩放","静止","旋转"][this._iAnimMode])+"模式";

            return false;
        },this);
    }

}

class AnimModes{
    public static ANIM_ROT:number = 0;
    public static ANIM_SCALE:number = 1;
}