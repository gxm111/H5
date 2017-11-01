module junyou.message {
    export class SkillNoticeIcon extends NoticeIcon {
        /**
         * 显示一个提示图标
         * 
         * param NoticeData
         * 
         * @static
         */
        public static SHOW_NOTICE_ICON = "SHOW_SKILL_NOTICE_ICON";

        /**
         * 强行移除一个图标
         * param {data:NoticeData}
         * 
         * @static
         */
        public static REMOVE_NOTICE_ICON = "REMOVE_SKILL_NOTICE_ICON";

        /**
     * 暂时性隐藏部分技能图标
     * evt.data [skillid,skillid]
     * 
     * @static
     * @type {string}
     */
        public static SHORT_HIDE_SKILL_ICON: string = "SHORT_HIDE_SKILL_ICON";


        /**
         * 重新显示隐藏的图标
         * evt.data [skillid,skillid]
         * @static
         * @type {string}
         */
        public static RE_SHOW_ICON: string = "RE_SHOW_ICON";


        public static RE_LAY_OUT: string = "RE_LAY_OUT";

        // private slot: sui.CountableSlot<any>;

        public constructor() {
            super();
        }

        protected registerIcon() {
            this.drawRect();
            this.iconArr = {};
            //根据技能id注册icon的url
            // this.iconArr[id]=url;
        }

        public get data() {
            if (this.dataList.length < 1) {
                return;
            }
            return this.dataList[0];
        }

        private drawRect() {
            this.graphics.clear();
            // this.graphics.lineStyle(1,0xff0000);
            this.graphics.beginFill(0, 0);
            this.graphics.drawRect(0, 0, 82, 82);
            this.graphics.endFill();
            // this.slot = new sui.CountableSlot<any>()
            // this.slot.initContainer(this);
            //    this.slot.addedToContainer(this);
            // this.slot.skinlib = "lib";
            // this.slot.skinClass = "bmd.slotbg.SkillSlotBg";
            // this.slot.countShow = 1;
            // this.slot.count = 10;
        }

        protected touchTap(e: egret.TouchEvent) {
            this.doFireSkill();
        }

        protected refreshView(e: egret.Event) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.refreshView, this);
            this.dataChanged = false;
            if (!this.icon) {
                this.icon = new egret.Bitmap();
                this.addChild(this.icon);
            }
            // this.slot.handleView();
            // RES.getResByUrl(this.iconArr[this.data.noticedata.id],this.imageLoaderHandler,this,RES.ResourceItem.TYPE_IMAGE); 
        }


        protected autoHandler(args: NoticeData) {
            // let data = <NoticeData>args[0];
            Global.clearCallLater(this.autoHandler, this);
            // if(data.autoHandler!=null){
            //     data.autoHandler();
            // }
            this.doFireSkill();
        }


        private doFireSkill() {
            let temp: NoticeData = this.data;
            temp.service.doSystemNotice(temp);
            dispatch(SkillNoticeIcon.REMOVE_NOTICE_ICON, { data: this.data });
        }

        /**
         * 短时间隐藏
         * (description)
         */
        public shortHide() {
            let data = this.data;
            if (data.autoHandler) {
                Global.clearCallLater(this.autoHandler, this);
            }
            this.visible = false;
            this.dispatchEvent(new egret.Event(SkillNoticeIcon.RE_LAY_OUT));
        }


        /**
         * 如果调用过shortHide方法，需要再显示，调用此方法
         */
        public reshow() {
            this.visible = true;
            let data = this.data;
            if (data.autoHandler != null) {
                Global.callLater(this.autoHandler, data.outtime, this, [data]);
            }
            this.dispatchEvent(new egret.Event(SkillNoticeIcon.RE_LAY_OUT));
        }
    }
}