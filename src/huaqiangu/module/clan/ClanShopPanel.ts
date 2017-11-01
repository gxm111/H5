module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:14
*/
export class ClanShopPanel extends sui.Panel {

    public shengwangTxt: egret.TextField;
	public honorTxt: egret.TextField;
	public goldTxt: egret.TextField;
	public moneyTxt: egret.TextField;
	public scrollBar: sui.ScrollBar;
	public position:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanShopPanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", [0, 27, 85, 430, 650, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 29, 93, 424, 38.95, 0], 5]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 480, 321, 0], 0]));
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg4", [0, 64, 99, 76, 21.95, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg4", [0, 154, 99, 76, 21.95, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg4", [0, 245, 99, 76, 21.95, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg4", [0, 335, 99, 76, 21.95, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 48, 96, 29, 28.95, 0], 35]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 139, 96, 29, 28.95, 0], 36]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 230, 96, 29, 28.95, 0], 37]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 321, 96, 29, 28.95, 0], 38]));
		dis = manager.createTextFieldByData(this._key, [1, ["shengwangTxt", 80, 101, 70, 20.95, 0], [1, "宋体", 0, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.shengwangTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["honorTxt", 168, 101, 70, 20.95, 0], [1, "宋体", 0, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.honorTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["goldTxt", 260, 101, 70, 20.95, 0], [1, "宋体", 0, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.goldTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["moneyTxt", 348, 101, 70, 20.95, 0], [1, "宋体", 0, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.moneyTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scrollBar", 434, 132, 14, 165.75, 0]);
		this.addChild(dis);
		this.scrollBar = dis;
		this.position=new egret.Rectangle();
		this.position.x=45;
		this.position.y=135;
		this.position.width=400;
		this.position.height=590;
    }
}

}
