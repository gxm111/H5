module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-09 17:13:36
    */
    export class ClanPanelMediator extends mvc.Mediator {

        public $view: ClanPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        constructor() {
            super(ModuleId.Clan);
        }

        protected init() {
            this.view = new ClanPanel;

            //这里加事件关注
            /*this.addProxy("ClanService", "model");
            this.addInterest(ClanService.CLAN_MY_INFO, this.myClanInfoHandler);*/
        }

        @d_interest(EventConst.CLAN_MY_INFO)
        myClanInfoHandler(e?: egret.Event){
            if(Core.$hero.clanid){
                this._facade.toggle(ModuleId.OutClan, 0);
                this._facade.toggle(ModuleId.InClan, 1);
            }
            else{
                this._facade.toggle(ModuleId.InClan, 0);
                this._facade.toggle(ModuleId.OutClan, 1);
            }
        }

        hideThis(e?: egret.TouchEvent): void {
            this._facade.toggle(ModuleId.Clan, 0);
            this._facade.toggle(ModuleId.OutClan, 0);
            this._facade.toggle(ModuleId.InClan, 0);
            this._facade.toggle(ModuleId.ClanShop, 0);
            this._facade.toggle(ModuleId.ClanMember, 0);
        }
        
        /*protected afterAllReady() {
            
        }*/

        public awake() {
            let view = this.$view;
            view.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideThis, this);
            this.myClanInfoHandler();
        }

        public sleep() {
            let view = this.$view;
            view.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideThis, this);
            this.hideThis();
        }
    }
}
