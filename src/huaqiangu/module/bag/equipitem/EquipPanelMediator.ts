module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-08-03 10:36:59
    */
    export class EquipPanelMediator extends mvc.Mediator {

        public static SET_DATA: string = "setData";

        public $view: EquipPanel;
        @d_dependProxy(ServiceName.ItemsService)
        public model: ItemsService;
        @d_dependProxy(ServiceName.RongLianService)
        public ronglianService: RongLianService;

        upArrow: egret.Bitmap;
        downArrow: egret.Bitmap;
        arrow: egret.Bitmap;

        constructor() {
            super(ModuleId.EquipItem);
        }

        protected init() {
            this.view = new EquipPanel;

            //这里加事件关注
            /*this.addProxy("RongLianService", "ronglianService");
            this.addProxy("ItemsService", "itemsService");*/
        }

        public setData(...arg) {
            let vo: EquVO = arg[1][0];
            if (vo) {
                let slot = this.$view.slot;
                slot.setData(vo);
                slot.countShow = 0;
                this.$view.nameTxt.text = vo.cfg.name || "";
                //this.$view.descTxt.text = vo.baseXAttr;
                let originalVO = this.model.getEquVOByPart(vo.part, SlotType.ROLE);
                this.addArrow(this.ronglianService.compareZhanli(originalVO, vo));
            }
        }

        addArrow(value: number) {
            if (value == RongLianService.ZHANLI_EQUAL) {
                removeDisplay(this.arrow);
            }
            else {
                if (value == RongLianService.ZHANLI_HIGH) {
                    this.arrow = this.upArrow;
                }
                else if (value == RongLianService.ZHANLI_LOW) {
                    this.arrow = this.downArrow;
                }
                this.$view.addChild(this.arrow);
                this.arrow.x = this.$view.descTxt.x + this.$view.descTxt.textWidth;
                this.arrow.y = this.$view.descTxt.y;
            }
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            GoodsItemSlot.getSlot(view.slot);
            var sm = sui.SuiResManager.getInstance();
            this.upArrow = <egret.Bitmap>sm.createDisplayObject("lib", "bmd.share.UpArrow");
            this.downArrow = <egret.Bitmap>sm.createDisplayObject("lib", "bmd.share.DownArrow");
            this._facade.moduleManager.bindButton(ModuleId.Ronglian, view.ronglianBtn);
        }

        public awake() {
        }

        public sleep() {
        }
    }
}
