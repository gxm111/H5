module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
* @private
*/
export class  SkillItemView extends egret.Sprite {

	public _key:string;
    public normalbg:egret.Sprite;
	public selectbg:egret.Sprite;
	public slot: sui.Slot;
	public nameTF: egret.TextField;
	public secnameTF: egret.TextField;
	public tipTF: egret.TextField;
	public stateTF: egret.TextField;
	public flag:egret.Sprite;
	public order: sui.ArtText;

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
        this.normalbg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 385, 123, 0], 2]);
		this.normalbg.addChild(dis);
		this.addChild(this.normalbg);
		this.selectbg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 385, 122, 0], 3]);
		this.selectbg.addChild(dis);
		this.addChild(this.selectbg);
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 10, 10, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 87, 14.95, 104, 18, 0], [1, "宋体", 0, "#FFFFFF", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["secnameTF", 87, 38.9, 215, 18, 0], [1, "宋体", 0, "#FFFFFF", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.secnameTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["tipTF", 86, 61.9, 243, 54.05, 0], [1, "宋体", 0, "#FFFFFF", 12, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.tipTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["stateTF", 260, 11.7, 119, 20.3, 0], [1, "宋体", 2, "#FFFFFF", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.stateTF = dis;
		this.flag=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 29, 27, 0], 19]);
		this.flag.addChild(dis);
		this.flag.x=343;
		this.flag.y=50;
		this.addChild(this.flag);
		dis = manager.createDisplayObject(this._key, "bmd.arttext.st_16_huang", ["order", 343, 48, 116, 27, 0]);
		this.addChild(dis);
		this.order = dis;
    }
}

}
