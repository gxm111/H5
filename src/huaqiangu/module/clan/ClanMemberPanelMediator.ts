module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-12 17:20:08
    */
    export class ClanMemberPanelMediator extends mvc.Mediator {

        public $view: ClanMemberPanel;
        @d_dependProxy(ServiceName.ClanService)
        public model: ClanService;

        private list: sui.PageList<ClanMemberInfoVO, ClanMemberListItemRenderer>;

        constructor() {
            super(ModuleId.ClanMember);
        }

        protected init() {
            this.view = new ClanMemberPanel;

            //这里加事件关注
        }

        @d_interest(EventConst.CLAN_MEMBER_INFO)
        memberInfoHandler(e?: egret.Event) {
            let list = this.list;
            let idx = list.selectedIndex;
            list.displayList(this.model.memberArr);
            if (idx > 0) {
                list.selectedIndex = idx;
            }
            else {
                list.selectedIndex = 0;
            }
            let view = this.$view;
            let info = this.model.clanInfoVO;
            view.lvTxt0.text = LangUtil.getMsg(240, info.level);
            view.nameTxt0.text = info.name;
            let cfg = this.model.byLv[info.level];
            if (cfg) {
                view.numTxt.text = LangUtil.getMsg(241, info.num, cfg.maxnum);
            }
            view.onlineTxt.text = LangUtil.getMsg(242, this.model.getOnlineNum());
        }

        protected afterAllReady() {
            let view = this.$view;
            let position = view.position;
            let list = this.list = new sui.PageList<ClanMemberInfoVO, ClanMemberListItemRenderer>(new ClassFactory(ClanMemberListItemRenderer), 0, 0, 6);
            list.x = position.x;
            list.y = position.y;
            view.addChild(this.list);
            view.addChild(view.scrollBar);
            let scroller: sui.Scroller = new sui.Scroller();
            //scroller.alwaysShowBar = true;
            let rect: egret.Rectangle = new egret.Rectangle(0, 0, position.width, position.height);
            scroller.bindObj(this.list, rect, view.scrollBar);

            let info = this.model.clanInfoVO;
            view.infoTxt.text = LangUtil.getMsg(239);

            view.lvTxt1.text = LangUtil.getMsg(243);
            view.nameTxt1.text = LangUtil.getMsg(244);
            view.zhanliTxt.text = LangUtil.getMsg(245);
            view.resTxt.text = LangUtil.getMsg(246);
            view.titleTxt.text = LangUtil.getMsg(247);
            view.stateTxt.text = LangUtil.getMsg(248);

            this.model.clanMemberInfo();
        }

        public awake() {
            this.memberInfoHandler();
        }

        /*public sleep() {
        }*/
    }
}
