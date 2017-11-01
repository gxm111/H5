module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-28 11:23:43
*/
export class MainCityPanel extends sui.Panel {

    public fuben:egret.Sprite;
	public boss:egret.Sprite;
	public suoyao:egret.Sprite;
	public jingji:egret.Sprite;
	public zhenying:egret.Sprite;

    constructor() {
        super();
    }

    protected init() {
        this._key = "maincity";
        this._className = "ui.maincity.MainCityPanel";
        this._baseRect = new egret.Rectangle(0,97,479,694);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 480, 800, 0], 5]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 326, 294, 153, 198, 0], 2]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 568, 21, 98, 0], 1]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 167, 671, 83, 98, 0], 3]));
		this.fuben=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 199, 227, 0], 6]);
		this.fuben.addChild(dis);
		this.fuben.x=256;
		this.fuben.y=97;
		this.addChild(this.fuben);
		this.boss=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 174, 223, 0], 8]);
		this.boss.addChild(dis);
		this.boss.y=221;
		this.addChild(this.boss);
		this.suoyao=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 185, 282, 0], 0]);
		this.suoyao.addChild(dis);
		this.suoyao.x=196;
		this.suoyao.y=292;
		this.addChild(this.suoyao);
		this.jingji=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 231, 273, 0], 7]);
		this.jingji.addChild(dis);
		this.jingji.y=435;
		this.addChild(this.jingji);
		this.zhenying=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 271, 279, 0], 4]);
		this.zhenying.addChild(dis);
		this.zhenying.x=208;
		this.zhenying.y=512;
		this.addChild(this.zhenying);
    }
}

}
