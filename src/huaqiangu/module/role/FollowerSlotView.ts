module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-10-13 14:16:09
* @private
*/
export class  FollowerSlotView extends egret.Sprite {

	public _key:string;
    public lock: egret.Bitmap;
	public add:egret.Sprite;
	public limitTF: egret.TextField;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "role";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.slotbg.HuobanBg", [0, 0, 0, 59, 57, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "bmd.share.lock", ["lock", 19, 14, 22, 31, 0]);
		this.addChild(dis);
		this.lock = dis;
		this.add=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 27, 27, 0], 7]);
		this.add.addChild(dis);
		this.add.x=16;
		this.add.y=15;
		this.addChild(this.add);
		dis = manager.createTextFieldByData(this._key, [1, ["limitTF", 0, 62, 59, 18, 0], [1, "宋体", 1, "#FFFF99", 12, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.limitTF = dis;
    }
}

}
