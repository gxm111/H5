module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:15
*/
export class CreateClanPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public promptTxt: egret.TextField;
	public createBtn: sui.Button;
	public closeBtn: sui.Button;
	public nameTxt: egret.TextField;
	public honorTxt: egret.TextField;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.CreateClanPanel";
        this._baseRect = new egret.Rectangle(65,275,350,250);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 65, 275, 350, 250, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 97, 347, 280, 117, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Input", [0, 135, 378, 204, 35, 0]);
		this.addChild(dis);
		dis = manager.createTextFieldByData(this._key, [1, ["promptTxt", 97, 327, 278, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.promptTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["createBtn", 175, 463, 127, 42, 0]);
		this.addChild(dis);
		this.createBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 362, 281, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 135, 386, 200, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["honorTxt", 135, 423, 200, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.honorTxt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 216, 471, 45, 26, 0], 32]));
    }
}

}
