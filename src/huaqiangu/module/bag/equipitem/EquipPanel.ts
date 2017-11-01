module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-07 11:28:19
*/
export class EquipPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public nameTxt: egret.TextField;
	public closeBtn: sui.Button;
	public descTxt: egret.TextField;
	public ronglianBtn: sui.Button;
	public slot: sui.Slot;

    constructor() {
        super();
    }

    protected init() {
        this._key = "equipitem";
        this._className = "ui.equipitem.EquipPanel";
        this._baseRect = new egret.Rectangle(65,220,350,360);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 65, 220, 350, 360, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 104, 335.9, 280, 160, 0]);
		this.addChild(dis);
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 183, 264.1, 120, 18, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 370, 224.95, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["descTxt", 125, 346.05, 240, 137, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.descTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["ronglianBtn", 183, 511.4, 127, 42, 0]);
		this.addChild(dis);
		this.ronglianBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot", 104, 257.1, 70, 70, 0]);
		this.addChild(dis);
		this.slot = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 222, 519.4, 45, 26, 0], 0]));
    }
}

}
