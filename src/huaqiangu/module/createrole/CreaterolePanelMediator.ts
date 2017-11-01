module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-08-30 14:53:54
    */
    export class CreaterolePanelMediator extends mvc.Mediator {

        public $view: CreaterolePanel;

        private facade: mvc.Facade;
        /**
         * 2 女
         * 1 男
         * @private
         * @type {number}
         */
        private sex:number;

        private group:sui.Group;

        private nameLib:NameUtils;
        @d_dependProxy(ServiceName.LoginService)
        private loginService:LoginService;

        private img:sui.Image;

        constructor() {
            super(ModuleId.CreateRole);
        }

        protected init() {
            this.view = new CreaterolePanel;
            this.facade = mvc.Facade.getInstance();
            //这里加事件关注
        }

        protected afterAllReady(){
            this.img = new sui.Image();
            this.nameLib = new NameUtils();
            this.$view.randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rollNameHandle,this);
            this.$view.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createRole,this);
            this.group = new sui.Group();
            this.group.addItem(this.$view.manBtn);
            this.group.addItem(this.$view.womanBtn);
            this.group.addEventListener(sui.Group.CHANGE,this.groupChange,this);
            this.group.selectedIndex = 0;
            this.groupChange();
            this.$view.imgcon.addChild(this.img);
            mvc.Facade.addEventListener(LoginService.ENTER_GAME,this.createSuccess,this);
        }

        private createSuccess(e:egret.Event){
            this.facade.toggle(ModuleId.CreateRole);
        }

        private groupChange(e?:egret.Event){
            let index:number = this.group.selectedIndex;
            if(index){
                // this.$view.man.visible = false;
                // this.$view.woman.visible = true;
                this.img.source = "pbg/createrole/woman.png";
                this.sex = 2;
            }else{
                // this.$view.man.visible = true;
                // this.$view.woman.visible = false;
                this.img.source = "pbg/createrole/man.png";
                this.sex = 1;
            }
            this.rollNameHandle();
        }

        private rollNameHandle(e?:egret.TouchEvent){
            //从0开始，奇数是女的，偶数是男的
			let count:number=0;
            let name="先凑合用着";
			do
			{
				name=this.nameLib.getName(this.sex);
			} while (WordFilter.checkWord(name) && ++count < 1000);
			this.$view.nameTF.text=name;
        }

        private createRole(e:egret.TouchEvent){
            let str = this.$view.nameTF.text;
            let name = str.replace(/\s/g,"");
            if(name){
                this.loginService.createRole(<CreateRole_C2S>{name: name, sid: 1, cfgid: this.sex});
            }
        }

    }
}
