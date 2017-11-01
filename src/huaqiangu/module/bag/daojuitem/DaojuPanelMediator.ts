module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-08-03 10:41:47
    */
    export class DaojuPanelMediator extends mvc.Mediator {

        public static SET_DATA: string = "setData";

        public $view: DaojuPanel;
        @d_dependProxy(ServiceName.ItemsService)
        public model: ItemsService;

        private vo: ItemVO<DaoJuCfg>;

        constructor() {
            super(ModuleId.DaojuItem);
        }

        protected init() {
            this.view = new DaojuPanel;

            //这里加事件关注
            /*this.addProxy("ItemsService", "model");
            this.addInterest(ItemsService.CHANGE, this.useSuccess);*/
        }

        @d_interest(EventConst.BAG_ITEMS_CHANGE)
        private useSuccess(e: egret.Event) {
            this._facade.toggle(ModuleId.DaojuItem, 0);
            /*let id = e.data.id;
            let count = e.data.count;
            if(this._vo && this._vo.id == id){

            }*/
        }

        public setData(...arg) {
            let vo = this.vo = arg[1][0];
            if (vo) {
                let slot = GoodsItemSlot.getSlot(this.$view.slot);
                slot.setData(vo);
                slot.countShow = 0;
                this.$view.nameTxt.text = vo.cfg.name;
                this.$view.descTxt.text = vo.cfg.desc;
                this.$view.numericStepper.maxValue = vo.count;
                this.$view.numericStepper.value = vo.count;
            }
        }

        private useDaoju(e: egret.TouchEvent): void {
            let count = this.$view.numericStepper.value;
            if (ClientCheck.isClientCheck) {
                if (!this.model.getCount(this.checkItemId)) {
                    CoreFunction.showClientTips(201);
                    return;
                }
            }
            if (count) {
                this.model.use({ id: this.vo.id, count: count });
            }
            else {
                this.model.use({ id: this.vo.id });
            }
        }

        checkItemId(itemVO: ItemVO<DaoJuCfg>, id: number) {
            if (itemVO && itemVO.checkExpire() && itemVO.id == id) {
                return true;
            }
            else {
                return false;
            }
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
        }

        public awake() {
            this.$view.useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useDaoju, this);
        }

        public sleep() {
            this.$view.useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.useDaoju, this);
        }
    }
}
