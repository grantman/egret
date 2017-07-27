// TypeScript file
class TweenProcessTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHander,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }

    private _bird:egret.Bitmap;
    private _txInfo:egret.TextField;

    private _vcLocation:Array<egret.Point>;
    private _idxCurrLocation:number;

    private _idxEase:number;

    private _vcEaseFunc:Array<EaseFunc>;

    private imgLoadHander(evt:egret.Event):void{
        var bmd:egret.BitmapData = evt.currentTarget.data;

        this._vcLocation = [
            new egret.Point(bmd.width/2,this.stage.stageHeight/2-bmd.height/2)
            ,new egret.Point(this.stage.stageWidth-bmd.width/2,160+bmd.height/2)
        ];

        this._bird = new egret.Bitmap(bmd);
        this._bird.anchorOffsetX = bmd.width/2;
        this._bird.anchorOffsetY = bmd.height/2;
        this.addChild(this._bird);

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

        this._idxEase = -1;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.launchTween();
        },this);

        this._vcEaseFunc = [];
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.sineIn", egret.Ease.sineIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.sineOut", egret.Ease.sineOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.sineInOut", egret.Ease.sineInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.backIn", egret.Ease.backIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.backOut", egret.Ease.backOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.backInOut", egret.Ease.backInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.circIn", egret.Ease.circIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.circOut", egret.Ease.circOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.circInOut", egret.Ease.circInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.bounceIn", egret.Ease.bounceIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.bounceOut", egret.Ease.bounceOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.bounceInOut", egret.Ease.bounceInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.elasticIn", egret.Ease.elasticIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.elasticOut", egret.Ease.elasticOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.elasticInOut", egret.Ease.elasticInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quadIn", egret.Ease.quadIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quadOut", egret.Ease.quadOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quadInOut", egret.Ease.quadInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.cubicIn", egret.Ease.cubicIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.cubicOut", egret.Ease.cubicOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.cubicInOut", egret.Ease.cubicInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quartIn", egret.Ease.quartIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quartOut", egret.Ease.quartOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quartInOut", egret.Ease.quartInOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quintIn", egret.Ease.quintIn));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quintOut", egret.Ease.quintOut));
        this._vcEaseFunc.push(new EaseFunc("egret.Ease.quintInOut", egret.Ease.quintInOut));

        this._idxCurrLocation = -1;
        this.updateRdmLocation(true);
        this.updatePrompt();
    }

    private updatePrompt(sAppend:string= ""):void{
        this._txInfo.text = "轻触屏幕启动已个随即位置的缓动过程,每一次缓动依次使用不同插值方式:"+
        "\n 当前插值:"+sAppend;
    }

    private updateRdmLocation(bApply:boolean=false):egret.Point{
        var vcIdxLocation = [0,1];
        if(this._idxCurrLocation!=-1){
            vcIdxLocation.splice(this._idxCurrLocation,1);
        }
        var loc:egret.Point = this._vcLocation[ this._idxCurrLocation = vcIdxLocation[ Math.floor( Math.random()*vcIdxLocation.length ) ] ];
        if(bApply){
            this._bird.x = loc.x;
            this._bird.y = loc.y;
        }
        return loc;
    }

    private launchTween(){
        var loc:egret.Point = this.updateRdmLocation();

        var params:EaseFunc = this._vcEaseFunc[ ++this._idxEase % this._vcEaseFunc.length ];
        egret.Tween.get( this._bird )
            .to( {x:loc.x,y:loc.y}, 600, params.func );
        this.updatePrompt(params.name);
    }
    

}

class EaseFunc{
    public name:string;
    public func:Function;
    constructor(name:string,func:Function){
        this.name = name;
        this.func = func;
    }
}