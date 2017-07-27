// TypeScript file
class DeviceOrientationTest extends egret.DisplayObjectContainer
{
    private label:egret.TextField;
    public constructor()
    {
        super();
        this.label = new egret.TextField();
        this.label.x = 50;
        this.label.y = 50;
        this.addChild(this.label);
        //创建deviceorientation类
        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        //开始监听
        orientation.start();
    }
    private onOrientation(e:egret.OrientationEvent)
    {
        this.label.text = "方向：\n alpha:"+e.alpha+",\n beta:"+e.beta+",\n gamma:"+e.gamma;
    }
}