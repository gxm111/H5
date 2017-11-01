module junyou.mvc {
    /**
     * 通知管理器
     * @author 3tion
     */
    export class NotificationManager {
        /**
         * 
         * 通知变更
         * @static
         * @type {string}
         */
        public static Notification: string = "Notification";
        private _dict: { [index: string]: NotifyBin };
        private _listen: { [index: string]: BadgeInfo[] };
        private _badges: { [index: string]: BadgeInfo };
        private _list: NotifyBin[];
        private _needSort: boolean;

        constructor() {
            this._dict = {};
            this._listen = {};
            this._badges = {};
            this._list = [];
        }

        /**
         * 
         * 绑定检查器和标识
         * 不是所有的标识都需要绑定检查器
         * 可以只需要绑定关注对象
         * 比如父级面板，全部都是按钮，依赖于子模块的检查
         * 可以不注册
         * @param {INCheck} service
         * @param {string} mid          主标识
         * @param {number} [proirity=0] 执行优先级
         */
        public bind(service: INCheck, mid: string, proirity: number = 0) {
            let bin = this._dict[mid];
            if (!bin) {
                bin = new NotifyBin();
                bin.service = service;
                bin.id = mid;
                bin.proirity = proirity;
                bin.needCheck = false;
                this.bindListner(mid, mid);
                this._list.push(bin);
                this._needSort = true;
            }
        }

        /**
         * 
         * 绑定关注对象
         * @param {string} mid  主标识
         * @param {string} lid  关注的标识
         */
        public bindListner(mid: string, lid: string) {
            let b = this._badges[mid];
            if (!b) {
                this._badges[mid] = b = new BadgeInfo();
                b.mid = mid;
            }
            let arr = this._listen[lid];
            if (!arr) {
                this._listen[lid] = arr = [];
                arr.push(b);
            } else {
                arr.pushOnce(b);
            }
            this._listen[lid] = arr;
        }

        /**
         * 
         * 需要检查
         * @param {string} id
         */
        public needCheck(id: string) {
            let bin = this._dict[id];
            bin.needCheck = true;
            //下一帧进行检查
            Global.callLater(this.check, 0, this);
        }

        /**
         * 检查
         */
        public check() {
            if (this._needSort) {//需要重新排序
                this._list.sort((a, b) => b.proirity - a.proirity);
                this._needSort = false;
            }
            let listen = this._listen;
            let changed: BadgeInfo[] = [];
            for (let bin of this._list) {
                if (bin.needCheck) {
                    let service = bin.service;
                    let msg = service.ncheck();
                    let larr = listen[bin.id];
                    if (larr) {
                        for (let b of larr) {
                            if (~changed.indexOf(b) && msg != b.msg) {
                                b.msg = msg;//记录高优先级的消息
                                changed.pushOnce(b);
                            }
                        }
                    }
                    //已经检查过
                    bin.needCheck = false;
                }
            }

            if (Facade.hasEventListener(NotificationManager.Notification)) { //用于处理角标
                for (let b of changed) {
                    dispatch(NotificationManager.Notification, b);
                }
            }
        }
    }

    class NotifyBin {

        /**
         * 
         * 执行优先级
         * @type {number}
         */
        public proirity: number;

        public service: INCheck;
        /**
         * 
         * 标识
         * @type {string}
         */
        public id: string;

        /**
         * 
         * 需要发生改变
         * @type {boolean}
         */
        public needCheck: boolean;
        constructor() {

        }
    }
}
