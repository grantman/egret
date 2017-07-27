// TypeScript file
class TextLayoutTest extends egret.DisplayObjectContainer
{
    private text:egret.TextField;

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        this.initText();
        this.changeText();
    }

    private hAlignTexts:{[align:string]:string} = {};
    private vAlignTexts:{[align:string]:string} = {};

    private setAlign(hAlign:string,vAlign:string):void{
        var text:egret.TextField = this.text;
        text.textAlign = hAlign;
        text.verticalAlign = vAlign;
        text.text = this.hAlignTexts[text.textAlign]+"\n"+this.vAlignTexts[text.verticalAlign]+"\n请触摸舞台更换对齐方式";
    }

    private initText():void{
        this.hAlignTexts[egret.HorizontalAlign.LEFT] = "水平对齐:左对齐";
        this.hAlignTexts[egret.HorizontalAlign.CENTER] = "水平对齐:居中对齐";
        this.hAlignTexts[egret.HorizontalAlign.RIGHT] = "水平对齐:右对齐";

        this.vAlignTexts[egret.VerticalAlign.TOP] = "垂直对齐:顶对齐";
        this.vAlignTexts[egret.VerticalAlign.MIDDLE] = "垂直对齐:居中对齐";
        this.vAlignTexts[egret.VerticalAlign.BOTTOM] = "垂直对齐:底对齐";
        
        this.text = new egret.TextField();
        this.text.size = 30;
        this.text.width = this.stage.stageWidth;
        this.text.height = this.stage.stageHeight;
        this.text.lineSpacing = 10;
        this.addChild(this.text);

        this.setAlign(egret.HorizontalAlign.CENTER,egret.VerticalAlign.MIDDLE);
    }

    private changeText():void{
        var self = this;
        var text:egret.TextField = self.text;

        var hAlign:Array<string> = [egret.HorizontalAlign.LEFT,egret.HorizontalAlign.CENTER,
                                    egret.HorizontalAlign.RIGHT];
        var vAlign:Array<string> = [egret.VerticalAlign.TOP,egret.VerticalAlign.MIDDLE,
                                    egret.VerticalAlign.BOTTOM];
        
        var hCount:number = 0;
        var vCount:number = 0;
        self.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
            self.setAlign(hAlign[hCount],vAlign[vCount]);
            vCount++;
            if(vCount>=vAlign.length){
                vCount = 0;
                hCount ++;
                hCount%=hAlign.length;
            }
        },self);
        
    }

}