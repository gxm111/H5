module junyou.sui {
	/**
	 * 模块面板
	 * @author 3tion
	 *
	 */
    export abstract class Panel extends egret.Sprite implements ISuiDataCallback, mvc.IAsyncPanel {
        /**
         * 面板宽度
         * 
         * @static
         * @type {number}
         */
        public static WIDTH: number = 480;
        /**
         * 面板高度
         * 
         * @static
         * @type {number}
         */
        public static HEIGHT: number = 800;
        /**
         * 模态颜色
         * 
         * @static
         * @type {number}
         */
        public static MODAL_COLOR: number = 0x333333;
        /**
         * 模态透明度
         * 
         * @static
         * @type {number}
         */
        public static MODAL_ALPHA: number = 0.8;

        /**
        * 异步的Helper
        */
        protected _asyncHelper: mvc.AsyncHelper;
        /**
         * 模块ID
         */
        public moduleID: string;
        /**
         * 面板在fla中的原始坐标
         * 
         * @protected
         * @type {egret.Rectangle}
         */
        protected _baseRect: egret.Rectangle;
        /**
         * 自己的key(fla的文件名)
         */
        protected _key: string;
        /**
         * 依赖的除lib,自己以外的其他fla
         */
        protected _otherDepends: string[];
        protected _className: string;
        /**
         * 所有依赖的fla资源
         * 
         * @protected
         * @type {string[]}
         */
        protected _depends: string[];

        protected _ready: boolean;
        /**
         * 模态
         * 
         * @protected
         * @type {egret.Sprite}
         */
        protected modal: egret.Shape;
        /**
         * 是否模态
         * 
         * @type {number}
         */
        private _isModal: boolean;
        /**
         * 是否可关闭
         * 
         * @private
         * @type {boolean}
         * @memberOf Panel
         */
        private _closable: boolean;
        /**
         * 是否可显示帮助
         * 
         * @private
         * @type {boolean}
         * @memberOf Panel
         */
        private _helpable: boolean;

        public constructor() {
            super();
            this.init();
        }

        public get isReady() {
            return this._ready;
        }

        public addReadyExecute(handle: Function, thisObj: any, ...args) {
            let _asyncHelper = this._asyncHelper;
            if (!_asyncHelper) {
                this._asyncHelper = _asyncHelper = new mvc.AsyncHelper();
                _asyncHelper._ready = this.isReady;
            }
            _asyncHelper.addReadyExecute(handle, thisObj, args);
        }

        protected init() {
            //this._key=xxxx
            //this._className=xxxx
            //this._otherDepends=[other...];
        }

        public startSync() {
            if (this._otherDepends) {
                this._depends = this._otherDepends.concat();
            } else {
                this._depends = [];
            }
            this._depends.push(this._key);
            this.loadNext();
        }

        protected loadNext() {
            if (this._depends.length) {
                var key = this._depends.pop();
                var suiManager = SuiResManager.getInstance();
                suiManager.loadData(key, this);
            }
            else {
                this.skinDataComplete();
            }
        }

        public suiDataComplete(suiData: SuiData): void {
            this.loadNext();
        }

        public suiDataFailed(suiData: SuiData): void {
            //暂时用alert
            alert(this._className + "加载失败");
        }

		/**
		 * 绑定皮肤
		 */
        protected abstract bindComponents();

		/**
		 * 皮肤数据加载完成
		 */
        protected skinDataComplete() {
            this.bindComponents();
            if (this["bg"]) {
                this["bg"].touchEnabled = true;
            }
            if (this["closeBtn"]) {
                this.closable = true;
            }
            if (this["helpBtn"]) {
                this.helpable = true;
            }
            this._ready = true;
            if (this._asyncHelper) {
                this._asyncHelper.readyNow();
            }
        }

        protected addedToStage() {
            if (this._isModal) {
                this.addModal();
            }
        }

        public get helpable(): boolean {
            return this._helpable;
        }

        public set helpable(value: boolean) {
            this._helpable = value;
            if (value && this["helpBtn"]) {
                this["helpBtn"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelp, this);
            }
            else if (this["helpBtn"]) {
                this["helpBtn"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showHelp, this);
            }
        }

        public get closable(): boolean {
            return this._closable;
        }

        public set closable(value: boolean) {
            this._closable = value;
            if (value && this["closeBtn"]) {
                this["closeBtn"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
            else if (this["closeBtn"]) {
                this["closeBtn"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            }
        }

        public get isModal(): boolean {
            return this._isModal;
        }

        public set isModal(value: boolean) {
            this._isModal = value;
            if (value) {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            }
            else {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            }
        }

        /**
         * 加模态
         * 
         * @protected
         */
        protected addModal() {
            if (!this.modal) {
                let m = this.modal = new egret.Shape();
                m.touchEnabled = true;
                m.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                let g = m.graphics;
                g.clear();
                g.beginFill(Panel.MODAL_COLOR, Panel.MODAL_ALPHA);
                g.drawRect(0, 0, Panel.WIDTH, Panel.HEIGHT);
                g.endFill();
            }
            this.addChildAt(this.modal, 0);
        }

        /**
         * 移除模态
         * 
         * @protected
         */
        protected removeModal() {
            if (this.modal) {
                this.modal.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
                removeDisplay(this.modal);
            }
        }

        /**
         * 关闭
         * 
         * @protected
         */
        protected hide() {
            //removeDisplay(this);
            mvc.Facade.getInstance().toggle(this.moduleID, 0);
        }

        protected showHelp() {
            mvc.Facade.getInstance().executeMediator("Help", false, "setData", true, this.moduleID);
        }

        //		/**
        //         * @private
        //         * 显示对象添加到舞台
        //         */
        //        $onAddToStage(stage: egret.Stage,nestLevel: number): void {
        //            super.$onAddToStage(stage,nestLevel);
        //            //TODO
        //
        //        }
        //
        //        /**
        //         * @private
        //         * 显示对象从舞台移除
        //         */
        //        $onRemoveFromStage(): void {
        //            super.$onRemoveFromStage();
        //            
        //            //TODO
        //        }

    }
}
