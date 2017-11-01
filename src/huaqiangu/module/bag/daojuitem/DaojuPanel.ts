module junyou.hqg{
import sui = junyou.sui;
import com = junyou.game;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-07 11:11:51
*/
export class DaojuPanel extends sui.Panel {

    public nameTxt: egret.TextField;
	public closeBtn: sui.Button;
	public useBtn: sui.Button;
	public descTxt: egret.TextField;
	public numericStepper: sui.NumericStepper;
	public slot: sui.Slot;

    constructor() {
        super();
    }

    protected init() {
        this._key = "daojuitem";
        this._className = "ui.daojuitem.DaojuPanel";
        this._baseRect = new egret.Rectangle(65,220,350,360);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", [0, 65, 220, 350, 360, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 103.5, 335.5, 282, 117, 0]);
		this.addChild(dis);
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 183, 264.1, 120, 18, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 370, 224.95, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["useBtn", 182, 519.4, 127, 42, 0]);
		this.addChild(dis);
		this.useBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["descTxt", 114.5, 343.95, 258.5, 100.05, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.descTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.numstep.NumericStepper", ["numericStepper", 108.25, 468.4, 268.45, 36, 0]);
		this.addChild(dis);
		this.numericStepper = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot2", ["slot", 104, 257.1, 70, 70, 0]);
		this.addChild(dis);
		this.slot = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 222, 527.4, 45, 26, 0], 0]));
    }
}

}
