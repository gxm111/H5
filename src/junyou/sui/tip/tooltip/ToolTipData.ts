module junyou.sui {
    import TE = egret.TouchEvent;
    /**
     * ToolTip的数据
     * @author 3tion
     */
    export class ToolTipData implements IRecyclable {

        /**
         * 注册的可视对象
         * 
         * @type {egret.DisplayObject}
         */
        public target: egret.DisplayObject;

        /**
         * 用于显示的内容
         * 
         * @type {*}
         */
        public data: any;

        /**
         * ToolTip的皮肤
         * 
         * @type {IToolTip}
         */
        public tooltip: IToolTip;

        /**
         * tip的容器
         * 
         * @type {egret.DisplayObjectContainer}
         */
        public con: egret.DisplayObjectContainer;

        constructor() {

        }

        public register(dis: egret.DisplayObject, msg: any, tooltip: IToolTip, container: egret.DisplayObjectContainer) {
            this.data = msg;
            this.con = container;
            if (this.tooltip != tooltip) {
                this.tooltip = tooltip;
            }
            if (this.target != dis) {
                this.clearDisListener(this.target);
                Global.clearCallLater(this.showTip, this);
                dis.addEventListener(TE.TOUCH_BEGIN, this.checkTouch, this);
            }

        }

        private clearDisListener(dis: egret.DisplayObject) {
            dis.removeEventListener(TE.TOUCH_BEGIN, this.checkTouch, this);
            dis.removeEventListener(TE.TOUCH_END, this.touchEnd, this);
        }

        onRecycle() {
            if (this.target) {
                this.clearDisListener(this.target);
                this.target = undefined;
            }
            Global.clearCallLater(this.showTip, this);
            this.data = undefined;
            this.tooltip = undefined;
        }

        private checkTouch(e: TE) {
            this.target.addEventListener(TE.TOUCH_END, this.touchEnd, this);
            Global.callLater(this.showTip, ToolTipManager.touchTime, this)
        }

        private showTip() {
            this.target.removeEventListener(TE.TOUCH_END, this.touchEnd, this);
            this.tooltip.show(this.con);
        }

        private touchEnd(e: TE) {
            this.target.removeEventListener(TE.TOUCH_END, this.touchEnd, this);
            Global.clearCallLater(this.showTip, this);
        }
    }
}