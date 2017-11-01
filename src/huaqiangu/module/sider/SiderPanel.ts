module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-27 16:32:25
*/
export class SiderPanel extends sui.Panel {

    public roleBtn: sui.Button;
	public skillBtn: sui.Button;
	public clanBtn: sui.Button;
	public cityBtn: sui.Button;
	public shopBtn: sui.Button;
	public bagBtn: sui.Button;

    constructor() {
        super();
    }

    protected init() {
        this._key = "sider";
        this._className = "ui.sider.SiderPanel";
        this._baseRect = new egret.Rectangle(0,0,480,73);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 14, 480, 59, 0], 0]));
		dis = manager.createDisplayObject(this._key, "ui.btn.RoleBtn", ["roleBtn", 27, 0, 71, 71, 0]);
		this.addChild(dis);
		this.roleBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.SkillBtn", ["skillBtn", 97, 0, 71, 71, 0]);
		this.addChild(dis);
		this.skillBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ClanBtn", ["clanBtn", 168, 0, 71, 71, 0]);
		this.addChild(dis);
		this.clanBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.MaincityBtn", ["cityBtn", 308, 0, 71, 71, 0]);
		this.addChild(dis);
		this.cityBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ShopBtn", ["shopBtn", 380, 0, 71, 71, 0]);
		this.addChild(dis);
		this.shopBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.BagBtn", ["bagBtn", 238, 0, 71, 71, 0]);
		this.addChild(dis);
		this.bagBtn = dis;
    }
}

}
