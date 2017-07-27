// TypeScript file
class StartTickerTest extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onLoad,this);
    }
    private star:egret.Bitmap;
    private speed:number=0.05;
    private time:number=0;
    private onLoad(event:egret.Event)
    {
        var star:egret.Bitmap = new egret.Bitmap(RES.getRes("handle_png"));
        this.addChild(star);
        this.star = star;
        this.time = egret.getTimer();
        egret.startTick(this.moveStar,this);
    }
    private moveStar(timeStamp:number):boolean{
        var now = timeStamp;
        var time = this.time;
        var pass = now-time;
        console.log("moveStar:",(1000/pass).toFixed(5));
        this.star.x += this.speed * pass;
        if(this.star.x>300){
            egret.stopTick(this.moveStar,this);
        }
        this.time = now;
        return false;
    }

}