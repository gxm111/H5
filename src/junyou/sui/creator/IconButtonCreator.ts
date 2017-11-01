module junyou.sui {
    /**
     * 图标按鈕創建
     * @author pb
     */
    export class IconButtonCreator extends BaseCreator<IconButton>{

        private _sData: any[];

        private _uri: string;

        public constructor() {
            super();
        }

        public parseSelfData(data: any) {
            this._sData = data;
            this._createT = this.createIconButton;
        }

        private createIconButton(): IconButton {
            let iconBtn = new IconButton();

            let sData = this._sData;
            let suiData = this._suiData;

            var tc: TextFieldCreator;
            if (sData[0]) {
                var tc = new TextFieldCreator();
                tc.bindSuiData(suiData);
                tc.parseSelfData(sData[0]);
            }

            var bcArr: BitmapCreator[] = [];
            var dat: any[];
            let bc;
            for (var i = 1; i < 5; i++) {
                dat = sData[i];
                if (dat) {
                    bc = new BitmapCreator(suiData);
                    bc.parseData(dat, suiData);
                    bcArr[i - 1] = bc;
                }
            }

            if (tc)
                iconBtn.txtLabel = tc.getInstance();
            let bmps = [];
            for (let i = 0; i < 4; i++) {
                if (bcArr[i]) {
                    bc = bcArr[i];
                    bmps[i] = bc.getInstance();
                }
            }
            if (!bmps[1])
                bmps[1] = bmps[0];
            if (!bmps[3])
                bmps[3] = bmps[2];
            iconBtn.bitmaps = bmps;

            let image = new sui.Image();
            iconBtn.icon = image;

            return iconBtn;
        }

    }
}