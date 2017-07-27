// TypeScript file
class BitmapTest extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
        RES.loadGroup("preload");
    }

    private onGroupComp()
    {
        var img:egret.Bitmap = new egret.Bitmap();
        img.fillMode = egret.BitmapFillMode.REPEAT;
        img.texture = RES.getRes("handle_png");
        img.width *=2;
        img.height *=3;
        this.addChild(img);
        var img2:egret.Bitmap = new egret.Bitmap();
        img2.texture = RES.getRes("handle_png");
        var rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
        img2.scale9Grid = rect;
        img2.width *=2;
        img2.y = 150;
        this.addChild(img2);

    }

    private onGroupComplete()
    {
        var img:egret.Bitmap = new egret.Bitmap();
        this.addChild(img);
        //img.texture = RES.getRes("bg_jpg");
        img.texture = RES.getRes("test_png");
        //发光滤镜
        //img.filters = [this.getGlowFilter()];
        //颜色矩阵
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        //var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        //img.filters = [colorFilter];
        //var test = colorFilter.matrix;
        /*
        test[4] = 100;
        test[6] = 2;
        test[10] = 1;
        test[12] = 0;
        */
        //colorFilter.matrix=test;
        //var blurFliter = new egret.BlurFilter(1,1);
        //img.filters = [blurFliter];
        img.filters = [this.getDropShadowFilter()];
    }

    private getGlowFilter(color:number=0x33CCFF,alpha:number=0.8,blurX:number=35,blurY:number=35,
        strength:number=2,quality:number=egret.BitmapFilterQuality.HIGH,inner:boolean=false,knockouot:boolean=false){
        var glowfilter:egret.GlowFilter = new egret.GlowFilter(color,alpha,blurX,blurY,
        strength,quality,inner,knockouot);
        return glowfilter;
    }
    private getDropShadowFilter(distance:number=6,angle:number=45,color:number=0x000000,alpha:number=0.7,
        blurX:number=16,blurY:number=16,strength:number=0.65,quality:number=egret.BitmapFilterQuality.LOW,inner:boolean=false,knockout:boolean=false){
        var dropShadowFilter:egret.DropShadowFilter =  new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY,
    strength, quality, inner, knockout);
        return dropShadowFilter;
    }

}