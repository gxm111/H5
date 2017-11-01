module junyou.game {
	/**
	 * 相机
	 * @author 3tion
	 *
	 */
    export class Camera extends egret.HashObject {

        /**
         * 可视区域大小
         */
        protected _rect: egret.Rectangle;

        /**
         * 镜头要跟随的目标
         */
        protected _target: { x: number, y: number };

        protected _changed: boolean;

        get changed(): boolean {
            return this._target != undefined || this._changed;
        }

        /**
         * 标记已经改变完
         */
        public change() {
            this._changed = false;
        }

        constructor(width: number = 0, height: number = 0) {
            super();
            this._rect = new egret.Rectangle();
            let stage = egret.sys.$TempStage;
            if (!width) {
                width = stage.stageWidth;
            }
            if (!height) {
                height = stage.stageHeight;
            }
            this.setSize(width, height);
        }

        /**          
         * 相机跟随一个可视对象          
         * @param target 镜头要跟随的目标          
         */
        public lookat(target: { x: number, y: number }): Boolean {
            this._target = target;
            return !!target;
        }

        /**
         * 设置相机的可视区域宽度和高度
         * @param width 可视区宽
         * @param height 可视区高
         */
        public setSize(width: number, height: number): void {
            let rect = this._rect;
            if (width != rect.width) {
                rect.width = width;
                this._changed = true;
            }
            if (height != rect.height) {
                rect.height = height;
                this._changed = true;
            }
        }

        /**
         * 将相机移动到指定坐标
         */
        public moveTo(x: number, y: number): void {
            let rect = this._rect;
            x = x - (rect.width >> 1);
            y = y - (rect.height >> 1);
            x = Math.clamp(x, 0, rect.right);
            y = Math.clamp(y, 0, rect.bottom);
            if (x != rect.x) {
                rect.x = x;
                this._changed = true;
            }
            if (y != rect.y) {
                rect.y = y;
                this._changed = true;
            }
        }

        /**
         * 获取相机显示区域
         */
        get rect(): egret.Rectangle {
            let target = this._target;
            if (target) {
                this.moveTo(target.x, target.y);
            }
            return this._rect;
        }
    }
}
