module junyou.mvc {
    import DisplayObject = egret.DisplayObject;
	/**
	 * 模块管理器
	 * 用于管理模块的开启/关闭
	 * @author 3tion
	 *
	 */
    export class ModuleManager {
    	/**
		 * 模块检查器初始化完毕
		 */
        public static MODULE_CHECKER_INITED = "MODULE_CHECKER_INITED";
    	/**
		 * 尝试调用某个功能<br/>
		 * data 为功能ID
		 */
        public static MODULE_TRY_TOGGLE = "MODULE_TRY_TOGGLE";

        /**
        * 有功能，服务端要求临时关闭<br/>
        * data 为功能ID
        */
        public static MODULE_SERVER_CLOSE = "MODULE_SERVER_CLOSE";

        /**
        * 有临时关闭的功能，服务端要求再打开<br/>
        * data 为功能ID
        */
        public static MODULE_SERVER_OPEN = "MODULE_SERVER_OPEN";

        /**
         * 模块显示状态发生改变发生改变<br/>
         * data 为剩余未显示的按钮数量
         */
        public static MODULE_SHOW_CHANGED = "MODULE_SHOW_CHANGED";

		/**
		 * 有模块需要检查是否会造成显示变化
		 */
        public static MODULE_NEED_CHECK_SHOW = "MODULE_NEED_CHECK_SHOW";

		/**
		 * 有模块不符合显示的条件
		 * data 为功能ID
		 */
        public static MODULE_NOT_SHOW = "MODULE_NOT_SHOW";

		/**
		 * 有模块显示了
		 */
        public static MODULE_SHOW = "MODULE_SHOW";

        /**
         * 显示tip的函数
         */
        public tipHandler: { (msg: string): void };

    	/**
    	 * 字典<br/>
    	 * Key      {string}        模块ID<br/>
    	 * Value    {ModuleCfg}     模块配置
    	 */
        protected _allById: { [index: string]: IModuleCfg };

        /**
         * 功能使用/显示限制的检查器<br/>
         * Key      {number}                检查器的类型对应limittype/showtype字段<br/>
         * Value    {IModuleChecker}		  模块限制检查器
         */
        protected _checkers: { [index: number]: IModuleChecker };


        /**
         * 需要检查
         */
        protected _needCheck = false;


        /**
         * 需要检查显示
         */
        protected _needCheckShow = false;

        /**
		 * 未显示的按钮的模块
		 */
        protected _unshowns: string[];


        /**
         * Key      {number} 模块id<br/>
		 * Value    {egret.DisplayObject[]} 绑定在同一个模块上的按钮的数组
         */
        protected _bindedIOById: { [index: number]: DisplayObject[] };


        /**
         * Key      {number}            模块类型<br/>
         * Value    {IModuleHandler}    模块处理器
         */
        protected _handlersByType: { [index: number]: ModuleHandler };


        /**
         * Key      {string}            模块id<br/>
         * Value    {IModuleHandler}    模块处理器
         */
        protected _handlersById: { [index: string]: ModuleHandler };

        /**
         * Key      {egret.DisplayObject}   绑定的交互对象<br/>
         * Value    {number}                模块id
         */
        protected _ioBind: Map<DisplayObject, string>;


        public constructor() {
        }

        public init() {
            this._bindedIOById = [];
            this._handlersByType = [];
            this._checkers = [];
            this._allById = {};
            this._unshowns = [];
            this._handlersById = {};
            this._ioBind = new Map<DisplayObject, string>();
            Facade.getInstance().addEventListener(ModuleManager.MODULE_NEED_CHECK_SHOW, this.checkShowHandler, this);
        }

        /**
         *  创建控件ToolTip的方法
         */
        public createToolTip: (cfg: IModuleCfg) => string;

    	/**
    	 * 设置模块配置数据
    	 * @param { [index: string]: ModuleCfg }    cfgs
    	 */
        public setCfgs(cfgs: { [index: string]: IModuleCfg }) {
            this._allById = cfgs;
            this.doCheckLimits();
        }

        /**
         * 根据配置类型，注册模块处理器
         * @param type
         * @param handler
         *
         */
        public registerHandler(type: number, handler: ModuleHandler): void {
            this._handlersByType[type] = handler;
        }
        /**
         * 根据模块ID注册处理函数
         * @param id
         * @param handler
         *
         */
        public registerHandlerById(id: string, handler: ModuleHandler): void {
            let cfg: IModuleCfg = this._allById[id];
            if (cfg) {
                this._handlersById[id] = handler;
            }
            else {
                ThrowError("ModuleManager 注册模块处理函数时，没有找到对应的模块配置，模块id:" + id);
            }
        }
    	/**
		 * 设置限制检查器
		 * @param value	一个字典<br/>
		 * Key  	{number}            限制器(showtype,limittype)类型<br/>
		 * Value	{IModuleChecker}	    模块限制检查器
		 *
		 */
        public set checkers(value: { [index: number]: IModuleChecker }) {
            this._checkers = value;
            this.doCheckLimits();
        }

