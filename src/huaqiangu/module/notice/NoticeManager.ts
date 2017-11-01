module junyou.message {

    /**
     * @ author gushuai
     * 
     * 系统小图标提示管理类
     * 
     * @export
     * @class NoticeManager
     */
    export class NoticeManager {

        private static _instance: NoticeManager;

        private con: egret.DisplayObjectContainer;

        private iconArr: NoticeIcon[];

        private messageChange: boolean;

        private facade: junyou.mvc.Facade;

        private skillCon: egret.DisplayObjectContainer;

        private skillDataChange: boolean;

        private skillIconArr: SkillNoticeIcon[];

        private skillShowCount: number;

        public constructor() {
            this.iconArr = [];
            this.skillIconArr = [];
            this.facade = junyou.mvc.Facade.getInstance();
            this.facade.addEventListener(NoticeIcon.SHOW_NOTICE_ICON, this.showNoticeIcon, this);
            this.facade.addEventListener(NoticeIcon.REMOVE_NOTICE_ICON, this.removeIcon, this);
            this.facade.addEventListener(SkillNoticeIcon.SHOW_NOTICE_ICON, this.showSkillIcon, this);
            this.facade.addEventListener(SkillNoticeIcon.REMOVE_NOTICE_ICON, this.removeSkillIcon, this);
            this.facade.addEventListener(SkillNoticeIcon.SHORT_HIDE_SKILL_ICON, this.shortHideSkill, this);
            this.facade.addEventListener(SkillNoticeIcon.RE_SHOW_ICON, this.reshowSkill, this);
        }

        public static get instance(): NoticeManager {
            if (!this._instance) {
                this._instance = new NoticeManager();
            }
            return this._instance;
        }

        /**
         * 右侧提示信息的容器
         * 
         * @param {egret.DisplayObjectContainer} con (description)
         */
        public initRightMessageContainer(con: egret.DisplayObjectContainer) {
            this.con = con;
        }

        /**
         * 技能图标的显示容器和最大显示数目
         * 
         * @param {egret.DisplayObjectContainer} con (description)
         * @param {number} showCount (description)
         */
        public initSkillIconCon(con: egret.DisplayObjectContainer, showCount: number) {
            this.skillCon = con;
            this.skillShowCount = showCount;
        }

        private showNoticeIcon(e: egret.Event) {
            let data = <NoticeData>e.data;
            let bool: boolean = false;
            let len = this.iconArr.length;
            let icon: NoticeIcon;
            for (let i = 0; i < len; i++) {
                icon = this.iconArr[i];
                if (icon.moduleId == data.module) {
                    bool = true;
                    break;
                }
            }
            if (!bool) {
                icon = new NoticeIcon();
                this.iconArr.push(icon);
            }
            icon.pushData(data);
            if (!this.messageChange) {
                this.messageChange = true;
                this.con.addEventListener(egret.Event.ENTER_FRAME, this.refreshMessage, this);
            }

        }

        private removeIcon(e: egret.Event) {
            let id = e.data.module;
            let len = this.iconArr.length;
            let icon;
            for (let i = 0; i < len; i++) {
                icon = this.iconArr[i];
                if (icon.moduleId == id) {
                    this.iconArr.splice(i, 1);
                    break;
                }
            }
            if (icon) {
                icon.parent.removeChild(icon);
                icon.dispose();
            }
            this.con.addEventListener(egret.Event.ENTER_FRAME, this.refreshMessage, this);
        }

        private refreshMessage(e: egret.Event) {
            this.messageChange = false;
            this.con.removeEventListener(egret.Event.ENTER_FRAME, this.refreshMessage, this);
            let len = this.iconArr.length;
            let icon: NoticeIcon;
            for (let i = 0; i < len; i++) {
                icon = this.iconArr[i];
                if (icon && !icon.parent) {
                    icon.y = this.con.height + 3;
                    this.con.addChild(icon);
                }
            }

            this.reLayOut();
        }

        private reLayOut(e?: egret.Event) {
            if (e) {
                this.con.removeEventListener(egret.Event.ADDED_TO_STAGE, this.reLayOut, this);
            }
            if (this.con.stage) {
                this.con.x = this.con.stage.stageWidth - this.con.width;
                this.con.y = (this.con.stage.stageHeight - this.con.height) >> 1;
            } else {
                this.con.addEventListener(egret.Event.ADDED_TO_STAGE, this.reLayOut, this);
            }
        }

        private showSkillIcon(e: egret.Event) {
            let data = <NoticeData>e.data;
            let icon = new SkillNoticeIcon();
            this.skillIconArr.push(icon);
            icon.addEventListener(SkillNoticeIcon.RE_LAY_OUT, this.reSortSkill, this);
            icon.pushData(data);
            if (!this.skillDataChange) {
                this.skillDataChange = true;
                this.skillCon.addEventListener(egret.Event.ENTER_FRAME, this.refreshSkillIcon, this);
            }
        }

        private reSortSkill(e: egret.Event) {
            this.skillCon.addEventListener(egret.Event.ENTER_FRAME, this.refreshSkillIcon, this);
        }


        private shortHideSkill(e: egret.Event) {
            let data = e.data;
            this.hideOrShowSkill(data, false);
        }


        private reshowSkill(e: egret.Event) {
            let data = e.data;
            this.hideOrShowSkill(data, true);
        }

        private hideOrShowSkill(data: any, show: boolean) {
            let len = data.length;
            let alen = this.skillIconArr.length;
            let id;
            let tempdata;
            let icon: SkillNoticeIcon;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < alen; j++) {
                    id = data[i];
                    icon = this.skillIconArr[j];
                    tempdata = icon.data.noticedata;
                    if (id == tempdata.id && icon.parent) {
                        if (show) {
                            icon.reshow();
                        } else {
                            icon.shortHide();
                        }
                    }
                }
            }
        }

        private removeSkillIcon(e: egret.Event) {
            let data = e.data.data;
            let len = this.skillIconArr.length;
            let icon: SkillNoticeIcon
            for (let i = 0; i < len; i++) {
                icon = this.skillIconArr[i];
                if (icon.data == data && icon.parent) {
                    icon.parent.removeChild(icon);
                    icon.dispose();
                    this.skillIconArr.splice(i, 1);
                    break;
                }
            }
            this.skillCon.addEventListener(egret.Event.ENTER_FRAME, this.refreshSkillIcon, this);
        }



        /**
         * 刷新技能图标坐标
         * 
         * @private
         * @param {egret.Event} [e] (description)
         */
        private refreshSkillIcon(e?: egret.Event) {
            this.skillDataChange = false;
            if (e) {
                this.skillCon.removeEventListener(egret.Event.ENTER_FRAME, this.refreshSkillIcon, this);
            }
            let len = this.skillIconArr.length;
            len = Math.min(len, this.skillShowCount);
            let icon: SkillNoticeIcon;
            let ox = 0;
            for (let i = 0; i < len; i++) {
                icon = this.skillIconArr[i];
                if (icon && !icon.parent) {
                    if (icon.visible) {
                        icon.x = ox;
                        ox += icon.width + 10;
                    }
                    this.skillCon.addChild(icon);
                }
            }
            this.layOutSkill();
        }

        /**
         * 居中技能容器
         * 
         * @private
         * @param {egret.Event} [e] 
         */
        private layOutSkill(e?: egret.Event) {
            if (e) {
                this.skillCon.removeEventListener(egret.Event.ADDED_TO_STAGE, this.layOutSkill, this);
            }

            if (this.skillCon.stage) {
                this.skillCon.addEventListener(egret.Event.ENTER_FRAME, this.trueLaySkill, this);
            } else {
                this.skillCon.addEventListener(egret.Event.ADDED_TO_STAGE, this.layOutSkill, this);
            }
        }

        private trueLaySkill(e: egret.Event) {
            this.skillCon.removeEventListener(egret.Event.ENTER_FRAME, this.trueLaySkill, this);
            this.skillCon.x = (this.skillCon.stage.stageWidth - this.skillCon.width) >> 1;
            // console.log(this.skillCon.width+","+this.skillCon.stage.stageWidth);
            this.skillCon.y = this.skillCon.stage.stageHeight - this.skillCon.height - 150;
        }
    }

}