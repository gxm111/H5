module junyou.sui {
	/**
	 *
	 * @author gushuai
	 *
	 */
    export class ArtTextCreator extends BaseCreator<ArtText>{

        private shapeData: any[];

        private maxwid = 0;

        private maxhei = 0;

        private splitStr: string;

        public constructor() {
            super();
        }

        public parseSelfData(data: any) {
            this.shapeData = data;
            this.splitStr = data[0];
            //            let len = data.length;
            //            let arr:any[];
            //            var maxwid = 0;
            //            var maxhei = 0;
            //            for(let i=1;i<len;i++)
            //            {
            //                arr = data[i][1];
            //                if(arr[3]>=maxwid)
            //                {
            //                    maxwid = arr[3];
            //                }
            //                if(arr[4]>=maxhei)
            //                {
            //                    maxhei = arr[4];
            //                }
            //                this.maxwid = maxwid;
            //                this.maxhei = maxhei;
            //            }
            this._createT = this.createShape;
        }

        private createShape(): ArtText {
            var suiData = this._suiData;
            var shape: ArtText = new ArtText(this._suiData);
            let splitStr: string = this.splitStr;
            let len = splitStr.length;
            let shapeData: any[] = this.shapeData;
            let txs: { [index: string]: egret.Texture } = {};
            for (let i = 0; i < len; i++) {
                let tx: egret.Texture = suiData.imgs[shapeData[i + 1][2]];
                let key: string = splitStr.charAt(i);
                txs[key] = tx;
            }
            shape.textures = txs;
            shape.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
            return shape;
        }

        private onAddedToStage(e:egret.Event){
            e.target.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
            this._suiData.loadBitmap();
        }
    }
}
