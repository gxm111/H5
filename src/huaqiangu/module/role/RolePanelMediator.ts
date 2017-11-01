module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-07-27 17:49:08
    */
    export class RolePanelMediator extends mvc.Mediator {
        public static NAME: String = ModuleId.Role;
        public $view: RolePanel;
        @d_dependProxy(ServiceName.ItemsService)
        public itemsService: ItemsService;
        @d_dependProxy(ServiceName.RoleService)
        public roleService: RoleService;

        /**
         * 
         * 装备格位类型
         * @private
         * @type {number}
         */
        private currentSlot: number = 1;

        private equipList: sui.MPageList<EquVO, EquipSlot<EquVO>>;

        private equData: any[];

        private zltext: sui.ArtNumber;

        private artlv: sui.ArtNumber;

        private followers: FollowerSlotRender[];

        // private parts:any[];

        /**
         * tf和xkey的对应关系
         * 
         * @private
         * @type {Object}
         */
        private xkey: Object;

        private headImg:HeadImage;

        constructor() {
            super(ModuleId.Role);
        }

        protected init() {
            this.view = new RolePanel;
            this.equipList = new sui.MPageList<EquVO, EquipSlot<EquVO>>();
            // this.addProxy(ItemsService.NAME, "itemsService");
            // this.addProxy(RoleService.NAME, "roleService");
            this.equData = [];
            this.xkey = { hpTF: "x1", fagongTF: "x4", shanbiTF: "x7", bishaTF: "x10", wugongTF: "x2", fafangTF: "x5", baojiTF: "x8", chuantouTF: "x11", fangyuTF: "x3", mingzhongTF: "x6", renxingTF: "x9", shenfaTF: "x12" };
            this.followers = [];
            // this.parts = [0,1,2,3,4,5,6,7,8,9,10,11];
            //这里加事件关注
        }

        protected afterAllReady() {
            let render: EquipSlot<EquVO>;
            for (let i = 0; i < 12; i++) {
                render = EquipSlot.getSlot(this.$view["slot" + i]);
                render.showSlotType = true;
                render.touchChildren = false;
                render.part = i;//this.parts[i];
                this.equipList.addItem(render);
                render.touchEnabled = true;
                render.addEventListener(egret.TouchEvent.TOUCH_TAP, this.itemClick, this);
                this.equData[i] = undefined;
            }

            for (let i = 0; i < 3; i++) {
                let slot: FollowerSlotRender = new FollowerSlotRender();
                this.followers[i] = slot;
                slot.x = this.$view.flpos.x + i * 72;
                slot.y = this.$view.flpos.y;
                this.$view.addChild(slot);
                slot.view.add.visible = false;
            }
            this.headImg = new HeadImage();
            this.$view.headcon.addChild(this.headImg);

            this.$view.rolenameTF.text = Core.$hero.name;

            this.zltext = sui.ArtTextUtil.convertTextToNumber(this.$view.zltext);
            this.artlv = sui.ArtTextUtil.convertTextToNumber(this.$view.artlv);

            this.zltext.value = 88888;
            // let xattr = {x1:100,x2:200,x3:300,x4:400,x5:500,X6:600,x7:700,x8:800,x9:900,x10:1000,x11:1100,x12:1200};
            // for(let key in this.xkey){
            //     this.$view[key]["text"] = <string>xattr[this.xkey[key]];
            // }
            //this.$view.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThis, this);

        }

        @d_interest(EventConst.HERO_LEVEL_CHANGE)
        public heroLevelChange(e?: egret.Event) {
            this.artlv.value = Core.$hero.level;
        }


        private itemClick(e: egret.Event) {
            let data = e.target.getData();
            let facade = mvc.Facade.getInstance();
            let part = e.target.part;

            if (data) {
                facade.executeMediator(ModuleId.EquipDetail, true, "showDetail", true, data);
            } else {
                facade.executeMediator(ModuleId.WearEquip, true, "showCurrentEquip", true, part);
            }

        }

        /*private closeThis(e: egret.TouchEvent) {
            mvc.Facade.getInstance().toggle(ModuleId.Role);
        }*/
        @d_interest(EventConst.HERO_XATTR_CHANGE)
        public onXattrChange(e?: egret.Event) {
            let xattr: XAttr = this.roleService.xattrBySlot[0];
            let val: string;
            for (let key in xattr) {
                val = xattr[key] ? <string>xattr[key] : "0";
                this.$view[key]["text"] = val;
            }
        }

        @d_interest(EventConst.DRESS_EQUIP_RTN)
        public onDressRtn(e?: Event) {
            this.showEquipList();
        }

        private showEquipList() {
            let allbySlot = this.itemsService.bySlot[this.currentSlot];
            let len = allbySlot ? allbySlot.length : 0;
            let cfg: ZhuangBeiCfg;
            let evo: EquVO;
            let equData = this.equData;
            for (let i = 0; i < len; i++) {
                evo = <EquVO>allbySlot[i];
                if (evo) {
                    cfg = <ZhuangBeiCfg>evo.cfg;
                    if (cfg.part in equData) {
                        equData[cfg.part] = evo;
                    }
                }
            }
            this.equipList.displayList(this.equData);
        }

        

        public awake() {
            // this.equipList.displayList(<ItemVO<ZhuangBeiCfg>[]>this.itemsService.bySlot[this.currentSlot]);

            this.showEquipList();
            this.heroLevelChange();
            this.roleService.roleXAttr(0);
            this.headImg.setHeroCircleHead();
        }

        public sleep() {
        }

    }
}
