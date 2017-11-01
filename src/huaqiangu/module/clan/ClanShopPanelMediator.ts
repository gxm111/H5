module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-12 17:20:08
    */
    export class ClanShopPanelMediator extends mvc.Mediator {

        public $view: ClanShopPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        private list: sui.PageList<MenPaiShopItemCfg, ClanShopListItemRenderer>;

        constructor() {
            super(ModuleId.ClanShop);
        }

        protected init() {
            this.view = new ClanShopPanel;

            //这里加事件关注
        }

        @d_interest(EventConst.CLAN_BUY_INFO)
        buyInfoHandler(e?: egret.Event) {
            let itemArr = [];
            let lv = this.model.clanInfoVO.level;
            let arr: MenPaiShopItemCfg[];
            let itemByLv = this.model.itemByLv;
            for (var i = 1; i <= lv; i++) {
                arr = itemByLv[i];
                if (arr) {
                    itemArr = itemArr.concat(arr);
                }
            }
            this.list.displayList(itemArr);
            this.list.validateAll();
            this.model.itemArr = itemArr;
        }

        @d_interest(EventConst.CLAN_ACTIVE)
        @d_interest(EventConst.CLAN_BUY)
        activeHander(e: egret.Event) {
            let idx = e.data;
            if (idx >= 0) {
                this.list.validateItemByIdx(idx);
            }
            this.setAttr();
        }

        setAttr(){
            let view = this.$view;
            view.shengwangTxt.text = (Core.$hero.fame | 0) + "";
            view.honorTxt.text = (Core.$hero.honor | 0) + "";
            view.goldTxt.text = (Core.$hero.gold | 0) + "";
            view.moneyTxt.text = (Core.$hero.money | 0) + "";
        }

        hideThis(e: egret.TouchEvent): void {
            this._facade.toggle(ModuleId.ClanShop, 0);
        }

        protected afterAllReady() {
            let view = this.$view;
            let position = view.position;
            let list = this.list = new sui.PageList<MenPaiShopItemCfg, ClanShopListItemRenderer>(new ClassFactory(ClanShopListItemRenderer), 0, 5, 6);
            list.x = position.x;
            list.y = position.y;
            view.addChild(this.list);
            view.addChild(view.scrollBar);
            let scroller: sui.Scroller = new sui.Scroller();
            //scroller.alwaysShowBar = true;
            let rect: egret.Rectangle = new egret.Rectangle(0, 0, position.width, position.height);
            scroller.bindObj(this.list, rect, view.scrollBar);

            this.setAttr();

            this.buyInfoHandler();
        }

        public awake() {
            this.model.clanBuyInfo();
        }

        /*public sleep() {
        }*/
    }
}
