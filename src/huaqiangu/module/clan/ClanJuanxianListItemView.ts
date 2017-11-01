module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:35
* @private
*/
export class  ClanJuanxianListItemView extends egret.Sprite {

	public _key:string;
    public slot: sui.Slot;
	public targetTxt: egret.TextField;
	public myTxt: egret.TextField;
	public rewardTxt0: egret.TextField;
	public rewardTxt1: egret.TextField;
	public juanxianBtn: sui.Button;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "clan";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 0, 0, 360, 100, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 18, 14, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["targetTxt", 94, 13, 119, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.targetTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["myTxt", 94, 68, 200, 18, 0], [1, "宋体", 0, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.myTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["rewardTxt0", 215, 13, 140, 18, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.rewardTxt0 = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["rewardTxt1", 215, 36, 140, 18, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.rewardTxt1 = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn2", ["juanxianBtn", 96, 36, 57, 28, 0]);
		this.addChild(dis);
		this.juanxianBtn = dis;
    }
}

}
