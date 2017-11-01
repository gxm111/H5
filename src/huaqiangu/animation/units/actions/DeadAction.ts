module junyou.hqg {
    /**
     * 死亡的动作
     * @author 3tion
     */
    export class DeadAction extends GUnitAction implements IRecyclable {
        /**
        * 死亡的自定义动作
        */
        public static DEAD_ACTION: game.IRenderAction = { key: -1, frames: [<game.FrameInfo>{ a: 2, f: 0, d: -1, t: 10000000 }] }

        /**
         * 死亡的初始时间
         */
        protected _time: number;

        /**
         * 飞行角度
         * 
         * @protected
         * @type {number}
         */
        protected _ty: number;

        /**
         * 飞行速度
         * 
         * @protected
         * @type {number}
         */
        protected _tx: number;

        /**
         * 初始坐标x
         * 
         * @protected
         * @type {number}
         */
        protected _sx: number;

        /**
         * 初始坐标y
         * 
         * @protected
         * @type {number}
         */
        protected _sy: number;

        /**
         * 死亡方向
         */
        protected _rotation: number;
        /**
         * 最大高度
         * 
         * @protected
         * @type {number}
         */
        protected _maxHeight: number;

        /**
         * 飞行总时长
         * 
         * @protected
         * @type {number}
         */
        protected _duration: number;

        /**
         * 检查当前动作是否可以结束<br/>
         * @return true 可以结束<br/>
         *         false 不可结束
         */
        public get canStop(): Boolean {
            //只有攻击动作结束，才可以结束
            return false;
        }

        protected reset(tx: number, ty: number, rad: number, maxHeight: number, duration: number) {
            this._tx = tx;
            this._ty = ty;
            let rotation = rad * Math.RAD_TO_DEG;
            if (rotation < -90) {
                rotation += 90;
            } else if (rotation <= 90) {
                rotation -= 90;
            } else {
                rotation -= 270;
            }
            this._rotation = rotation;
            this._maxHeight = maxHeight;
            this._duration = duration;
        }

        playAction(unit: GUnit, mountType: game.MountType) {
            unit.doCustomAction(DeadAction.DEAD_ACTION);
        }
        /**
        * 播放动作
        */
        public start(unit: GUnit, now: number) {
            this._isEnd = false;
            this._time = now;
            this._sx = unit.x;
            this._sy = unit.y;
            unit.state = game.UnitState.Deading;
            return true;
        }

        /**
         * 死亡不影响整体动作，所以坐标更新放在onRender而不放在onData中
         * 
         * @param {GUnit} unit (description)
         * @param {number} now (description)
         * @returns (description)
         */
        public doRender(unit: GUnit, now: number) {
            if (!this._isEnd) {
                var delta = now - this._time;
                if (!delta) {
                    return;
                }
                var duration = this._duration;
                if (delta < duration) {
                    delta /= duration;
                    unit.x = this.easeOut(delta, this._sx, this._tx - this._sx, this._duration);
                    unit.y = this.easeOut(delta, this._sy, this._ty - this._sy, this._duration);
                    unit.z = - this._maxHeight * Math.sin(delta * Math.PI);
                    unit.rotation = delta * this._rotation;
                } else {
                    unit.x = this._tx;
                    unit.y = this._ty;
                    unit.z = 0;
                    unit.rotation = this._rotation;
                    unit.state = game.UnitState.Dead;
                    this._isEnd = true;
                }
            }
        }

        public doData(unit: GUnit, now: number) {
            if (!this._isEnd) {
                var delta = now - this._time;
                if (!delta) {
                    return;
                }
                if (delta >= this._duration) {
                    unit.state = game.UnitState.Dead;
                    this._isEnd = true;
                }
            }
        }

        easeOut(t: number, b: number, c: number, d: number): number {
            return -c * (t /= d) * (t - 2) + b;
        }

        private static _pool: RecyclablePool<DeadAction> = new RecyclablePool(DeadAction);


        /**
         * 获取死亡飞行的动作
         * 
         * @static
         * @param {number} tx 死亡飞行的落点坐标x
         * @param {number} ty 死亡飞行的落点坐标y
         * @param {number} rad 死亡方向
         * @param {number} [maxHeight=80] 最大高度
         * @param {number} [duration=400] 飞行持续时间
         * @returns {DeadAction} 死亡飞行的动作
         */
        static getInstance(tx: number, ty: number, rad: number, maxHeight = 80, duration: number = 600): DeadAction {
            var wa = this._pool.getInstance();
            wa.reset(tx, ty, rad, maxHeight, duration);
            return wa;
        }

        /**
         * 动画播放结束的回调
         */
        public playComplete(unit: game.Unit, now: number) {
        }

        public recycle() {
            DeadAction._pool.recycle(this);
        }
    }
}