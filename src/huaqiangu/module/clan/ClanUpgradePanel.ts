module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:15
*/
export class ClanUpgradePanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public resTxt: egret.TextField;
	public closeBtn: sui.Button;
	public upgradeBtn: sui.Button;
	public lvTxt0: egret.TextField;
	public lvTxt1: egret.TextField;
	public maxNumTxt0: egret.TextField;
	public maxNumTxt1: egret.TextField;
	public assiNumTxt0: egret.TextField;
	public assiNumTxt1: egret.TextField;
	public promptTxt: egret.TextField;
	public slot0: sui.Slot;
	public slot1: sui.Slot;
	public slot2: sui.Slot;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanUpgradePanel";
        this._baseRect = new egret.Rectangle(39,212,410,410);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 39, 212, 410, 410, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Input", [0, 64, 268.05, 155, 96, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Input", [0, 263, 268.05, 155, 96, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 67, 238, 79, 23, 0], 27]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 231, 302, 32, 29, 0], 34]));
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 65, 371, 355, 117, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg4", [0, 211, 492, 94, 22, 0]);
		this.addChild(dis);
		dis = manager.createTextFieldByData(this._key, [1, ["resTxt", 175, 495, 130, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.resTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 406, 224, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["upgradeBtn", 178, 519, 127, 42, 0]);
		this.addChild(dis);
		this.upgradeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt0", 67, 281, 148, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt1", 268, 281, 148, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt1 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["maxNumTxt0", 67, 307, 148, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.maxNumTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["maxNumTxt1", 268, 307, 148, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.maxNumTxt1 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["assiNumTxt0", 67, 334, 148, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.assiNumTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["assiNumTxt1", 268, 334, 148, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.assiNumTxt1 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["promptTxt", 82, 385, 264, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.promptTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot0", 121, 407, 66, 68, 0]);
		this.addChild(dis);
		this.slot0 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot1", 210, 407, 66, 68, 0]);
		this.addChild(dis);
		this.slot1 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot2", 300, 407, 66, 68, 0]);
		this.addChild(dis);
		this.slot2 = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 218, 527, 45, 26, 0], 33]));
    }
}

}
