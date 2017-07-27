// TypeScript file
class CacheBitmapTest extends egret.DisplayObjectContainer
{
    public static UNITS_PER_CONT:number = 16;
    private static NUM:number = 64;
    private static SCALE_BASE:number = .7;
    private static SCALE_RANGE:number = .6;

    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(evt:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }
    private _vcCont:Array<MotionSprite>;
    private _iMotionMode:number;

    private _nScaleBase:number;
    private _txInfo:egret.TextField;
    private _bgInfo:egret.Shape;

    private _rectScope:egret.Rectangle;
    private _bCache:boolean;

    private _bmd:egret.BitmapData;

    private imgLoadHandler(evt:egret.Event):void{
        this._bmd = evt.currentTarget.data;
        this._rectScope = new egret.Rectangle(
            0,0,this.stage.stageWidth,this.stage.stageHeight
        );

        this._vcCont = new Array<MotionSprite>();
        for(var i=0;i<CacheBitmapTest.NUM;++i){
            var cont:MotionSprite = new MotionSprite();

            cont.anchorOffsetX = L.W_SHAPE/2;
            cont.anchorOffsetY = L.H_SHAPE/2;
            cont.x = this._rectScope.x + this._rectScope.width*Math.random();
            cont.y = this._rectScope.y + this._rectScope.height*Math.random();
            cont.factor = .8+Math.random()*.4;

            this._vcCont.push(cont);
            this.addChild(cont);
        }

        //随机填充
        BatchContentFiller.reset(this._vcCont);
        BatchContentFiller.fill(this._vcCont);
        BatchContentFiller.autoAncher(this._vcCont);

        //提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);

        this._txInfo.size = 28;
        this._txInfo.x = 250;
        this._txInfo.y = 10;
        this._txInfo.width = this.stage.stageWidth-260;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.cacheAsBitmap = true;

        this._bgInfo = new egret.Shape;
        this.addChildAt(this._bgInfo,this.numChildren-1);

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.cacheAsBitmap = true;

        this._nScaleBase = 0;
        this._bCache = false;

        //用户控制
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
            this.planRdmMotion();
        },this);
        this._txInfo.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
            evt.stopImmediatePropagation();
            this._bCache = !this._bCache;
            for(var i:number=this._vcCont.length-1;i>=0;i--){
                this._vcCont[i].cacheAsBitmap = this._bCache;
            }
            this.updateInfo();
        },this);
        this.planRdmMotion();
        this.stage.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
            /*** 本示例关键代码段开始 ***/
            switch ( this._iMotionMode ){
                case MotionMode.ROT:        /// 旋转并伴随缩放
                    var scale:number = CacheBitmapTest.SCALE_BASE + Math.abs( Math.sin( this._nScaleBase += 0.05 )) * CacheBitmapTest.SCALE_RANGE;
                    for( var i:number = this._vcCont.length - 1; i>=0; i-- ){
                        this._vcCont[ i ].rotation += 3 * ( i%2 ? 1 : -1 ) * this._vcCont[ i ].factor;
                        this._vcCont[ i ].scaleX = this._vcCont[ i ].scaleY = scale;
                    }
                    break;
                case MotionMode.MOV:   /// 移动模式控制
                    var xTo:number;
                    for( var i:number = this._vcCont.length - 1; i>=0; i-- ){
                        xTo = this._vcCont[ i ].x + 3 * ( i%2 ? 1 : -1 ) * this._vcCont[ i ].factor;
                        if( xTo < this._rectScope.left ){
                            xTo = this._rectScope.right;
                        }else if( xTo > this._rectScope.right ){
                            xTo = this._rectScope.left;
                        }
                        this._vcCont[ i ].x = xTo;
                    }
                    break;
            }
            /*** 本示例关键代码段结束 ***/
        }, this );


    }

    private planRdmMotion():void {
        
        if( arguments.callee['runyet'] == undefined ){ /// 第一次随机一个运动模式
            arguments.callee['runyet'] = 1;
            this._iMotionMode = Math.random() > .5 ? MotionMode.ROT : MotionMode.MOV;
        }else{
            this._iMotionMode = ( this._iMotionMode + 1 ) % MotionMode.TOTAL ;
        }
        this.updateInfo();
        
        /// 还原比例
        switch ( this._iMotionMode ){
            case MotionMode.ROT:
                for( var i:number = this._vcCont.length - 1; i>=0; i-- ){
                    this._vcCont[ i ].scaleX = this._vcCont[ i ].scaleY = CacheBitmapTest.SCALE_BASE;
                }
                break;
            case MotionMode.MOV:
                for( var i:number = this._vcCont.length - 1; i>=0; i-- ){
                    this._vcCont[ i ].scaleX = this._vcCont[ i ].scaleY = CacheBitmapTest.SCALE_BASE + Math.random() * CacheBitmapTest.SCALE_RANGE;
                }
                break;
        }
    }

     private updateInfo():void {
        this._txInfo.text =
            "轻触文字切换是否用位图缓存" +
            "\n当前位图缓存：" + ( this._bCache ? "启用\n还卡？换手机吧！" : "关闭\n不卡只能说明机器太牛！" ) +
            "\n轻触舞台切换旋转缩放/平移" +
            "\n当前运动：" + ( ["旋转缩放" , "平移"][this._iMotionMode]  ) ;

        this._bgInfo.graphics.clear();  
        this._bgInfo.graphics.beginFill( 0xffffff, .5 );
        this._bgInfo.graphics.drawRect( 0, 0, this._txInfo.width, this._txInfo.height );
        this._bgInfo.graphics.endFill();
    }

}

