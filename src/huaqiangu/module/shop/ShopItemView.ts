module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-06 10:36:35
* @private
*/
export class  ShopItemView extends egret.Sprite {

	public _key:string;
    public buyBtn: sui.Button;
	public goldTxt: egret.TextField;
	public nameTxt: egret.TextField;
	public slot: sui.Slot;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "shop";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.slotbg.GoodsBg", [0, 0, 0, 121, 181, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.share.gold", [0, 11, 105, 29, 29, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.btn.EquipBtn", ["buyBtn", 17, 136, 87, 40, 0]);
		this.addChild(dis);
		this.buyBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 40, 110, 65, 22, 0], 0]));
		dis = manager.createTextFieldByData(this._key, [1, ["goldTxt", 46, 112.25, 51, 20, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.goldTxt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 39, 143, 44, 23, 0], 1]));
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 10, 89, 104, 20, 0], [1, "宋体", 1, "#FFFFFF", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 29, 15, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
    }
}

}
