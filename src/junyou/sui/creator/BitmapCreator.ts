module junyou.sui {
	/**
	 * 位图的创建器
	 * @author 3tion
	 *
	 */
    export class BitmapCreator extends BaseCreator<egret.Bitmap> {
        public constructor(value?: SuiData) {
            super();
            this._suiData = value;
        }

        public parseSelfData(data: any) {
            var tex = this._suiData.imgs[data];
            this._createT = () => {
                var bmp = new egret.Bitmap;
                bmp.texture = tex;
                bmp.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                bmp.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                return bmp;
            }
        }

        protected onAddedToStage(e: egret.Event) {
            var suiData = this._suiData;
            if (suiData) {
                let bmp = <egret.Bitmap>e.currentTarget;
                let bmdState = suiData.bmdState;
                suiData.using++;
                if (bmdState == RequestState.COMPLETE) {
                    bmp.$refreshImageData();
                } else {
                    let loading = suiData.loading;
                    loading.pushOnce(bmp);
                    if (bmdState == RequestState.UNREQUEST) {
                        suiData.loadBitmap();
                    }
                }

            }
        }

        protected onRemoveFromStage(e: egret.Event) {
            var now = Global.now;
            var suiData = this._suiData;
            if (suiData) {
                suiData.using--;
                suiData.lastUseTime = now;
            }
        }
    }
}
