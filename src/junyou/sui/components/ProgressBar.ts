module junyou.sui {

	/**
	 * 进度条
	 * @pb 
	 *
	 */
    export class ProgressBar extends Component {

		public static defaultLabelFunction = function (value: number, maxValue: number) {
			return this._value + " / " + this._maxValue;
		}
		private _bg: egret.Bitmap;

		private _tf: egret.TextField;

		private _bar: ScaleBitmap;

		private _labelFunction = ProgressBar.defaultLabelFunction;

		private _value: number;

		private _maxValue: number;

		private _barWidth: number;

		public constructor() {
			super();
			this.initComponent();
		}

		private initComponent() {

		}

		public get labelFunction(): (value: number, maxValue: number) => string {
            return this._labelFunction;
        }

		/**自定义文本显示方法*/
        public set labelFunction(value: (value: number, maxValue: number) => string) {
            if (this._labelFunction == value)
                return;
            this._labelFunction = value || ProgressBar.defaultLabelFunction;
			this.updateDisplayList();
        }

		public set bg(bg: egret.Bitmap) {
			this._bg = bg;
			this.addChildAt(bg, 0);
		}

		/*传入进度条九宫控件*/
		public set bar(bar: ScaleBitmap) {
			this._bar = bar;
			this._barWidth = bar.width;
			if (bar)
				this.addChild(bar);
			if (this._tf)
				this.addChild(this._tf);
		}

		/*传入文本控件*/
		public set tf(tf: egret.TextField) {
			this._tf = tf;
			if (tf)
				this.addChild(tf);
		}

		public get tf(): egret.TextField {
			return this._tf;
		}

		/*设置进度*/
		public progress(value: number, maxValue: number) {
			if (value < 0)
				value = 0;
			if (value > maxValue)
				value = maxValue;
			this._value = value;
			this._maxValue = maxValue;
			if (maxValue <= 0)
				ThrowError("进度条最大宽度不应小等于0");
			this.updateDisplayList();
		}

		/*更新文本显示*/
		private updateLabelDisplay() {
			this._tf.text = this._labelFunction(this._value, this._maxValue);
		}

		/*更新进度条显示*/
		private updateBarDisplay() {
			if (this._maxValue <= 0)
				ThrowError("进度条最大宽度不应小等于0");
			else
				this._bar.width = this._value * this._barWidth / this._maxValue;
		}

		/*更新显示*/
		private updateDisplayList() {
			if (this._tf)
				this.updateLabelDisplay();
			this.updateBarDisplay();
		}

		/*$render():void{
			alert("$render");
		}*/
	}
}