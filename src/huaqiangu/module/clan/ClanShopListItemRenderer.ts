module junyou.hqg {

    /**
     * 门派商店列表单位
     * @author pb
     */
    export class ClanShopListItemRenderer extends sui.ListItemRenderer<MenPaiShopItemCfg> {
        public model: ClanService;
        public itemsService: ItemsService;
        constructor() {
            super();
        }

        public bindComponent() {
            this.skin = new ClanShopListItemView();
            super.bindComponent();
            mvc.Facade.getInstance().getProxy(ServiceName.ClanService, (clanService: ClanService) => {
                this.model = clanService;
            }, this);
            mvc.Facade.getInstance().getProxy(ServiceName.ItemsService, (itemsService: ItemsService) => {
                this.itemsService = itemsService;
            }, this);
        }

        public setData(vo: MenPaiShopItemCfg) {
            super.setData(vo);
            let skin = <ClanShopListItemView>this.skin;
            if (vo) {
                let slot = GoodsItemSlot.getSlot(skin.slot);
                let item = vo.item;
                if (item) {
                    let slotItem = this.itemsService.generateShowItem(item[0], item[1]);
                    slot.setData(slotItem);
                    skin.nameTxt.text = slotItem.cfg.name;
                }
                skin.lastTxt.text = LangUtil.getMsg(252, vo.maxcount - vo.count, vo.maxcount);
                if (vo.state == 1) {
                    skin.costTxt.setHtmlText(Core.$hero.getNeedItemMsg(vo.needitem));
                    skin.actionBtn.label = LangUtil.getMsg(253);
                    if (vo.maxcount == vo.count) {
                        skin.actionBtn.visible = false;
                    }
                    else {
                        skin.actionBtn.visible = true;
                    }
                    skin.costTxt1.text = "";
                }
                else {
                    skin.costTxt.setHtmlText(Core.$hero.getNeedItemMsg(vo.needitem1));
                    skin.actionBtn.label = LangUtil.getMsg(254);
                    skin.actionBtn.visible = true;
                    skin.costTxt1.setHtmlText(Core.$hero.getNeedItemMsg(vo.needitem1));
                }
            }
        }

        action(e: egret.TouchEvent) {
            if (this._data) {
                if (ClientCheck.isClientCheck) {
                    let qCfg = this.model.quanxianByTitle[this.model.myClanInfoVO.titleid];
                    if (this._data.state) {
                        if (!qCfg || !qCfg.goumai) {
                            CoreFunction.showClientTips(255);
                            return;
                        }
                        else if (this._data.count >= this._data.maxcount) {
                            CoreFunction.showClientTips(256);
                            return;
                        }
                    }
                    else {
                        if (!qCfg || !qCfg.jihuo) {
                            CoreFunction.showClientTips(255);
                            return;
                        }
                        else if (this.model.clanInfoVO.level < this._data.minlevel) {
                            CoreFunction.showClientTips(257);
                            return;
                        }
                    }
                    if (!Core.$hero.checkNeedItem(this._data.needitem)) {
                        return;
                    }
                }
                if (this._data.state) {
                    this.model.clanBuy(this._data.id);
                }
                else {
                    this.model.clanActive(this._data.id);
                }
            }
        }

        /**
         * 皮肤添加到舞台调用
         */
        protected awake() {
            let skin = <ClanShopListItemView>this.skin;
            //skin.actionBtn.enabled = true;
            skin.actionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.action, this);
        }

        /**
         * 皮肤从舞台移除调用
         */
        protected sleep() {
            let skin = <ClanShopListItemView>this.skin;
            //skin.actionBtn.enabled = false;
            skin.actionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.action, this);
        }
    }
}