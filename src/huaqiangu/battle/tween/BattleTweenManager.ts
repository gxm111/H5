module junyou.hqg {
    /**
     * 战斗中的Tween管理器
     * @author 3tion
     */
    export class BattleTweenManager extends TweenManager {

        private _forData: BattleTween[] = [];

        constructor() {
            super();
        }

        get(target: any, props?: any, pluginData?: any, override?: boolean): BattleTween {
            if (override) {
                this.removeTweens(target);
            }
            return new BattleTween(target, props, pluginData, this);
        }

        /**
         * 处理forData的tween的数据
         * 
         * @param {number} delta (description)
         * @param {boolean} [paused] (description)
         * @returns {boolean} (description)
         */
        public doData(delta: number, paused?: boolean) {
            var tweens: Tween[] = this._forData.concat();
            for (var i = tweens.length - 1; i >= 0; i--) {
                var tween = <BattleTween>tweens[i];
                if ((paused && !tween.ignoreGlobalPause) || tween.paused) {
                    continue;
                }
                tween.doData(tween._useTicks ? 1 : delta);
            }
        }

        _register(tween: BattleTween, value?: boolean) {
            var target: any = tween._target;
            var tweens = this._tweens;
            if (value && !tween._registered) {
                if (target) {
                    target.tween_count = target.tween_count > 0 ? target.tween_count + 1 : 1;
                }
                tweens.push(tween);
                if (tween.dataCallback) {
                    this._forData.push(tween);
                }
            } else {
                if (target) {
                    target.tween_count--;
                }
                var i = tweens.length;
                while (i--) {
                    if (tweens[i] == tween) {
                        tweens.splice(i, 1);
                        break;
                    }
                }
                // 清理tween
                tweens = this._forData;
                if (tween.dataCallback) {
                    tweens.remove(tween);
                }
                tween.onRecycle();
            }
        }
    }
}