module junyou.sui {
    export class NumericStepperCreator extends BaseCreator<NumericStepper>{

        private uiData: any[];

        private txtCreator: TextFieldCreator;

        private btnCreator: ButtonCreator;

        private scale9Creator: ScaleBitmapCreator;

        private suiManager: SuiResManager;
        public constructor() {
            super();
        }

        public parseSelfData(data: any) {
            this.uiData = data;
            this.txtCreator = new TextFieldCreator();
            this.btnCreator = new ButtonCreator();
            this.scale9Creator = new ScaleBitmapCreator();
            this._createT = this.createNumericStepper;
            this.suiManager = SuiResManager.getInstance();
        }

        private createNumericStepper(): NumericStepper {
            let numstep: NumericStepper = new NumericStepper();
            let comData = this.uiData;
            let len = comData.length;
            let tmpData;
            let type;
            let tc;
            let sourceData = this._suiData.sourceComponentData;
            let index;
            let sourceArr;
            let name;
            let btnArr = [];
            for (let i = 0; i < len; i++) {
                tmpData = comData[i];
                type = tmpData[0];
                index = tmpData[2];

                if (type == 3) {
                    sourceArr = sourceData[type]
                    name = sourceArr[0][index];
                    let btn: Button = <Button>this.suiManager.createDisplayObject(this._suiData.key, name, tmpData[1]);
                    btnArr.push(btn);
                    btnArr.sort(this.sortBtnX);
                }
                else if (type == 1) {
                    tc = new TextFieldCreator();
                    tc.setBaseData(tmpData[1])
                    tc.parseSelfData(tmpData[2]);
                    numstep.txt = tc.getInstance();
                }
                else if (type == 5) {
                    sourceArr = sourceData[type]
                    name = sourceArr[0][index];
                    let sc: ScaleBitmap = <ScaleBitmap>this.suiManager.createDisplayObject(this._suiData.key, name, tmpData[1]);
                    numstep.txtbg = sc;
                }
            }
            if (btnArr.length == 4) {
                numstep.minBtn = btnArr[0];
                numstep.subBtn = btnArr[1];
                numstep.addBtn = btnArr[2];
                numstep.maxBtn = btnArr[3];
            }
            else {
                numstep.subBtn = btnArr[0];
                numstep.addBtn = btnArr[1];
            }

            numstep.addSubComponents();
            return numstep;
        }

        private sortBtnX(btn1: Button, btn2: Button): number {
            if (btn1.x < btn2.x) {
                return -1;
            } else if (btn1.x > btn2.x) {
                return 1;
            }
            return 0;
        }
    }
}