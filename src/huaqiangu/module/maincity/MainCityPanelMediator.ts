module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-27 17:24:06
    */
    export class MainCityPanelMediator extends mvc.Mediator {

        public $view: MainCityPanel;

        private spDic: { [index: string]: any };

        private moduleManager: mvc.ModuleManager;

        constructor() {
            super(ModuleId.MainCity);
        }

        protected init() {
            this.view = new MainCityPanel;
            this.spDic = {};
            //这里加事件关注
        }

        protected afterAllReady() {
            this.spDic["fuben"] = [this.$view.fuben, this.$view.fuben.y];
            this.spDic["boss"] = [this.$view.boss, this.$view.boss.y];
            this.spDic["suoyao"] = [this.$view.suoyao, this.$view.suoyao.y];
            this.spDic["jingji"] = [this.$view.jingji, this.$view.jingji.y];
            this.spDic["zhenying"] = [this.$view.zhenying, this.$view.zhenying.y];
            let mm = mvc.Facade.getInstance().moduleManager;
            this.moduleManager = mm;
            this.bindModules("fuben", mm, this.$view.fuben);
            this.bindModules("boss", mm, this.$view.boss);
            this.bindModules("suoyao", mm, this.$view.suoyao);
            this.bindModules("jingji", mm, this.$view.jingji);
            this.bindModules("zhenying", mm, this.$view.zhenying);
        }

        private bindModules(id: string, mm: mvc.ModuleManager, sp: egret.Sprite) {
            // mm.bindButton(id,sp);
            let btn = new egret.Sprite();
            btn.graphics.clear();
            btn.graphics.beginFill(0,0);
            btn.graphics.drawRect(0,0,sp.width,sp.height);
            btn.graphics.endFill();
            btn.x = sp.x;
            btn.y = sp.y;
            this.$view.addChild(btn);
            btn.touchEnabled = true;
            btn.name = id;
            // mm.bindButton(id,btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openModule,this);
        }

        private openModule(e:egret.Event){
            alert(e.target.name);
        }

        private doTween() {
            let dic = this.spDic
            for (let key in dic) {
                let arr = dic[key];
                let target = arr[0];
                let y = arr[1];
                let tween = Global.getTween(target, { loop: true });
                tween.to({ y: y - 10 }, 2000, Ease.quadOut).to({ y: y }, 2000, Ease.quadOut);
            }
        }

        private killTween() {
            let dic = this.spDic;
            for (let key in dic) {
                let arr = dic[key];
                let target = arr[0];
                Global._tweenManager.removeTweens(target);
                target.y = arr[1];
            }
        }

        public awake() {
            this.doTween();
        }

        public sleep() {
            this.killTween();
        }


    }
}
