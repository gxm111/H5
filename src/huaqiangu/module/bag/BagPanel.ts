module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:14:44
*/
export class BagPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public tab0: sui.Button;
	public tab1: sui.Button;
	public helpBtn: sui.Button;
	public closeBtn: sui.Button;
	public ronglianBtn: sui.Button;
	public addBtn: sui.Button;
	public numTxt: egret.TextField;
	public scrollBar: sui.ScrollBar;
	public position:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "bag";
        this._className = "ui.bag.BagPanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.PanelBg", ["bg", 0, 0, 480, 800, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", [0, 27, 61, 430, 651.05, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 63, 117.9, 362, 450, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.tab.TabBtn", ["tab0", 75, 87, 86, 30, 0]);
		this.addChild(dis);
		this.tab0 = dis;
		dis = manager.createDisplayObject("lib", "ui.tab.TabBtn", ["tab1", 165, 87, 86, 30, 0]);
		this.addChild(dis);
		this.tab1 = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 70, 626.9, 351, 9, 0], 0]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 40, 635.9, 406, 61, 0], 1]));
		dis = manager.createDisplayObject("lib", "ui.btn.HelpBtn", ["helpBtn", 8, 10, 43, 40, 0]);
		this.addChild(dis);
		this.helpBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.ClosBtn", ["closeBtn", 406, 9, 66, 42, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["ronglianBtn", 179, 645, 127, 42, 0]);
		this.addChild(dis);
		this.ronglianBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.AddBtn", ["addBtn", 381, 581, 35, 35, 0]);
		this.addChild(dis);
		this.addBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt", 259, 589, 120, 18, 0], [1, "宋体", 1, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scrollBar", 402, 128.4, 14, 166, 0]);
		this.addChild(dis);
		this.scrollBar = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 96, 91, 43, 26, 0], 3]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 185, 91, 43, 26, 0], 4]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 222, 5, 50, 26, 0], 5]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 219, 653, 45, 26, 0], 6]));
		this.position=new egret.Rectangle();
		this.position.x=80;
		this.position.y=130;
		this.position.width=340;
		this.position.height=430;
    }
}

}
