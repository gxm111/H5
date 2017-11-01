module junyou.hqg {
    export class SkillListItemRender extends sui.ListItemRenderer<SkillInfo>{

        public $view: SkillItemView;
        public info: SkillInfo;
        private $hero: HeroVO;

        public mediator: SkillPanelMediator;

        public skillService: SkillService;

        private menu:sui.Menu;
        public constructor() {
            super();
        }

        protected bindComponent() {
            let view: SkillItemView = new SkillItemView();
            this.skin = view;
            this.$view = view;
            this.$view.selectbg.visible = false;
            this.$view.slot.countShow = 0;
            this.$view.flag.visible = false;
            this.$hero = Core.$hero;
            mvc.Facade.getInstance().getMediator(ModuleId.Skill, (med: mvc.Mediator, undefined) => {
                this.mediator = med as SkillPanelMediator;
            }, this, undefined);
            mvc.Facade.getInstance().getProxy("SkillService", (ser: mvc.Proxy, undefined) => {
                this.skillService = ser as SkillService;
            }, this, undefined);
            let menu = new sui.Menu(MenuStyles.skill_style, 4);
            sui.Menu.bind(this, menu, SkillMenuLogic.initMenu);
            menu.y = this.$view.height;
            this.menu = menu;
            super.bindComponent();
        }

        public setChooseState(value: boolean) {
            if (this._chooseState != value) {
                this._chooseState = value;
                
            }
            super.setChooseState(value);
            if(this.inited){
                this.$view.selectbg.visible = value;
            }
        }

        public refreshOrder(e?: Event) {
            if(!this.inited)return;
            if (!this.stage) {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.refreshOrder, this);
                return;
            }
            let orders = this.skillService.skillOrderByFollower[this.mediator.selectFollower];
            let len = orders.length;
            this.$view.flag.visible = false;
            this.$view.order.visible = false;
            for (let i = 0; i < len; i++) {
                if (orders[i] == this.info.id) {
                    this.$view.flag.visible = true;
                    this.$view.order.visible = true;
                    this.$view.order.value = i + 1;
                    break;
                }
            }
            if(this.menu.stage){
                SkillMenuLogic.initMenu.apply(this,[this,this.menu]);
            }
        }

        public handleView() {
            super.handleView();
            this.info = this.getData();
            let cfg: JiNengCfg = DataLocator.getData(game.ConfigKey.JiNeng)[this.info.id];
            this.$view.slot.iconSource = cfg.icon;
            this.$view.nameTF.text = cfg.name;
            this.$view.tipTF.setHtmlText(cfg.desc);
            let minLv = cfg.minlevel;
            if (this.$hero.level < minLv) {
                this.$view.stateTF.setHtmlText(LangUtil.getMsg(304, minLv));
            } else {
                this.$view.stateTF.setHtmlText(LangUtil.getMsg(295));
            }
            this.$view.secnameTF.setHtmlText(this.info.name);
        }
    }

    export class SkillMenuLogic {

        /**
         * 这个函数会在render选中的时候自动触发一次，render引用也会传过来
         * 可以根据render的data情况，自己确定menuvo及需要的回调函数
         * 
         * 参数第1位 render
         * 参数第2位 menu
         * 
         * @static
         */
        public static initMenu = (...args) => {
            let render: SkillListItemRender = args[0];
            let menu: sui.Menu = args[1];
            let vos = [];
            let service = render.skillService;
            if(!service)return;
            let orders = service.skillOrderByFollower[render.mediator.selectFollower];
            let len = orders.length;
            let order: number = undefined;
            for (let i = 0; i < len; i++) {
                if (orders[i] == render.info.id) {
                    order = i + 1;
                    break;
                }
            }
            let oldOrders = render.mediator.skillSlotList.data;
            let orderinfo;
            let isOrdered:boolean = false;
            for(let key in oldOrders){
                if(oldOrders[key]){
                    if(oldOrders[key] == render.info.id){
                        isOrdered = true;
                        break;
                    }
                }
            }
            for (let i = 0; i < 4; i++) {
                let vo = <sui.MenuBaseVO>{};
                orderinfo = oldOrders[i];
                if(orderinfo){
                    if(orderinfo == render.info.id){
                        vo.label = "卸下";
                        vo.callBack = SkillMenuLogic.cancelClick;
                    }
                    else{
                        if(isOrdered){
                            vo.label = "交换"+(i+1);
                        }else{
                            vo.label = "覆盖"+(i+1);
                        }
                        vo.callBack = SkillMenuLogic["btn" + (i + 1) + "Click"];
                    }
                }else{
                    vo.label = "设为" + (i + 1);
                    vo.callBack = SkillMenuLogic["btn" + (i + 1) + "Click"];
                }
   
                
                vos[i] = vo;
                
                if (order == (i + 1)) {
                    vo.label = "卸下";
                    vo.callBack = SkillMenuLogic.cancelClick;
                }
            }
            menu.displayMenuDatas(vos);
        }

        /**
         * 默认参数第1位是skillrender(注意不是menurender) 第2位是menuvo
         * 
         * @private
         * @static
         * @param args (description)
         */
        private static btn1Click(...args) {
            let render: SkillListItemRender = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            SkillMenuLogic.setOrder(render, render.mediator.selectFollower, render.getData().id, 0);
        }

        private static btn2Click(...args) {
            let render: SkillListItemRender = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            SkillMenuLogic.setOrder(render, render.mediator.selectFollower, render.getData().id, 1);
        }
        private static btn3Click(...args) {
            let render: SkillListItemRender = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            SkillMenuLogic.setOrder(render, render.mediator.selectFollower, render.getData().id, 2);
        }
        private static btn4Click(...args) {
            let render: SkillListItemRender = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            SkillMenuLogic.setOrder(render, render.mediator.selectFollower, render.getData().id, 3);
        }
        private static cancelClick(...args) {
            let render: SkillListItemRender = args[0];
            // let menu:sui.MenuBaseVO = args[1];
            SkillMenuLogic.setOrder(render, render.mediator.selectFollower, render.getData().id, 5);
        }

        private static setOrder(render: SkillListItemRender, follower: number, skillid: number, order: number) {
            let o = <SetSkillOrder>{};
            o.follower = follower;
            o.id = skillid;
            o.order = order;
            render.skillService.setSkillOrder(o);
        }
    }
}