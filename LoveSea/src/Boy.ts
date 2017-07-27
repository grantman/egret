// TypeScript file
class Boy extends egret.Sprite
{
    public constructor()
    {
        super();
    }

    public order()
    {
        //生成约会事件对象
        var daterEvent:DateEvent = new DateEvent(DateEvent.DATE);
        //添加对应的约会信息
        daterEvent._year = 2017;
        daterEvent._month = 7;
        daterEvent._date = 7;
        daterEvent._where = "肯得几";
        daterEvent._todo = "公斤万产";
        //发送要求事件
        this.dispatchEvent(daterEvent);

    }
}