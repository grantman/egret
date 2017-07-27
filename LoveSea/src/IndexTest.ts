// TypeScript file
class IndexTest extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoader.load("resource/assets/test.png");
    }
    private _txInfo:egret.TextField;
    private imgLoadHandler(evt:egret.Event):void
    {
        var data = evt.currentTarget.data;
        
        var upBird:egret.Bitmap = new egret.Bitmap(data);
        upBird.x = this.stage.stageWidth/2-upBird.width/2;
        upBird.y = this.stage.stageHeight/2-upBird.height/2;
        upBird.touchEnabled = true;
        upBird.pixelHitTest = true;
        this.addChild(upBird);

        var leftBird:egret.Bitmap = new egret.Bitmap(data);
        leftBird.x = 50;
        leftBird.y = this.stage.stageHeight/2-leftBird.height/2;
        leftBird.touchEnabled = true;
        leftBird.pixelHitTest = true;
        this.addChild(leftBird);

        var rightBird:egret.Bitmap = new egret.Bitmap(data);
        rightBird.x = this.stage.stageWidth-rightBird.width-50;
        rightBird.y = this.stage.stageHeight/2-rightBird.height/2;
        rightBird.touchEnabled = true;
        rightBird.pixelHitTest = true;
        this.addChild(rightBird);

        upBird.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.setChildIndex(upBird,this.numChildren-1);
        },this);
        leftBird.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.setChildIndex(leftBird,this.numChildren-1);
        },this);
        rightBird.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.setChildIndex(rightBird,this.numChildren-1);
        },this);

        this._txInfo = new egret.TextField();
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x843900;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击测试";
        this._txInfo.x = this.stage.stageWidth/2-this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);
    }

}