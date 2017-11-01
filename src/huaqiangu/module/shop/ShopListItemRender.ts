module junyou.hqg{
    export class ShopListItemRender extends sui.ListItemRenderer<ShopItemVO>{

        private $view:ShopItemView;

        private slot:GoodsItemSlot<ShopItemVO>;
        public constructor(){
            super();
        }

         protected bindComponent() {
             let view:ShopItemView = new ShopItemView();
             this.skin = view;
             this.$view = view;
             this.slot = GoodsItemSlot.getSlot(this.$view.slot);
             super.bindComponent();
         }


         public handleView(){
             super.handleView();
             this.testValue();
         }

         private testValue(){
             this.$view.goldTxt.text = "1000";
         }
    }
}