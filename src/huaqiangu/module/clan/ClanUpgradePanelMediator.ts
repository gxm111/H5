module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-12 17:20:08
    */
    export class ClanUpgradePanelMediator extends mvc.Mediator {

        public $view: ClanUpgradePanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;
        @d_dependProxy(ServiceName.ItemsService)
        public itemsService: ItemsService;

        private slotArr: GoodsItemSlot<GoodsSlotItem>[];
        private slotDataArr: GoodsSlotItem[];

        constructor() {
            super(ModuleId.ClanUpgrade);
        }

        protected init() {
            this.view = new ClanUpgradePanel;

            //这里加事件关注
            /*this.addProxy("ClanService", "model");
            this.addInterest(ClanService.UPGRADE, this.upgradeHandler);*/
        }

        @d_interest(EventConst.CLAN_UPGRADE)
        upgradeHandler(e: egret.Event) {
            this._facade.toggle(ModuleId.ClanUpgrade, 0);
        }

        upgrade(e: egret.TouchEvent) {
            if (ClientCheck.isClientCheck) {
                let info = this.model.clanInfoVO;
                if (info) {
                    let cfg: MenPaiLevelCfg = this.model.byLv[info.level];
                    if (!info.res || info.res < cfg.res) {
                        CoreFunction.showClientTips(262);
                        return;
                    }
                }
            }
            this.model.clanUpgrade();
        }

        setInfo() {
            let view = this.$view;
            let info = this.model.clanInfoVO;
            if (info) {
                //当前等级
                let cfg: MenPaiLevelCfg = this.model.byLv[info.level];
                if (cfg) {
                    view.lvTxt0.text = LangUtil.getMsg(263, cfg.level);
                    view.maxNumTxt0.text = LangUtil.getMsg(264, cfg.maxnum);
                    view.assiNumTxt0.text = LangUtil.getMsg(330, this.model.assiNum);
                }
                let resStr: string;
                if (info.res < cfg.res) {
                    resStr = LangUtil.getMsg(266, LangUtil.getMsg(267, cfg.res));
                }
                else {
                    resStr = LangUtil.getMsg(268, LangUtil.getMsg(267, cfg.res));
                }
                view.resTxt.setHtmlText(resStr);
                //下一等级
                let nextLv = info.level + 1;
                let nextCfg = this.model.byLv[nextLv];
                if (nextCfg) {
                    view.lvTxt1.setHtmlText(LangUtil.getMsg(268, LangUtil.getMsg(263, nextCfg.level)));
                    if(nextCfg.maxnum > cfg.maxnum){
                        view.maxNumTxt1.setHtmlText(LangUtil.getMsg(268, LangUtil.getMsg(264, nextCfg.maxnum)));
                    }
                    else{
                        view.maxNumTxt1.text = LangUtil.getMsg(264, nextCfg.maxnum);
                    }
                    view.assiNumTxt1.text = LangUtil.getMsg(330, this.model.assiNum);
                    view.promptTxt.text = LangUtil.getMsg(265);
                    this.slotDataArr = [];
                    this.itemsService.solveSlotsData(this.model.needItemByLv[nextLv], this.slotDataArr, this.slotArr);
                }
                else {
                    view.resTxt.text = "";
                }
            }
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            this.slotArr = [];
            let slot: sui.Slot;
            for (let i = 0; i < 3; i++) {
                slot = view["slot" + i];
                GoodsItemSlot.getSlot(slot);
                this.slotArr.pushOnce(<GoodsItemSlot<GoodsSlotItem>>slot);
            }
        }

        public awake() {
            let view = this.$view;
            view.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upgrade, this);
            this.setInfo();
        }

        public sleep() {
            let view = this.$view;
            view.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upgrade, this);
        }
    }
}
