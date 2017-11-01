module junyou.hqg{
    export class SkillRoleSlotViewRender extends sui.ListItemRenderer<Follower>{

        private $view:SkillRoleSlotView;
        public constructor(){
            super();
        }

        protected bindComponent(){
            let view:SkillRoleSlotView = new SkillRoleSlotView();
            this.skin = view;
            this.$view = view;
            this.$view.selectbg.visible = false;
            super.bindComponent();
        }

        public setChooseState(value:boolean){
            if(this._chooseState!=value){
                this._chooseState = value;
                this.$view.selectbg.visible = value;
            }
            super.setChooseState(value);
        }

        public handleView(){
            super.handleView();
        }
    }
}