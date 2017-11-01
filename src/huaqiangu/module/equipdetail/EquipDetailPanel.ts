module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-08-19 16:07:40
*/
export class EquipDetailPanel extends sui.Panel {

    public nameTF: egret.TextField;
	public swapBtn: sui.Button;
	public closeBtn: sui.Button;
	public slot: sui.Slot;
	public scrollbar: sui.ScrollBar;
	public xpos:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "equipDetail";
        this._className = "ui.equipdetail.EquipDetailPanel";
        this._baseRect = new egret.Rectangle(38,159,368,293);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.PanelBg", [0, 0, 0, 434, 592, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 39, 486, 369, 78, 0], 0]));
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 24, 50, 388, 414, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 173, 11, 88, 26, 0], 1]));
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 203, 90.95, 181, 18, 0], [1, "宋体", 0, "#FEA801", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 39, 143, 351, 9, 0], 3]));
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["swapBtn", 158, 505, 127, 42, 0]);
		this.addChild(dis);
		this.swapBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 386, 12, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 124, 70, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 198, 513, 45, 26, 0], 2]));
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scrollbar", 392, 161, 14, 166, 0]);
		this.addChild(dis);
		this.scrollbar = dis;
		this.xpos=new egret.Rectangle();
		this.xpos.x=38;
		this.xpos.y=159;
		this.xpos.width=358;
		this.xpos.height=293;
    }
}

}
