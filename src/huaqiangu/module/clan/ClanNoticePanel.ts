module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:15
*/
export class ClanNoticePanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public confirmBtn: sui.Button;
	public closeBtn: sui.Button;
	public noticeTxt: egret.TextField;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanNoticePanel";
        this._baseRect = new egret.Rectangle(65,275,350,250);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 65, 275, 350, 250, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Input", [0, 98, 343, 280, 105, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["confirmBtn", 175, 463, 127, 42, 0]);
		this.addChild(dis);
		this.confirmBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 362, 281, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["noticeTxt", 116, 359, 240, 100, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.noticeTxt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 215, 471, 45, 26, 0], 31]));
    }
}

}
