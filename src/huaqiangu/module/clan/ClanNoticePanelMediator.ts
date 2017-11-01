module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-21 14:32:17
    */
    export class ClanNoticePanelMediator extends mvc.Mediator {

        public $view: ClanNoticePanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        constructor() {
            super(ModuleId.ClanNotice);
        }

        protected init() {
            this.view = new ClanNoticePanel;

            //这里加事件关注
        }

        @d_interest(EventConst.CLAN_NOTICE)
        noticeHandler(e: egret.Event) {
            this._facade.toggle(ModuleId.ClanNotice, 0);
        }

        confirm(e: egret.TouchEvent) {
            let notice = this.$view.noticeTxt.text;
            let myInfo = this.model.myClanInfoVO;
            if (ClientCheck.isClientCheck) {
                let qCfg: MenPaiQuanXianCfg = this.model.quanxianByTitle[myInfo.titleid];
                if (!qCfg || !qCfg.gonggao) {
                    CoreFunction.showClientTips(249);
                    return;
                }
                else if (notice.length > this.model.maxNoticeLen) {
                    CoreFunction.showClientTips(250, this.model.maxNoticeLen);
                    return;
                }
                else if (WordFilter.checkWord(notice)) {
                    CoreFunction.showClientTips(251);
                    return;
                }
            }
            if (notice != myInfo.notice && notice != "") {
                this.model.clanNoticeUpdate(notice);
            }
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            view.noticeTxt.maxChars = this.model.maxNoticeLen;
            view.noticeTxt.type = egret.TextFieldType.INPUT;
            view.noticeTxt.multiline = true;
            view.noticeTxt.wordWrap = true;
        }

        public awake() {
            let view = this.$view;
            view.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
            view.noticeTxt.text = this.model.myClanInfoVO.notice;
        }

        public sleep() {
            let view = this.$view;
            view.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
        }
    }
}
