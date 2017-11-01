module junyou.hqg {
    import IModuleCfg = mvc.IModuleCfg;
	/**
	 *
	 * @author 3tion
	 *
	 */
    export class ModuleHandler0 extends mvc.ModuleHandler {

        private mutexModules: any;
        public constructor() {
            super();
            this.registerMutex();
        }

        /** 注册互斥模块*/
        private registerMutex() {
            this.mutexModules = [ModuleId.Role, ModuleId.Bag, ModuleId.Skill, ModuleId.Clan, ModuleId.Shop, ModuleId.MainCity];

        }

		/**
		 * 打开某个模块
		 * @param cfg
		 */
        public open(cfg: IModuleCfg): void {
            //找到指定模块，并打开面板
            let ms = this.mutexModules;
            let len = ms.length;
            let ocfg: IModuleCfg;
            if (this.mutexModules.indexOf(cfg.id) != -1) {
                for (let i = 0; i < len; i++) {
                    ocfg = DataLocator.getData(game.ConfigKey.GongNeng)[ms[i]];
                    if (ocfg) {
                        if (ocfg.id != cfg.id && ocfg.showState == mvc.ModuleShowState.SHOW) {
                            mvc.Facade.getInstance().toggle(ocfg.id, 0);
                        }
                    }
                }
            }
            mvc.Facade.getInstance().getMediator(cfg.id, this._showMediator, this, cfg);
        }

        private _showMediator(mediator: mvc.Mediator, args: any[]) {
            let cfg: IModuleCfg = args[0];
            let view = mediator.view;
            let layer = game.GameEngine.instance.getLayer(cfg.containerID);
            if (layer) {
                layer.addChild(view);
            }
            cfg.showState = mvc.ModuleShowState.SHOW;
            dispatch(EventConst.SIDE_MODULE_SHOW, cfg);
        }

        public close(cfg: IModuleCfg): void {
            //找到指定模块，并打开面板
            mvc.Facade.getInstance().getMediator(cfg.id, this._hideMediator, this, cfg);
        }

        private _hideMediator(mediator: mvc.Mediator, args: any[]) {
            let cfg: IModuleCfg = args[0];
            removeDisplay(mediator.view);
            cfg.showState = mvc.ModuleShowState.HIDE;
            dispatch(EventConst.SIDE_MODULE_HIDE, cfg);
        }
    }
}
