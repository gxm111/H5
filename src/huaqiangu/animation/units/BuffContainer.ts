module junyou.hqg {
    import Container = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    import Event = egret.Event;
    /**
	 * Buff的容器代理类 
	 * @author 3tion
	 * 
	 */
    export class BuffContainer {
        protected _buffs: DisplayObject[] = [];

        protected _container: Container;

        protected _offsetHeight: number = 0;

        public constructor(container: Container) {
            this._container = container;
        }

        /**
         * 设置高度偏移
         * @private
         */
        public setOffsetHeight(value: number): void {
            if (this._offsetHeight != value) {
                this._offsetHeight = value;
                for (let d of this._buffs) {
                    d.y = this._offsetHeight;
                }
            }
        }

        /**
         * 添加到容器中
         * @param display
         *
         */
        public addChild(display: DisplayObject): void {
            if (!~this._buffs.indexOf(display)) {
                this._buffs.push(display);
                display.addEventListener(Event.REMOVED, this.removedHandler, this);
            }
            display.y = this._offsetHeight;
            this._container.addChild(display);
        }

        protected removedHandler(e: Event): void {
            e.stopImmediatePropagation();
            let display = e.currentTarget as DisplayObject;
            display.removeEventListener(Event.REMOVED, this.removedHandler, this);
            this._buffs.remove(display);
        }

        /**
         * 销毁
         *
         */
        public dispose(remove?: boolean): void {
            for (let d of this._buffs) {
                d.removeEventListener(Event.REMOVED, this.removedHandler, this);
                if (remove) {
                    removeDisplay(d);
                }
            }
            this._buffs.length = 0;
        }
    }
}