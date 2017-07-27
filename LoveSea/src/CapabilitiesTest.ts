// TypeScript file
class CapabilitiesTest extends egret.Sprite
{
    public constructor()
    {
        super();
        var capabilities:Array<egret.ITextElement> = [
            {text:"移动设备："+egret.Capabilities.isMobile+"\n",style:{size:17,"fontFamily":"楷体"}},
            {text:"语言代码："+egret.Capabilities.language+"\n",style:{size:17,"fontFamily":"楷体"}},
            {text:"操作系统："+egret.Capabilities.os+"\n",style:{size:17,"fontFamily":"楷体"}},
            {text:"运行类型："+egret.Capabilities.runtimeType+"\n",style:{size:17,"fontFamily":"楷体"}}
            
        ];
        var showCapabilities:egret.TextField = new egret.TextField();
        showCapabilities.textFlow = capabilities;
        this.addChild(showCapabilities);
    }
}