module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-06 10:36:35
*/
export class ShopPanel extends sui.Panel {

    public goldBtn: sui.Button;
	public moneyBtn: sui.Button;
	public closeBtn: sui.Button;
	public moneyTxt: egret.TextField;
	public goldTxt: egret.TextField;
	public refreshTxt: egret.TextField;
	public refreshBtn: sui.Button;
	public costTxt: egret.TextField;
	public listcon:egret.Sprite;

    constructor() {
        super();
    }

    protected init() {
        this._key = "shop";
        this._className = "ui.shop.ShopPanel";
        this._baseRect = new egret.Rectangle(53,234,0,0);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 480, 800, 0], 5]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 36, 169, 100, 24, 0], 2]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 179, 169, 100, 24, 0], 2]));
		dis = manager.createDisplayObject("lib", "bmd.share.gold", [0, 20, 168, 29, 29, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.share.coin", [0, 166, 167, 29, 29, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.btn.AddBtn", ["goldBtn", 125, 164, 35, 35, 0]);
		this.addChild(dis);
		this.goldBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.AddBtn", ["moneyBtn", 263, 163, 35, 35, 0]);
		this.addChild(dis);
		this.moneyBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.ClosBtn", ["closeBtn", 407, 3, 66, 42, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["moneyTxt", 195, 173, 70, 20, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.moneyTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["goldTxt", 49, 174, 70, 20, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.goldTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["refreshTxt", 145, 633.2, 194, 20, 0], [1, "宋体", 1, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.refreshTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["refreshBtn", 180, 668, 127, 42, 0]);
		this.addChild(dis);
		this.refreshBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 220, 675, 45, 26, 0], 3]));
		dis = manager.createTextFieldByData(this._key, [1, ["costTxt", 314, 679.2, 80, 20, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.costTxt = dis;
		dis = manager.createDisplayObject("lib", "bmd.share.gold", [0, 393, 673, 29, 29, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 60, 652, 351, 9, 0], 4]));
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 40, 219, 400, 400, 0]);
		this.addChild(dis);
		this.listcon=new egret.Sprite();
		this.listcon.x=53;
		this.listcon.y=234;
		this.addChild(this.listcon);
    }
}

}
