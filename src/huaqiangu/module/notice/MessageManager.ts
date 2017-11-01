module junyou.hqg {

    /**
     * @ author gushuai
     * 
     * 走马灯类型消息管理类
     * 
     * @export
     * @class MessageManager
     */
    export class MessageManager {
        private static _instance: MessageManager;

        private facade: junyou.mvc.Facade;

        private systemChanel: MessageChanel;

        private chanelArr: MessageChanel[];

        private _count: number = 0;
        public constructor() {
            this.facade = junyou.mvc.Facade.getInstance();
            this.chanelArr = [];
            this.addListener();
        }

        private addListener() {
            this.facade.addEventListener(EventConst.SHOW_MSG_BY_CHANEL, this.showMsgByChanel, this);
        }

        public static getInstance(): MessageManager {
            if (!this._instance) {
                this._instance = new MessageManager();
            }
            return this._instance;
        }

        public initSystemChanel(count: number) {
            let style = new MessageRenderStyle();
            style.endpad = 30;
            style.speed = 1;
            style.fontColor = 0xffffff;
            style.fontSize = 20;
            style.contentSize = new egret.Rectangle(50, 5, 380, 30);
            style.bgSize = new egret.Rectangle(0, 0, 480, 40);
            let con = SystemNoticePanel.getInstance();
            con.initBase(style);
            this.systemChanel = new MessageChanel();
            this.systemChanel.initBase(con, count, style);
            this.chanelArr[MessageChanelID.SYSTEM] = this.systemChanel;
            // this.noticeTest();
        }

        private noticeTest() {
            let facade = mvc.Facade.getInstance();
            this._count = 0;
            let time = new egret.Timer(8000);
            time.addEventListener(egret.TimerEvent.TIMER, this.dispatchNotice, this);
            time.start();
        }

        private dispatchNotice(e: egret.TimerEvent) {
            this._count = this._count + 1;
            let str = "花千骨手游第" + this._count + "条测试用公告！！";
            dispatch(EventConst.SHOW_MSG_BY_CHANEL, { chanel: MessageChanelID.SYSTEM, value: str });
        }

        private showMsgByChanel(e: egret.Event) {
            let data = e.data;
            let chanelId = data.chanel;
            let msg = data.value;
            let chanel = this.chanelArr[chanelId];
            chanel.addMessage([msg]);
        }

    }
}