module junyou {
	/**
	 * 动画的全局对象
	 * @author 
	 *
	 */
	export class Global {

		private static _callLater: CallLater = new CallLater();

		public static _tweenManager: TweenManager = new TweenManager();

    	/**
    	 * 注入白鹭的全局Ticker
    	 */
		public static initTick() {
            let ticker = egret.sys.$ticker;
            let update = ticker.update;
            let delta = 0 | 1000 / ticker.$frameRate;
			let callLater = Global._callLater;
            ticker.update = () => {
				let now = Date.now();
                this.now = now;
                this.frameNow += delta;
				callLater.tick(now);
				update.call(ticker);
				this._tweenManager.tick(delta);
            }
		}

		/**
		 * 延迟执行
		 * 
		 * @static
		 * @param {Function} callback (description)
		 * @param {number} [time] (description)
		 * @param {*} [thisObj] (description)
		 * @param args (description)
		 */
		public static callLater(callback: Function, time?: number, thisObj?: any, ...args) {
			return Global._callLater.callLater(callback, Global.now, time, thisObj, ...args);
		}

		/**
		 * 清理延迟
		 * 
		 * @static
		 * @param {Function} callback (description)
		 * @param {*} [thisObj] (description)
		 * @returns (description)
		 */
		public static clearCallLater(callback: Function, thisObj?: any) {
			return Global._callLater.clearCallLater(callback, thisObj);
		}

		/**
		 * 获取Tween
		 * 
		 * @static
		 * @param {*} target 要对那个对象做Tween处理
		 * @param {*} props Tween的附加属性 (如： `{loop:true, paused:true}`).
		 * All properties default to `false`. Supported props are:
		 * <UL>
		 *    <LI> loop: sets the loop property on this tween.</LI>
		 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
		 *    <LI> ignoreGlobalPause: sets the {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}} property on
		 *    this tween.</LI>
		 *    <LI> override: if true, `createjs. this.removeTweens(target)` will be called to remove any other tweens with
		 *    the same target.
		 *    <LI> paused: indicates whether to start the tween paused.</LI>
		 *    <LI> position: indicates the initial position for this tween.</LI>
		 *    <LI> onChange: specifies a listener for the {{#crossLink "Tween/change:event"}}{{/crossLink}} event.</LI>
		 * </UL>
		 * @param {*} pluginData 插件数据
		 * @param {boolean} override 是否覆盖
		 * @returns {Tween} tween的实例
		 */
		public static getTween(target: any, props?: any, pluginData?: any, override?: boolean) {
			return Global._tweenManager.get(target, props, pluginData, override);
		}


    	/**
    	 *  当前这一帧的时间
    	 */
		public static now: number;


    	/**
    	 * 按照帧，应该走的时间
    	 * 每帧根据帧率加固定时间
    	 * 用于处理逐帧同步用
    	 */
		public static frameNow: number = 0;


		public constructor() {
		}
	}
}
