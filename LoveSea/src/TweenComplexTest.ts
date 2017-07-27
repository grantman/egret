// TypeScript file
class TweenComplexTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHander,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }

    private _bird:egret.Bitmap;
    private _txInfo:egret.TextField;

    private _vcLocation:Array<egret.Point>;
    private _idxCurrLocation:number;

    private _rotCommon:number;

    private imgLoadHander(evt:egret.Event):void{
        var bmd:egret.BitmapData = evt.currentTarget.data;
        this._vcLocation=[
            new egret.Point(bmd.width/2,100+bmd.height/2)
            ,new egret.Point(this.stage.stageWidth-bmd.width/2,this.stage.stageHeight-bmd.height/2)
            ,new egret.Point(bmd.width/2,this.stage.stageHeight-bmd.height/2)
            ,new egret.Point(this.stage.stageWidth-bmd.width/2,100+bmd.height/2)
        ];
        this._rotCommon = 180/Math.PI*Math.atan2(
            this._vcLocation[1].y-this._vcLocation[0].y,this._vcLocation[1].x-this._vcLocation[0].x
        );
        this._bird = new egret.Bitmap(bmd);
        this._bird.anchorOffsetX = bmd.width/2;
        this._bird.anchorOffsetY = bmd.height/2;
        this.addChild(this._bird);

        this._txInfo  = new egret.TextField;
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

        this._txInfo.text = "这是游四个阶段的缓动动画组合的复合动画，并且往复循环";

        this._idxCurrLocation = -1;
        this._bird.x = this._vcLocation[3].x;
        this._bird.y = this._vcLocation[3].y;
        this._bird.rotation = Math.random()*30;

        this.launchTween();
    }
    
    private launchTween(){
        /*** 本示例关键代码段开始 ***/
        egret.Tween.get( this._bird, { loop:true} )
            .to( {x:this._vcLocation[0].x, y:this._vcLocation[0].y}, 500 )
                .call( ()=>{ this._bird.rotation = 180 - this._rotCommon;  } ).wait( 200 )
            .to( {x:this._vcLocation[1].x, y:this._vcLocation[1].y}, 500 )
                .call( ()=>{ this._bird.rotation = - 90; } ).wait( 200 )
            .to( {x:this._vcLocation[2].x, y:this._vcLocation[2].y}, 500 )
                .call( ()=>{ this._bird.rotation = this._rotCommon; } ).wait( 200 )
            .to( {x:this._vcLocation[3].x, y:this._vcLocation[3].y}, 500 )
                .call( ()=>{ this._bird.rotation = - 90; } ).wait( 200 );
        /*** 本示例关键代码段结束 ***/                                                                                                
    }

}