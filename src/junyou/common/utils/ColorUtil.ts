module junyou {
	/**
	 * 颜色工具
	 * @author 3tion
	 *
	 */
    export class ColorUtil {
        /**
         * 获取颜色字符串 #a1b2c3
         * @param c
         * @return 获取颜色字符串 #a1b2c3
         *
         */
        public static getColorString(c: number): string {
            return "#" + c.toString(16).zeroize(6);
        }

        /**
         * 将#a1b2c3这样#开头的颜色字符串，转换成颜色数值
         */
        public static getColorValue(c: string) {
            if (/#[0-9a-f]{6}/i.test(c)) {
                return +("0x" + c.substring(1));
            } else {
                ThrowError(`使用的颜色${c}有误`);
                return 0;
            }
        }
    }
}
