// TypeScript file
class ADItemTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }
    private _txInfo:egret.TextField;
    private imgLoadHandler(evt:egret.Event):void{
        var data = evt.currentTarget.data;

        var upLeft = new egret.Shape();
        upLeft.graphics.beginFill(0xf7acbc);
        upLeft.graphics.drawRect(0, 0, this.stage.stageWidth/2, this.stage.stageHeight/2);
        upLeft.graphics.endFill();
        upLeft.touchEnabled = true;
        upLeft.x = 0;
        upLeft.y = 0;
        this.addChild(upLeft);

        var upRight = new egret.Shape();
        upRight.graphics.beginFill(0xdeab8a);
        upRight.graphics.drawRect(0,0,this.stage.stageWidth/2,this.stage.stageHeight/2);
        upRight.graphics.endFill();
        upRight.touchEnabled = true;
        upRight.x = this.stage.stageWidth/2;
        upRight.y = 0;
        this.addChild(upRight);

        var downLeft = new egret.Shape();
        downLeft.graphics.beginFill(0xef5b9c);
        downLeft.graphics.drawRect(0,0,this.stage.stageWidth/2,this.stage.stageHeight/2);
        downLeft.graphics.endFill();
        downLeft.touchEnabled = true;
        downLeft.x = 0;
        downLeft.y = this.stage.stageHeight/2;
        this.addChild(downLeft);

        var downRight = new egret.Shape();
        downRight.graphics.beginFill(0xfedcbd);
        downRight.graphics.drawRect(0,0,this.stage.stageWidth/2,this.stage.stageHeight/2);
        downRight.graphics.endFill();
        downRight.touchEnabled = true;
        downRight.x = this.stage.stageWidth/2;
        downRight.y = this.stage.stageHeight/2;
        this.addChild(downRight);

        var upLeftBird:egret.Bitmap = new egret.Bitmap(data);
        upLeftBird.x = upLeft.x + upLeft.width/2-upLeftBird.width/2;
        upLeftBird.y = upLeft.y + upLeft.height/2-upLeftBird.height/2;

        var upRightBird:egret.Bitmap = new egret.Bitmap(data);
        upRightBird.x = upRight.x + upRight.width/2-upRightBird.width/2;
        upRightBird.y = upRight.y + upRight.height/2-upRightBird.height/2;

        var downLeftBird:egret.Bitmap = new egret.Bitmap(data);
        downLeftBird.x = downLeft.x + downLeft.width/2-downLeftBird.width/2;
        downLeftBird.y = downLeft.y + downLeft.height/2-downLeftBird.height/2;

        var downRightBird:egret.Bitmap = new egret.Bitmap(data);
        downRightBird.x = downRight.x + downRight.width/2-downRightBird.width/2;
        downRightBird.y = downRight.y + downRight.height/2-downRightBird.height/2;

        upLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(this.contains(upLeftBird)){
                this.removeChild(upLeftBird);
            }else{
                this.addChild(upLeftBird);
            }
        },this);
        upRight.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(this.contains(upRightBird)){
                this.removeChild(upRightBird);
            }else{
                this.addChild(upRightBird);
            }
        },this);
        downLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(this.contains(downLeftBird)){
                this.removeChild(downLeftBird);
            }else{
                this.addChild(downLeftBird);
            }
        },this);
        downRight.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(this.contains(downRightBird)){
                this.removeChild(downRightBird);
            }else{
                this.addChild(downRightBird);
            }
        },this);

        this._txInfo = new egret.TextField();
        this._txInfo.size = 28;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0xffffff;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击块";
        this._txInfo.x = this.stage.stageWidth/2-this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild(this._txInfo);

    }

}