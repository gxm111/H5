module junyou.sui {
	/**
	 * 进度条创建
	 * @pb 
	 *
	 */
	export class ProgressBarCreator extends BaseCreator<ProgressBar>{

		private _suiManager: SuiResManager;

        private _txtCreator: TextFieldCreator;

        private _sData: any[];

		public constructor() {
			super();
		}

		public parseSelfData(data: any) {
			this._sData = data;
            this._suiManager = SuiResManager.getInstance();
            this._txtCreator = new TextFieldCreator();
			this._createT = this.createProgressBar;
        }

		private createProgressBar(): ProgressBar {
            let progressBar: ProgressBar = new ProgressBar();
            let sData = this._sData;
            let len = sData.length;
			let item;
			let type;
			let value;
			let value2;
			let suiData = this._suiData.sourceComponentData;
			let sourceArr;
			let clsName;
			for (let i = 0; i < len; i++) {
				item = sData[i];
				if (item) {
					type = item[0];
					value = item[1];
					value2 = item[2];
					// 文本
					if (type == ExportType.Text) {
						let txtCreator = this._txtCreator;
						txtCreator = new TextFieldCreator();
						txtCreator.bindSuiData(this._suiData);
						txtCreator.parseSelfData(value2);
						progressBar.tf = txtCreator.getInstance();
						progressBar.tf.width=value[3];
						progressBar.tf.height=value[4];
					}
					// 进度条 九宫
					else if (type == ExportType.ScaleBitmap) {
						sourceArr = suiData[type]
						clsName = sourceArr[0][value2];
						let scale9: ScaleBitmap = <ScaleBitmap>this._suiManager.createDisplayObject(this._suiData.key, clsName, value);
						progressBar.bar = scale9;
					}
					// 底图
					else if (type == ExportType.Image) {
						let bg = new BitmapCreator(this._suiData);
						bg.parseData(item, this._suiData);
						progressBar.bg = bg.getInstance();
					}
				}

			}
            return progressBar;
        }
	}
}
