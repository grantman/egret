// TypeScript file
class GeolocationTest extends egret.DisplayObjectContainer
{
    private label: egret.TextField;
    public constructor(){
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
    }
    private onAddtoStage(){
        //显示信息的label
        var label = new egret.TextField();
        label.x = this.stage.stageWidth / 2;
        this.addChild(label);
        label.size = 20;
        label.fontFamily = "楷体";
        label.text = "暂未获取到经纬度信息";
        label.anchorOffsetX = label.width / 2;

        this.label = label;

        var gps = new egret.Geolocation();
        //监听经纬度变化的事件
        gps.addEventListener(egret.Event.CHANGE,this.onGotLocation,this);
        //监听用户拒绝事件
        gps.once(egret.GeolocationEvent.PERMISSION_DENIED,this.userDenied,this);
        //监听失败事件
        gps.addEventListener(egret.GeolocationEvent.UNAVAILABLE,this.unAvailable,this);
        gps.start();
    }
    private onGotLocation(e:egret.GeolocationEvent){
        this.label.text = "纬度:"+e.latitude.toFixed(4)+" \n海拔："+e.altitude+" \n 经度："+e.longitude.toFixed(4)+" \n 速度："+e.speed;
        this.label.anchorOffsetX = this.label.width/2;

    }
    private userDenied(e:egret.GeolocationEvent){
        this.label.text = "用户拒绝访问位置信息,获取位置信息失败";
        this.label.anchorOffsetX = this.label.width/2;
    }
    private unAvailable(e:egret.GeolocationEvent){
        this.label.text = "获取位置信息失败："+e.errorMessage+"\n"+" 错误类型"+e.errorType;
        this.label.anchorOffsetX = this.label.width/2;
    }

}