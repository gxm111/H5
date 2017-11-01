module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:35
* @private
*/
export class  ClanShopListItemView extends egret.Sprite {

	public _key:string;
    public slot: sui.Slot;
	public nameTxt: egret.TextField;
	public lastTxt: egret.TextField;
	public costTxt: egret.TextField;
	public actionBtn: sui.Button;
	public costTxt1: egret.TextField;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "clan";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg3", [0, -1, -1, 397, 99, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 17, 13, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 98, 15, 140, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lastTxt", 98, 43, 140, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lastTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["costTxt", 290, 19, 100.05, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.costTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn2", ["actionBtn", 312, 48, 57, 28, 0]);
		this.addChild(dis);
		this.actionBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["costTxt1", 98, 70, 140, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.costTxt1 = dis;
    }
}

}
