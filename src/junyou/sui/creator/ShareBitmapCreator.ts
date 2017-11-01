module junyou.sui{
    export class ShareBitmapCreator extends BaseCreator<egret.Bitmap>{

        private bmpcreator:BitmapCreator;
        public constructor(){
            super();
        }

        public  parseSelfData(data:any){
            this.bmpcreator = new BitmapCreator(this._suiData);
            this.bmpcreator.parseSelfData(data[0][2]);
            this._createT = this.createBitmap;
        }

        private createBitmap():egret.Bitmap{
            let bmp = this.bmpcreator.getInstance();
            return bmp;
        }
    }
}