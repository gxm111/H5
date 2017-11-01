module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
* @private
*/
export class  SkillRoleSlotView extends egret.Sprite {

	public _key:string;
    public rolecon:egret.Sprite;
	public selectbg:egret.Sprite;

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
        dis = manager.createDisplayObject("lib", "bmd.slotbg.HuobanBg", [0, 0, 0, 59, 57, 0]);
		this.addChild(dis);
		this.rolecon=new egret.Sprite();
		this.addChild(this.rolecon);
		this.selectbg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 60, 68, 0], 7]);
		this.selectbg.addChild(dis);
		this.addChild(this.selectbg);
    }
}

}
