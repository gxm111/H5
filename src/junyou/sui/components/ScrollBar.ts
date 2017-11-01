module junyou.sui {
    export class ScrollBar extends Component {

        public bar: egret.Sprite;

        public bg: egret.Sprite;

        private _barBmp: ScaleBitmap;

        private _bgBmp: ScaleBitmap;

        private _bgSize: number;

        private _barSize: number;

        private _scrollType: number = 0;

        private _supportSize: number = 15;


        public constructor() {
            super();
            this.initBaseContainer();
        }

        private initBaseContainer() {
            this.bar = new egret.Sprite();
            this.bg = new egret.Sprite();
            this.addChild(this.bg);
            this.addChild(this.bar);
            this.bg.visible = false;
        }
        /**滚动条方式 0：垂直，1：水平 defalut:0*/
        public set scrollType(value: number) {
            this._scrollType = value;
            this.checkBarSize();
            this.checkBgSize();
            this.checkSupportSize();
        }
        /**滚动条方式 0：垂直，1：水平 defalut:0*/
        public get scrollType(): number {
            return this._scrollType;
        }

        /**
         * 设置滚动条的底与默认尺寸
         * 
         * @value 背景底
         * @bgSize 尺寸
         */
        public setBg(value: ScaleBitmap, bgSize?: number) {
            this._bgBmp = value;
            this._bgBmp.y = 0;
            if (bgSize > 0) {
                this._bgSize = bgSize;
            }
            else {
                this.checkBgSize();
            }
            this.bg.addChild(this._bgBmp);
            this.checkSupportSize();
        }

        /**
         * 设置滑块按钮的样式
         * 
         * @value 滑块按钮
         * @barSize 滑块的尺寸大小
         */
        public setBar(value: ScaleBitmap, barSize?: number) {
            this._barBmp = value;
            this._barBmp.y = 0;
            if (barSize > 0) {
                this._barSize = barSize;
            }
            else {
                this.checkBarSize();
            }
            this.bar.addChild(this._barBmp);
            this.checkSupportSize();
        }

        /**
         * 滚动条背景尺寸
         */
        public set bgSize(value: number) {
            this._bgSize = value;
            this.setBgSize();
        }

        public get bgSize(): number {
            return this._bgSize;
        }

        /**
         * 滑块的尺寸
         */
        public set barSize(value: number) {
            this._barSize = value;
            this.setBarSize();
        }

        public get barSize(): number {
            return this._barSize;
        }

        /**当垂直滚动时，此值为滑块的宽度，当水平滚动时，此值为滑块的高度 */
        public set supportSize(value: number) {
            this._supportSize = value;
            this.checkSupportSize();
        }

        private checkSupportSize() {
            if (this._bgBmp) {
                if (this._scrollType == 0) {
                    this._bgBmp.width = this._supportSize;
                } else {
                    this._bgBmp.height = this._supportSize;
                }
            }
            if (this._barBmp) {
                if (this._scrollType == 0) {
                    this._barBmp.width = this._supportSize;
                } else {
                    this._barBmp.height = this._supportSize;
                }
            }
        }

        private setBarSize() {
            if (this._barBmp) {
                if (this._scrollType == 0) {
                    this._barBmp.height = this._barSize;
                } else {
                    this._barBmp.width = this._barSize;
                }
            }
        }

        private setBgSize() {
            if (this._bgBmp) {
                if (this._scrollType == 0) {
                    this._bgBmp.height = this._bgSize;
                } else {
                    this._bgBmp.width = this._bgSize;
                }
            }
        }


        private checkBgSize() {
            if (this._bgBmp) {
                if (this._scrollType == 0) {
                    this._bgSize = this._bgBmp.height;
                } else {
                    this._bgSize = this._bgBmp.width;
                }
            }
        }

        private checkBarSize() {
            if (this._barBmp) {
                if (this._scrollType == 0) {
                    this._barSize = this._barBmp.height;
                } else {
                    this._barSize = this._barBmp.width;
                }
            }
        }
    }
}