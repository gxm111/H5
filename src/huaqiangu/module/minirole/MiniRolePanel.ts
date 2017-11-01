module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-10-13 11:02:45
*/
export class MiniRolePanel extends sui.Panel {

    public payBtn: sui.Button;
	public moneyBtn: sui.Button;
	public honorBtn: sui.Button;
	public vipBtn: sui.Button;
	public goldTF: egret.TextField;
	public moneyTF: egret.TextField;
	public honorTF: egret.TextField;
	public nameTF: egret.TextField;
	public lvTxt: sui.ArtText;
	public zlTxt: sui.ArtText;
	public headcon:egret.Sprite;

    constructor() {
        super();
    }

    protected init() {
        this._key = "minirole";
        this._className = "ui.minirole.MiniRolePanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 480, 97, 0], 0]));
		dis = manager.createDisplayObject(this._key, "ui.btn.MiniBtn", ["payBtn", 174, 0, 35, 35, 0]);
		this.addChild(dis);
		this.payBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.MiniBtn", ["moneyBtn", 305, 0, 35, 35, 0]);
		this.addChild(dis);
		this.moneyBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.MiniBtn", ["honorBtn", 439, 0, 35, 35, 0]);
		this.addChild(dis);
		this.honorBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 73, 4, 29, 29, 0], 4]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 209, 4, 29, 29, 0], 5]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 340, 4, 29, 29, 0], 6]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 77, 67, 37, 14, 0], 9]));
		dis = manager.createDisplayObject(this._key, "ui.btn.VipBtn", ["vipBtn", 407, 38, 67, 30, 0]);
		this.addChild(dis);
		this.vipBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["goldTF", 102, 8, 68, 20, 0], [1, "宋体", 0, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.goldTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["moneyTF", 236, 8, 68, 20, 0], [1, "宋体", 0, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.moneyTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["honorTF", 366, 8, 68, 20, 0], [1, "宋体", 0, "#FFFF99", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.honorTF = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 9, 79, 28, 14, 0], 10]));
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 83, 42.65, 104, 16, 0], [1, "宋体", 0, "#BBBA9C", 12, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
		dis = manager.createDisplayObject("lib", "bmd.arttext.st_12_danhuang", ["lvTxt", 36, 79, 110, 14, 0]);
		this.addChild(dis);
		this.lvTxt = dis;
		dis = manager.createDisplayObject("lib", "bmd.arttext.st_14_huang_i", ["zlTxt", 249, 38, 210, 21, 0]);
		this.addChild(dis);
		this.zlTxt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 188, 37, 53, 25, 0], 7]));
		this.headcon=new egret.Sprite();
		this.headcon.x=7;
		this.headcon.y=8;
		this.addChild(this.headcon);
    }
}

}
