// TypeScript file
class TextTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        

        var label:egret.TextField = new egret.TextField();
        label.text = "这里是文本测试";
        //label.size = 20;
        label.width = 70;
        label.height = 120;
        label.textColor = 0xff0000;
        label.fontFamily = "KaiTi";
        this.addChild(label);

        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(0,0,400,400);
        shape.graphics.endFill();
        this.addChild(shape);
        
        var lb:egret.TextField = new egret.TextField();
        lb.text = "冰雪起源";
        lb.width = 400;
        lb.height = 400;
        lb.textAlign = egret.HorizontalAlign.RIGHT;
        lb.verticalAlign = egret.VerticalAlign.BOTTOM;
        lb.strokeColor = 0x0000ff;
        lb.stroke = 2;
        lb.bold = true;
        lb.italic = true;
        lb.textFlow = <Array<egret.ITextElement>>[
            {text:"Egret",style:{"textColor":0x00ff00,"size":30,"href":"http://www.baidu.com"}}
        ];
        lb.touchEnabled = true;

        this.addChild(lb);

        
        var txtInput:egret.TextField = new egret.TextField;
        txtInput.type = egret.TextFieldType.INPUT;
        txtInput.width = 282;
        txtInput.height = 43;
        txtInput.x = 50;
        txtInput.y = 50;
        txtInput.textColor = 0xee0000;
        this.layTxBg(txtInput);
        this.addChild(txtInput);


    }

    private layTxBg(tx:egret.TextField):void
    {
        var shp:egret.Shape = new egret.Shape;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRect(tx.x,tx.y,tx.width,tx.height);
        shp.graphics.endFill();
        this.addChild(shp);
    }

}