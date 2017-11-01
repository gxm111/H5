module junyou.hqg {
    export class SystemNoticePanel extends sui.Panel {
        private static _instance: SystemNoticePanel;
        private _width: number = 0;
        private _style:MessageRenderStyle;
        public constructor() {
            super();
        }

        protected init() {
            this._key = "lib";
        }

        public initBase(style:MessageRenderStyle) {
            this._style = style;
            ResizeManager.getInstance().add(this, sui.Layout.TOP_LEFT, 0, 150);
            game.GameEngine.instance.getLayer(game.GameLayerID.Tip).addChild(this);
            this.startSync();
        }

        protected bindComponents() {
            let style = this._style;
            this._width = style.bgSize.width;
            let bmp = <sui.ScaleBitmap>sui.SuiResManager.getInstance().createDisplayObject("lib", "bmd.scale9.NoticeBg");
            style.bg = bmp;
        }

        public static getInstance(): SystemNoticePanel {
            if (!this._instance) {
                this._instance = new SystemNoticePanel();
            }
            return this._instance;
        }


        public get width() {
            return this._width;
        }
    }
}