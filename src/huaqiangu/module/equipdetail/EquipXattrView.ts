module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-08-19 16:07:40
* @private
*/
export class  EquipXattrView extends egret.Sprite {

	public _key:string;
    public baseTF: egret.TextField;
	public qhTF: egret.TextField;
	public line:egret.Sprite;

    constructor() {
        super();
        this.init();
        this.bindComponents();
    }

    protected init() {
        this._key = "equipDetail";
    }

    protected bindComponents() {
        var manager = sui.SuiResManager.getInstance();
        var dis:any;
        dis = manager.createTextFieldByData(this._key, [1, ["baseTF", 83, 0, 247, 181, 0], [1, "宋体", 0, "#FEA801", 14, 5, 0, 0, 0]]);
		this.addChild(dis);
		this.baseTF = dis;
		dis = manager.createTextFieldByData(this._key, [1, ["qhTF", 83, 196.95, 198, 85.05, 0], [1, "宋体", 0, "#FEA801", 14, 5, 0, 0, 0]]);
		this.addChild(dis);
		this.qhTF = dis;
		this.line=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 351, 9, 0], 3]);
		this.line.addChild(dis);
		this.line.y=183;
		this.addChild(this.line);
    }
}

}