        protected doCheckLimits() {
            this._needCheck = true;
            egret.callLater(this.checkLimits, this);
        }


        /**
         * 检查限制
         */
        protected checkLimits(): void {
            if (this._needCheck) {
                this._needCheck = false;
                let _checks = this._checkers;
                let _allById = this._allById;
                if (_checks) {
                    if (DEBUG) {
                        var errString = "";
                        var limitWarn = "";
                        var unsolve = "";
                    }
                    var checker: IModuleChecker;
                    for (let id in _allById) {
                        let cfg: IModuleCfg = _allById[id];
                        var showtype = cfg.showtype;
                        if (showtype) {
                            checker = _checks[showtype] as IModuleChecker;
                            if (DEBUG) {
                                if (!checker) {
                                    unsolve += cfg.id + "的显示限制 ";
                                }
                            }
                        }
                        var limittype = cfg.limittype;
                        if (limittype) {
                            checker = _checks[limittype] as IModuleChecker;
                            if (DEBUG) {
                                if (!checker) {
                                    unsolve += cfg.id + "的使用限制 ";
                                }
                            }
                        }
                        if (showtype == limittype) {
                            if (showtype) {
                                if (checker) {
                                    if (RELEASE) {
                                        checker.adjustLimitDatas(cfg.showlimits, cfg.limits);
                                    }
                                    if (DEBUG) {
                                        if (checker.adjustLimitDatas(cfg.showlimits, cfg.limits)) {
                                            errString += cfg.id + " ";
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (DEBUG) {
                                limitWarn += cfg.id + " ";
                            }
                        }
                        if (!this.isModuleShow(cfg)) //
                        {
                            id = cfg.id;
                            this._unshowns.push(id);
                            let displays = this._bindedIOById[id];
                            if (displays) {
                                for (var io of displays) {
                                    io.visible = false;
                                }
                            }
                        }
                    }

                    if (DEBUG) {
                        if (limitWarn) {
                            ThrowError("id为：" + limitWarn + "的功能配置，showtype和limittype不一致，请确认是否要这样，这种配置将无法通过程序的方式确认当可以使用功能的时候，是否一定看得见功能入口", 2);
                        }
                        if (errString) {
                            ThrowError("id为:" + errString + "的功能配置使用限制和显示限制配置有误，自动进行修正", 2);
                        }
                        if (unsolve) {
                            ThrowError("有功能配置的限制类型并未实现：", 2);
                        }
                    }
                    dispatch(ModuleManager.MODULE_CHECKER_INITED);
                }
            }
        }


        /**
         * 模块是否已经显示
         * @param module    {string | ModuleCfg}    模块或者模块配置
         */
        public isModuleShow(module: string | IModuleCfg): boolean {
            let cfg: IModuleCfg = this.getCfg(module);
            let flag = cfg && !cfg.close;
            if (flag && this._checkers) {
                var checker: IModuleChecker = this._checkers[cfg.showtype] as IModuleChecker;
                if (checker) {
                    flag = checker.check(cfg.showlimits, false);
                }
            }
            return flag;
        }

        /**
         * 模块是否已经开启
         * @param module    {string | ModuleCfg}    模块或者模块配置
         * @param showtip   是否显示Tip
         */
        public isModuleOpened(module: string | IModuleCfg, showtip: boolean): boolean {
            let cfg: IModuleCfg = this.getCfg(module);
            if (RELEASE || ClientCheck.isClientCheck) { //屏蔽客户端检测只针对open，不针对show
                var flag = cfg && !cfg.close && cfg.serverOpen;
                if (flag) {
                    if (this._checkers) {
                        var checker: IModuleChecker = this._checkers[cfg.limittype] as IModuleChecker;
                        if (checker) {
                            flag = checker.check(cfg.limits, showtip);
                        }
                    }
                }
                else {
                    if (showtip && this.tipHandler) {
                        this.tipHandler("closed");
                    }
                }
                return flag;
            } else {
                return true;
            }
        }

        /**
         * 将交互对象和功能id进行绑定，当交互对象抛出事件后，会执行功能对应的处理器
         * @param id					功能id
         * @param io					交互对象
         * @param eventType		事件
         *
         */
        public bindButton(id: string, io: DisplayObject, eventType: string = egret.TouchEvent.TOUCH_TAP): void {
            if (this._ioBind.has(io)) {
                ThrowError("ModuleManager 注册按钮时候，重复注册了按钮");
                return;
            }
            var cfg: IModuleCfg = this._allById[id] as IModuleCfg;
            if (!cfg) {
                ThrowError("ModuleManager 注册按钮时候，没有找到对应的模块配置，模块id:" + id);
                return;
            }
            var arr = this._bindedIOById[id];
            if (!arr) {
                this._bindedIOById[id] = arr = [];
            }
            arr.push(io);
            this._ioBind.set(io, id);
            io.addEventListener(eventType, this.ioHandler, this);
            if (this.createToolTip) {
                var toolTips = this.createToolTip(cfg);
                if (toolTips) {
                    sui.ToolTipManager.register(io, toolTips);
                }
            }
            var moduleHandler = this._handlersByType[cfg.type];
            if (moduleHandler) {
                this.registerHandlerById(id, moduleHandler);
            }
            let _unshowns = this._unshowns;
            if (!this.isModuleShow(id)) {
                io.visible = false;
                _unshowns.pushOnce(id);
            }
            else {
                _unshowns.remove(id);
            }
        }

        /**
         * 交互事件的处理
         * @param event
         *
         */
        protected ioHandler(event: egret.Event): void {
            this.toggle(this._ioBind.get(<DisplayObject>(event.currentTarget)));
        }

        /**
		 * 检查显示
		 * @param event
		 *
		 */
        protected checkShowHandler(event?: egret.Event): void {
            this._needCheckShow = true;
            egret.callLater(this._checkShowHandler, this);
        }

        protected _checkShowHandler() {
            if (!this._needCheckShow) {
                return;
            }
            this._needCheckShow = false;
            let changed = false;
            let _unshowns = this._unshowns;
            for (var i = _unshowns.length - 1; i >= 0; i--) {
                var id = _unshowns[i];
                if (this.isModuleShow(id)) {
                    let displays = this._bindedIOById[id];
                    if (displays) {
                        for (let dis of displays) {
                            dis.visible = true;
                        }
                    }
                    changed = true;
                    _unshowns.splice(i, 1);
                    dispatch(ModuleManager.MODULE_SHOW, id);
                }
            }
            if (changed) {
                dispatch(ModuleManager.MODULE_SHOW_CHANGED, _unshowns.length);
            }
        }


        /**
         * 打开/关闭指定模块
         * @param name  模块ID
         * @param show      1 打开模块<br/> 0 关闭模块<br/> -1 自动切换(默认)
         * @return 
         */
        public toggle(moduleID: string, show = -1, showtip = true) {
            var cfg: IModuleCfg = this._allById[moduleID] as IModuleCfg;
            if (cfg) {
                dispatch(ModuleManager.MODULE_TRY_TOGGLE, moduleID);

                if (!this.isModuleOpened(cfg, showtip)) {
                    return false;
                }

                var moduleHandler = this._handlersById[moduleID];
                if (!moduleHandler) {
                    moduleHandler = this._handlersByType[cfg.type];
                }

                if (moduleHandler) {
                    switch (show) {
                        case -1:
                            switch (cfg.showState) {
                                case ModuleShowState.HIDE:
                                case ModuleShowState.HIDING:
                                    moduleHandler.open(cfg);
                                    break;
                                case ModuleShowState.SHOW:
                                case ModuleShowState.SHOWING:
                                    moduleHandler.close(cfg);
                                    break;
                            }
                            break;
                        case 0:
                            moduleHandler.close(cfg);
                            break;
                        case 1:
                            moduleHandler.open(cfg);
                            break;
                    }
                    return true;
                }
            }
            else {
                ThrowError("ModuleManager execute时，无法找到对应配置,name" + moduleID);
                return false;
            }
        }

        /**
         * 获取模块
         * @param module
         */
        public getCfg(module: string | IModuleCfg) {
            return typeof module === "string" ? this._allById[module] : module;
        }

        /**
         * 改变服务器模块状态
         * 
         * @param {string}  mid    服务器模块id
         * @param {boolean} state       模块状态
         */
        public serverChangeModuleState(mid: string, state: boolean) {
            let mcfg = this._allById[mid];
            if (mcfg) {
                if (state != mcfg.serverOpen) {
                    mcfg.serverOpen = state;
                    if (state) {
                        dispatch(ModuleManager.MODULE_SERVER_OPEN, mid);
                    } else {
                        dispatch(ModuleManager.MODULE_SERVER_CLOSE, mid);
                    }
                }
            }
        }
    }
}
