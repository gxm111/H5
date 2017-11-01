module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-09 11:08:10
    */
    export class OutClanPanelMediator extends mvc.Mediator {

        public $view: OutClanPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        private list: sui.PageList<ClanInfoVO, ClanListItemRenderer>;

        constructor() {
            super(ModuleId.OutClan);
        }

        protected init() {
            this.view = new OutClanPanel;

            //这里加事件关注
            /*this.addProxy("ClanService", "model");
            this.addInterest(ClanService.CLAN_LIST, this.clanListHandler);*/
        }

        @d_interest(EventConst.CLAN_INFO)
        clanListHandler(e?: egret.Event) {
            this.list.displayList(this.model.clanArr);
        }

        protected afterAllReady() {
            let view = this.$view;
            let position = view.position;
            let list = this.list = new sui.PageList<ClanInfoVO, ClanListItemRenderer>(new ClassFactory(ClanListItemRenderer), 0, 0, 12);
            list.x = position.x;
            list.y = position.y;
            view.addChild(this.list);
            view.addChild(view.scrollBar);
            let scroller: sui.Scroller = new sui.Scroller();
            //scroller.alwaysShowBar = true;
            let rect: egret.Rectangle = new egret.Rectangle(0, 0, position.width, position.height);
            scroller.bindObj(this.list, rect, view.scrollBar);

            view.lvTxt.text = LangUtil.getMsg(291);
            view.nameTxt.text = LangUtil.getMsg(292);
            view.numTxt.text = LangUtil.getMsg(293);
            view.actionTxt.text = LangUtil.getMsg(294);

            this._facade.moduleManager.bindButton(ModuleId.CreateClan, view.createBtn);
        }

        public awake() {
            this.model.clanList(<PageRequest>{ size: 50 });
        }

        /*public sleep() {
        }*/
    }
}
