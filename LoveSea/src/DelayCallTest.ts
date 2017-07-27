// TypeScript file
class DelayCallTest extends egret.DisplayObjectContainer
{
    private _txInfo:egret.TextField;
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private isComplete:boolean;
    private onAddToStage(event:egret.Event){
        this._txInfo = new egret.TextField;
        this._txInfo.size = 24;
        this._txInfo.textColor = 0x000000;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "延迟调用示例\n点击舞台显示效果";
        this.x = 30;
        this.y = 30;
        this.addChild(this._txInfo);

        var self = this;
        self.isComplete = true;

        var backFun:Function = function (){
            self.isComplete = true;
        };

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(self.isComplete){
                self.isComplete = false;
                this.typerEffect(this._txInfo,"每个字符延迟150毫秒调用,实现打字机效果\n",150,backFun);
            }
        },this);


    }

        private typerEffect(obj,content:string="",interval:number=200,backFunc:Function=null):void{
            var strArr:Array<any> = content.split("");
            var len:number = strArr.length;
            for(var i=0;i<len;i++){
                egret.setTimeout(function(){
                    obj.appendText(strArr[Number(this)]);
                    if((Number(this)>=len-1) && backFunc!=null){
                        backFunc();
                    }
                },i,interval*i);
            }
        }
}