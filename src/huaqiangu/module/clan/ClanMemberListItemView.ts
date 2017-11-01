module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:33
* @private
*/
export class  ClanMemberListItemView extends egret.Sprite {

	public _key:string;
    public bgBtn: sui.Button;
	public lvTxt: egret.TextField;
	public nameTxt: egret.TextField;
	public zhanliTxt: egret.TextField;
	public resTxt: egret.TextField;
	public titleTxt: egret.TextField;
	public stateTxt: egret.TextField;

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
        dis = manager.createDisplayObject(this._key, "ui.btn.ClanListBg", ["bgBtn", -6, 0, 424, 38, 0]);
		this.addChild(dis);
		this.bgBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt", 2, 10, 59, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 61, 10, 98, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["zhanliTxt", 159, 10, 70, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.zhanliTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["resTxt", 229, 10, 54, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.resTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["titleTxt", 283, 10, 51, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.titleTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["stateTxt", 334, 10, 73, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.stateTxt = dis;
    }
}

}
