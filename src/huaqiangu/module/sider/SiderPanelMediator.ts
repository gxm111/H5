module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-07-20 15:57:47
    */
    export class SiderPanelMediator extends mvc.Mediator {
        public static NAME: string = ModuleId.Sider;
        public $view: SiderPanel;

        private _cm: game.CooldownManager;

        private _cfg: CooldownCfg;

        private btndic:{[index:string]:sui.Button};

        constructor() {
            super(ModuleId.Sider);
        }

        protected init() {
            this.view = new SiderPanel;
            ResizeManager.getInstance().add(this.view, sui.Layout.BOTTOM_CENTER);
            //这里加事件关注
        }

        protected afterAllReady() {
            let mm = this._facade.moduleManager;
            let v = this.$view;
            this.btndic = {};
            this.bindButton(mm,ModuleId.Role, v.roleBtn);
            this.bindButton(mm,ModuleId.Clan, v.clanBtn);
            this.bindButton(mm,ModuleId.Bag, v.bagBtn);
            this.bindButton(mm,ModuleId.Shop, v.shopBtn);
            this.bindButton(mm,ModuleId.Skill, v.skillBtn);
            this.bindButton(mm,ModuleId.MainCity,v.cityBtn);
        }

        private bindButton(mm:mvc.ModuleManager,moduleId:string,btn:sui.Button){
            mm.bindButton(moduleId,btn);
            this.btndic[moduleId] = btn;
        }

        @d_interest(EventConst.SIDE_MODULE_HIDE)
        public onModuleHide(e:egret.Event){
            let cfg:mvc.IModuleCfg = <mvc.IModuleCfg>e.data;
            let btn = this.btndic[cfg.id];
            if(btn){
                btn.selected = false;
            }
        }

        @d_interest(EventConst.SIDE_MODULE_SHOW)
        public onModuleShow(e:egret.Event){
            let cfg:mvc.IModuleCfg = <mvc.IModuleCfg>e.data;
            let btn = this.btndic[cfg.id];
            if(btn){
                btn.selected = true;
            }
        }
        /**
         * awake  
         */
        public awake() {
            
        }

    }
}
