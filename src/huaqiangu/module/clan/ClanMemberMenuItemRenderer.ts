module junyou.hqg{
    
    export class ClanMemberMenuItemRenderer extends sui.MenuBaseRender<sui.MenuBaseVO>{

        manager:sui.SuiResManager;
        btn:sui.Button;

        public constructor(){
            super();
        }

        protected initUI(){
            this.manager = sui.SuiResManager.getInstance();
            let btn:sui.Button = <sui.Button>this.manager.createDisplayObject("lib","ui.btn.MenuBtn");
            this.btn = btn;
            this.addChild(btn);
        }

        public setData(val:sui.MenuBaseVO){
            super.setData(val);
            this.btn.label = val.label;
        }
    }
}