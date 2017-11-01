module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-02 14:45:40
*/
export class CreaterolePanel extends sui.Panel {

    public imgcon:egret.Sprite;
	public womanBtn: sui.Button;
	public manBtn: sui.Button;
	public tipTF: egret.TextField;
	public randomBtn: sui.Button;
	public nameTF: egret.TextField;
	public createBtn: sui.Button;

    constructor() {
        super();
    }

    protected init() {
        this._key = "createrole";
        this._className = "ui.createrole.CreaterolePanel";
        this._baseRect = new egret.Rectangle(0,0,480,800);
        
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        this.addChild(manager.createBitmapByData(this._key, [0, [0, 0, 0, 480, 800, 0], 9]));
		this.imgcon=new egret.Sprite();
		this.addChild(this.imgcon);
		dis = manager.createDisplayObject(this._key, "ui.btn.WomanBtn", ["womanBtn", 260, 518, 68, 68, 0]);
		this.addChild(dis);
		this.womanBtn = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.ManBtn", ["manBtn", 157, 518, 68, 68, 0]);
		this.addChild(dis);
		this.manBtn = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["tipTF", 15, 644.65, 445.95, 22.3, 0], [1, "宋体", 1, "#FF0000", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.tipTF = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.RandomBtn", ["randomBtn", 336, 591, 45, 45, 0]);
		this.addChild(dis);
		this.randomBtn = dis;
		this.addChild(manager.createBitmapByData(this._key, [0, [0, 165, 598, 166, 33, 0], 0]));
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 167, 605, 160, 20.75, 0], [2, "宋体", 1, "#FF0000", 16, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
		dis = manager.createDisplayObject(this._key, "ui.btn.CreateBtn", ["createBtn", 110, 697, 266, 63, 0]);
		this.addChild(dis);
		this.createBtn = dis;
    }
}

}
