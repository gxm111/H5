module junyou.sui{
    export class ScaleBitmapCreator extends BaseCreator<ScaleBitmap>{
        
        
        private scaleData:any;
        public constructor(){
            super();
        }
        
        public parseSelfData(data:any){
            this.scaleData = data;
            this._createT = this.createBitmap;
        }
        
        private createBitmap():ScaleBitmap{
            let scaleData:any[] = this.scaleData;
            let suiData = this._suiData;
            let rect:egret.Rectangle = new  egret.Rectangle(scaleData[1][0],scaleData[1][1],scaleData[1][2],scaleData[1][3]);
            let bitmap:junyou.sui.ScaleBitmap = new junyou.sui.ScaleBitmap();
            bitmap.scale9Grid = rect;
            if(scaleData[0]!=0)
            {
                bitmap.texture = suiData.imgs[scaleData[0][2]];
                bitmap.width = scaleData[0][1][3];
                bitmap.height = scaleData[0][1][4];
            }                       
            return bitmap;
        }
    }
}