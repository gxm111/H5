module junyou.sui {
    /*****
     * 艺术字
     */
    export class ArtText extends Component {

        public suiData: SuiData;

        private _align: number;

        /**
       * 上一次元件的宽度
       */
        private _lastWidth: number = 0;

        public textures: { [index: string]: egret.Texture }

        protected _value: string | number;
        public constructor(suidata: SuiData) {
            super();
            this.suiData = suidata;
            this.suiData.addEventListener(SuiData.FLA_COMPLETE, this.onUicomplete, this);
        }

        private onUicomplete(e: egret.Event): void {
            var txs: { [index: string]: egret.Texture } = this.textures;
            if (txs) {
                let tx: egret.Texture;
                for (var key in txs) {
                    tx = txs[key];
                    tx._bitmapData = this.suiData.bmd;
                }
            }
            for (let bmp of <egret.Bitmap[]>this.$children) {
                let tex = bmp.texture;
                bmp.texture = null;
                bmp.texture = tex;
            }
        }

        public set align(value: number) {
            if (this._align != value) {
                this._align = value;
                this.checkAlign();
            }
        }

        protected setValue(val: string | number) {

            if (this._value == val) return;
            this._value = val;
            let tempval = val + "";
            let len = tempval.length;
            let key: string;
            let txs = this.textures;
            let children = this.$children;
            let numChildren = this.numChildren;
            let bmp: egret.Bitmap;
            for (var i = 0; i < len; i++) {
                key = tempval.charAt(i);
                if (i < numChildren) {
                    bmp = <egret.Bitmap>children[i];
                } else {
                    bmp = new egret.Bitmap();
                    this.addChild(bmp);
                }
                let tx = txs[key];
                bmp.x = tx.textureWidth * i;
                bmp.y = 0;
                bmp.texture = null;
                bmp.texture = tx;
            }
            for (i = numChildren - 1; i >= len; i--) {
                this.$doRemoveChild(i);
            }
            this.checkAlign();
        }

        public set value(val: string | number) {
            this.setValue(val);
        }



        public get value(): string | number {
            return this._value;
        }

        private checkAlign() {
            if (!this._align) return;
            if (this._lastWidth != this.width) {
                Layout.layout(this, this._align);
            }
            this._lastWidth = this.width;
        }

    }
}