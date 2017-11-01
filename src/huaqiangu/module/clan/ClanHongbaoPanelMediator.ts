module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-12 17:20:08
    */
    export class ClanHongbaoPanelMediator extends mvc.Mediator {

        public $view: ClanHongbaoPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        constructor() {
            super(ModuleId.ClanHongbao);
        }

        protected init() {
            this.view = new ClanHongbaoPanel;

            //这里加事件关注
            /*this.addProxy("ClanService", "model");
            this.addInterest(ClanService.CLAN_SEND_HONGBAO, this.sendHongbaoHandler);*/
        }

        @d_interest(EventConst.CLAN_SEND_HONGBAO)
        sendHongbaoHandler(e: egret.Event) {
            this._facade.toggle(ModuleId.ClanHongbao, 0);
        }

        sendHongbao(e: egret.TouchEvent): void {
            let rate = this.$view.numericStepper.value;
            if (ClientCheck.isClientCheck) {
                let info = this.model.clanInfoVO;
                if (info.num <= 1) {
                    CoreFunction.showClientTips(208);
                    return;
                }
                else if (Core.$hero.gold < (info.num - 1) * rate) {
                    CoreFunction.notEnoughGold();
                    return;
                }
            }
            this.model.clanSendHongbao(rate);
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            view.numericStepper.maxValue = this.model.maxRate;
            view.numericStepper.value = 1;
        }

        public awake() {
            let view = this.$view;
            view.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendHongbao, this);
            let info = this.model.clanInfoVO;
            if (info) {
                let num = info.num;
                if (is(num, Number)) {
                    view.numTxt0.text = LangUtil.getMsg(209, num);
                    view.numTxt1.text = LangUtil.getMsg(210, num - 1);
                    view.numTxt2.text = LangUtil.getMsg(211, num - 1);
                }
            }
        }

        public sleep() {
            let view = this.$view;
            view.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendHongbao, this);
        }
    }
}
