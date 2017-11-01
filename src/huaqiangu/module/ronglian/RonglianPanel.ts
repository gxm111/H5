module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-22 10:57:49
*/
export class RonglianPanel extends sui.Panel {

    public bg: egret.Bitmap;
	public helpBtn: sui.Button;
	public ronglianBtn: sui.Button;
	public closeBtn: sui.Button;
	public slot: sui.Slot;
	public slot0: sui.Slot;
	public slot5: sui.Slot;
	public slot4: sui.Slot;
	public slot1: sui.Slot;
	public slot2: sui.Slot;
	public slot3: sui.Slot;
	public checkBtn: sui.Button;

    constructor() {
        super();
    }

    protected init() {
        this._key = "ronglian";
        this._className = "ui.ronglian.RonglianPanel";
        this._baseRect = new egret.Rectangle(8,10,447,629);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject(this._key, "bmd.share.RonglianBg", ["bg", 20, 99, 435, 431, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.HelpBtn", ["helpBtn", 8, 10, 43, 40, 0]);
		this.addChild(dis);
		this.helpBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["ronglianBtn", 178, 597, 127, 42, 0]);
		this.addChild(dis);
		this.ronglianBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 64, 579, 351, 9, 0], 2]));
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn3", ["closeBtn", 328, 127, 42, 42, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot", 201, 294, 70, 70, 0]);
		this.addChild(dis);
		this.slot = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot0", 127, 182, 70, 70, 0]);
		this.addChild(dis);
		this.slot0 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot5", 282, 182, 70, 70, 0]);
		this.addChild(dis);
		this.slot5 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot4", 326, 288, 70, 70, 0]);
		this.addChild(dis);
		this.slot4 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot1", 76, 288, 70, 70, 0]);
		this.addChild(dis);
		this.slot1 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot2", 143, 417, 70, 70, 0]);
		this.addChild(dis);
		this.slot2 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot3", 260, 417, 70, 70, 0]);
		this.addChild(dis);
		this.slot3 = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CheckBtn", ["checkBtn", 127, 540, 120, 35, 0]);
		this.addChild(dis);
		this.checkBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 218, 604, 45, 26, 0], 1]));
    }
}

}
