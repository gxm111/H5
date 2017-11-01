module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-09 11:08:10
    */
    export class InClanPanelMediator extends mvc.Mediator {

        public $view: InClanPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        constructor() {
            super(ModuleId.InClan);
        }

        protected init() {
            this.view = new InClanPanel;

            //这里加事件关注
        }

        @d_interest(EventConst.CLAN_NOTICE)
        noticeHandler(e: egret.Event) {
            this.$view.noticeTxt.text = this.model.myClanInfoVO.notice;
        }

        @d_interest(EventConst.CLAN_JUANXIAN)
        @d_interest(EventConst.CLAN_UPGRADE)
        upgradeHandler(e: egret.Event) {
            this.myClanInfoHandler();
        }

        @d_interest(EventConst.CLAN_MY_INFO)
        myClanInfoHandler(e?: egret.Event) {
            let view = this.$view;
            let myInfo = this.model.myClanInfoVO;
            let qCfg: MenPaiQuanXianCfg = this.model.quanxianByTitle[myInfo.titleid];
            if (qCfg) {
                view.titleTxt.text = LangUtil.getMsg(275, qCfg.name);
            }
            else {
                view.titleTxt.text = LangUtil.getMsg(275, "");
            }
            view.fameTxt.text = (Core.$hero.fame | 0) + "";
            view.noticeTxt.text = myInfo.notice;
            let info = this.model.clanInfoVO;
            view.lvTxt.text = LangUtil.getMsg(277, info.level);
            let cfg = this.model.byLv[info.level];
            if (cfg) {
                let needRes = cfg.res;
                let needStr: string;
                if (info.res < needRes) {
                    needStr = LangUtil.getMsg(278, LangUtil.getMsg(279, needRes));
                }
                else {
                    needStr = LangUtil.getMsg(280, LangUtil.getMsg(279, needRes));
                }
                view.needTxt.setHtmlText(needStr);
                view.numTxt.text = LangUtil.getMsg(281, info.num, cfg.maxnum);
            }
            view.resTxt.text = LangUtil.getMsg(282, info.res);
            view.masterTxt.text = LangUtil.getMsg(283, info.master);
            view.nameTxt.text = LangUtil.getMsg(284, info.name);
            view.rankTxt.text = LangUtil.getMsg(285, info.rank);
        }

        protected afterAllReady() {
            let view = this.$view;
            let mm = this._facade.moduleManager;
            mm.bindButton(ModuleId.ClanNotice, view.alterBtn);
            mm.bindButton(ModuleId.ClanUpgrade, view.upgradeBtn);
            mm.bindButton(ModuleId.ClanHongbao, view.hongbaoBtn);
            mm.bindButton(ModuleId.ClanJuanxian, view.juanxianBtn);
            //mm.bindButton(ModuleId.ClanLingdi, view.lingdiBtn);
            mm.bindButton(ModuleId.ClanLimit, view.lingdiBtn);
            mm.bindButton(ModuleId.ClanShop, view.shopBtn);
            //mm.bindButton(ModuleId.ClanSkill, view.skillBtn);
            mm.bindButton(ModuleId.ClanMember, view.memberBtn);
            //mm.bindButton(ModuleId.ClanManage, view.manageBtn);
            //mm.bindButton(ModuleId.ClanRank, view.rankBtn);
            view.txt.text = LangUtil.getMsg(331);
            view.alterBtn.label = LangUtil.getMsg(286);
            view.upgradeBtn.label = LangUtil.getMsg(287);
        }

        public awake() {
            this.model.myClanInfo();
        }

        /*public sleep() {
        }*/
    }
}
