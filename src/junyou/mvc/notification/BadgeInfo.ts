module junyou.mvc {
    /**
     * 角标信息
     * @author 3tion
     */
    export class BadgeInfo {
        /**
         * 
         * 模块标识
         * @type {string}
         */
        public mid: string;
        /**
         * 
         * 改变的消息
         * @type {any}  如果为null,0,"",false则不显示角标
         */
        public msg: any;
    }
}