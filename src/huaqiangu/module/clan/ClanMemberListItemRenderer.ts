module junyou.hqg {

    /**
     * 门派成员列表单位
     * @author pb
     */
    export class ClanMemberListItemRenderer extends sui.ListItemRenderer<ClanMemberInfoVO> {
        public model: ClanService;
        constructor() {
            super();
        }

        public bindComponent() {
            this.skin = new ClanMemberListItemView();
            let menu = new sui.Menu(MenuStyles.clanMemberStyle, 4);
            sui.Menu.bind(this, menu, ClanMemberMenu.initMenu);
            menu.y = this.skin.height;
            super.bindComponent();
            mvc.Facade.getInstance().getProxy(ServiceName.ClanService, (clanService: ClanService) => {
                this.model = clanService;
            }, this);
        }

        public setData(vo: ClanMemberInfoVO) {
            super.setData(vo);
            let skin = <ClanMemberListItemView>this.skin;
            if (vo) {
                skin.lvTxt.text = LangUtil.getMsg(230, vo.level);
                skin.nameTxt.text = vo.name;
                skin.zhanliTxt.text = vo.zhanli + "";
                skin.resTxt.text = (vo.res || 0) + "";
                let cfg = this.model.quanxianByTitle[vo.titleid];
                if (cfg) {
                    skin.titleTxt.text = cfg.name;
                }
                else {
                    skin.titleTxt.text = "";
                }
                if (!vo.time) {
                    skin.stateTxt.setHtmlText(LangUtil.getMsg(216, LangUtil.getMsg(231)));
                }
                else {
                    skin.stateTxt.setHtmlText(LangUtil.getMsg(214, CoreFunction.betweenTime(DateUtils.serverTime, vo.time)));
                }
            }
        }

        public setChooseState(value: boolean) {
            super.setChooseState(value);
            let skin = <ClanMemberListItemView>this.skin;
            let bgBtn = skin.bgBtn;
            if (bgBtn) {
                bgBtn.selected = value;
            }
        }

    }
}