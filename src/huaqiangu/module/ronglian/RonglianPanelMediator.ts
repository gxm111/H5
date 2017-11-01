module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-08-12 18:30:24
    */
    export class RonglianPanelMediator extends mvc.Mediator {

        public $view: RonglianPanel;
        @d_dependProxy(ServiceName.RongLianService)
        public model: RongLianService;
        @d_dependProxy(ServiceName.ItemsService)
        public itemsService: ItemsService;

        private list: sui.MPageList<EquVO, EquipSlot<EquVO>>;

        private equipArr: EquVO[];

        constructor() {
            super(ModuleId.Ronglian);
        }

        protected init() {
            this.view = new RonglianPanel;

            //这里加事件关注
            /*this.addProxy("RongLianService", "model");
            this.addProxy("ItemsService", "itemsService");
            this.addInterest(RongLianService.RONGLIAN, this.ronglianHandler);*/
        }

        @d_interest(EventConst.RONGLIAN)
        ronglianHandler(e: egret.Event) {
            this.setList();
            let vo = e.data;
            let slot = this.$view.slot;
            slot.setData(vo);
        }

        ronglian(e: egret.TouchEvent) {
            let arr = [];
            let equipArr = this.equipArr;
            equipArr.forEach(vo => {
                if (vo) {
                    arr.push(vo.id);
                }
            });
            if (!arr) {
                CoreFunction.showClientTips(206);
                return;
            }
            this.model.rongLian({ equids: arr });
        }

        keep(e: egret.TouchEvent) {
            this.$view.checkBtn.selected = !this.$view.checkBtn.selected;
            this.setList();
        }

        setList() {
            let equipArr = this.equipArr = [];
            this.model.getRonglianAbleEquips(equipArr, this.$view.checkBtn.selected, RongLianService.ONCE_NUM);
            this.list.displayList(equipArr);
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
            let list = this.list = new sui.MPageList<EquVO, EquipSlot<EquVO>>();
            let render: EquipSlot<EquVO>;
            for (let i = 0; i < 6; i++) {
                render = EquipSlot.getSlot(view["slot" + i]);
                list.addItem(render);
            }
            EquipSlot.getSlot(view.slot);
            view.checkBtn.txtLabel.width = 300;
            view.checkBtn.label = LangUtil.getMsg(207);
            view.checkBtn.selected = true;

        }

        public awake() {
            let view = this.$view;
            view.ronglianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ronglian, this);
            view.checkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.keep, this);
            this.setList();
        }

        public sleep() {
            let view = this.$view;
            view.ronglianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ronglian, this);
            view.checkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.keep, this);
        }
    }
}
