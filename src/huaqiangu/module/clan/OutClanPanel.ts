module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:14
*/
export class OutClanPanel extends sui.Panel {

    public createBtn: sui.Button;
	public scrollBar: sui.ScrollBar;
	public lvTxt: egret.TextField;
	public nameTxt: egret.TextField;
	public numTxt: egret.TextField;
	public actionTxt: egret.TextField;
	public position:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.OutClanPanel";
        this._baseRect = new egret.Rectangle(27,60,430,650);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", [0, 27, 60, 430, 650, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 44, 634, 396, 61, 0], 2]));
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["createBtn", 183, 645, 127, 42, 0]);
		this.addChild(dis);
		this.createBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scrollBar", 438, 149, 14, 166, 0]);
		this.addChild(dis);
		this.scrollBar = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 222, 653, 45, 26, 0], 32]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 167, 78, 153, 34, 0], 24]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 203, 85, 79, 23, 0], 26]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 35, 110, 415, 45, 0], 4]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 144, 116, 2, 31, 0], 40]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 257, 116, 2, 31, 0], 40]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 363, 116, 2, 31, 0], 40]));
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt", 44, 126, 100, 20, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 146, 126, 110, 20, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt", 259, 126, 100, 20, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["actionTxt", 365, 126, 80, 20, 0], [1, "宋体", 1, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.actionTxt = dis;
		this.position=new egret.Rectangle();
		this.position.x=40;
		this.position.y=155;
		this.position.width=400;
		this.position.height=490;
    }
}

}
