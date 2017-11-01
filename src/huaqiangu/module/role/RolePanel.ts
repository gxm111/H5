module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-10-13 14:16:09
*/
export class RolePanel extends sui.Panel {

    public maxhp: egret.TextField;
	public wugong: egret.TextField;
	public wufang: egret.TextField;
	public fagong: egret.TextField;
	public fafang: egret.TextField;
	public mingzhong: egret.TextField;
	public shanbi: egret.TextField;
	public baoji: egret.TextField;
	public renxing: egret.TextField;
	public bisha: egret.TextField;
	public chuantou: egret.TextField;
	public shenfa: egret.TextField;
	public slot2: sui.Slot;
	public slot3: sui.Slot;
	public rolenameTF: egret.TextField;
	public chibangBtn: sui.Button;
	public helpBtn: sui.Button;
	public closeBtn: sui.Button;
	public slot0: sui.Slot;
	public slot1: sui.Slot;
	public slot4: sui.Slot;
	public slot5: sui.Slot;
	public slot6: sui.Slot;
	public slot7: sui.Slot;
	public slot8: sui.Slot;
	public slot9: sui.Slot;
	public slot10: sui.Slot;
	public slot11: sui.Slot;
	public zltext: sui.ArtText;
	public artlv: sui.ArtText;
	public flpos:egret.Sprite;
	public headcon:egret.Sprite;

    constructor() {
        super();
    }

    protected init() {
        this._key = "role";
        this._className = "ui.role.RolePanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 480, 800, 0], 17]));
		dis = manager.createTextFieldByData(this._key, [1, ["maxhp", 63, 622, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.maxhp = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["wugong", 63, 653, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.wugong = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["wufang", 63, 684, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.wufang = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["fagong", 173, 622, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.fagong = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["fafang", 173, 653, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.fafang = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["mingzhong", 173, 684, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.mingzhong = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["shanbi", 282, 622, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.shanbi = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["baoji", 281, 652, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.baoji = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["renxing", 280, 683, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.renxing = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["bisha", 392, 622, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.bisha = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["chuantou", 392, 653, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.chuantou = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["shenfa", 391, 684, 58, 18, 0], [1, "宋体", 0, "#BBBA9C", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.shenfa = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot2", 25, 287, 66, 68, 0]);
		this.addChild(dis);
		this.slot2 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot3", 25, 362, 66, 68, 0]);
		this.addChild(dis);
		this.slot3 = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 573, 480, 36, 0], 0]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 132, 619, 38, 19, 0], 9]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 24, 680, 35, 21, 0], 5]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 241, 650, 37, 20, 0], 13]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 352, 619, 37, 20, 0], 12]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 351, 650, 38, 21, 0], 4]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 132, 650, 37, 19, 0], 11]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 133, 681, 36, 21, 0], 15]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 242, 681, 38, 19, 0], 19]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 22, 649, 39, 19, 0], 14]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 243, 619, 37, 20, 0], 18]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 351, 680, 37, 21, 0], 1]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 24, 618, 38, 21, 0], 2]));
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 24, 3, 104, 123, 0], 10]));
		dis = manager.createTextFieldByData(this._key, [1, ["rolenameTF", 105, 10.25, 169, 18, 0], [1, "宋体", 0, "#FFFF99", 14, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.rolenameTF = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ChibangBtn", ["chibangBtn", 126, 135, 83, 73, 0]);
		this.addChild(dis);
		this.chibangBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.HelpBtn", ["helpBtn", 3, 8, 43, 40, 0]);
		this.addChild(dis);
		this.helpBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.btn.ClosBtn", ["closeBtn", 406, 9, 66, 42, 0]);
		this.addChild(dis);
		this.closeBtn = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot0", 25, 137, 66, 68, 0]);
		this.addChild(dis);
		this.slot0 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot1", 25, 210, 66, 68, 0]);
		this.addChild(dis);
		this.slot1 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot4", 25, 437, 66, 68, 0]);
		this.addChild(dis);
		this.slot4 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot5", 25, 511, 66, 68, 0]);
		this.addChild(dis);
		this.slot5 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot6", 388, 137, 66, 68, 0]);
		this.addChild(dis);
		this.slot6 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot7", 388, 210, 66, 68, 0]);
		this.addChild(dis);
		this.slot7 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot8", 388, 287, 66, 68, 0]);
		this.addChild(dis);
		this.slot8 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot9", 388, 362, 66, 68, 0]);
		this.addChild(dis);
		this.slot9 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot10", 388, 437, 66, 68, 0]);
		this.addChild(dis);
		this.slot10 = dis;
		dis = manager.createDisplayObject("lib", "ui.slot.Slot1", ["slot11", 388, 511, 66, 68, 0]);
		this.addChild(dis);
		this.slot11 = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 160, 579, 53, 25, 0], 8]));
		dis = manager.createDisplayObject("lib", "bmd.arttext.st_14_huang_i", ["zltext", 211, 580, 210, 21, 0]);
		this.addChild(dis);
		this.zltext = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 43, 95, 28, 14, 0], 3]));
		dis = manager.createDisplayObject("lib", "bmd.arttext.st_12_danhuang", ["artlv", 69, 94, 110, 14, 0]);
		this.addChild(dis);
		this.artlv = dis;
		this.flpos=new egret.Sprite();
		this.flpos.x=156;
		this.flpos.y=31;
		this.addChild(this.flpos);
		this.headcon=new egret.Sprite();
		this.headcon.x=42;
		this.headcon.y=25;
		this.addChild(this.headcon);
    }
}

}
