module junyou.hqg{
    export class SkillSlotViewRender extends sui.ListItemRenderer<any>{

        private $view:SkillSlotView;

        private $id:number;

        private icon:sui.Image;

        public index:number;

        private $hero:HeroVO;

        public skillService:SkillService;

        public mediator:SkillPanelMediator;
        public constructor()
        {
            super();
            this.index = 0;
        }

        protected bindComponent(){
            let view:SkillSlotView = new SkillSlotView();
            this.skin = view;
            this.$view = view;
            this.$view.normalflag.visible = true;
            this.$view.selectbg.visible = false;
            this.$view.selectflag.visible = false;
            this.icon = new sui.Image;
            this.$view.addChild(this.icon);
            this.icon.x = this.$view.normalbg.x+12;
            this.icon.y = this.$view.normalbg.y+9;
            this.$view.order.value = this.index+1;
            this.$hero = Core.$hero;
            mvc.Facade.getInstance().getProxy("SkillService",(ser:mvc.Proxy,undefined)=>{
                this.skillService = ser as SkillService;
            },this,undefined);
            mvc.Facade.getInstance().getMediator(ModuleId.Skill, (med: mvc.Mediator, undefined) => {
                this.mediator = med as SkillPanelMediator;
            }, this, undefined);
            super.bindComponent();
        }

        public setChooseState(value:boolean){
            if(!this.$id){
                return;
            }
            if(this._chooseState!=value){
                this._chooseState = value;
                this.$view.selectbg.visible = value;
                this.$view.selectflag.visible = value;
            }
        }

        public handleView(){
            super.handleView();
            this.$id = this.getData();
            if(this.$id){
                this.$view.lock.visible = false;
                let skills:JiNengCfg[] = DataLocator.getData(game.ConfigKey.JiNeng);
                let cfg:JiNengCfg = skills[this.$id];
                if(cfg){
                    this.icon.source = cfg.icon;
                    this.$view.nameTF.text = cfg.name;
                }
            }else{
                this.$view.selectbg.visible = false;
                this.$view.selectflag.visible = false;
                this.$view.lock.visible = true;
                this.icon.source = null;
                this.$view.nameTF.text = "尚未开启";
                let infos = this.skillService.baseSkillInfo;
                let len = infos.length;
                let orders = this.skillService.skillOrderByFollower[this.mediator.selectFollower];
                let id;
                for(let i=0;i<len;i++){
                    id = infos[i].id;
                    let cfg:JiNengCfg = DataLocator.getData(game.ConfigKey.JiNeng)[id];
                    if(cfg){
                        if(orders.indexOf(id)==-1){
                            if(this.$hero.level>=cfg.minlevel){
                                this.$view.lock.visible = false;
                                this.$view.nameTF.text = "可设置技能";
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}