module junyou.hqg {
    /**
    * 最小判定是否到达目的地的距离
    */
    const MIN_SQ_DISTANCE = 100;

    /**
     * 移动动作
     * @author 3tion
     */
    export class WalkAction extends GUnitAction implements IRecyclable {

        /**
         * 目标坐标x
         */
        protected _tx: number;

        /**
         * 目标坐标y
         */
        protected _ty: number;

        /**
         * 起始时间
         */
        protected _startTime: number;
        /**
         * 每秒移动多少像素
         */
        constructor() {
            super();
            this._action = GUnitAction.getAction(1);
        }

        protected reset(tx: number, ty: number) {
            this._tx = tx;
            this._ty = ty;
        }

        /**
        * 播放动作
        */
        public start(unit: GUnit, now: number) {
            this._isEnd = false;
            this._startTime = now;
            unit.faceTo = game.FaceToUtils.getMouseFaceTo8(unit.x, unit.y, this._tx, this._ty);
            return true;
        }

        /**
         * 更新单位坐标
         */
        public doData(unit: GUnit, now: number) {
            if (!this._isEnd) {
                var delta = now - this._startTime;
                if (!delta) {
                    return;
                }
                var sx = unit.x;
                var sy = unit.y;
                var dx = this._tx - sx;
                var dy = this._ty - sy;
                //由于使用2:1宽高比，total实际距离为2dy * 2dy
                var total = Math.sqrt(dx * dx + 4 * dy * dy);
                //TODO 速度控制这块后面要重新调整代码
                var dist = delta * 0.001 * unit.speed;
                var d = dist / total;
                if (d < 1) {
                    unit.x = sx + dx * d;
                    unit.y = sy + dy * d;
                    this._startTime = now;
                }
                else {//已经到达目的地
                    unit.x = this._tx;
                    unit.y = this._ty;
                    this._isEnd = true;
                }
            }
        }

        public terminate() {
            this._isEnd = true;
        }

        public recycle() {
            WalkAction._pool.recycle(this);
        }

        /**
         * 动画播放结束的回调
         */
        public playComplete(unit: game.Unit, now: number) {

        }

        private static _pool: RecyclablePool<WalkAction> = new RecyclablePool(WalkAction);

        static getInstance(tx: number, ty: number): WalkAction {
            var wa = this._pool.getInstance();
            wa.reset(tx, ty);
            return wa;
        }
    }
}