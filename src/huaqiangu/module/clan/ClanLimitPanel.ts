module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:34
*/
export class ClanLimitPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public closeBtn: sui.Button;
	public confirmBtn: sui.Button;
	public position:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanLimitPanel";
        this._baseRect = new egret.Rectangle(39,200,410,410);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 39, 200, 410, 410, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 406, 212, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["confirmBtn", 182, 485, 127, 42, 0]);
		this.addChild(dis);
		this.confirmBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 220, 493, 45, 26, 0], 31]));
		this.position=new egret.Rectangle();
		this.position.x=120;
		this.position.y=290;
		this.position.width=250;
		this.position.height=190;
    }
}

}
