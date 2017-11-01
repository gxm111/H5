module junyou.hqg {
    export class SkillNoticePanel extends egret.Sprite implements sui.ISuiDataCallback {

        private static _instance: SkillNoticePanel;

        public constructor() {
            super();
        }

        public init() {
            let suiManager: sui.SuiResManager = sui.SuiResManager.getInstance();
            suiManager.loadData("lib", this);
            game.GameEngine.instance.getLayer(game.GameLayerID.Tip).addChild(this);
            message.NoticeManager.instance.initSkillIconCon(this, 4);
        }

        public static getInstance(): SkillNoticePanel {
            if (!this._instance) {
                this._instance = new SkillNoticePanel();
            }
            return this._instance;
        }

        public suiDataComplete(suiData: sui.SuiData): void {
            suiData.addEventListener(sui.SuiData.FLA_COMPLETE, this.onUicomplete, this);
            suiData.loadBitmap();
        }

        public suiDataFailed(suiData: sui.SuiData): void {

        }

        private onUicomplete(e: egret.Event) {
            Global.callLater(this.testSkill, 5000, this);
            // this.testSkill();
        }

        private testSkill() {
            let tmp = new message.NoticeData();
            dispatch(message.SkillNoticeIcon.SHOW_NOTICE_ICON, tmp);
            // dispatch(message.SkillNoticeIcon.SHOW_NOTICE_ICON,tmp);
            // dispatch(message.SkillNoticeIcon.SHOW_NOTICE_ICON,tmp);
            // dispatch(message.SkillNoticeIcon.SHOW_NOTICE_ICON,tmp);
            // dispatch(message.SkillNoticeIcon.SHOW_NOTICE_ICON,tmp);
        }
    }
}