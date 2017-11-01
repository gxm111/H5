module junyou.hqg {

    /**
     * 门派捐献列表单位
     * @author pb
     */
    export class ClanJuanxianListItemRenderer extends sui.ListItemRenderer<MenPaiJuanXianCfg> {
        public model: ClanService;
        public itemsService: ItemsService;
        constructor() {
            super();
        }

        public bindComponent() {
            this.skin = new ClanJuanxianListItemView();
            super.bindComponent();
            mvc.Facade.getInstance().getProxy(ServiceName.ClanService, (clanService: ClanService) => {
                this.model = clanService;
            }, this);
            mvc.Facade.getInstance().getProxy(ServiceName.ItemsService, (itemsService: ItemsService) => {
                this.itemsService = itemsService;
            }, this);
            let skin = <ClanJuanxianListItemView>this.skin;
            skin.juanxianBtn.label = LangUtil.getMsg(212);
        }

        public setData(vo: MenPaiJuanXianCfg) {
            super.setData(vo);
            let skin = <ClanJuanxianListItemView>this.skin;
            if (vo) {
                let slot = GoodsItemSlot.getSlot(skin.slot);
                let needItem = vo.needitem;
                if (needItem) {
                    let id = needItem[0];
                    let count = +needItem[1];
                    let item = this.itemsService.generateShowItem(id, count);
                    slot.setData(item);
                }
                let targetStr: string;
                targetStr = Core.$hero.getNeedItemMsg(vo.needitem);
                skin.targetTxt.setHtmlText(targetStr);
                skin.rewardTxt0.text = LangUtil.getMsg(221, vo.fame);
                skin.rewardTxt1.text = LangUtil.getMsg(222, vo.res);
                if (this.model.myClanInfoVO.juanxianNum == this.model.maxJuanxianNum) {
                    skin.juanxianBtn.visible = false;
                }
                else {
                    skin.juanxianBtn.visible = true;
                }
            }
        }

        juanxian(e: egret.TouchEvent) {
            if (this._data) {
                if (ClientCheck.isClientCheck) {
                    if (!Core.$hero.checkNeedItem(this._data.needitem)) {
                        return;
                    }
                    if (this.model.myClanInfoVO.juanxianNum >= this.model.maxJuanxianNum) {
                        CoreFunction.showClientTips(226);
                        return;
                    }
                }
                this.model.clanJuanxian(this._data.id);
            }
        }

        /**
         * 皮肤添加到舞台调用
         */
        protected awake() {
            let skin = <ClanJuanxianListItemView>this.skin;
            skin.juanxianBtn.touchEnabled = true;
            skin.juanxianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.juanxian, this);
        }

        /**
         * 皮肤从舞台移除调用
         */
        protected sleep() {
            let skin = <ClanJuanxianListItemView>this.skin;
            skin.juanxianBtn.touchEnabled = false;
            skin.juanxianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.juanxian, this);
        }
    }
}