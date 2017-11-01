module junyou.game {
    import Event = egret.Event;
    import Container = egret.DisplayObjectContainer
	/**
	 * 基本单位<br/>
	 * 是一个状态机<br/>
	 * @author 3tion
	 *
	 */
    export class Unit {

        /**
         * 单位状态
         * 
         * @type {UnitState}
         */
        public state: UnitState;
        /**
         * 默认的部位列表
         * 
         * @static
         */
        public static PART_LIST = ["cloth"];
        /**
         * 单位标识
         */
        public guid: string | number;
        /**
         * 播放速度，默认为1倍速度<br/>
         * 值越高，速度越快
         */
        public get playSpeed(): number {
            return this._render.playSpeed;
        }

        /**
         * 设置播放速度
         */
        public set playSpeed(value: number) {
            this._render.playSpeed = value;
        }

    	/**
    	 * 用于放纸娃娃贴图的容器
         * 只允许放ResourceBitmap
    	 */
        protected model: Container;
        /**
         * 人物身体
         */
        protected body: DSprite;

        /**
         * 人物底图层
         */
        protected _resDict: { [index: string]: ResourceBitmap };

        /**
         * 当前骑乘标识
         */
        protected _mountType: MountType = MountType.ground;


        /**
         * 资源列表改变
         */
        protected _resListChange: Boolean;

        /**
         * 打包信息
         */
        protected _pstInfo: PstInfo;

        /**
         * 渲染器
         */
        protected _render: UnitRender;

        /**
         * 角色的动作序列
         * 
         * @protected
         * @type {number}
         */
        protected _action: number;

        /**
         * 纸娃娃排序列表
         * 
         * @protected
         * @type {string[]}
         */
        protected _partList: string[];

        /**
         * 设置单位pst
         */
        public set pst(pst: string) {
            let pstInfo = this.getPstInfo(pst);
            if (pstInfo != this._pstInfo) {
                this._pstInfo = pstInfo;
                this.pstInfoChange();
            }
        }

        protected pstInfoChange() {
            // 子类根据需求重写
        }

        protected getPstInfo(pst: string) {
            return DataLocator.getData(ConfigKey.PST)[pst];
        }


        public constructor(pst: string, setting: UnitSetting) {
            this._partList = Unit.PART_LIST;
            this.onSpwan();
            this._resDict = {};
            this.initDisplayList(setting);
            this.pst = pst;
            this.initDefaultAction();
            this.startUnitAction();
        }

        public onSpwan() {
            this.state = UnitState.Init;
        }

        /**
         * 重置渲染器时间
         * 
         * @param {number} now (description)
         */
        public resetRenderTime(now: number) {
            this._render.resetTime(now);
        }

        /**
         * 初始化显示列表
         * @param setting
         */
        protected initDisplayList(setting: UnitSetting) {
            this._render = new UnitRender(this);
            this._render.model = this.model = new Container();
            this.body = new DSprite();
            this.body.addChild(this.model);

            //其他设置

            this._depth = setting.getDepth();

            if (setting.addToEngine) {
                this.addedToEngine();
            }
        }

        /**
         * 设置朝向
         */
        public set faceTo(value: number) {
            this._render.faceTo = value >> 0;
        }

        /**
         * 获取朝向
         */
        public get faceTo() {
            return this._render.faceTo;
        }

        /**
         * 播放自定义动作
         * 
         * @param {IRenderAction} customAction (description)
         * @param {number} [startFrame=-1] (description)
         */
        public doCustomAction(customAction: IRenderAction, startFrame: number = -1) {
            let render = this._render;
            let action = customAction.key;
            if (this._action != action) {
                this._action = action;
                render.actionInfo = customAction;
                startFrame = 0;
            }
            if (startFrame > -1) {
                render.f = startFrame;
            }
        }


        /**
         * 执行动作序列
         * @private 只允许UnitAction调用
         */
        public doAction(now: number, action: number, startFrame: number = -1): void {
            let render = this._render;
            action = action >> 0;
            if (this._action != action) {
                this._action = action;
                render.actionInfo = this._pstInfo.frames[action];
                render.resetTime(now);
                startFrame = 0;
            }
            if (startFrame > -1) {
                render.f = startFrame;
            }
        }


		/**
		 * 设置衣服/裸模/底图
		 */
        public setCloth(uri: string) {
            if (uri) {
                uri = ResPrefix.Cloth + uri;
            }
            this.setRes("cloth", uri);
        }

        /**
         * 对指定部位设置资源
         * 
         * @protected
         * @param {string} part 部位
         * @param {string} [uri] 资源路径，不传则清空部位
         * @param {string} [pst] 通过其他pst配置进行加载
         */
        protected setRes(part: string, uri?: string, pst?: string) {
            var bmp: ResourceBitmap = this._resDict[part];
            if (!bmp) {
                bmp = ResourceBitmap.getInstance();
                this._resDict[part] = bmp;
                this.invalidateResList();
            }
            var res;
            if (uri) {
                let pstInfo;
                if (pst) {
                    pstInfo = this.getPstInfo(pst);
                } else {
                    pstInfo = this._pstInfo;
                }
                if (pstInfo) {
                    res = pstInfo.getUnitResource(uri);
                }
            }
            if (res != bmp.res) {
                bmp.res = res;
                this.invalidateResList();
            }
        }

        /**
         * 资源列表发生改变
         */
        protected invalidateResList() {
            this._resListChange = true;
        }

        /**
         * 刷新资源列表
         */
        protected refreshResList() {
            if (this._resListChange) {
                this.checkResList(this._partList);
            }
        }

        /**
         * 检查资源列表
         * 
         * @param {string[]} resOrder 部位的排列顺序
         */
        protected checkResList(resOrder: string[]) {
            this.model.removeChildren();
            let model = this.model;
            let idx = 0;
            for (let key of resOrder) {
                let part: ResourceBitmap = this._resDict[key];
                if (part && part.res) {
                    model.addChild(part);
                }
            }
        }


        /**
         * 执行默认的，基于enterframe的渲染
         * 
         * @protected
         */
        protected $render(): void {
            let now = Global.now;
            if (this._resListChange) {
                this.refreshResList();
            }

            var currentAction = this._currentAction;
            if (currentAction) {
                currentAction.doData(this, now);
                currentAction.doRender(this, now);
            }
            this._render.render(now);
        }

        /**
         * 通过其他方式驱动数据
         * 
         * @param {number} now 时间戳
         */
        public doData(now: number) {
            var currentAction = this._currentAction;
            if (currentAction) {
                currentAction.doData(this, now);
            }
            this._render.doData(now);
        }

        /**
         * 通过其他方式驱动渲染
         * 
         * @param {number} now 时间戳
         */
        public doRender(now: number) {
            this.refreshResList();
            var currentAction = this._currentAction;
            if (currentAction) {
                currentAction.doRender(this, now);
            }
            this._render.doRender(now);
        }

        /**
         * 回收
         */
        public onRecycle() {
            this.model.removeEventListener(Event.ENTER_FRAME, this.$render, this);
            this.model.scaleX = 1;
            this.rotation = 0;
            this.z = 0;
            // 回收ResourceBitmap
            let dict = this._resDict;
            for (let key in dict) {
                let res = dict[key];
                delete dict[key];
                res.recycle();
            }
            if (this._currentAction) {
                this._currentAction.recycle();
                this._currentAction = undefined;
            }
            if (this._render) {
                this._render.resetTime(0);
            }
        }

        /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓UnitAction相关↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

        /**
         * 当前正在执行的动作
         */
        protected _currentAction: UnitAction;

        /**
         * 下一个动作
         */
        protected _nextAction: UnitAction;

        protected aStandBy: UnitAction;


        protected initDefaultAction() {
            this.aStandBy = new UnitAction();
        }


        /**
         * 开始执行单位动作
         * @return true     成功执行动作
         *         false    未成功执行动作，将动作覆盖到下一个动作
         */
        public startUnitAction(action?: UnitAction, now?: number): boolean {
            if (this.state != UnitState.Stage) {
                return;
            }
            now = now || Global.now;
            var currentAction = this._currentAction;
            var flag: boolean = false;
            if (currentAction) {
                if (currentAction != action) {
                    if (!action) {
                        action = this.aStandBy;
                    }
                    // if (currentAction) {
                    if (currentAction.isEnd) {
                        currentAction = action;
                        currentAction.start(this, now);
                        flag = true;
                    }
                    else if (currentAction.canStop) {//可结束
                        currentAction.terminate();
                        currentAction.recycle();
                        currentAction = action;
                        currentAction.start(this, now);
                        flag = true;
                    }
                    else {//不可结束，覆盖下一个动作          
                        if (this._nextAction) {
                            this._nextAction.recycle();
                        }
                        this._nextAction = action;
                    }
                    // } else {
                    //     currentAction = action;
                    // }
                    this._currentAction = currentAction;
                }
            }
            else {
                currentAction = this.aStandBy;
                currentAction.start(this, now);
                this._currentAction = currentAction;
                flag = true;
            }
            currentAction.playAction(this, this._mountType, now);
            return flag;
        }

        public setMountType(value: MountType) {
            if (value != this._mountType) {
                this._mountType = value;
                //由子类实现 先向服务器请求坐骑状态变更，处理其他
            }
        }

        /**
         * 动作的动画播放完毕
         */
        public playComplete(now: number) {
            var currentAction = this._currentAction;
            if (currentAction) {
                currentAction.playComplete(this, now);
                if (currentAction.isEnd) {
                    this.startUnitAction(this._nextAction, now);
                }
                else {
                    currentAction.playAction(this, this._mountType, now);
                }
            }
            else {
                this.startUnitAction(this._nextAction, now);
            }
        }

        /**
         * 动作进行渲染的时候
         */
        public onRenderFrame(now: number) {
            var currentAction = this._currentAction;
            if (currentAction) {
                if (currentAction.isEnd) {
                    this.startUnitAction(this._nextAction, now);
                }
            }
            else {
                this.startUnitAction(this._nextAction, now);
            }
        }


        /**
         * 执行动作中的回调事件
         */
        public dispatchEvent(eventType: string, now: number) {
            var currentAction = this._currentAction;
            if (currentAction) {
                currentAction.dispatchEvent(this, eventType, now);
            }
        }

        //        /**
        //         * 绘制快照
        //         */ 
        //        public drawShortcut(){
        //            //TODO
        //            
        //        }

        /*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑UnitAction相关↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/





        /**
         * 加到游戏引擎中
         * 
         * @param {boolean} [doRender=true] 是否添加Event.ENTER_FRAME事件
         */
        public addedToEngine(doRender = true) {
            // 子类实现其他层的添加
            GameEngine.instance.getLayer(GameLayerID.Sorted).addChild(this.body);
            if (doRender) {
                this.body.addEventListener(Event.ENTER_FRAME, this.$render, this);
            }
            this.state = UnitState.Stage;
        }

        protected _depth: number;

        protected _x: number;

        protected _y: number;

        protected _z: number = 0;

        public get x() {
            return this._x;
        }

        /**
         * 此方法只允许 UnitAction调用
         */
        public set x(value: number) {
            value = value >> 0;
            if (this._x != value) {
                this._x = value;
                this.checkPosition();
            }
        }

        public get y() {
            return this._y;
        }

        /**
         * 此方法只允许 UnitAction调用
         */
        public set y(value: number) {
            value = value >> 0;
            if (this._y != value) {
                this._y = value;
                this.checkPosition();
                GameEngine.invalidateSort();
            }
        }


        public get z(): number {
            return this._z;
        }

        /**
         * 此方法只允许 UnitAction调用
         */
        public set z(value: number) {
            value = value >> 0;
            if (this._z != value) {
                this._z = value;
                this.checkPosition();
            }
        }

        /**
         * 检查模型和其他的y轴
         */
        protected checkPosition() {
            var body = this.body;
            if (body) {
                body.depth = this._depth + this._y;
                body.y = this._y + this._z;
                body.x = this._x;
            }
        }

        protected _rotation: number = 0;

        /**
         * 设置旋转角度
         * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
         * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或减去 360 获得该范围内的值。
         * 例如，myDisplayObject.rotation = 450语句与 myDisplayObject.rotation = 90 是相同的
         */
        public set rotation(value: number) {
            if (this._rotation != value) {
                this._rotation = value;
                if (this.model.scaleX >= 0) {
                    this.model.rotation = value;
                }
                else {
                    this.model.rotation = -value;
                }
            }
        }

        /**
         * 获得模型的旋转角度
         */
        public get rotation() {
            return this._rotation;
        }
    }
}