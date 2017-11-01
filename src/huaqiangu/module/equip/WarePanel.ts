module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-08-19 11:37:51
*/
export class WarePanel extends sui.Panel {

    public closeBtn: sui.Button;
	public scrollbar: sui.ScrollBar;
	public line: sui.ScaleBitmap;
	public gg:egret.Sprite;

    constructor() {
        super();
    }

    protected init() {
        this._key = "wareequip";
        this._className = "ui.equip.WarePanel";
        this._baseRect = new egret.Rectangle(0,0,434,592);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.PanelBg", [0, 0, 0, 434, 592, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 175, 13, 86, 24, 0], 4]));
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 386, 12, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scrollbar", 416, 183, 14, 166, 0]);
		this.addChild(dis);
		this.scrollbar = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Cutline1", ["line", 12, 172, 410, 7, 0]);
		this.addChild(dis);
		this.line = dis;
		this.gg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 345, 18, 0], 3]);
		this.gg.addChild(dis);
		this.gg.x=48;
		this.gg.y=178;
		this.addChild(this.gg);
    }
}

}
