module junyou.hqg{
    export class SkillAngerItemRender extends sui.ListItemRenderer<SkillInfo>{
        public $view:SkillAngerItemView;

        public constructor(){
            super();
        }

        protected bindComponent(){
            let view:SkillAngerItemView = new SkillAngerItemView();
            this.skin = view;
            this.$view = view;
            this.$view.lock.visible = false;
            this.$view.slot.countShow = 0;
            this.$view.lock.touchEnabled = this.$view.fuxuan.touchEnabled = true;
            super.bindComponent();
            this.$view.fuxuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.fuxuanClick,this);
            this.$view.lock.addEventListener(egret.TouchEvent.TOUCH_TAP,this.fuxuanClick,this);
        }

        private fuxuanClick(e:egret.TouchEvent){
            this.$view.lock.visible = !this.$view.lock.visible;
            this.parent.dispatchEventWith(EventConst.SKILL_ANGER_SKILL_LOCK,false,this);
        }

        public get selected(){
            return this.$view.lock.visible; 
        }

        public handleView(){
            super.handleView();
        }
    }
}