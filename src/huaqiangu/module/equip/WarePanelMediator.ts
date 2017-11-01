module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-08-01 11:49:05
    */
    export class WarePanelMediator extends mvc.Mediator {
        public $view: WarePanel;

        private currentEquip: WearEquipListRender;

        private equipList: sui.PageList<ItemVO<ZhuangBeiCfg>, WearEquipListRender>;

        private scroll: sui.Scroller;

        private liney: number;

        private ggy: number;

        /**
         * 当前穿在身上的装备
         * 
         * @private
         * @type {ItemVO<ZhuangBeiCfg>}
         */
        private currentUseVO: EquVO;
        @d_dependProxy(ServiceName.ItemsService)
        public itemsService: ItemsService;

        private showPart: number = 0;

        constructor() {
            super(ModuleId.WearEquip);
        }

        protected init() {
            this.view = new WarePanel;
            // this.addProxy(ItemsService.NAME, "itemsService");
            //这里加事件关注
        }

        protected afterAllReady() {
            ResizeManager.getInstance().add(this.$view, sui.Layout.TOP_LEFT, 22, 102);
            this.liney = this.$view.line.y;
            this.ggy = this.$view.gg.y;
            this.currentEquip = new WearEquipListRender();
            this.currentEquip.x = 16;
            this.currentEquip.y = 51;
            this.$view.addChild(this.currentEquip);

            this.equipList = new sui.PageList<ItemVO<ZhuangBeiCfg>, WearEquipListRender>(new ClassFactory(WearEquipListRender), 0, 2, 5, 1);
            this.equipList.x = 16;
            this.equipList.y = 188;
            this.$view.addChild(this.equipList);

            this.scroll = new sui.Scroller();

           // this.$view.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);



        }

        public showCurrentEquip(...args) {
            if (args) {
                if (args[1] && args[1].length) {
                    this.showPart = args[1][0];
                }

            }
            let rect;
            /*let parts:EquVO[] = this.itemsService.byPart[this.showPart];
            let len:number = parts.length;
            for(let i=0;i<len;i++){
                if(parts[i].slot == 1){
                    this.currentUseVO = parts[i];
                    break;
                }
            }*/
            this.currentUseVO = this.itemsService.getEquVOByPart(this.showPart);
            if (this.currentUseVO) {
                this.equipList.y = 188;
                this.currentUseVO.slot = 1;
                rect = new egret.Rectangle(0, 0, 405, 388);
                this.$view.line.y = this.liney;
                this.$view.gg.y = this.ggy;
                this.currentEquip.visible = true;
                this.currentEquip.setData(this.currentUseVO);
                this.currentEquip.handleView();
            } else {
                this.equipList.y = 68;
                rect = new egret.Rectangle(0, 0, 405, 508);
                this.$view.line.y = this.liney - 120;
                this.$view.gg.y = this.ggy - 120;
                this.currentEquip.visible = false;
            }
            this.scroll.bindObj(this.equipList, rect, this.$view.scrollbar);
            let arr = this.sortEquip();
            if (arr.length) {
                this.equipList.displayList(arr);
            }
        }


        /**
         * 筛选装备
         * 
         * @private
         */
        private sortEquip() {
            let temp = [];
            let source = this.itemsService.byPart[this.showPart];
            if (!source) {
                return temp;
            }
            let len = source.length;
            let vo: EquVO
            for (let i = 0; i < len; i++) {
                vo = <EquVO>source[i];
                if (vo.slot == 0) {
                    temp.push(vo);
                }
            }
            return temp;
        }

        /*private onClose(e: egret.TouchEvent) {
            mvc.Facade.getInstance().toggle(ModuleId.WearEquip);
        }*/

        @d_interest(EventConst.DRESS_EQUIP_RTN)
        public dressRtn(e?: Event) {
            //关闭界面
            mvc.Facade.getInstance().toggle(ModuleId.WearEquip);
        }

        public awake() {
            // let data = []
            // for (let i = 0; i < 100; i++) {
            //     let vo = new ItemVO<ZhuangBeiCfg>();
            //     vo.slot = 0;
            //     data[i] = vo;
            // }


            // this.equipList.selectedIndex = 20;
            // this.equipList.displayList(data);
        }

        public sleep() {
        }


    }
}
