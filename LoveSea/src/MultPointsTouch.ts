// TypeScript file
class MultPointsTouch extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoader.load("resource/assets/egret_icon.png");
    }
    private _bird:egret.Bitmap;
    private imgLoadHandler(evt:egret.Event):void
    {
        this._bird = new egret.Bitmap(evt.currentTarget.data);
        this._bird.anchorOffsetX = this._bird.width/2;
        this._bird.anchorOffsetY = this._bird.height/2;
        this._bird.x = this.stage.stageWidth/2;
        this._bird.y = this.stage.stageHeight/2;
        this.addChild(this._bird);

        this.drawText();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
    }

    private touchPoints:Object = {names:[]};
    private distance:number = 0;
    private defAngle:number = 0;
    private touchCon:number = 0;
    private _currentBirdRotation:number = 0;
    private mouseDown(evt:egret.TouchEvent)
    {
        egret.log("touch begin:"+evt.touchPointID);
        if(this.touchPoints[evt.touchPointID]==null){
            this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX,evt.stageY);
            this.touchPoints["names"].push(evt.touchPointID);
        }
        this.touchCon++;
        if(this.touchCon==2)
        {
            this.distance = this.getTouchDistance();
            egret.log("distance:"+this.distance);

            this.defAngle = this.getTouchAngle();
            egret.log("touch angle:"+this.defAngle);
            egret.log("bird angle"+this._bird.rotation);
        }
    }
    private mouseMove(evt:egret.TouchEvent){
        this.touchPoints[evt.touchPointID].x = evt.stageX;
        this.touchPoints[evt.touchPointID].y = evt.stageY;
        if(this.touchCon==2){
            var newdistance = this.getTouchDistance();
            this._bird.scaleX = newdistance/this.distance;
            this._bird.scaleY = this._bird.scaleX;

            var newangle = this.getTouchAngle();
            this._bird.rotation = this._currentBirdRotation+newangle-this.defAngle;
        }
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        egret.log("touch end:"+evt.touchPointID);
        delete this.touchPoints[evt.touchPointID];

        var index:number = this.touchPoints["names"].indexOf(evt.touchPointID);
        if(index>0){
            this.touchPoints["names"].splice(index,1);
        }
        this.touchCon--;

        this._bird.width *=this._bird.scaleX;
        this._bird.height *=this._bird.scaleY;
        this._bird.scaleX = 1;
        this._bird.scaleY = 1;
        this._bird.anchorOffsetX = this._bird.width/2;
        this._bird.anchorOffsetY = this._bird.height/2;
        this._currentBirdRotation = this._bird.rotation;

        egret.log("bird size [width:"+this._bird.width.toFixed(1)+",height:"+this._bird.height.toFixed(1)+"]");
        egret.log("bird angle:"+this._bird.rotation);
    }

    private getTouchDistance():number
    {
        var _distance:number = 0;
        var names = this.touchPoints["names"];
        _distance = egret.Point.distance(this.touchPoints[names[names.length-1]],
            this.touchPoints[names[names.length-2]]);
        return _distance;
    }
    private c:number = 0.017453292;
    private getTouchAngle():number
    {
        var ang:number = 0;
        var names = this.touchPoints["names"];
        var p1:egret.Point = this.touchPoints[names[names.length-1]];
        var p2:egret.Point = this.touchPoints[names[names.length-2]];
        ang = Math.atan2((p1.y-p2.y),(p1.x-p2.x))/this.c;
        return ang;
    }
    private _txInfo:egret.TextField;
    private _bgInfo:egret.Shape;
    private drawText(){
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);

        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;

        this._txInfo.text = "使用移动端,使用双手指作捏合动作\n可缩放显示对象";

        this._bgInfo = new egret.Shape;
        this.addChildAt(this._bgInfo,this.numChildren-1);

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff,.5);
        this._bgInfo.graphics.drawRect(0,0,this._txInfo.width,this._txInfo.height);
        this._bgInfo.graphics.endFill();
    }


}