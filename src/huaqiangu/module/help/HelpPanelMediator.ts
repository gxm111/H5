module junyou.hqg {
    /**
    * 由导出工具生成
    * https://github.com/eos3tion/ExportUIFromFlash
    * 生成时间：2016-09-29 10:37:32
    */
    export class HelpPanelMediator extends mvc.Mediator {

        public static SET_DATA: string = "setData";

        public $view: HelpPanel;

        private moduleId: string;

        constructor() {
            super(ModuleId.Help);
        }

        protected init() {
            this.view = new HelpPanel;

            //这里加事件关注
        }

        public setData(...arg) {
            this.moduleId = arg[1][0];
            this.$view.txt.text = LangUtil.getMsg(this.moduleId);
        }

        protected afterAllReady() {
            let view = this.$view;
            view.isModal = true;
        }
    }
}
