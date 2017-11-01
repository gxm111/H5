module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-08-19 11:37:51
* @private
*/
export class  EquipRenderView extends egret.Sprite {

	public _key:string;
    public usebg:egret.Sprite;
	public nousebg:egret.Sprite;
	public inuse:egret.Sprite;
	public nameTF: egret.TextField;
	public lvTF: egret.TextField;
	public scoreTF: egret.TextField;
	public xattrTF: egret.TextField;
	public equipBtn: sui.Button;
	public zb:egret.Sprite;
	public slot: sui.Slot;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "wareequip";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.usebg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 401, 116, 0], 1]);
		this.usebg.addChild(dis);
		this.addChild(this.usebg);
		this.nousebg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 405, 116, 0], 0]);
		this.nousebg.addChild(dis);
		this.addChild(this.nousebg);
		this.inuse=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 117, 54, 0], 2]);
		this.inuse.addChild(dis);
		this.inuse.x=280;
		this.inuse.y=32;
		this.addChild(this.inuse);
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 93, 12, 160, 18, 0], [1, "宋体", 0, "#FEA801", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["lvTF", 17, 86, 66, 18, 0], [1, "宋体", 1, "#FEA801", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.lvTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["scoreTF", 301, 12, 89, 18, 0], [1, "宋体", 0, "#FEA801", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.scoreTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["xattrTF", 92, 38, 202, 65, 0], [1, "宋体", 0, "#FEA801", 14, 5, 0, 0, 0]]);
		this.addChild(dis);
		this.xattrTF = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.EquipBtn", ["equipBtn", 303, 47, 87, 40, 0]);
		this.addChild(dis);
		this.equipBtn = dis;
		this.zb=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 42, 26, 0], 5]);
		this.zb.addChild(dis);
		this.zb.x=327;
		this.zb.y=52;
		this.addChild(this.zb);
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot", 17, 13, 66, 68, 0]);
		this.addChild(dis);
		this.slot = dis;
    }
}

}
