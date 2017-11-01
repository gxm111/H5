module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-08-03 10:28:56
    */
    export class EquipDetailPanelMediator extends mvc.Mediator {

        public $view: EquipDetailPanel;

        private facade: mvc.Facade;

        private evo:EquVO

        private equSlot:EquipSlot<EquVO>;

        private xDetailView:EquipXattrView;

        private xScroller:sui.Scroller;
        constructor() {
            super(ModuleId.EquipDetail);
        }

        protected init() {
            this.view = new EquipDetailPanel;
            this.facade = mvc.Facade.getInstance();
            //这里加事件关注
        }

        protected afterAllReady() {
            ResizeManager.getInstance().add(this.$view, sui.Layout.TOP_LEFT, 22, 102);
            this.equSlot = EquipSlot.getSlot(this.$view.slot);
            this.xDetailView = new EquipXattrView();
            this.$view.addChild(this.xDetailView);
            this.xDetailView.x = this.$view.xpos.x;
            this.xDetailView.y = this.$view.xpos.y;
            this.xScroller = new sui.Scroller();
            let rect:egret.Rectangle = new egret.Rectangle(0,0,this.$view.xpos.width,this.$view.xpos.height);
            this.xScroller.bindObj(this.xDetailView,rect,this.$view.scrollbar);
            this.$view.swapBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwapEquip, this);
            //this.$view.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            
        }

        private onSwapEquip(e: egret.TouchEvent) {
            this.facade.executeMediator(ModuleId.WearEquip,true,"showCurrentEquip",true,this.evo.part);
        }

        /*private onClose(e: egret.TouchEvent) {
            this.facade.toggle(ModuleId.EquipDetail);
        }*/

        public showDetail(...args) {
            if (args) {
                let evo: EquVO;
                 if(args[1]){
                     evo = args[1][0];
                 }
                this.evo = evo;
            }
            if(this.evo){
                this.equSlot.setData(this.evo);
            }
            let cfg:ZhuangBeiCfg = this.evo.cfg;

            this.$view.nameTF.text = "Lv."+cfg.minlevel+" "+this.evo.cfg.name;
            //测试
            // let teststr1:string = "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n"+
            // "<font color='#ff0000'>评分：800</font>\n<font color='#00ff00'>物防：500</font>\n";

            let prostr:string = XObject.parseXattr2String(<IXObject>this.evo.cfg,"{0}：{1}","\n");
            let tf:egret.TextField;
            tf = this.xDetailView.baseTF;
            tf.setHtmlText(prostr);
            // tf.text = prostr;
            tf.height = tf.textHeight+2;
            this.xDetailView.line.y = tf.y+tf.height;
            tf = this.xDetailView.qhTF;
            tf.y = this.xDetailView.line.y+this.xDetailView.line.height+10;
            tf.setHtmlText(prostr);
            // tf.text = prostr;
            tf.height = tf.textHeight+2;
            this.xDetailView.height = 0;
            this.xDetailView.height = tf.height+tf.y;
        }

        public awake() {

        }

    }
}
