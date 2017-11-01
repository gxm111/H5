module junyou.hqg {

    /**
     * author gushuai
     * 
     * @export
     * @class WareEquipListRender
     * @extends {sui.ListItemRenderer}
     */
    export class WearEquipListRender extends sui.ListItemRenderer<ItemVO<ZhuangBeiCfg>> {

        private view: EquipRenderView;

        private vo: ItemVO<ZhuangBeiCfg>;

        private equSlot:EquipSlot<EquVO>;

        private itemService:ItemsService;

        private herovo:HeroVO;
        public constructor() {
            super();
        }

        protected bindComponent() {
            mvc.Facade.getInstance().getProxy(ServiceName.ItemsService,(service:ItemsService)=>{
                this.itemService = service;
            },this);
            this.herovo = Core.$hero;
            let render = new EquipRenderView();
            this.skin = render;
            this.view = render;
            this.view.equipBtn.addChild(this.view.zb);
            this.view.zb.x = 24;
            this.view.zb.y = 5;
            this.view.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipthis, this);
            this.equSlot = EquipSlot.getSlot(this.view.slot);
            super.bindComponent();
        }

        private equipthis(e: egret.TouchEvent) {
            if(ClientCheck.isClientCheck){
                let herovo = this.herovo;
                let cfg = this.vo.cfg;
                if(herovo.level<cfg.minlevel){
                    return;
                }
            }
            let dress:Dress_C2S = <Dress_C2S>{};
            dress.id = this.vo.id;
            dress.slot = 1;
            this.itemService.dress(dress);
        }

        public setData(value: any) {
            super.setData(value);
            this._data = value;
            this.vo = value;
        }

        public handleView() {
            super.handleView();
            if (!this.vo) return;
            let cfg:ZhuangBeiCfg = this.vo.cfg;
            if (this.vo.slot == 1) {
                this.view.equipBtn.visible = false;
                this.view.inuse.visible = true;
                this.view.usebg.visible = true;
                this.view.nousebg.visible = false;
               
                
            } else if (this.vo.slot == 0) {
                this.view.equipBtn.visible = true;
                this.view.inuse.visible = false;
                this.view.usebg.visible = false;
                this.view.nousebg.visible = true;
            }
            if(cfg){
                this.view.nameTF.setHtmlText("<font color='#ff0000'>"+cfg.name+"</font>");
                this.view.lvTF.text = "Lv."+cfg.minlevel;
            }
            this.equSlot.setData(this.vo);
            
            this.view.scoreTF.text = "评分：前端数据";
            this.view.xattrTF.lineSpacing = 5;
            // this.view.xattrTF.setHtmlText("<font color='#00ff00'>生命：998</font>\t\t<font color='#ffff00'>攻击：998</font>\n<font color='#ff0000'>防御：998</font>")
        }
    }
}