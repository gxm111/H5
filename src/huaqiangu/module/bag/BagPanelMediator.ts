module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-07-28 17:50:24
    */
    export class BagPanelMediator extends mvc.Mediator {

        public $view: BagPanel;
        @d_dependProxy(ServiceName.ItemsService)
        public model: ItemsService;

        private list: sui.PageList<ItemVO<DaoJuCfg>, BagListItemRenderer>;
        private group: sui.Group;

        private goodsArr: ItemVO<DaoJuCfg>[];
        private equipArr: ItemVO<ZhuangBeiCfg>[];

        constructor() {
            super(ModuleId.Bag);
        }

        protected init() {
            this.view = new BagPanel;
            //这里加事件关注
            // this.addProxy("ItemsService", "model");
            // this.addInterest(ItemsService.CHANGE, this.changeHandler);
            // this.addInterest(ItemsService.NUM_CHANGE, this.numChangeHandler);
        }

        @d_interest(EventConst.BAG_ITEMS_CHANGE)
        changeHandler(e: egret.Event) {
            this.groupChange();
            this.numChangeHandler();
        }
        
        @d_interest(EventConst.BAG_NUM_CHANGE)
        numChangeHandler(e?: egret.Event) {
            if (this.model.bySlot[0]) {
                this.$view.numTxt.text = LangUtil.getMsg(205, this.model.bySlot[0].length, this.model.totalBagNum);
            }
        }

        groupChange(e?: egret.Event) {
            if (this.group.selectedIndex == 0) {
                this.showEquip();
            }
            else if (this.group.selectedIndex == 1) {
                this.showDaoju();
            }
        }

        showEquip(e?: egret.TouchEvent): void {
            this.equipArr = <ItemVO<ZhuangBeiCfg>[]>this.model.byType[ItemType.Euipment];
            this.list.displayList(this.equipArr);
            //-----------测试数据-------
            // this.equipArr = [];
            // let num = this.model.totalSlotNum;
            // num = 20;
            // let vo: ItemVO<ZhuangBeiCfg>;
            // for (var index = 0; index < num; index++) {
            //     vo = new ItemVO<ZhuangBeiCfg>();
            //     vo.rare = Math.ceil(Math.random() * 4);
            //     vo.cfg = new ZhuangBeiCfg();
            //     vo.cfg.minlevel = index;
            //     vo.cfg.type = 0;
            //     vo.count = index;
            //     this.equipArr.push(vo);
            // }
            // //-----------测试数据-------
            // this.equipArr.multiSort(["rare", "lv"], [true, true]);
            // this.list.displayList(this.equipArr);
        }

        showDaoju(e?: egret.TouchEvent): void {
            //this._goodsArr = this.model.byType[ItemType.Daoju];
            //this.list.displayList();
            //------------------测试数据----------
            this.goodsArr = [];
            let num = this.model.totalBagNum;
            let vo: ItemVO<DaoJuCfg>;
            for (var index = 0; index < num; index++) {
                vo = new ItemVO();
                vo.cfg = new DaoJuCfg();
                vo.cfg.type = 1;
                vo.count = index;
                this.goodsArr.push(vo);
            }
            //------------------测试数据----------
            this.goodsArr.multiSort(["lv"], [true]);
            this.list.displayList(this.goodsArr);
        }

        addNum(e: egret.TouchEvent): void {
            let targetNum = this.model.totalBagNum + this.model.onceOpenNum;
            if (ClientCheck.isClientCheck) {
                if (this.model.totalBagNum >= this.model.maxBagNum) {
                    CoreFunction.showClientTips(203);
                    return;
                }
                else if (Core.$hero.gold < this.model.onceOpenGold) {
                    CoreFunction.notEnoughGold();
                    return;
                }
            }
            this.model.addNum(targetNum);
        }

        protected afterAllReady() {
            let view = this.$view;
            let position = view.position;
            let list = this.list = new sui.PageList<ItemVO<DaoJuCfg>, BagListItemRenderer>(new ClassFactory(BagListItemRenderer), 4, 0, 20, 4);
            list.x = position.x;
            list.y = position.y;
            view.addChild(this.list);
            view.addChild(view.scrollBar);
            let scroller: sui.Scroller = new sui.Scroller();
            //scroller.alwaysShowBar = true;
            let rect: egret.Rectangle = new egret.Rectangle(0, 0, position.width, position.height);
            scroller.bindObj(this.list, rect, view.scrollBar);

            let group = this.group = new sui.Group();
            //this._group.addItems(view.tab1, view.tab2);
            for (let i = 0; i < 2; i++) {
                group.addItem(view["tab" + i]);
            }
            group.selectedIndex = 0;
            this.groupChange();

            this.numChangeHandler();

            let mm = this._facade.moduleManager;
            mm.bindButton(ModuleId.Ronglian, view.ronglianBtn);
        }

        public awake() {
            let view = this.$view;
            view.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addNum, this);

            this.group.addEventListener(sui.Group.CHANGE, this.groupChange, this);
        }

        public sleep() {
            let view = this.$view;
            view.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addNum, this);

            this.group.removeEventListener(sui.Group.CHANGE, this.groupChange, this);
        }
    }
}
