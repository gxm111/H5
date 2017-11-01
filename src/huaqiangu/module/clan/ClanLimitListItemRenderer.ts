module junyou.hqg {

    /**
     * 门派捐献列表单位
     * @author pb
     */
    export class ClanLimitListItemRenderer extends sui.ListItemRenderer<MenPaiLimitCfg> {
        public model: ClanService;
        constructor() {
            super();
        }

        public bindComponent() {
            this.skin = new ClanLimitListItemView();
            super.bindComponent();
            mvc.Facade.getInstance().getProxy(ServiceName.ClanService, (clanService: ClanService) => {
                this.model = clanService;
            }, this);
            let skin = <ClanLimitListItemView>this.skin;
            let txt = skin.txt;
            txt.type = egret.TextFieldType.INPUT;
            txt.restrict = "0-9";
        }

        public setData(vo: MenPaiLimitCfg) {
            super.setData(vo);
            let skin = <ClanLimitListItemView>this.skin;
            if (vo) {
                if (vo.value) {
                    skin.txt.text = vo.value + "";
                    skin.checkBtn.selected = true;
                }
                else {
                    skin.txt.text = "";
                    skin.checkBtn.selected = false;
                }
                skin.checkBtn.label = vo.name;
            }
        }

        setCheckBtn(e: egret.TouchEvent) {
            let skin = <ClanLimitListItemView>this.skin;
            let value: boolean = !skin.checkBtn.selected;
            skin.checkBtn.selected = value;
            if (!value) {
                skin.txt.text = "";
            }
        }

        focusOut(e: egret.TextEvent) {
            let str = e.target.text;
            if (!str || !+str) {
                let skin = <ClanLimitListItemView>this.skin;
                skin.checkBtn.selected = false;
            }
        }

        /**
         * 皮肤添加到舞台调用
         */
        protected awake() {
            let skin = <ClanLimitListItemView>this.skin;
            skin.checkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setCheckBtn, this);
            skin.txt.addEventListener(egret.TextEvent.FOCUS_OUT, this.focusOut, this);
        }

        /**
         * 皮肤从舞台移除调用
         */
        protected sleep() {
            let skin = <ClanLimitListItemView>this.skin;
            skin.checkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setCheckBtn, this);
            skin.txt.removeEventListener(egret.TextEvent.FOCUS_OUT, this.focusOut, this);
        }
    }
}