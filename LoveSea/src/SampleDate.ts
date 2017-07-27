// TypeScript file
class SampleDate extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        //创建一个男朋友
        var boy:Boy = new Boy();
        boy.name = "男朋友";
        //创建一个女朋友
        var girl:Girl = new Girl();
        girl.name = "女朋友";
        //注册侦听器
        boy.addEventListener(DateEvent.DATE,girl.getDate,girl);
        //男朋友发送要求
        boy.order();
        //与会完后,移出侦听器
        boy.removeEventListener(DateEvent.DATE,girl.getDate,girl);
    }

}