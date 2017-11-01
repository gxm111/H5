module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-29 10:37:32
*/
export class HelpPanel extends sui.Panel {

    public bg: sui.ScaleBitmap;
	public closeBtn: sui.Button;
	public txt: egret.TextField;

    constructor() {
        super();
    }

    protected init() {
        this._key = "help";
        this._className = "ui.help.HelpPanel";
        this._baseRect = new egret.Rectangle(39,200,410,410);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", ["bg", 39, 200, 410, 410, 0]);
		this.addChild(dis);
		this.bg = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Input", [0, 60.1, 262.2, 366, 300, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.btn.CloseBtn2", ["closeBtn", 406, 212, 35, 35, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["txt", 79, 283, 331, 254, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.txt = dis;
    }
}

}
