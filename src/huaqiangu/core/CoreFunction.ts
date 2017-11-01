module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class CoreFunction {
        public static systemTips: sui.SystemTips;

        constructor() {

        }

        public static notEnoughGold(errorMsg?: string) {
            // TODO
            alert("元宝不足");
        }

        public static notEnoughMoney(errorMsg?: string) {
            // TODO
            alert("游戏币不足");
        }

        /**
         * 
         * 用于显示客户端判断的提示
         * @static
         * @param {(string | number)} code
         * @param {any} args
         */
        public static showClientTips(code: string | number, ...args) {
            if (this.systemTips) {
                this.systemTips.showClient(LangUtil.getMsg(code, ...args));
            }
        }

        /**
         * 
         * 用于显示服务端判断的提示
         * @static
         * @param {(string | number)} code
         * @param {any} args
         */
        public static showServerTips(code: string | number, ...args) {
            if (this.systemTips) {
                this.systemTips.showServer(LangUtil.getMsg(code, ...args));
            }
        }

        /**
         * 
         * 
         * @static
         * @param {number} time1    要比较的时间
         * @param {number} time2    之前的时间
         * @returns {string}        和time1比，time2得到的字符串
         * 
         * @memberOf CoreFunction
         */
        public static betweenTime(time1: number, time2: number): string {
            var n = time1 - time2;
            if (n > 1209600000) {//超过2周
                return DateUtils.getFormatTime(time2, LangUtil.getMsg("$_shortdate"));
            } else if (n > 604800000) {//1周 ~ 2周
                return LangUtil.getMsg("$_1week");
            } else if (n > 86400000) {//1天 ~ 1周
                return LangUtil.getMsg("$_ndays", n / 86400000 >> 0);
            } else if (n > 3600000) {//1小时~1天
                return LangUtil.getMsg("$_nhours", n / 3600000 >> 0);
            } else if (n > 120000) {//2分钟~1小时
                return LangUtil.getMsg("$_nminutes", n / 60000 >> 0);
            } else {//2分钟以内
                return LangUtil.getMsg("$_justnow");
            }
        }
    }
}