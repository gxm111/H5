module junyou.hqg{
    
    /**
     * @author gushuai
     * (description)
     * 
     * @export
     * @class SkillItemMenuRender
     * @extends {sui.MenuBaseRender<sui.MenuBaseVO>}
     */
    export class SkillItemMenuRender extends sui.MenuBaseRender<sui.MenuBaseVO>{

        private manager:sui.SuiResManager;

        private btn:sui.Button;

        public constructor(){
            super();
        }

        protected initUI(){
            this.manager = sui.SuiResManager.getInstance();
            let btn:sui.Button = <sui.Button>this.manager.createDisplayObject("lib","ui.btn.MenuBtn");
            this.addChild(btn);
            this.btn = btn;
        }

        public setData(val:sui.MenuBaseVO){
            super.setData(val);
            this.btn.label = val.label;
        }
    }
}