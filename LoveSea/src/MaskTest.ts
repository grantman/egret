// TypeScript file
class MaskTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event)
    {
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }

    private launchMask():void{
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
    }
    private _shpBeMask:egret.Shape;
    private _bird:egret.Bitmap;
    private _txInfo:egret.TextField;

    private updateBird(stageX:number,stageY:number):void{
        this._bird.x = stageX;
        this._bird.y = stageY;
    }

    private touchHandler(evt:egret.TouchEvent){
        switch(evt.type){
            case egret.TouchEvent.TOUCH_MOVE:
                this.updateBird(evt.stageX,evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                this.stage.once(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
                this._shpBeMask.mask = this._bird;
                this.updateBird(evt.stageX,evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
                this._shpBeMask.mask = null;
                this._bird.$maskedObject = null;
                break;
        }
    }

    private imgLoadHandler(evt:egret.Event)
    {
        //遮照
        this._shpBeMask = new egret.Shape;
        this._shpBeMask.graphics.lineStyle(0x000000);
        this._shpBeMask.graphics.beginFill(this.getRdmClr());
        this._shpBeMask.graphics.drawEllipse(0,0,200,300);
        this._shpBeMask.graphics.endFill();
        this._shpBeMask.x = (this.stage.stageWidth-200)/2;
        this._shpBeMask.y = (this.stage.stageHeight-300)/2;
        this.addChild(this._shpBeMask);

        //显示对象
        this._bird = new egret.Bitmap(evt.currentTarget.data);
        var wHalfBird:number = this._bird.width/2;
        var hHalfBird:number = this._bird.height/2;
        this._bird.anchorOffsetX = wHalfBird;
        this._bird.anchorOffsetY = hHalfBird;
        //随机位置
        this._bird.x = wHalfBird+(this.stage.stageWidth-wHalfBird*2)*Math.random();
        this._bird.y = hHalfBird+(this.stage.stageHeight-hHalfBird*2)*Math.random();
        this.addChild(this._bird);

        //提示
        this._txInfo = new egret.TextField;
        this.addChildAt(this._txInfo,0);

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
        this._txInfo.text = "测试遮照";

        this.launchMask();
    }

    private getRdmClr():number
    {
        return (Math.floor(Math.random()*0xff)<<16)
        +(Math.floor(Math.random()*0xff)<<8)
        +Math.floor(Math.random()*0xff);
    }


}