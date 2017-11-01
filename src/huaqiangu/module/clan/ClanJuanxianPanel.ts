module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:35
*/
export class ClanJuanxianPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public promptTxt: egret.TextField;
	public closeBtn: sui.Button;
	public position:egret.Rectangle;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.ClanJuanxianPanel";
        this._baseRect = new egret.Rectangle(39,200,410,410);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 39, 200, 410, 410, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["promptTxt", 68, 242, 278, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.promptTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 406, 212, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		this.position=new egret.Rectangle();
		this.position.x=65;
		this.position.y=265;
		this.position.width=350;
		this.position.height=310;
    }
}

}
