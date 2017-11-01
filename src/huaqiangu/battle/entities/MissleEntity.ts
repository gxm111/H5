module junyou.hqg {
    /**
     * 带有追踪功能的箭矢，会追踪一个指定目标
     * @author 3tion
     */
    export class MissleEntity extends ArrowEntity {

        private _speed: number;
        private _useDirection: boolean;
        private _target: UnitEntity;

        constructor() {
            super();
        }

        checkPosition(controller: FightController, now: number): boolean {
            let delta = now - this._time;
            this._time = now;
            var target = this._target;
            var display = this._display;
            if (!target.disposed) {
                var sx = display.x; // 当前x
                var sy = display.y; // 当前y
                var tx = target.x;
                var ty = target.y;
                var dx = tx - sx;
                var dy = ty - sy;
                var plus = this._speed * delta;
                //计算出引力分量
                var rad = Math.atan2(dy, dx);
                display.x += Math.cos(rad) * plus;
                display.y += Math.sin(rad) * plus;
                display.rotation = ArrowEntity.getRotation(sx, sy, tx, ty);
                return false;
            }
            else { // 目标已死亡
                return true;
            }
        }

        dispose() {
            MissleEntity._pool.recycle(this);
        }

        onRecycle() {
            super.onRecycle();
            this._target = undefined;
        }

        private static _pool: RecyclablePool<MissleEntity> = new RecyclablePool(MissleEntity);

        /**
         * 获取一个直线攻击的箭矢实例
         * 
         * @static
         * @param {SkillContext} origionContext 原始的技能上下文
         * @param {number} now 当前时间戳
         * @param {number} uri 箭矢特效资源路径
         * @param {number} sx 起始坐标X
         * @param {number} sy 起始坐标Y
         * @param {UnitEntity} target 追踪的目标
         * @param {number} [speed=1] 默认箭矢飞行速度，每毫秒1像素
         * @param {boolean} [useDirection=true] 箭矢是否需要按飞行方向旋转
         * @param {number} [height=60] 箭矢飞行高度
         * @param {boolean} [disOnCollOver] 当攻击达到最大次数时，消失
         * @param {number} [max] 最大目标数，如果不设置，直接取技能配置的最大目标数
         * @param {number} [maxDuration] 最大持续时间
         * @returns {StrightArrowEntity}
         */
        public static getInstance(origionContext: SkillContext, now: number, uri: string, sx: number, sy: number, target: UnitEntity, speed: number = 1, useDirection: boolean = true, height?: number, disOnCollOver?: boolean, max?: number, maxDuration?: number) {
            let arrow = this._pool.getInstance();
            arrow.create(origionContext, now, uri, sx, sy, max, height, disOnCollOver, maxDuration);
            arrow._target = target;
            arrow._useDirection = useDirection;
            arrow._speed = speed;
            return arrow;
        }
    }
}