module junyou.hqg {

    export var ArrowState = {
        /**
         * 初始化完成
         */
        Inited: 0,
        /**
         * 飞行中
         */
        Flying: 1,
        /**
         * 飞行结束
         */
        End: 2,
        /**
         * 已销毁
         */
        Disposed: 3,
        /**
         * 已回收
         */
        Recycled: 4
    }

    /**
     * 花千骨游戏中的箭矢实体<br/>
     * 由UnitEntity或者其他实体发出，朝特定方向持续直线飞行，并对敌对目标检测是否会碰撞
     */
    export abstract class ArrowEntity implements IEntity {

        /**
         * 基于箭头方向垂直朝上，基于原点旋转的资源，根据飞行方向获取旋转角度
         * 
         * @param {number} fx 起点坐标X
         * @param {number} fy 起点坐标Y
         * @param {number} tx 终点坐标X
         * @param {number} ty 终点坐标Y
         * @returns 旋转角度
         */
        public static getRotation(fx: number, fy: number, tx: number, ty: number) {
            return 180 - Math.atan2(tx - fx, ty - fy) * Math.RAD_TO_DEG;
        }

        guid: number;

        protected _state: number = ArrowState.Inited;

        public get disposed() {
            return this._state == ArrowState.Disposed;
        }

        protected _context: SkillContext;

        /**
         * 时间戳变量，一般用于当起始时间处理
         * 
         * @protected
         * @type {number}
         */
        protected _time: number;

        /**
         * 技能最大持续时间
         * 
         * @protected
         * @type {number}
         */
        protected _maxDuration: number = Number.MAX_VALUE;

        /**
         * 最大目标数
         * 不直接用skillCfg的max，防止多重箭矢，每只箭矢都取了技能的最大目标数
         * @protected
         * @type {number}
         */
        protected _max: number;

        public x: number;
        public y: number;

        /**
         * 消失回调
         * 
         * @type {CallbackInfo}
         */
        protected _disCallback: CallbackInfo;

        /**
         * 和目标碰撞时的回调
         * 
         * @protected
         * @type {CallbackInfo}
         */
        protected _collCallback: CallbackInfo;

        /**
         * 碰撞的检查距离
         * 
         * @protected
         * @type {number}
         */
        protected _collSqDist: number = 400;// 默认20像素以内算碰撞到


        /**
         * 当攻击够足够目标后，就会消失
         * 
         * @protected
         * @type {boolean}
         */
        protected _disOnCollOver: boolean;


        /**
         * 箭矢可视对象
         * 
         * @type {game.ResourceBitmap}
         */
        protected _display: game.ResourceBitmap;

        /**
         * 箭矢的动画播放器
         * 
         * @protected
         * @type {game.AniRender}
         */
        protected _render: game.AniRender;

        /**
         * 初始化箭矢实例
         * 
         * @static
         * @param {SkillContext} origionContext 原始的技能上下文
         * @param {number} now 当前时间戳
         * @param {number} uri 箭矢特效资源路径
         * @param {number} sx 起始坐标X
         * @param {number} sy 起始坐标Y
         * @param {number} [height=60] 箭矢飞行高度
         * @param {boolean} [disOnCollOver] 当攻击达到最大次数时，消失
         * @param {number} [max] 最大目标数，如果不设置，直接取技能配置的最大目标数
         * @param {number} [maxDuration] 最大持续时间
         * @returns {StrightArrowEntity}
         */
        protected create(origionContext: SkillContext, now: number, uri: string, sx: number, sy: number, height: number = 60, max?: number, disOnCollOver?: boolean, maxDuration?: number) {
            this._context = origionContext.clone();
            this._render = origionContext.controller.getAniRender(uri);
            var display = this._render.display;
            this._display = display;
            display.z = -height;
            display.x = sx;
            display.y = sy;
            this._max = max || origionContext.skillCfg.maxtarget;
            this._time = now;
            this._disOnCollOver = disOnCollOver;
            this._maxDuration = maxDuration || Number.MAX_VALUE;
        }


        /**
         * 数据处理帧
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doData(controller: FightController, now: number) {
            let state = this._state;
            if (state == ArrowState.Disposed) { // 如果已经销毁，则等待回收
                return;
            }
            let duration = now - this._time;
            if (duration >= this._maxDuration) { // 到达最大持续时间
                this._state = state = ArrowState.End;
            }
            if (state == ArrowState.End) { // 如果已经飞行结束
                if (this._render) {
                    this._render.doComplete(now);
                    this._render = undefined;
                }
                this._state = ArrowState.Disposed;
                // 执行消失回调
                this._disCallback.call(this);
                return;
            }
            // 改变可视对象的位移
            if (this.checkPosition(controller, now)) {
                this._state = ArrowState.End;
            }
            // 将显示位移并到实体上
            let display = this._display;
            this.x = display.x;
            this.y = display.y;
            let context = this._context;
            // 检查单位碰撞
            let willChecked = context.getWillChecked();
            let collSqDist = this._collSqDist;
            let targets = context.targets;
            let max = this._max;
            let i = 0;
            let collCallback = this._collCallback;
            // 处理攻击目标
            for (let i = 0, len = willChecked.length; i < len; i++) {
                let entity = willChecked[i];
                if (FightController.getSQDist2(this, entity) <= collSqDist) {
                    if (i < max) {
                        // 产生伤害，做受创回调
                        collCallback.call(entity);
                    } else {
                        if (this._disOnCollOver) {
                            this._state = ArrowState.End;
                        }
                        break;
                    }
                }
            }
        }


        /**
         * 处理可视对象的位移
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         * @return {boolean} 是否飞行结束 true 已经结束 false 未结束
         */
        abstract checkPosition(controller: FightController, now: number): boolean;

        /**
         * 数据渲染信息
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doRender(controller: FightController, now: number) {
            if (this._state == ArrowState.Disposed) { // 如果已经销毁，则等待回收
                return;
            }
            // 改变可视对象的位移
            if (this.checkPosition(controller, now)) {
                this._state = ArrowState.End;
            }
            // 不在Render处理回调，等到下一帧doData处理
        }

        /**
         * 执行recycle操作
         * 
         * @abstract
         */
        abstract dispose();

        onRecycle() {
            this._state = ArrowState.Recycled;
            if (this._context) {
                this._context.recycle();
            }
            var callback = this._disCallback;
            if (callback) {
                this._disCallback = undefined;
                callback.recycle();
            }
            if (this._render) {
                this._render.doComplete(0);
                this._render = undefined;
            }
        }

        onSpawn() {
            this._state = ArrowState.Inited;
            this._maxDuration = Number.MAX_VALUE;
        }

    }
}