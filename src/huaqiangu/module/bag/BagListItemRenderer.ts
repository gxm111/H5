module junyou.hqg {

    /**
     * 背包列表单位
     * @author pb
     */
    export class BagListItemRenderer extends sui.ListItemRenderer<ItemVO<DaoJuCfg>> {

        constructor() {
            super();
        }

        public bindComponent() {
            this.skin = new BagListItemRendererSkin();
            super.bindComponent();
        }

        public setData(value: ItemVO<DaoJuCfg>) {
            super.setData(value);
            let skin = <BagListItemRendererSkin>this.skin;
            if (value) {
                let slot = GoodsItemSlot.getSlot(skin.slot);
                slot.setData(value);
                if (value.type == ItemType.Euipment) {
                    slot.countShow = 0;
                    skin.txt.text = "Lv." + value.minlevel;
                }
                else if (value.type == ItemType.Daoju) {
                    slot.countShow = 1;
                    skin.txt.text = value.cfg.name;
                }
            }
            else {
                skin.txt.text = "";
            }
        }

        showItem(e: egret.TouchEvent) {
            if (this._data) {
                if (this._data.type == ItemType.Euipment) {
                    mvc.Facade.getInstance().executeMediator(ModuleId.EquipItem, false, EquipPanelMediator.SET_DATA, true, this._data);
                }
                else if (this._data.type == ItemType.Daoju) {
                    mvc.Facade.getInstance().executeMediator(ModuleId.DaojuItem, false, DaojuPanelMediator.SET_DATA, true, this._data);
                }
            }
        }

        /**
         * 皮肤添加到舞台调用
         */
        protected awake() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showItem, this);
        }

        /**
         * 皮肤从舞台移除调用
         */
        protected sleep() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showItem, this);
        }
    }

    export class BagListItemRendererSkin extends egret.Sprite {
        public slot: sui.Slot;
        public txt: egret.TextField;
        constructor() {
            super();
            let manager = sui.SuiResManager.getInstance();
            let slot = this.slot = <sui.Slot>manager.createDisplayObject("lib", "ui.slot.Slot1");
            this.addChild(slot);
            slot.x = 5;
            let txt = this.txt = new egret.TextField();
            this.addChild(txt);
            txt.width = 80;
            txt.height = 20;
            txt.textAlign = "center";
            txt.size = 14;
            txt.y = 70;
        }
    }
}