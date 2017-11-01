module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
* @private
*/
export class  SkillAngerView extends egret.Sprite {

	public _key:string;
    public refreshBtn: sui.Button;
	public resultTF: egret.TextField;
	public listcon:egret.Sprite;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "skill";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 9, 10, 415, 395, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, -12, 407.95, 459, 136, 0], 0]));
		dis = manager.createDisplayObject("lib", "ui.btn.Btn1", ["refreshBtn", 153, 551, 127, 42, 0]);
		this.addChild(dis);
		this.refreshBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 193, 559, 45, 26, 0], 10]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 135, 500, 157, 26, 0], 4]));
		dis = manager.createTextFieldByData(this._key, [1, ["resultTF", 59, 437.2, 353, 61.75, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.resultTF = dis;
		this.listcon=new egret.Sprite();
		this.listcon.x=24;
		this.listcon.y=23;
		this.addChild(this.listcon);
    }
}

}
