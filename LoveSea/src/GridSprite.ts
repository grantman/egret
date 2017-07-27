// TypeScript file
class GridSprite extends egret.Sprite
{
    public constructor(){
        super();
        this.drawGrid();
    }

    private drawGrid()
    {
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0,0,50,50);
        this.graphics.endFill();

        this.graphics.beginFill(0x00ff00);
        this.graphics.drawRect(0,50,50,50);
        this.graphics.endFill();

        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(50,0,50,50);
        this.graphics.endFill();

        this.graphics.beginFill(0xff00ff);
        this.graphics.drawRect(50,50,50,50);
        this.graphics.endFill();

        var spr:egret.Sprite = new egret.Sprite();
        spr.graphics.beginFill(0x0000ff);
        spr.graphics.drawRect(10,10,50,50);
        spr.graphics.endFill();
        this.addChild(spr);//添加到显示列表
        this.removeChild(spr);//删除显示对象

        var sprcon1:egret.Sprite = new egret.Sprite();
        sprcon1.name = "sp1";
        sprcon1.graphics.beginFill(0x00ff00);
        sprcon1.graphics.drawRect(0,0,200,200);
        sprcon1.graphics.endFill();
        this.addChild(sprcon1);
        sprcon1.x = 80;
        sprcon1.y = 120;

        for(var i:number=0;i<5;i++)
        {
            let spr:egret.Sprite = new egret.Sprite();
            spr.graphics.beginFill( 0xffffff * Math.random() );
            spr.graphics.drawRect( 50, 50,100, 100);
            spr.graphics.endFill();
            spr.x = i*20;
            sprcon1.addChild(spr);
        }

        var sprNew:egret.Sprite = new egret.Sprite();
        sprNew.graphics.beginFill( 0xff0000 );
        sprNew.graphics.drawRect( 0, 0, 300, 150 );
        sprNew.graphics.endFill();
        sprNew.x = 10;
        sprNew.y = 50;
        sprcon1.addChildAt( sprNew, 1 );

        var sprcon2:egret.Sprite = new egret.Sprite();
        sprcon2.name = "sp2";
        sprcon2.graphics.beginFill(0xff0000);
        sprcon2.graphics.drawRect(0,0,100,100);
        sprcon2.graphics.endFill();
        this.addChild(sprcon2);
        sprcon2.y = 80;

        sprcon2.addChild(spr);
        
        
        this.swapChildren(sprcon1,sprcon2);//交换深度
        //this.swapChildrenAt(1,0);
        this.setChildIndex(sprcon2,1);

        var _spr:egret.DisplayObject = this.getChildAt(0);
        _spr.alpha = 0.1;
        var _spr2:egret.DisplayObject = this.getChildByName( "sp2" );//耗性能
        _spr2.alpha = 0.3;

        
    }
}