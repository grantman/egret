// TypeScript file
class SoundTest extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
    }
    private onAddToStage()
    {
        this.startLoad();
    }
    private startLoad():void{
        //创建URLLoader对象
        var loader:egret.URLLoader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成帧听
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        //音频文件
        var url:string = "resource/assets/sounds/test.mp3";
        var request:egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }
    private sound:egret.Sound;
    private soundChannel:egret.SoundChannel;
    private onLoadComplete(event:egret.Event){
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        var sound:egret.Sound = <egret.Sound>loader.data;
        this.sound = sound;
        //播放按钮
        var btn= new egret.Sprite();
        btn.graphics.beginFill(0x18f7ff);
        btn.graphics.drawRoundRect(0,0,80,40,5,5);
        btn.graphics.endFill();
        btn.touchEnabled=true;
        btn.anchorOffsetX = btn.width/2;
        btn.x = this.stage.stageWidth/2;
        btn.anchorOffsetY = btn.height/2;
        btn.y = this.stage.$stageHeight/2;
        //监听按钮的触摸时间
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.addChild(btn);
    }
    private onTouch(event:egret.Event)
    {
        var sound = this.sound;
        var channel:egret.SoundChannel = this.soundChannel;
        if(channel){
            console.log(channel);
            channel.stop;
            this.soundChannel = null;
            return;
        }
        //使用soundchannel播放音频
        channel = sound.play(0,-1);
        console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
        this.soundChannel = channel;
    }
    private onSoundComplete(event:egret.Event):void{
        console.log("onSoundComplete");

    }
}