module junyou.hqg{
    export class FollowerSlotRender extends sui.ListItemRenderer<Follower>{

        public view:FollowerSlotView;
        public constructor(){
            super();
            this.bindComponent();
        }

        protected bindComponent(){
            this.skin = new FollowerSlotView();
            this.view = <FollowerSlotView>this.skin;
            super.bindComponent();
            this.view.limitTF.text = "何时开启";
        }

        public setData(value:any){
            super.setData(value);
        }

        public handleView(){
            super.handleView();
        }
    }
}