class MotionSprite extends egret.Sprite{
    //每一个豫东容器具有独特的因数
    public factor:number;
}

//layout 定义布局的参数
class L{
    public static W_SHAPE:number = 160;
    public static H_SHAPE:number = 210;
}

//运动模式,旋转或平移
class MotionMode2{
    public static ROT:number = 0;
    public static MOV:number = 1;

    public static TOTAL:number = 2;
}

class BatchContentFiller{
    constructor(){}
    public static fill(vcCont:Array<egret.Sprite>){
        for(var i:number=0;i<CacheBitmapTest.UNITS_PER_CONT;i++){
            this.prodRdmGraph(vcCont,L.W_SHAPE,L.H_SHAPE);
        }
    }
    public static prodRdmGraph(vcCont:Array<egret.Sprite>,w:number,h:number):void{
        var iTypeShape:number = Math.floor(Math.random()*2);
        var iFillColor:number = (Math.floor(Math.random()*0xff0000) << 16)
        +(Math.floor(Math.random()*0xff)<<8) 
        + Math.floor(Math.random()*0xff);
        var iLineColor:number = (Math.floor(Math.random()*0xff0000) << 16)
        +(Math.floor(Math.random()*0xff)<<8) 
        + Math.floor(Math.random()*0xff);
        var radius:number = 20+Math.random()*10;
        var wRect:number = 30+Math.random()*20;
        var hRect:number = 20+Math.random()*10;
        var xRdm:number = L.W_SHAPE*Math.random();
        var yRdm:number = L.H_SHAPE*Math.random();
        for(var i:number=vcCont.length-1;i>=0;i--){
            switch(iTypeShape){
                case 0:
                    vcCont[i].graphics.beginFill(iFillColor);
                    vcCont[i].graphics.drawRect(xRdm-wRect/2,yRdm-hRect/2,wRect,hRect);
                    vcCont[i].graphics.endFill();
                    break;
                case 1:
                    vcCont[i].graphics.beginFill(iFillColor);
                    vcCont[i].graphics.drawCircle(xRdm,yRdm,radius);
                    vcCont[i].graphics.endFill();
                    break;
            }
        }
    }
    public static autoAncher(vcCont:Array<egret.Sprite>):void{
        for(var i:number=vcCont.length-1;i>=0;i--){
            vcCont[i].anchorOffsetX = vcCont[i].width/2;
            vcCont[i].anchorOffsetY = vcCont[i].height/2;
        }
    }
    public static reset(vcCont:Array<egret.Sprite>):void{
        for(var i:number=vcCont.length-1;i>=1;i--){
            vcCont[i].graphics.clear();
            vcCont[i].removeChildren();
        }
    }

}