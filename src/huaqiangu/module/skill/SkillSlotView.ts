module junyou.hqg{
import sui = junyou.sui;
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-19 17:30:04
* @private
*/
export class  SkillSlotView extends egret.Sprite {

	public _key:string;
    public normalbg:egret.Sprite;
	public selectbg:egret.Sprite;
	public normalflag:egret.Sprite;
	public selectflag:egret.Sprite;
	public order: sui.ArtText;
	public lock:egret.Sprite;
	public nameTF: egret.TextField;

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
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 80, 77, 0], 5]);
		this.normalbg.addChild(dis);
		this.normalbg.x=1;
		this.normalbg.y=17.3;
		this.addChild(this.normalbg);
		this.selectbg=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 80, 77, 0], 6]);
		this.selectbg.addChild(dis);
		this.selectbg.x=1;
		this.selectbg.y=17.3;
		this.addChild(this.selectbg);
		this.normalflag=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 29, 27, 0], 19]);
		this.normalflag.addChild(dis);
		this.normalflag.x=26;
		this.normalflag.y=89;
		this.addChild(this.normalflag);
		this.selectflag=new egret.Sprite();
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 29, 27, 0], 20]);
		this.selectflag.addChild(dis);
		this.selectflag.x=26;
		this.selectflag.y=89;
		this.addChild(this.selectflag);
		dis = manager.createDisplayObject(this._key, "bmd.arttext.st_16_huang", ["order", 27, 88, 116, 27, 0]);
		this.addChild(dis);
		this.order = dis;
		this.lock=new egret.Sprite();
		this.addChild(dis);
		dis=manager.createBitmapByData(this._key, [0, [0, 0, 0, 20, 27, 0], 21]);
		this.lock.addChild(dis);
		this.lock.x=31;
		this.lock.y=39.3;
		this.addChild(this.lock);
		dis = manager.createTextFieldByData(this._key, [1, ["nameTF", 0, 0, 80, 16, 0], [1, "宋体", 1, "#FFFFFF", 12, 2, 0, 0, 0]]);
		this.addChild(dis);
		this.nameTF = dis;
    }
}

}
