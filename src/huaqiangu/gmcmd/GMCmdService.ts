/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/GM%E6%8C%87%E4%BB%A4 生成
 * 生成时间 2016-08-22 14:47:15
 **/
module junyou.hqg {
    /*-*begin $area1*-*/
    //这里填写类上方的手写内容
    /*-*end $area1*-*/
    export class GMCmdService extends junyou.mvc.Service {
        constructor() {
            super("GMCmdService");
        }

        onRegister() {
            super.onRegister();
            this.regMsg(6, 32001);
            this.regHandler(this.gMCmd, 32001);
            /*-*begin $onRegister*-*/
            //这里写onRegister中手写内容
            /*-*end $onRegister*-*/
        }

        public sendGMCmd(_SendGMCmd_C2S: SendGMCmd_C2S) {
            this.send(32000, _SendGMCmd_C2S, "SendGMCmd_C2S");
        }
        protected gMCmd = (data: NetData) => {
            let _state: number = <any>data.data;
            /*-*begin gMCmd*-*/
            //这里填写方法中的手写内容
            /*-*end gMCmd*-*/
        }
        /*-*begin $area2*-*/
        //这里填写类里面的手写内容
        /*-*end $area2*-*/
    }
    /*-*begin $area3*-*/
    export class GMCmdPanel extends egret.Sprite {

        private tf: egret.TextField;

        private btn: egret.Sprite;

        private static instance: GMCmdPanel;

        private service: GMCmdService;
        public constructor() {
            super();
            this.initUI();
        }

        private initUI() {
            this.graphics.clear();
            this.graphics.beginFill(0X00FF00, 0.6);
            this.graphics.drawRect(0, 0, 300, 200);
            this.graphics.endFill();
            this.tf = new egret.TextField();
            this.tf.size = 16;
            this.tf.border = true;
            this.tf.touchEnabled = true;
            this.tf.type = egret.TextFieldType.INPUT;
            this.tf.width = 200;
            this.tf.height = 30;
            this.tf.x = 50;
            this.tf.y = 50;
            this.addChild(this.tf);

            this.btn = new egret.Sprite();
            this.btn.graphics.clear();
            this.btn.graphics.beginFill(0xff0000);
            this.btn.graphics.drawRect(0, 0, 50, 30);
            this.btn.graphics.endFill();
            this.btn.touchEnabled = true;
            this.btn.x = 125;
            this.btn.y = 130;
            this.addChild(this.btn);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMessage, this);
            this.x = 90;
            this.y = 300;
            game.GameEngine.instance.getLayer(game.GameLayerID.Tip).addChild(this);
            this.visible = false;
            mvc.Facade.getInstance().getProxy("GMCmdService", this.serviceCallBack, this);
        }

        private serviceCallBack(ser: GMCmdService) {
            this.service = ser;
        }

        private sendMessage(e: egret.Sprite) {
            if (!this.tf.text) return;
            let arr = this.tf.text.split(/[\s　]+/g);
            let temp:SendGMCmd_C2S = <SendGMCmd_C2S>{};
            temp.params = arr;
            this.service.sendGMCmd(temp);
        }


        public static getInstance() {
            if (this.instance == null) {
                this.instance = new GMCmdPanel();
            }
            return this.instance;
        }
    }
    /*-*end $area3*-*/
}