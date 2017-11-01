module junyou.hqg {

    /**
     * 门派列表单位
     * @author pb
     */
    export class ClanListItemRenderer extends sui.ListItemRenderer<ClanInfoVO> {
        public model: ClanService;
        constructor() {
            super();
        }

        public bindComponent() {
            let skin = this.skin = new ClanListItemView();
            super.bindComponent();
            mvc.Facade.getInstance().getProxy(ServiceName.ClanService, (clanService: ClanService) => {
                this.model = clanService;
            }, this);
            skin.joinBtn.label = LangUtil.getMsg(229);
        }

        public setData(vo: ClanInfoVO) {
            super.setData(vo);
            let skin = <ClanListItemView>this.skin;
            if (vo) {
                skin.lvTxt.text = vo.level + "";
                skin.nameTxt.text = vo.name;
                skin.numTxt.text = vo.num + "";
            }
            else {
                skin.lvTxt.text = "";
                skin.nameTxt.text = "";
                skin.numTxt.text = "";
            }
        }

        public setChooseState(value: boolean) {
            super.setChooseState(value);
            let skin = <ClanListItemView>this.skin;
            let bgBtn = skin.bgBtn;
            if (bgBtn) {
                bgBtn.selected = value;
            }
        }

        join(e: egret.TouchEvent) {
            if (this._data) {
                this.model.clanJoin(this._data.id);
            }
        }

        /**
         * 皮肤添加到舞台调用
         */
        protected awake() {
            let skin = <ClanListItemView>this.skin;
            skin.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.join, this);
            //skin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setChoose, this);
        }

        /**
         * 皮肤从舞台移除调用
         */
        protected sleep() {
            let skin = <ClanListItemView>this.skin;
            skin.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.join, this);
            //skin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setChoose, this);
        }
    }
}