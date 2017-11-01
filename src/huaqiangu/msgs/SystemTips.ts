module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class SystemTips implements sui.SystemTips {

        _errorTip: sui.ErrorTips;

        constructor() {
            this.init();
        }

        /**
         * 初始化
         */
        public init() {
            let layer = game.GameEngine.instance.getLayer(game.GameLayerID.Tip);
            this._errorTip = new sui.ErrorTips(layer);
        }

		/**
		 * 主要用来显示客户端的文本
		 * @param msg			显示的文字
		 * 
		 */
        public showClient(msg: string) {
            this._errorTip.show(msg);
        }

		/**
		 * 主要用来显示服务器的文本
		 * @param msg			显示的文字
		 * 
		 */
        public showServer(msg: string) {
            this._errorTip.show(msg);
        }
    }
}