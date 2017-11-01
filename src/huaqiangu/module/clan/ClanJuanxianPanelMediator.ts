module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-12 17:20:08
    */
    export class ClanJuanxianPanelMediator extends mvc.Mediator {

        public $view: ClanJuanxianPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        private list:sui.PageList<MenPaiJuanXianCfg, ClanJuanxianListItemRenderer>;

        constructor() {
            super(ModuleId.ClanJuanxian);
        }

        protected init() {
            this.view = new ClanJuanxianPanel;

            //这里加事件关注
            /*this.addProxy("ClanService", "model");
            this.addInterest(ClanService.CLAN_JUANXIAN, this.juanxianHandler);*/
        }

        @d_interest(EventConst.CLAN_JUANXIAN)
        juanxianHandler(e: egret.Event){
            let idx:number = e.data;
            let renderer:ClanJuanxianListItemRenderer = this.list.getItemRenderAt(idx);
            if(renderer){
                renderer.dataChange = true;
            }
            this._facade.toggle(ModuleId.ClanJuanxian, 0);
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            let position = view.position;
            let list = this.list = new sui.PageList<MenPaiJuanXianCfg, ClanJuanxianListItemRenderer>(new ClassFactory(ClanJuanxianListItemRenderer), 0, 2, 3);
            list.x = position.x;
            list.y = position.y;
            view.addChild(this.list);
            view.promptTxt.text = LangUtil.getMsg(227);
        }

        public awake() {
            this.list.displayList(this.model.juanxianArr);
            this.list.validateAll();
        }

        /*public sleep() {
        }*/
    }
}
