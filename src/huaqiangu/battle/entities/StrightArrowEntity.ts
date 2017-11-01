module junyou.hqg {
    /**
     * 直线飞行的箭矢
     * @author 3tion
     */
    export class StrightArrowEntity extends ArrowEntity {


        /**
         * 初始坐标X
         * 
         * @protected
         * @type {number}
         */
        protected _sx: number;
        /**
         * 初始坐标Y
         * 
         * @protected
         * @type {number}
         */
        protected _sy: number;
        protected _tx: number;
        protected _ty: number;
        protected _speed: number;

        constructor() {
            super();
        }

        checkPosition(controller: FightController, now: number): boolean {
            let delta = now - this._time;
            let display = this._display;
            let sx = this._sx;
            let sy = this._sy;
            let dx = this._tx - this._sx;
            let dy = this._ty - this._sy;
            //由于使用2:1宽高比，total实际距离为2dy * 2dy
            let total = Math.sqrt(dx * dx + 4 * dy * dy);
            let d = delta / total * this._speed;
            if (d < 1) {
                display.x = sx + dx * d;
                display.y = sy + dy * d;
                return false;
            } else {
                display.x = this._tx;
                display.y = this._ty;
                return true;
            }
        }

        dispose() {
            StrightArrowEntity._pool.recycle(this);
        }

        private static _pool: RecyclablePool<StrightArrowEntity> = new RecyclablePool(StrightArrowEntity);

        /**
         * 获取一个直线攻击的箭矢实例
         * 
         * @static
         * @param {SkillContext} origionContext 原始的技能上下文
         * @param {number} now 当前时间戳
         * @param {number} uri 箭矢特效资源路径
         * @param {number} sx 起始坐标X
         * @param {number} sy 起始坐标Y
         * @param {number} tx 目标坐标X
         * @param {number} ty 目标坐标Y
         * @param {number} [speed=1] 默认箭矢飞行速度，每毫秒1像素
         * @param {boolean} [useDirection=true] 箭矢是否需要按飞行方向旋转
         * @param {number} [height=60] 箭矢飞行高度
         * @param {boolean} [disOnCollOver] 当攻击达到最大次数时，消失
         * @param {number} [max] 最大目标数，如果不设置，直接取技能配置的最大目标数
         * @param {number} [maxDuration] 最大持续时间
         * @returns {StrightArrowEntity}
         */
        public static getInstance(origionContext: SkillContext, now: number, uri: string, sx: number, sy: number, tx: number, ty: number, speed: number = 1, useDirection: boolean = true, height?: number, disOnCollOver?: boolean, max?: number, maxDuration?: number) {
            let arrow = this._pool.getInstance();
            arrow.create(origionContext, now, uri, sx, sy, max, height, disOnCollOver, maxDuration);
            arrow._tx = tx;
            arrow._ty = ty;
            arrow._sx = sx;
            arrow._sy = sy;
            arrow._speed = speed;
            if (useDirection) {
                arrow._display.rotation = ArrowEntity.getRotation(sx, sy, tx, ty);
            }
            return arrow;
        }

    }
}