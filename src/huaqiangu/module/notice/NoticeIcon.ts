module junyou.message {
    export class NoticeIcon extends egret.Sprite {

        /**
         * 显示一个提示图标
         * 
         * param NoticeData
         * 
         * @static
         */
        public static SHOW_NOTICE_ICON = "SHOW_NOTICE_ICON";

        /**
         * 强行移除一个图标
         * param {module:moduleId}
         * 
         * @static
         */
        public static REMOVE_NOTICE_ICON = "REMOVE_NOTICE_ICON";

        public moduleId: number;

        protected type: number;

        protected icon: egret.Bitmap;

        protected iconArr: { [index: number]: string };

        protected dataList: NoticeData[];

        // protected showCount:number;

        protected dataChanged: boolean = false;

        public constructor() {
            super();
            this.registerIcon();
            this.touchEnabled = true;
            this.dataList = [];
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }


        protected registerIcon() {
            this.graphics.beginFill(0);
            this.graphics.drawRect(0, 0, 30, 30);
            this.graphics.endFill();
            //iconArr[moduleId]=url;
            this.iconArr = {};
            this.iconArr[0] = "111111";
        }

        protected touchTap(e: egret.TouchEvent) {
            let temp = this.dataList.shift();
            let type = temp.noticetype;
            temp.service.doSystemNotice(temp);
            //主动点击操作后清理相同类型的消息
            //譬如A向B发送了2条消息，那么2条消息就是2个NoticeData，一起存在dataList里
            //就像QQ聊天一样，打开窗口，肯定是2条消息全部显示出来
            //这边也是，堆积的历史消息，如果都是这种类型的，一下子显示出来后，dataList里的缓存就需要清理掉
            let list = this.dataList;
            let len = list.length;
            for (let i = 0; i < len; i++) {
                temp = list[i];
                if (temp.noticetype == type && temp.useonce) {
                    if (temp.autoHandler) {
                        // clearTimeout(temp.autoOutId);
                        Global.clearCallLater(this.autoHandler, this);
                        list.splice(i, 1);
                        len = list.length;
                        i = i - 1;
                    }
                }
            }
            // this.showCount = list.length;
            this.dataChanged = true;
            this.addRefreshListener();

        }

        /**
         * 添加一条系统提示数据
         * 
         * @param {NoticeData} data (description)
         */
        public pushData(data: NoticeData) {
            // this.showCount = 0;
            let list = this.dataList;
            if (!data.autoHandler) {
                Global.callLater(this.autoHandler, data.outtime, this, data);
            }
            if (list.indexOf(data) == -1) {
                list.push(data);
            }
            // this.showCount = list.length;
            this.dataChanged = true;
            this.moduleId = data.module;
            if (this.stage) {
                this.addRefreshListener();
            }
        }


        protected onAddToStage(e: egret.Event) {
            if (this.dataChanged) {
                this.addRefreshListener();
            }
        }

        protected addRefreshListener() {
            this.addEventListener(egret.Event.ENTER_FRAME, this.refreshView, this);
        }

        protected refreshView(e: egret.Event) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.refreshView, this);
            this.dataChanged = false;
            if (this.dataList.length > 0) {
                if (!this.icon) {
                    this.icon = new egret.Bitmap();
                    this.addChild(this.icon);
                }
                RES.getResByUrl(this.iconArr[this.dataList[0].module], this.imageLoaderHandler, this, RES.ResourceItem.TYPE_IMAGE);
            } else {
                //移除icon
                dispatch(NoticeIcon.REMOVE_NOTICE_ICON, { "module": this.moduleId });
            }

        }

        protected imageLoaderHandler(e: any) {
            let bmd: egret.Texture = <egret.Texture>e;
            this.icon.texture = null;
            this.icon.texture = bmd;
        }

        protected autoHandler(data: NoticeData) {
            // clearTimeout(data.autoOutId);
            Global.clearCallLater(this.autoHandler, this);
            if (data.autoHandler) {
                data.autoHandler();
            }
            this.dataList.remove(data);
            this.dataChanged = true;
            // this.showCount = this.dataList.length;
            this.addRefreshListener();
        }

        public dispose() {
            let list = this.dataList;
            let len = list.length;
            let temp: NoticeData;
            let flag = false;
            for (let i = 0; i < len; i++) {
                temp = list[i];
                temp.service = undefined;
                if (temp.autoHandler) {
                    flag = true;
                    temp.autoHandler = undefined;
                }
            }
            list.length = 0;
            if (flag) {
                Global.clearCallLater(this.autoHandler, this);
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }


}