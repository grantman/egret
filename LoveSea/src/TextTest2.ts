// TypeScript file
class TextTest2 extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var text:egret.TextField = new egret.TextField();
        text.type = egret.TextFieldType.INPUT;
        text.inputType = egret.TextFieldInputType.TEXT;
        text.text = "输入文本";
        text.width = 300;
        this.layTxBg(text);
        this.addChild(text);

        var pass:egret.TextField = new egret.TextField;
        pass.type = egret.TextFieldType.INPUT;
        pass.inputType = egret.TextFieldInputType.PASSWORD;
        pass.displayAsPassword = true;
        pass.text = "输入密码";
        pass.y = 100;
        pass.width = 300;
        this.layTxBg(pass);
        this.addChild(pass);

        var tel:egret.TextField = new egret.TextField;
        tel.text = "输入电话号码";
        tel.y = 200;
        tel.width = 300;
        this.layTxBg(tel);
        this.addChild(tel);

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