module junyou.sui {
	import TouchEvent = egret.TouchEvent;
	/**
	 * 按钮
	 * 在fla中 按钮只是需要1帧
	 * 按钮帧数对应的状态为
	 * 第1帧  启用 未选中
	 * 第2帧  启用 选中
	 * 第3帧  禁用 未选中
	 * 第4帧  禁用 选中
	 * 
	 * 第4帧 没有，会用 第3帧代替
	 * 第3帧 或者 第2帧 没有，会用第一帧代替
	 * @author 3tion
	 *
	 */
	export class Button extends Component implements IGroupItem {

		public txtLabel: egret.TextField;
		public bitmaps: egret.Bitmap[];

		protected _label: string = "";

        /**
         * 是否选中
         */
		protected _selected: boolean;

		protected _currentBmp: egret.Bitmap;


		public constructor() {
			super();
		}

		public bindChildren() {
			if (this.txtLabel) {
				this.addChild(this.txtLabel);
			}
		}

		/**
		 * 设置按钮上的标签
		 */
		public set label(value: string) {
			if (this.txtLabel) {
				if (this._label != value) {
					this.txtLabel.text = value;
				}
			}
		}

		/**
		 * 获取按钮上的标签
		 */
		public get label(): string {
			return this._label;
		}

		public set enabled(value: boolean) {
			if (this._enabled != value) {
				this.setEnabled(value);
				this.refresh();
			}
		}

		/**
		 * 设置选中
		 */
		public set selected(value: boolean) {
			if (this._selected != value) {
				this._selected = value;
				this.refresh();
			}
		}

		/**
		 * 获取当前按钮选中状态
		 */
		public get selected(): boolean {
			return this._selected;
		}

		protected refresh() {
			var frame = +!this._enabled << 1 | (+this._selected);
			var bmp = this.bitmaps[frame];
			var old = this._currentBmp;
			if (!bmp) {
				bmp = this.bitmaps[0];
			}
			if (old != bmp) {
				removeDisplay(old);
				this._currentBmp = bmp;
				this.addChildAt(bmp, 0);
			}


		}

		/**
		 * 绑定TOUCH_TAP的回调
		 * 
		 * @param {Function} handler
		 * @param {*} thisObject
		 * @param {number} [priority]
		 * @param {boolean} [useCapture]
		 * 
		 * @memberOf Button
		 */
		public bindTouch(handler: Function, thisObject:any, priority?: number, useCapture?: boolean) {
			this.addEventListener(TouchEvent.TOUCH_TAP, handler, thisObject, useCapture, priority);
		}

		/**
		 * 解除TOUCH_TAP的回调的绑定
		 * 
		 * @param {Function} handler
		 * @param {boolean} [useCapture]
		 * 
		 * @memberOf Button
		 */
		public looseTouch(handler: Function, useCapture?: boolean) {
			this.removeEventListener(TouchEvent.TOUCH_TAP, handler, this, useCapture);
		}


	}
}
