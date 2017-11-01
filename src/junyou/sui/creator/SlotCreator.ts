module junyou.sui {
    /**
     * 格位创建器
     * 
     * @export
     * @class SlotCreator
     * @extends {BaseCreator<sui.Slot>}
     * @author pb
     */
    export class SlotCreator extends BaseCreator<sui.Slot>{

        private scaleData: any;

        public constructor() {
            super();
        }

        public parseSelfData(data: any) {
            this.scaleData = data;
            this._createT = this.createSlot;
        }

        private createSlot(): sui.Slot {
            let scaleData: any[] = this.scaleData;
            let suiData = this._suiData;

            let slot = new sui.Slot();

            let rect: egret.Rectangle = new egret.Rectangle(scaleData[0][0], scaleData[0][1], scaleData[0][2], scaleData[0][3]);
            slot.scale9Grid = rect;

            let txtCreator = new TextFieldCreator();
            txtCreator.bindSuiData(this._suiData);
            txtCreator.parseSelfData(scaleData[1][2]);
            txtCreator.setBaseData(scaleData[1][1]);
            let tf = txtCreator.getInstance();
            slot.countTxt = tf;

            if (scaleData[2]) {
                let bg = new BitmapCreator();
                bg.parseData(scaleData[2], this._suiData);
                let bitmap = bg.getInstance();
                slot.bg = bitmap;
            }

            return slot;
        }
    }
}