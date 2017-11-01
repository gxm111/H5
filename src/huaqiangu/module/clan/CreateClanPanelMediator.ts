module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-09 11:08:10
    */
    export class CreateClanPanelMediator extends mvc.Mediator {

        public $view: CreateClanPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        constructor() {
            super(ModuleId.CreateClan);
        }

        protected init() {
            this.view = new CreateClanPanel;

            //这里加事件关注
            /*this.addProxy("ClanService", "model");*/
        }

        @d_interest(EventConst.CLAN_MY_INFO)
        createHandler(e: egret.Event) {
            this._facade.toggle(ModuleId.CreateClan, 0);
        }

        create(e: egret.TouchEvent): void {
            let name = this.$view.nameTxt.text;
            if (ClientCheck.isClientCheck) {
                if (Core.$hero.honor < this.model.needHonor) {
                    CoreFunction.showClientTips(269);
                    return;
                }
                else if (name.length == 0) {
                    CoreFunction.showClientTips(270);
                    return;
                }
                else if (name.length > this.model.maxNameLen) {
                    CoreFunction.showClientTips(271, this.model.maxNameLen);
                    return;
                }
                else if (WordFilter.checkWord(name)) {
                    CoreFunction.showClientTips(272);
                    return;
                }
            }
            this.model.clanCreate(name);
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            view.promptTxt.text = LangUtil.getMsg(273);
            view.nameTxt.maxChars = 6;
            view.nameTxt.type = egret.TextFieldType.INPUT;
            view.honorTxt.text = LangUtil.getMsg(274, this.model.needHonor);
        }

        public awake() {
            let view = this.$view;
            view.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.create, this);
        }

        public sleep() {
            let view = this.$view;
            view.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.create, this);
        }
    }
}
