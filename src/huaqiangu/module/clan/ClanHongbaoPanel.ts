module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:35
*/
export class ClanHongbaoPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public promptTxt: egret.TextField;
	public confirmBtn: sui.Button;
	public closeBtn: sui.Button;
	public numTxt0: egret.TextField;
	public numTxt1: egret.TextField;
	public numTxt2: egret.TextField;
	public helpBtn: sui.Button;
	public numericStepper: sui.NumericStepper;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanHongbaoPanel";
        this._baseRect = new egret.Rectangle(39,185,410,430);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 39, 185, 410, 430, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 64.95, 317, 360, 214, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 50, 198, 389, 129, 0], 1]));
		dis = manager.createTextFieldByData(this._key, [1, ["promptTxt", 104, 338, 278, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.promptTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["confirmBtn", 183, 548, 127, 42, 0]);
		this.addChild(dis);
		this.confirmBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 406, 195, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt0", 145, 438, 200, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt1", 145, 462, 200, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt1 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt2", 145, 485, 200, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt2 = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.HelpBtn", ["helpBtn", 42, 194, 43, 40, 0]);
		this.addChild(dis);
		this.helpBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.numstep.NumericStepper", ["numericStepper", 111, 376, 268.45, 36, 0]);
		this.addChild(dis);
		this.numericStepper = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 223, 555, 45, 26, 0], 31]));
    }
}

}
