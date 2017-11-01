module junyou.hqg{
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-07-20 14:29:28
*/
export class MiniRolePanelMediator extends mvc.Mediator {
	
    // public static NAME:string = ModuleId.MiniRole;
    
    public $view:MiniRolePanel;

    private goldTF:egret.TextField;
    
    private moneyTF:egret.TextField;
    
    private honorTF:egret.TextField;

    private herovo:HeroVO;

    private lvTxt:sui.ArtNumber;

    private zlTxt:sui.ArtNumber;

    private nameTF:egret.TextField;

    private headImg:HeadImage;

    constructor() {
        super(ModuleId.MiniRole);
    }

    protected init() {
        this.view = new MiniRolePanel;
        ResizeManager.getInstance().add(this.$view,sui.Layout.TOP_LEFT);
        this.herovo = Core.$hero;
		//这里加事件关注
    }

    protected afterAllReady(){
        this.headImg = new HeadImage();
        this.goldTF = this.$view.goldTF;
        this.moneyTF = this.$view.moneyTF;
        this.honorTF = this.$view.honorTF;
        this.nameTF = this.$view.nameTF;
        this.lvTxt = sui.ArtTextUtil.convertTextToNumber(this.$view.lvTxt);
        this.zlTxt = sui.ArtTextUtil.convertTextToNumber(this.$view.zlTxt);
        this.$view.payBtn.touchEnabled = true;
        this.$view.touchEnabled = true;
        this.$view.headcon.addChild(this.headImg);
        this.$view.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }

    private onClick(e:egret.TouchEvent){
        GMCmdPanel.getInstance().visible = !GMCmdPanel.getInstance().visible;
    }

    @d_interest(EventConst.HERO_GOLD_CHANGE)
    public heroGoldChange(e?:egret.Event){
        this.goldTF.text = this.herovo.gold+"";
    }

    @d_interest(EventConst.HERO_MONEY_CHANGE)
    public heroMoneyChange(e?:egret.Event){
        this.moneyTF.text = this.herovo.money+"";
    }

    @d_interest(EventConst.HERO_HONOR_CHANGE)
    public heroHonorChange(e?:egret.Event){
        this.honorTF.text = this.herovo.honor+"";
    }

    @d_interest(EventConst.HERO_LEVEL_CHANGE)
    public heroLevelChange(e?:egret.Event){
        this.lvTxt.value = this.herovo.level;
    }

    public awake(){
        this.heroGoldChange();
        this.heroMoneyChange();
        this.heroHonorChange();
        this.heroLevelChange();
        this.nameTF.text = this.herovo.name;
        this.zlTxt.value = 888888;//this.herovo.
        this.headImg.setHeroCircleHead();
    }

    public sleep(){

    }
}
}
