module junyou.sui {
	import Event = egret.Event;
	/**
	 * 图片
	 * 外部加载
	 * @pb 
	 *
	 */
    export class Image extends egret.Bitmap {

		/**
         * 资源唯一标识
         */
		uri: string;

		constructor() {
            super();
			this.addEventListener(Event.ADDED_TO_STAGE, this.addedToStage, this);
			this.addEventListener(Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
        }

		addedToStage() {
			if (this.uri) {
				let res = ResourceManager.getTextureRes(this.uri);
				if (res) {
					res.bind(this);
					res.load();
				}
			}
		}

		removedFromStage() {
			if (this.uri) {
				let res = <TextureResource>ResourceManager.getResource(this.uri);
				if (res) {
					res.loose(this);
				}
			}
		}

		/**
		 * 设置资源标识
		 */
		public set source(value: string) {
			if (this.uri == value)
				return;
			if (this.uri) {//解除资源绑定
				this.removedFromStage();
			}
			this.uri = value;
			if (value) {
				if (this.stage) {
					this.addedToStage();
				}
			}
			else {
				this.texture = undefined;
			}
		}

		/**
		 * 销毁图片
		 */
		public dispose() {
			this.removedFromStage();
			this.removeEventListener(Event.ADDED_TO_STAGE, this.addedToStage, this);
			this.removeEventListener(Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
		}

	}
}