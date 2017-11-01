module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-19 17:24:12
    */
    export class ClanLimitPanelMediator extends mvc.Mediator {

        public $view: ClanLimitPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        private list: sui.PageList<MenPaiLimitCfg, ClanLimitListItemRenderer>;

        constructor() {
            super(ModuleId.ClanLimit);
        }

        protected init() {
            this.view = new ClanLimitPanel;

            //这里加事件关注
        }

        @d_interest(EventConst.CLAN_LIMIT_INFO)
        limitInfoHandler(e?: egret.Event) {
            this.list.displayList(this.model.limitArr);
        }

        @d_interest(EventConst.CLAN_LIMIT_UPDATE)
        limitUpdateHandler(e?: egret.Event) {
            this.list.validateAll();
        }

        confirm(e: egret.TouchEvent): void {
            if (ClientCheck.isClientCheck) {
                let qCfg = this.model.quanxianByTitle[this.model.myClanInfoVO.titleid];
                if (!qCfg || !qCfg.zhaoshou) {
                    CoreFunction.showClientTips(228);
                    return;
                }
            }
            let lArr = [];
            let list = this.list;
            let limitArr = this.model.limitArr;
            let len = limitArr.length;
            var renderer:ClanLimitListItemRenderer;
            let skin:ClanLimitListItemView;
            let lCfg: MenPaiLimitCfg;
            let limit;
            for (var i = 0; i < len; i++) {
                renderer = list.getItemRenderAt(i);
                lCfg = limitArr[i];
                if (renderer && lCfg) {
                    skin = <ClanLimitListItemView>renderer.skin;
                    if (skin.checkBtn.selected && +skin.txt.text != lCfg.value) {
                        limit = <ClanLimitInfo>{};
                        limit.id = lCfg.id;
                        limit.value = +skin.txt.text;
                        lArr.pushOnce(limit);
                    }
                }
            }
            if (lArr.length > 0) {
                this.model.clanLimitUpdate({list:lArr});
            }
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            let position = view.position;
            let list = this.list = new sui.PageList<MenPaiLimitCfg, ClanLimitListItemRenderer>(new ClassFactory(ClanLimitListItemRenderer), 0, 5, 5);
            list.x = position.x;
            list.y = position.y;
            view.addChild(this.list);
            this.model.clanLimitInfo();
        }

        public awake() {
            let view = this.$view;
            view.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
            this.limitInfoHandler();
        }

        public sleep() {
            let view = this.$view;
            view.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
        }
    }
}
