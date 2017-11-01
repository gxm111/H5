module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 19:13:14
* @private
*/
export class  ClanLimitListItemView extends egret.Sprite {

	public _key:string;
    public txt: egret.TextField;
	public checkBtn: sui.Button;

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
        dis = manager.createDisplayObject("lib", "bmd.scale9.Input", [0, 146, 0, 130, 35, 0]);
		this.addChild(dis);
		dis = manager.createTextFieldByData(this._key, [1, ["txt", 150, 8, 120, 18, 0], [1, "宋体", 1, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.txt = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.CheckBtn", ["checkBtn", 0, 0, 120, 35, 0]);
		this.addChild(dis);
		this.checkBtn = dis;
    }
}

}
