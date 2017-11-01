module junyou.hqg {
    import Container = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
	/**
	 * 花千骨H5中使用的单位
	 * @author 3tion
	 *
	 */
    export class GUnit extends game.Unit {

        public static PART_LIST = ["wingDown", "cloth", "weapon", "wingUp"];
        /**
         * 移动速度<br/>
         * 每秒可移动的像素距离
         */
        public speed: number = 300;

        /**
         * 用于放UI的容器
         * 
         * @type {game.DSprite}
         */
        public ui: game.DSprite;

        public hpbar: HpBar;

        /**
         * 脚底特效容器
         */
        protected halo: Container;

        /**
         * 身上特效容器
         * 
         * @protected
         * @type {Container}
         */
        protected buff: Container;

        /**
         * 脚底光环容器
         * 
         * @protected
         * @type {BuffContainer}
         */
        protected _haloBC: BuffContainer;

        /**
         * 身上特效容器
         * 
         * @protected
         * @type {BuffContainer}
         */
        protected _bodyBC: BuffContainer;

        /**
         * 头顶特效容器
         * 
         * @protected
         * @type {BuffContainer}
         */
        protected _headBC: BuffContainer;

        /**
         * 头顶基准偏移量
         * 
         * @protected
         * @type {number}
         */
        protected _headY: number;

        /**
         * 头顶基准偏移量
         * 
         * @readonly
         */
        public get hurtY() {
            return this._hurtY;
        }

        /**
         * 受创点基准Y
         * 
         * @protected
         * @type {number}
         */
        protected _hurtY: number;

        constructor(pst: string, setting: game.UnitSetting) {
            super(pst, setting);
            this._partList = GUnit.PART_LIST;
        }

        initDefaultAction() {
            this.aStandBy = new StandByAction();
        }

        /**
		 * 设置刀光
		 */
        public setDaoguang(uri: string) {
            if (uri) {
                uri = game.ResPrefix.DaoGuang + uri;
            }
            this.setRes("daoguang", uri);
        }

        /**
         * 设置武器
         */
        public setWeapon(uri: string) {
            if (uri) {
                uri = game.ResPrefix.Weapon + uri;
            }
            this.setRes("weapon", uri);
        }

        /**
         * 设置翅膀
         */
        public setWing(uri: string) {
            if (uri) {
                this.setRes("wingUp", game.ResPrefix.Wing + uri + "/u");
                this.setRes("wingDown", game.ResPrefix.Wing + uri + "/d");
            } else {
                this.setRes("wingUp");
                this.setRes("wingDown");
            }
        }

        initDisplayList(setting: game.UnitSetting) {
            super.initDisplayList(setting);
            if (setting.hasUILayer) {
                this.ui = new game.DSprite;
                this.ui.depth = this._depth;
                this.hpbar = new HpBar(true);
                egret.callLater(this.refreshHeadUI, this);
                this.ui.addChild(this.hpbar);
            }
            if (setting.hasHaloLayer) {
                let halo = this.halo = new Container();
                this._haloBC = new BuffContainer(halo);
            }
            if (setting.hasBuffLayer) {
                let buff = this.buff = new Container();
                if (this.ui) {
                    this._headBC = new BuffContainer(this.ui);
                }
                else {
                    this._headBC = new BuffContainer(buff);
                }
                this._bodyBC = new BuffContainer(buff);
                this.body.addChild(buff);
            }
        }

        pstInfoChange() {
            let pst = this._pstInfo;
            if (pst) {
                this._headY = pst.headY || -110;
                this._hurtY = pst.hurtY || -70;
                this._headBC.setOffsetHeight(this._headY);
                egret.callLater(this.refreshHeadUI, this);
            }
        }

        /**
         * 刷新头顶UI
         * 
         * @protected
         */
        protected refreshHeadUI() {
            this.hpbar.y = this._headY;
        }


        addedToEngine(doRender = true) {
            super.addedToEngine(doRender);
            var engine = game.GameEngine.instance;
            if (this.ui) {
                engine.getLayer(game.GameLayerID.SortedUI).addChild(this.ui);
            }
            if (this.halo) {
                engine.getLayer(game.GameLayerID.Bottom).addChild(this.halo);
            }
        }

        /**
         * 获取指定受创点(角色原点的相对坐标)
         * @param {number} action       默认使用当前动作
         * @param {number} direction    默认使用当前方向
         * @param {egret.Point} 受创点坐标，只读数据
         */
        public getCastPoint(action?: number, direction?: number) {
            if (action === void 0 || isNaN(action)) {
                action = this._action;
            }
            if (direction === void 0) {
                direction = this.faceTo;
            }
            return this._pstInfo.getCastPoint(action, direction);
        }


        /**
         * 向头顶添加buff
         * 
         * @param {DisplayObject} display
         */
        public addToHeadBuff(display: DisplayObject): void {
            if (this._headBC) {
                this._headBC.addChild(display);
            }
        }

        /**
         * 向身上添加buff
         * 
         * @param {DisplayObject} display
         */
        public addToBodyBuff(display: DisplayObject): void {
            if (this._bodyBC) {
                this._bodyBC.addChild(display);
            }
        }

        /**
         * 向脚底添加buff
         * 
         * @param {DisplayObject} display
         */
        public addToHalo(display: DisplayObject): void {
            if (this._haloBC) {
                this._haloBC.addChild(display);
            }
        }
        /**
         * 检查模型和其他的y轴
         */
        protected checkPosition() {
            super.checkPosition();
            if (this.halo) {
                this.halo.x = this.x;
                this.halo.y = this.y;
            }
            if (this.ui) {
                this.ui.x = this.x;
                this.ui.y = this.y;
            }
        }

        public onRecycle() {
            removeDisplay(this.ui);
            super.onRecycle();
        }

        public dead(tx: number, ty: number, rad: number, now: number) {
            //死亡强制结束
            let currentAction = this._currentAction;
            if (currentAction) {
                currentAction.terminate();
                currentAction.recycle();
            }
            currentAction = DeadAction.getInstance(tx, ty, rad);
            this._currentAction = currentAction;
            currentAction.start(this, now);
        }
    }
}