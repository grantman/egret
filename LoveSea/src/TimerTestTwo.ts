// TypeScript file
class TimerTestTwo extends egret.DisplayObjectContainer
{
    private _txInfo:egret.TextField;
    private timer:egret.Timer;
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private pointer = new egret.Shape();
    private three = new egret.Shape();
    private six = new egret.Shape();
    private nine = new egret.Shape();
    private twelve = new egret.Shape();
    private onAddToStage(event:egret.Event){
        //生成表盘
        var circle = new egret.Shape();
        circle.graphics.lineStyle(5,0x000000,1,true);
        circle.graphics.drawCircle(0,0,170)
        circle.graphics.endFill();
        circle.x = this.stage.stageWidth/2;
        circle.y = this.stage.stageHeight/2;
        this.addChild(circle);

        //生成指针
        this.pointer = new egret.Shape();
        this.pointer.graphics.beginFill(0x000000);
        this.pointer.graphics.drawRect(0,0,160,5);
        this.pointer.graphics.endFill();
        this.pointer.anchorOffsetY=this.pointer.height/2;
        this.pointer.x = this.stage.stageWidth/2;
        this.pointer.y = this.stage.stageHeight/2;
        this.addChild(this.pointer);

        //生成标记
        this.three = new egret.Shape();
        this.three.graphics.lineStyle(10,0x000000);
        this.three.graphics.moveTo(this.stage.stageWidth/2+160,this.stage.stageHeight/2);
        this.three.graphics.lineTo(this.stage.stageWidth/2+165,this.stage.stageHeight/2);
        this.addChild(this.three);

        this.six = new egret.Shape();
        this.six.graphics.lineStyle(10,0x000000);
        this.six.graphics.moveTo(this.stage.stageWidth/2,this.stage.stageHeight/2+160);
        this.six.graphics.lineTo(this.stage.stageWidth/2,this.stage.stageHeight/2+165);
        this.addChild(this.six);

        this.nine = new egret.Shape();
        this.nine.graphics.lineStyle(10,0x000000);
        this.nine.graphics.moveTo(this.stage.stageWidth/2-160,this.stage.stageHeight/2);
        this.nine.graphics.lineTo(this.stage.stageWidth/2-160-5,this.stage.stageHeight/2);
        this.addChild(this.nine);

        this.twelve = new egret.Shape();
        this.twelve.graphics.lineStyle(10,0x000000);
        this.twelve.graphics.moveTo(this.stage.stageWidth/2,this.stage.stageHeight/2-160);
        this.twelve.graphics.lineTo(this.stage.stageWidth/2,this.stage.stageHeight/2-160-5);
        this.addChild(this.twelve);

        //提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 24;
        this._txInfo.textColor = 0x000000;
        this._txInfo.lineSpacing = 10;
        this._txInfo.multiline = true;
        this._txInfo.text = "定时器示例\n点击舞台启动或暂停定时器";
        this._txInfo.x = 30;
        this._txInfo.y = 30;
        this.addChild(this._txInfo);

        var self = this;
        this.timer = new egret.Timer(1000,0);

        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);

        this.timer.start();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            if(this.timer.running){
                this._txInfo.text +="关闭\n";
                this.timer.stop();
            }else{
                this._txInfo.text += "开启\n";
                this.timer.start();
            }
        },this); 


    }

    private timerFunc(event:egret.Event){
        this.pointer.rotation +=6;
        if(this.pointer.rotation>360){
            this.pointer.rotation -=360;
        }
    }



}