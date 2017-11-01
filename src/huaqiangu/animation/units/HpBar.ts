module junyou.hqg {
    import TextField = egret.TextField;
    const HP_BAR_HEIGHT = 5;
    /**
     * 血条
     * @author 3tion
     */
    export class HpBar extends egret.Sprite {
        private _text: TextField;

        /**
         * 血条宽度
         * 
         * @private
         * @type {number}
         */
        private _width: number;

        private _current: number;

        private _max: number;

        constructor(textShow = true, width = 50) {
            super();
            this.init(textShow, width);
        }

        protected init(textShow: boolean, width: number) {
            this.checkText(textShow);
            this.width = width;
        }

        protected checkText(textShow: boolean) {
            if (textShow && !this._text) {
                var text = new TextField();
                text.fontFamily = "Arial";
                text.size = 10;
                text.textColor = 0xffffff;
                text.stroke = 1;
                text.strokeColor = 0;
                text.y = -11;
                text.width = 200;
                text.textAlign = "center";
                this.addChild(text);
                this._text = text;
            }
        }

        /**
         * 设置文本是否显示
         */
        public set textVisible(value: boolean) {
            if (value) {
                this.checkText(true);
            } else {
                removeDisplay(this._text);
            }
        }

        /**
         * 设置血条宽度
         */
        public set width(value: number) {
            this._width = value;
            this.x = -value >> 1;
            if (this._text) {
                this._text.x = value - 200 >> 1;
            }
        }

        public get width() {
            return this._width;
        }

        /**
         * 设置当前血量
         */
        public set current(value: number) {
            if (value != this._current) {
                this._current = value;
                this.$invalidate();
            }
        }

        /**
         * 获取当前血量
         */
        public get current() {
            return this._current;
        }

        /**
         * 设置最大血量
         */
        public set max(value: number) {
            if (value != this._max) {
                this._max = value;
                this.$invalidate();
            }
        }

        /**
         * 获取最大血量
         */
        public get max() {
            return this._max;
        }

        /**
         * 更新血量
         * 
         * @param {number} current 当前血量
         * @param {number} max 最大血量
         */
        protected update(current: number, max: number) {
            let c = current <= 0 ? 1 : current;
            if (max < c) {
                max = c;
            }
            let g = this.graphics;
            let w = this._width;
            g.clear();
            g.lineStyle(1, 0, .3);
            g.moveTo(0, HP_BAR_HEIGHT);
            g.lineTo(w, HP_BAR_HEIGHT);
            g.lineStyle();
            g.beginFill(0xdbdada, .8);
            g.drawRoundRect(0, 0, w, HP_BAR_HEIGHT, 2, 2);
            g.endFill();
            g.beginFill(0xff0000);
            if (max - c < 2 * w) {
                g.drawRoundRect(0, 0, ~~(c * w / max), HP_BAR_HEIGHT, 2, 2);
            } else {
                g.drawRoundRect(0, 0, ~~(c * w / max), HP_BAR_HEIGHT, 3, 0);
            }
            if (this._text) {
                this._text.text = current + "/" + max;
            }
        }

        $update(dirtyRegionPolicy: string, bounds?: egret.Rectangle): boolean {
            this.update(this._current, this._max);
            return super.$update(dirtyRegionPolicy, bounds);
        }
    }
}