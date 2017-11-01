module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
*/
export class SkillPanel extends sui.Panel {

    public helpBtn: sui.Button;
	public closeBtn: sui.Button;
	public tab1: sui.Button;
	public tab2: sui.Button;
	public tab3: sui.Button;
	public panelcon:egret.Sprite;

    constructor() {
        super();
    }

    protected init() {
        this._key = "skill";
        this._className = "ui.skill.SkillPanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createDisplayObject("lib", "bmd.scale9.PanelBg", [0, 0, 0, 480, 800, 0]);
		this.addChild(dis);
		dis = manager.createDisplayObject("lib", "ui.btn.HelpBtn", ["helpBtn", 8, 11, 43, 40, 0]);
		this.addChild(dis);
		this.helpBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.ClosBtn", ["closeBtn", 407, 8, 66, 42, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "bmd.scale9.Bg1", [0, 11, 96, 455, 622, 0]);
		this.addChild(dis);
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 223, 5, 50, 26, 0], 9]));
		dis = manager.createDisplayObject("lib", "ui.tab.TabBtn", ["tab1", 48, 67, 86, 30, 0]);
		this.addChild(dis);
		this.tab1 = dis;
		dis = manager.createDisplayObject("lib", "ui.tab.TabBtn", ["tab2", 138, 67, 86, 30, 0]);
		this.addChild(dis);
		this.tab2 = dis;
		dis = manager.createDisplayObject("lib", "ui.tab.TabBtn", ["tab3", 228.5, 67, 86, 30, 0]);
		this.addChild(dis);
		this.tab3 = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 68, 71, 43, 26, 0], 11]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 159, 72, 43, 26, 0], 12]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 249, 72, 43, 26, 0], 13]));
		this.panelcon=new egret.Sprite();
		this.panelcon.x=22;
		this.panelcon.y=107;
		this.addChild(this.panelcon);
    }
}

}
