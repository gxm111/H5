module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:13
*/
export class ClanMemberPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public infoTxt: egret.TextField;
	public lvTxt0: egret.TextField;
	public nameTxt0: egret.TextField;
	public numTxt: egret.TextField;
	public onlineTxt: egret.TextField;
	public lvTxt1: egret.TextField;
	public nameTxt1: egret.TextField;
	public zhanliTxt: egret.TextField;
	public resTxt: egret.TextField;
	public titleTxt: egret.TextField;
	public stateTxt: egret.TextField;
	public scrollBar: sui.ScrollBar;
	public closeBtn: sui.Button;
	public position:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanMemberPanel";
        this._baseRect = new egret.Rectangle(27,60,430,650);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 27, 60, 430, 650, 0]);
		this.addChild(dis);
		this.bg = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 30, 117, 424, 44.95, 0], 3]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 167, 84, 153, 33.95, 0], 24]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 34, 161, 415, 44.95, 0], 4]));
		dis = manager.createTextFieldByData(this._key, [1, ["infoTxt", 47, 134, 70, 18, 0], [1, "宋体", 1, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.infoTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt0", 116, 134, 60, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt0", 177, 134, 90, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt", 268, 134, 93, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["onlineTxt", 361, 134, 83, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.onlineTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt1", 41, 174, 59, 19.95, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt1 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt1", 100, 174, 98, 19.95, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt1 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["zhanliTxt", 198, 174, 70, 19.95, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.zhanliTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["resTxt", 268, 174, 54, 19.95, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.resTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["titleTxt", 322, 174, 51, 19.95, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.titleTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["stateTxt", 373, 174, 73, 19.95, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.stateTxt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 203, 91, 79, 22.95, 0], 25]));
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scrollBar", 437, 199, 14, 165.75, 0]);
		this.addChild(dis);
		this.scrollBar = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 410, 77, 35, 34.95, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		this.position=new egret.Rectangle();
		this.position.x=40;
		this.position.y=204;
		this.position.width=400;
		this.position.height=480;
    }
}

}
