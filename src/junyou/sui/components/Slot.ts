module junyou.sui {
    /**
     * 格位基本类
     * @author pb
     */
    export class Slot extends Component {
        _bg: egret.Bitmap;
        icon: Image;
        _countTxt: egret.TextField;
        _scale9Grid: egret.Rectangle;

        _iconSource: string;
        _count: number = 1;
        _countShow: number = 1;

        constructor() {
            super();
            this.icon = new Image();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.awake, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.sleep, this);
        }

        /**
         * 
         * 获取类型2的数量处理方法
         * @static
         */
        public static getCountString = (count: number) => count < 1 ? "" : count < 10000 ? count + "" : LangUtil.getMsg("$_wan", Math.floor(count / 10000));

        public setData(value: any) {

        }

        public set scale9Grid(rect: egret.Rectangle) {
            this._scale9Grid = rect;
            this.icon.x = rect.x;
            this.icon.y = rect.y;
            this.icon.width = rect.width;
            this.icon.height = rect.height;
        }

        public get scale9Grid(): egret.Rectangle {
            return this._scale9Grid;
        }

        public set bg(value: egret.Bitmap) {
            this._bg = value;
        }

        public get bg(): egret.Bitmap {
            return this._bg;
        }

        public set countTxt(txt: egret.TextField) {
            this._countTxt = txt;
        }

        public get countTxt(): egret.TextField {
            return this._countTxt;
        }

        public set iconSource(uri: string) {
            this._iconSource = uri;
            if (this.stage) {
                this.icon.source = this._iconSource;
            }
        }

        public set count(value: number) {
            this._count = value;
            if (this.stage) {
                this.countTxt.text = this.getCount();
            }
        }

        /**
         * 数量显示状态<br/>
         * 0 不显示数值<br/>
         * 1 默认显示大于1的数量<br/>
         * 2 大于1的数量，显示数值，超过一万的，会以xxx万显示 默认为2<br/>
         */
        public set countShow(value: number) {
            this._countShow = value;
            if (this.stage) {
                this.countTxt.text = this.getCount();
            }
        }

        public get countShow(): number {
            return this._countShow;
        }

        private getCount(): string {
            let str = "";
            switch (this.countShow) {
                case 0:
                    str = "";
                    break;
                case 1:
                    str = this._count + "";
                    break;
                case 2:
                    str = Slot.getCountString(this._count);
                    break;
            }
            return str;
        }

        setBg() {
            if (this._bg) {
                this.addChildAt(this._bg, 0);
            }
        }

        setIcon() {
            let icon = this.icon;
            if (icon) {
                this.addChild(icon);
                icon.source = this._iconSource;
            }
        }

        setCountTxt() {
            let countTxt = this.countTxt;
            if (countTxt) {
                this.addChild(countTxt);
                countTxt.text = this.getCount();
            }
        }

        /**
         * 皮肤添加到舞台
         * to be override
         */
        public awake() {
            this.setBg();
            this.setIcon();
            this.setCountTxt();
        }

        /**
         * 皮肤从舞台移除
         * to be override
         */
        public sleep() {

        }

        /**
         * 销毁
         * to be override
         */
        public dispose() {
            this.icon.dispose();
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.awake, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.sleep, this);
        }
    }
}