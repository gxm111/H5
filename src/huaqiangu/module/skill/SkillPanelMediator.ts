module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-06 14:50:53
    */
    export class SkillPanelMediator extends mvc.Mediator {

        public $view: SkillPanel;

        private group: sui.Group;

        private normalView: SkillNormalView;

        private angerView: SkillAngerView;

        private currentView: egret.Sprite;
        @d_dependProxy(ServiceName.SkillService)
        public skillService: SkillService;

        public selectFollower: number = 0;


        /**
         * 技能列表
         * 
         * @private
         * @type {sui.PageList<SkillVO, SkillListItemRender>}
         */
        private skillnormalList: sui.PageList<SkillInfo, SkillListItemRender>;

        /**
         * 释放顺序列表
         * 
         * @private
         * @type {sui.PageList<any,SkillSlotViewRender>}
         */
        public skillSlotList: sui.PageList<any, SkillSlotViewRender>;

        /**
         * 主角及伙伴列表
         * 
         * @private
         * @type {sui.PageList<Follower,SkillRoleSlotViewRender>}
         */
        private skillRoleList: sui.PageList<Follower, SkillRoleSlotViewRender>;


        private skillAngerList:sui.PageList<SkillInfo,SkillAngerItemRender>;


        private normalScroller: sui.Scroller;

        private selectAngerItems:any[];

        public orderInfos: SkillOrderInfo[];

        constructor() {
            super(ModuleId.Skill);
        }

        protected init() {
            this.view = new SkillPanel;
            // this.addProxy("SkillService","skillService");
            //这里加事件关注
        }

        protected afterAllReady() {
            this.group = new sui.Group();
            this.group.addItem(this.$view.tab1);
            this.group.addItem(this.$view.tab2);
            this.group.addItem(this.$view.tab3);
            this.group.addEventListener(sui.Group.CHANGE, this.groupChange, this);
            //this.$view.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeView, this);
        }

        private groupChange(e: egret.Event) {
            if (this.currentView) {
                this.currentView.visible = false;
                this.currentView = undefined;
            }
            switch (this.group.selectedIndex) {
                case 0:
                    if (!this.normalView) {
                        this.initNormalView();
                    }
                    this.currentView = this.normalView;
                    this.awakeNormalSkill();
                    break;
                case 1:
                    if (!this.angerView) {
                        this.initAngerView();
                    }
                    this.currentView = this.angerView;
                    this.awakeAngerView();
                    break;
                case 2:
                    break;
            }
            if (this.currentView) {
                this.currentView.visible = true;
            }
        }

        /*****普通技能 */

        private initNormalView() {
            this.normalView = new SkillNormalView();
            this.$view.panelcon.addChild(this.normalView);
            this.skillnormalList = new sui.PageList<SkillInfo, SkillListItemRender>(new ClassFactory(SkillListItemRender), 0, 1, 4, 1);
            this.normalView.addChild(this.skillnormalList);
            this.skillnormalList.x = this.normalView.skilllistcon.x;
            this.skillnormalList.y = this.normalView.skilllistcon.y;


            this.skillSlotList = new sui.PageList<SkillOrderInfo, SkillSlotViewRender>(new ClassFactory(SkillSlotViewRender), 12, 0, 4, 4);
            this.normalView.slotlistcon.addChild(this.skillSlotList);
            this.skillSlotList.addEventListener(sui.PageList.ITEM_SELECTED,this.skillSlotListSelected,this);

            this.skillRoleList = new sui.PageList<Follower, SkillRoleSlotViewRender>(new ClassFactory(SkillRoleSlotViewRender), 30, 0, 4, 4);
            this.normalView.rolelistcon.addChild(this.skillRoleList);
            this.skillRoleList.addEventListener(sui.PageList.ITEM_SELECTED, this.selectRoleList, this);




            this.normalScroller = new sui.Scroller();
            this.normalScroller.bindObj(this.skillnormalList, new egret.Rectangle(0, 0, 388, 362), this.normalView.scbar);

        }

        private selectRoleList(e?: Event) {
            let index = this.skillRoleList.selectedIndex;
            this.selectFollower = index;
            let arr = this.skillService.skillOrderByFollower[index]
            this.skillSlotList.displayList(arr);
            this.skillSlotList.selectedIndex = 0;
        }

        private skillSlotListSelected(e:Event){
            let item = <SkillSlotViewRender>(<any>this.skillSlotList.selectedItem);
            let data = item.getData();
            if(data){
                this.skillnormalList.selectItemByData("id",data);
            }
            let items = this.skillnormalList.getAllItems();
            let len = items.length;
            for(let i=0;i<len;i++){
                items[i].refreshOrder();
            }
        }

        private awakeNormalSkill() {
            if(!this.skillService.baseSkillInfo){
                this.skillService.getNormalSkill();
            }
        }
        @d_interest(EventConst.SKILL_BASEINFO_RTN)
        public normalInfoRtn(e: Event) {
            this.skillnormalList.displayList(this.skillService.baseSkillInfo);
            let arr3: any[] = [];
            for (let i = 0; i < 3; i++) {
                let tmp2 = <Follower>{};
                arr3[i] = tmp2;
            }
            this.skillRoleList.displayList(arr3);
            this.skillRoleList.selectedIndex = 0;
        }

        @d_interest(EventConst.SKILL_ORDER_CHANGE)
        public skillOrderChange(e: Event) {
            let arr = this.skillService.skillOrderByFollower[this.skillRoleList.selectedIndex];
            this.skillSlotList.displayList(arr);
            let id = e["data"]["id"];
            let order = e["data"]["order"];
            if(order>=0){
                let index = this.skillSlotList.data.indexOf(id);
                this.skillSlotList.selectedIndex = index;
            }
            let items = this.skillnormalList.getAllItems();
            let len = items.length;
            for(let i=0;i<len;i++){
                items[i].refreshOrder();
            }
        }
        /**** */
        /****大招技能 */
        private initAngerView(){
            this.angerView = new SkillAngerView();
            this.$view.panelcon.addChild(this.angerView);
            this.skillAngerList = new sui.PageList<SkillInfo,SkillAngerItemRender>(new ClassFactory(SkillAngerItemRender),0,1,3);
            this.angerView.listcon.addChild(this.skillAngerList);
            this.skillAngerList.addEventListener(EventConst.SKILL_ANGER_SKILL_LOCK,this.angerItemLockChange,this);
        }

        private angerItemLockChange(e:egret.Event){
            let item:SkillAngerItemRender = <SkillAngerItemRender>e.data;
            let state = item.selected;
            if(state){
                if(this.selectAngerItems.indexOf(item)==-1){
                    this.selectAngerItems.push(item);
                }
            }else{
                let inx = this.selectAngerItems.indexOf(item);
                if(inx!=-1){
                    this.selectAngerItems.splice(inx,1);
                }
            }
        }

        private awakeAngerView(){
            let arr = [];
            for(let i=0;i<3;i++){
                arr[i] = <SkillInfo>{};
            }
            this.skillAngerList.displayList(arr);
        }
        /****** */

        /*private closeView(e: egret.TouchEvent) {
            mvc.Facade.getInstance().toggle(ModuleId.Skill);
        }*/

        public awake() {
            super.awake();
            this.group.selectedIndex = 0;
        }


    }
}
