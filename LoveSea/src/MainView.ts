// TypeScript file
class MainView extends eui.Component
{
    private btnlogin:eui.Button;
    private btnreg:eui.Button;
    private txtusername:eui.TextInput;
    private txtpassword:eui.TextInput;

    public constructor()
    {
        super();
        this.skinName="MainSkin";
    }

    protected childrenCreated():void{
        this.btnlogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }

    private onClick(event:egret.TouchEvent):void{
        console.log("hello");
    }

}