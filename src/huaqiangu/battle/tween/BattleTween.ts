module junyou.hqg {
    /**
     * 用于处理战斗中的Tween
     * @author 3tion
     */
    export class BattleTween extends Tween {

        /**
         * 是否有数据处理的函数
         * 
         * @type {CallbackInfo}
         */
        public dataCallback: CallbackInfo;

        public controller: FightController;

        /**
         * 回收时的回调
         * 
         * @type {CallbackInfo}
         */
        public recycleCallback: CallbackInfo;

        /**
         * tween自己的时间线
         * 
         * @type {number}
         */
        public get timeline() {
            return this._prevPosition;
        }

        constructor(target: any, props: any, pluginData: any, manager: TweenManager) {
            super(target, props, pluginData, manager);
        }

        doData(delta: number) {
            if (this.paused) {
                return;
            }
            // 更新属性
            this.tick(delta);
            if (this.dataCallback) {
                this.dataCallback.execute(false);
            }
        }

        onRecycle() {
            if (this.recycleCallback) {
                this.recycleCallback.execute();
            }
            if (this.dataCallback) {
                this.dataCallback.recycle();
            }
        }
    }
}