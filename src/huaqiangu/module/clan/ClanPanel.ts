module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-27 15:11:02
*/
export class ClanPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public helpBtn: sui.Button;
	public closeBtn: sui.Button;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanPanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.PanelBg", ["bg", 0, 0, 480, 800, 0]);
		this.addChild(dis);
		this.bg = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 222, 5, 50, 26, 0], 30]));
		dis = manager.createDisplayObject("lib", "ui.btn.HelpBtn", ["helpBtn", 8, 10, 43, 40, 0]);
		this.addChild(dis);
		this.helpBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.ClosBtn", ["closeBtn", 406, 9, 66, 42, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
    }
}

}
