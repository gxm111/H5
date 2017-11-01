module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:14
*/
export class InClanPanel extends sui.Panel {

    public titleTxt: egret.TextField;
	public fameTxt: egret.TextField;
	public noticeTxt: egret.TextField;
	public lvTxt: egret.TextField;
	public resTxt: egret.TextField;
	public nameTxt: egret.TextField;
	public numTxt: egret.TextField;
	public needTxt: egret.TextField;
	public masterTxt: egret.TextField;
	public rankTxt: egret.TextField;
	public alterBtn: sui.Button;
	public upgradeBtn: sui.Button;
	public hongbaoBtn: sui.Button;
	public juanxianBtn: sui.Button;
	public lingdiBtn: sui.Button;
	public shopBtn: sui.Button;
	public skillBtn: sui.Button;
	public memberBtn: sui.Button;
	public manageBtn: sui.Button;
	public rankBtn: sui.Button;
	public txt: egret.TextField;

    constructor() {
        super();
    }

    protected init() {
        this._key = "clan";
        this._className = "ui.clan.InClanPanel";
        this._baseRect = new egret.Rectangle(27,60,430,650);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", [0, 27, 60, 430, 650, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 30, 68, 424, 38.95, 0], 5]));
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg3", [0, 42, 146, 397, 98.85, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 165, 110, 153, 33.95, 0], 24]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 164, 248, 153, 33.95, 0], 24]));
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg3", [0, 42, 284, 397, 129.8, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg4", [0, 227, 74, 80, 21.95, 0]);
		this.addChild(dis);
		dis = manager.createTextFieldByData(this._key, [1, ["titleTxt", 51, 77, 120, 20.95, 0], [1, "宋体", 0, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.titleTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["fameTxt", 242, 76, 100, 20.95, 0], [1, "宋体", 0, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.fameTxt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 204, 116, 74, 21.95, 0], 28]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 204, 255, 74, 21.95, 0], 29]));
		dis = manager.createTextFieldByData(this._key, [1, ["noticeTxt", 61, 158, 360, 39.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.noticeTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt", 61, 295, 130, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["resTxt", 61, 319, 130, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.resTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 61, 343, 130, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt", 61, 367, 130, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["needTxt", 209, 295, 160, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.needTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["masterTxt", 209, 319, 160, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.masterTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["rankTxt", 209, 343, 160, 17.95, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.rankTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn2", ["alterBtn", 372, 202, 57, 27.95, 0]);
		this.addChild(dis);
		this.alterBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn2", ["upgradeBtn", 372, 291, 57, 27.95, 0]);
		this.addChild(dis);
		this.upgradeBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.HongbaoBtn", ["hongbaoBtn", 45, 444, 124, 123.8, 0]);
		this.addChild(dis);
		this.hongbaoBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.JuanxianBtn", ["juanxianBtn", 182, 444, 124, 123.8, 0]);
		this.addChild(dis);
		this.juanxianBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.LingdiBtn", ["lingdiBtn", 317, 444, 124, 123.8, 0]);
		this.addChild(dis);
		this.lingdiBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ClanShopBtn", ["shopBtn", 41, 591, 73, 74.9, 0]);
		this.addChild(dis);
		this.shopBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ClanSkillBtn", ["skillBtn", 123, 591, 73, 74.9, 0]);
		this.addChild(dis);
		this.skillBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ClanMemberBtn", ["memberBtn", 205, 591, 73, 74.9, 0]);
		this.addChild(dis);
		this.memberBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ClanManageBtn", ["manageBtn", 285, 591, 73, 74.9, 0]);
		this.addChild(dis);
		this.manageBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ClanRankBtn", ["rankBtn", 366, 591, 73, 74.9, 0]);
		this.addChild(dis);
		this.rankBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["txt", 160, 77, 50, 20.95, 0], [1, "宋体", 2, "#E6E4CA", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.txt = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 210, 72, 27, 26.95, 0], 39]));
    }
}

}
