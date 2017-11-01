module junyou.message {
    export class NoticeData {

        public static SHOW_NOTICE_ICON: string = "SHOW_NOTICE_ICON";

        public static REMOVE_NOTICE_ICON: string = "REMOVE_NOTICE_ICON";

        /**
         * 模块
         * 
         * @type {number}
         */
        public module: number;

        /**
         * 消息类型
         * 
         * @type {number}
         */
        public noticetype: number;

        /**
         * 消息数据
         * 
         * @type {*}
         */
        public noticedata: any;

        /**
         * 超时自动处理时间
         * 
         * @type {number}
         */
        public outtime: number;


        /**
         * 消息处理类
         * 
         * @type {INotice}
         */
        public service: INotice;

        /**
         * 有些类型的消息提示，可能点击小图标之后不需要立即隐藏，设为false，默认为true
         * 
         * @type {boolean}
         */
        public useonce: boolean = true;


        /**
         * 超时自动处理函数
         * 
         * @type {{ (): void }}
         */
        public autoHandler: { (): void };

        /**
         * 超时函数索引
         * 
         * @type {number}
         */
        public autoOutId: number;

        public constructor() {

        }
    }
}