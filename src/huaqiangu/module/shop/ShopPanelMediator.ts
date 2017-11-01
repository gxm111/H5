module junyou.hqg{
/**
* 由导出工具生成
* https://github.com/eos3tion/ExportUIFromFlash
* 生成时间：2016-09-05 14:53:15
*/
export class ShopPanelMediator extends mvc.Mediator {
	
    public $view:ShopPanel;

    private list:sui.PageList<ShopItemVO,ShopListItemRender>;

    private herovo:HeroVO;
    constructor() {
        super(ModuleId.Shop);
    }

    protected init() {
        this.view = new ShopPanel;

		//这里加事件关注
    }

    protected afterAllReady(){
        this.herovo = Core.$hero;
        //this.$view.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeView,this);
        this.list = new sui.PageList<ShopItemVO,ShopListItemRender>(new ClassFactory(ShopListItemRender),5,9,6,3);
        this.$view.listcon.addChild(this.list);
        this.testValue();
    }

    @d_interest(EventConst.HERO_GOLD_CHANGE)
    public heroGoldChange(e?:egret.Event){
        this.$view.goldTxt.text = this.herovo.gold+"";
    }

    @d_interest(EventConst.HERO_MONEY_CHANGE)
    public heroMoneyChange(e?:egret.Event){
        this.$view.moneyTxt.text = this.herovo.money+"";
    }

    private testValue(){
        this.heroGoldChange();
        this.heroMoneyChange();
        this.$view.costTxt.text = "本次免费";
        var arr:any[] = [];
        for(var i=0;i<6;i++){
            let vo = new ShopItemVO();
            arr[i]=vo;
        }
        this.list.displayList(arr);

    }

    /*private closeView(e:egret.TouchEvent){
        mvc.Facade.getInstance().toggle(ModuleId.Shop);
    }*/


}
}
