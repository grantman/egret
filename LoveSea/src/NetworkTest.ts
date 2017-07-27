// TypeScript file
class NetworkTest extends egret.DisplayObjectContainer
{
    private statusGetLabel:egret.TextField;
    private statusPostLabel:egret.TextField;
    public constructor()
    {
        super();
        var url = "resource/config/description.json";
        url = "resource/assets/egret_icon.png";
        this.loadTxtOrBinary(url,true);
    }

    private loadTxtOrBinary(url:string,isbin:boolean=false){
        var request:egret.HttpRequest = new egret.HttpRequest();
        if(isbin){
            request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        }
        var respHandler = function(evt:egret.Event):void{
            switch(evt.type)
            {
                case egret.Event.COMPLETE:
                    var request:egret.HttpRequest = evt.currentTarget;
                    if(isbin){
                        var ab:ArrayBuffer = request.response;
                        console.log("respHandler:n",ab.byteLength);
                    }else{
                        console.log("respHandler:n",request.response);
                    }
                    break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
            }
        }
        var progressHandler = function (evt:egret.ProgressEvent):void
        {
            console.log("progress:",evt.bytesLoaded,evt.bytesTotal);
        }
        request.once(egret.ProgressEvent.PROGRESS,progressHandler,null);
        request.once(egret.Event.COMPLETE,respHandler,null);
        request.once(egret.IOErrorEvent.IO_ERROR,respHandler,null);
        request.open(url,egret.HttpMethod.GET);
        request.send();
    }

    private loadimg()
    {
        var imgLoad:egret.ImageLoader = new egret.ImageLoader;
        imgLoad.once(egret.Event.COMPLETE,this.imgLoadHandler,this);
        imgLoad.load("resource/assets/egret_icon.png");
    }
    private imgLoadHandler(evt:egret.Event):void
    {
        var loader:egret.ImageLoader = evt.currentTarget;
        var bmd:egret.BitmapData = loader.data;
        var bmp:egret.Bitmap = new egret.Bitmap(bmd);
        this.addChild(bmp);
    }

    private sendGetRequest():void
    {
        var statusGetLabel = new egret.TextField();
        this.statusGetLabel = statusGetLabel;
        statusGetLabel.size = 18;
        statusGetLabel.text = "Get request being sent to httpbin.org";
        this.addChild(statusGetLabel);
        statusGetLabel.x = 50;
        statusGetLabel.y = 40;
        var params = "?p1=getP1&p2=getP2";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://test.sqlink.cn/test.php"+params,egret.HttpMethod.GET);
        
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:egret.Event):void
    {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "Get Response:\n"+request.response.substring(0,50)+"..";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        this.statusGetLabel.text = "Get Response!";
    }

    private onGetIOError(event:egret.IOErrorEvent):void
    {
        console.log("get error:"+event);
    }

    private onGetProgress(event:egret.ProgressEvent):void
    {
        console.log("get progress:"+Math.floor(100*event.bytesLoaded/event.bytesTotal)+"%");
    }

    private sendPostRequest(){
        var statusPostLabel = new egret.TextField();
        this.statusGetLabel = statusPostLabel;
        this.addChild(statusPostLabel);
        statusPostLabel.size = 18;
        statusPostLabel.x = 18;
        statusPostLabel.y = 40;
        statusPostLabel.text = "Sending Post request to sqlink";
        var params = "p1=postP1&p2=postP2";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://test.sqlink.cn/test.php",egret.HttpMethod.POST);
        request.send(params);
        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }

    private onPostComplete(event:egret.Event){
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data:",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "post response:\n"+request.response.substring(0,50)+"...";
        this.addChild(responseLabel);
        responseLabel.x = 300;
        responseLabel.y = 70;
        this.statusPostLabel.text = "get post response!";
    }

    private onPostIOError(event:egret.IOErrorEvent):void
    {
        console.log("post error:"+event);
    }

    private onPostProgress(event:egret.ProgressEvent):void
    {
        console.log("post progress:"+Math.floor(100*event.bytesLoaded/event.bytesTotal)+"%");
    }

}