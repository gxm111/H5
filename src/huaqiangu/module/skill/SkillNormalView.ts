module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
* @private
*/
export class  SkillNormalView extends egret.Sprite {

	public _key:string;
    public scbar: sui.ScrollBar;
	public rolelistcon:egret.Sprite;
	public slotlistcon:egret.Sprite;
	public skilllistcon:egret.Sprite;

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
        dis = manager.createDisplayObject("lib", "bmd.scale9.Bg2", [0, 7, 206, 416, 387, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 435, 90, 0], 1]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 10, 117, 38, 59, 0], 8]));
		dis = manager.createDisplayObject("lib", "ui.scroll.ScrollBar1", ["scbar", 401, 219, 14, 166, 0]);
		this.addChild(dis);
		this.scbar = dis;
		this.rolelistcon=new egret.Sprite();
		this.rolelistcon.x=37;
		this.rolelistcon.y=14;
		this.addChild(this.rolelistcon);
		this.slotlistcon=new egret.Sprite();
		this.slotlistcon.x=66;
		this.slotlistcon.y=89;
		this.addChild(this.slotlistcon);
		this.skilllistcon=new egret.Sprite();
		this.skilllistcon.x=19;
		this.skilllistcon.y=218;
		this.addChild(this.skilllistcon);
    }
}

}
