// TypeScript file
class GraphicsTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    public onAddToStage(event:egret.Event){
        var shp:egret.Shape = new egret.Shape();
        shp.x = 100;
        shp.y = 100;
        shp.graphics.lineStyle(10,0x00ff00);

        //shp.graphics.beginFill(0xff0000,1);
        shp.graphics.drawRect(0,0,100,200);

  
        shp.graphics.lineStyle(5,0x0000ff);
        shp.graphics.drawCircle(0,0,50);

        shp.graphics.lineStyle(20,0x000000);
        shp.graphics.moveTo(10,10);
        shp.graphics.lineTo(300,20);
        shp.graphics.lineStyle(10,0xffffff*Math.random());
        shp.graphics.lineTo( 221, 118*Math.random() );
        shp.graphics.lineStyle(10,0xffffff*Math.random());
        shp.graphics.lineTo( 290, 162*Math.random() );
        shp.graphics.lineStyle(10,0xffffff*Math.random());
        shp.graphics.lineTo( 297, 228*Math.random() );
        shp.graphics.lineStyle(10,0xffffff*Math.random());
        shp.graphics.lineTo( 412, 250*Math.random() );
        shp.graphics.lineTo( 443, 174*Math.random() );

        //2曲线
        shp.graphics.lineStyle(15,0xffffff);
        shp.graphics.moveTo(50,50);
        shp.graphics.curveTo(50,500,500,20);
        //圆弧
        shp.graphics.beginFill(0x1122cc);
        shp.graphics.drawArc(200,200,100,0,Math.PI,false);

        shp.graphics.lineStyle(12, 0xffff00);
        shp.graphics.drawArc(400, 400, 50, 0, Math.PI / 50 * 30, false);

        shp.graphics.endFill();
        this.addChild(shp);
        //shp.graphics.clear();

    }


}