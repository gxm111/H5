module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 15:24:36
* @private
*/
export class  ClanListItemView extends egret.Sprite {

	public _key:string;
    public bgBtn: sui.Button;
	public lvTxt: egret.TextField;
	public nameTxt: egret.TextField;
	public numTxt: egret.TextField;
	public joinBtn: sui.Button;

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
        dis = manager.createDisplayObject(this._key, "ui.btn.ClanListBg", ["bgBtn", -8, 0, 424, 38, 0]);
		this.addChild(dis);
		this.bgBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTxt", 0, 9, 100, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTxt", 100, 9, 110, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTxt = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["numTxt", 210, 9, 110, 18, 0], [1, "宋体", 1, "#E6E4CA", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.numTxt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.Btn2", ["joinBtn", 335, 5, 57, 28, 0]);
		this.addChild(dis);
		this.joinBtn = dis;
    }
}

}
