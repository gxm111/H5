module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
* @private
*/
export class  SkillAngerItemView extends egret.Sprite {

	public _key:string;
    public slot: sui.Slot;
	public nameTF: egret.TextField;
	public secnameTF: egret.TextField;
	public tipTF: egret.TextField;
	public fuxuan:egret.Sprite;
	public lock:egret.Sprite;

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
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 385, 123, 0], 2]));
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 7, 12, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 82, 14.2, 146, 20, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["secnameTF", 83, 39.2, 223, 20, 0], [1, "宋体", 0, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.secnameTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["tipTF", 84, 62.95, 233, 53, 0], [1, "宋体", 0, "#FFFFFF", 12, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.tipTF = dis;
		this.fuxuan=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 35, 35, 0], 14]);
		this.fuxuan.addChild(dis);
		this.fuxuan.x=332;
		this.fuxuan.y=50;
		this.addChild(this.fuxuan);
		this.lock=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 20, 27, 0], 21]);
		this.lock.addChild(dis);
		this.lock.x=339;
		this.lock.y=55;
		this.addChild(this.lock);
    }
}

}
