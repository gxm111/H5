module junyou.sui {
    /**
     * 错误提示
     * @author pb
     */
    export class ErrorTips{

        _parent: egret.DisplayObjectContainer;

        constructor(parent: egret.DisplayObjectContainer) {
            this._parent = parent;
        }

        public show(msg: string, duration: number = 1000, delay: number = 1000) {
            let txt = new egret.TextField();
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.text = msg;
            txt.alpha = 1;
            txt.x = 480 - txt.width >> 1;
            txt.y = 800 - txt.height >> 1;
            this._parent.addChild(txt);
            let tween = Global.getTween(txt);
            tween.to({ y: txt.y - 100 }, duration).to({ alpha: 0 }, delay).call(this.txtComplete, this, [tween, txt]);
        }

        txtComplete(tween: Tween, txt: egret.TextField) {
            if (tween) {
                tween.pause();
            }
            removeDisplay(txt);
        }
    }
}