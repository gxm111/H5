/**
 * 属性对象
 * @author 3tion
 */
module junyou.hqg {
    /**
     * 属性配置接口
     */
    export interface IXObject {
        /**
         * 最大生命
         * 生命
         */
        x1?: number;
        /**
         * 物理攻击
         * 物攻
         */
        x2?: number;
        /**
         * 物理防御
         * 物防
         */
        x3?: number;
        /**
         * 法术攻击
         * 法攻
         */
        x4?: number;
        /**
         * 法术防御
         * 法防
         */
        x5?: number;
        /**
         * 命中等级
         * 命中
         */
        x6?: number;
        /**
         * 闪避等级
         * 闪避
         */
        x7?: number;
        /**
         * 暴击等级
         * 暴击
         */
        x8?: number;
        /**
         * 韧性等级
         * 韧性
         */
        x9?: number;
        /**
         * 必杀等级
         * 必杀
         */
        x10?: number;
        /**
         * 无视防御
         * 穿透
         */
        x11?: number;
        /**
         * 身法等级
         * 身法
         */
        x12?: number;
    }

    /**
     * XObject
     * @author 3tion
     */
    export class XObject implements IXObject {

        /**
         * 最大生命
         * 基础生命
         */
        public static X1: string = "x1";

        /**
         * 物理攻击
         * 基础物攻
         */
        public static X2: string = "x2";

        /**
         * 物理防御
         * 基础物防
         */
        public static X3: string = "x3";

        /**
         * 法术攻击
         * 基础法攻
         */
        public static X4: string = "x4";

        /**
         * 法术防御
         * 基础法防
         */
        public static X5: string = "x5";

        /**
         * 命中等级
         * 基础命中
         */
        public static X6: string = "x6";

        /**
         * 闪避等级
         * 基础闪避
         */
        public static X7: string = "x7";

        /**
         * 暴击等级
         * 基础暴击
         */
        public static X8: string = "x8";

        /**
         * 韧性等级
         * 基础韧性
         */
        public static X9: string = "x9";

        /**
         * 必杀等级
         * 基础必杀
         */
        public static X10: string = "x10";

        /**
         * 无视防御
         * 基础穿透
         */
        public static X11: string = "x11";

        /**
         * 身法等级
         * 基础身法
         */
        public static X12: string = "x12";

        /**
         * 属性显示顺序
         */
        public static ORDER = [XObject.X1, XObject.X2, XObject.X3, XObject.X4, XObject.X5, XObject.X6, XObject.X7, XObject.X8, XObject.X9, XObject.X10, XObject.X11, XObject.X12];

        private static _fixedValueFunc = (() => {
            let dict: { [index: string]: { (key: string, xattr: IXObject | number): string } } = {};
            dict[XObject.X10] = XObject._percentAttributeFunc;
            dict[XObject.X11] = XObject._percentAttributeFunc;
            dict[XObject.X12] = XObject._percentAttributeFunc;
            return dict;
        })();

        /**
         * 数值被放大10000倍，按百分比显示的数值
         * 
         * @private
         * @static
         * @param {string} key (description)
         * @param {IXObject | number} xattr (description)
         * @returns (description)
         */
        private static _percentAttributeFunc(key: string, xattr: IXObject | number) {
            if (typeof xattr === "number") {
                return this.format(xattr * .01) + "%";
            } else {
                return this.format(+xattr[key] * .01) + "%";
            }
        }

        private static format(value: number) {
            if (~~value === value) {
                return "" + value;
            } else {
                return (<number>value).toFixed(2);
            }
        }

        /**
         * 获取处理好的属性字符串
         * 
         * @static
         * @param {string} key  属性的key
         * @param {*} xattr     属性集
         * @returns {string}    处理好的属性字符串
         */
        public static getFixedValue(key: string, xattr: IXObject | number) {
            let f = this._fixedValueFunc[key];
            if (f) {
                return f(key, xattr);
            } else if (typeof xattr === "number") {
                return "" + parseInt(xattr);
            } else {
                return this.format(xattr[key]);
            }
        }

        /**
         * 将属性解析为字符串
         * 
         * @static
         * @param {IXObject} xattr   属性数据
         * @param {string} [template="{0} + {1}"]       属性显示的模板
         * @param {string} [ret="<br/>"]                换行符
         * @returns 属性字符串
         */
        public static parseXattr2String(xattr: IXObject, template: string = "{0} + {1}", ret: string = "<br/>") {
            let str = "";
            for (let key of this.ORDER) {
                if (xattr[key]) {
                    str += template.substitute(LangUtil.getMsg(key), this.getFixedValue(key, xattr)) + ret;
                }
            }
            return str;
        }

        /**
         * 使用外调方法，将属性解析为字符串
         * 
         * @static
         * @param {IXObject} xattr                           属性数据
         * @param {{ (xattr: any, key: string, args: any[]): string }} forEach  外调遍历函数
         * @param args                                                          遍历的其他参数
         * @returns {String} (description)
         */
        public static parseXattr2String2(xattr: IXObject, forEach: { (xattr: any, key: string, args?: any[]): string }, ...args): String {
            var str: String = "";
            for (let key of this.ORDER) {
                if (xattr[key]) {
                    str += forEach(xattr, key, args);
                }
            }
            return str;
        }

        /**
         * 
         * 重置数据
         * @static
         * @param {IXObject} obj
         */
        public static reset(obj: IXObject) {
            for (let key of XObject.ORDER) {
                if (key in obj) {
                    obj[key] = 0;
                }
            }
        }


        /**
         * 遍历处理属性
         * 
         * @static
         * @param {IXObject} xattr                                      属性数据
         * @param {{ (xattr: any, key: string, args: any[]) }} forEach  外调遍历函数
         * @param args                                                  遍历的其他参数
         */
        public static parseXattr(xattr: IXObject, forEach: { (xattr: IXObject, key: string, args?: any[]) }, thisObj?: any, ...args) {
            for (let key of this.ORDER) {
                if (xattr[key]) {
                    forEach.call(thisObj, xattr, key, args);
                }
            }
        }

        // /**
        //  * 最大生命
        //  **/
        // private _x1: number;
        // /**
        // * 物理攻击
        // **/
        // private _x2: number;
        // /**
        // * 物理防御
        // **/
        // private _x3: number;
        // /**
        // * 法术攻击
        // **/
        // private _x4: number;
        // /**
        // * 法术防御
        // **/
        // private _x5: number;
        // /**
        // * 命中等级
        // **/
        // private _x6: number;
        // /**
        // * 闪避等级
        // **/
        // private _x7: number;
        // /**
        // * 暴击等级
        // **/
        // private _x8: number;
        // /**
        // * 韧性等级
        // **/
        // private _x9: number;
        // /**
        // * 必杀等级
        // **/
        // private _x10: number;
        // /**
        // * 无视防御
        // **/
        // private _x11: number;
        // /**
        // * 身法等级
        // **/
        // private _x12: number;

        // /**
        // * 最大生命
        // **/
        // public get x1(): number { return this._x1 || 0; }
        // /**
        // * 物理攻击
        // **/
        // public get x2(): number { return this._x2 || 0; }
        // /**
        // * 物理防御
        // **/
        // public get x3(): number { return this._x3 || 0; }
        // /**
        // * 法术攻击
        // **/
        // public get x4(): number { return this._x4 || 0; }
        // /**
        // * 法术防御
        // **/
        // public get x5(): number { return this._x5 || 0; }
        // /**
        // * 命中等级
        // **/
        // public get x6(): number { return this._x6 || 0; }
        // /**
        // * 闪避等级
        // **/
        // public get x7(): number { return this._x7 || 0; }
        // /**
        // * 暴击等级
        // **/
        // public get x8(): number { return this._x8 || 0; }
        // /**
        // * 韧性等级
        // **/
        // public get x9(): number { return this._x9 || 0; }
        // /**
        // * 必杀等级
        // **/
        // public get x10(): number { return this._x10 || 0; }
        // /**
        // * 无视防御
        // **/
        // public get x11(): number { return this._x11 || 0; }
        // /**
        // * 身法等级
        // **/
        // public get x12(): number { return this._x12 || 0; }

        // /**
        // * 最大生命
        // **/
        // public set x1(value: number) { this._x1 = value; }
        // /**
        // * 物理攻击
        // **/
        // public set x2(value: number) { this._x2 = value; }
        // /**
        // * 物理防御
        // **/
        // public set x3(value: number) { this._x3 = value; }
        // /**
        // * 法术攻击
        // **/
        // public set x4(value: number) { this._x4 = value; }
        // /**
        // * 法术防御
        // **/
        // public set x5(value: number) { this._x5 = value; }
        // /**
        // * 命中等级
        // **/
        // public set x6(value: number) { this._x6 = value; }
        // /**
        // * 闪避等级
        // **/
        // public set x7(value: number) { this._x7 = value; }
        // /**
        // * 暴击等级
        // **/
        // public set x8(value: number) { this._x8 = value; }
        // /**
        // * 韧性等级
        // **/
        // public set x9(value: number) { this._x9 = value; }
        // /**
        // * 必杀等级
        // **/
        // public set x10(value: number) { this._x10 = value; }
        // /**
        // * 无视防御
        // **/
        // public set x11(value: number) { this._x11 = value; }
        // /**
        // * 身法等级
        // **/
        // public set x12(value: number) { this._x12 = value; }
        // /**
        //  * 解析xattr属性
        //  * http://192.168.0.205:1234/h5Tools/ProtoTools/issues/1
        //  * @param {any[]} datas
        //  * @param {string[]} keys
        //  */
        // public decode(datas: any[], keys: string[]) {
        //     for (let i = 0, len = keys.length; i < len; i++) {
        //         let key = keys[i];
        //         let value = +datas[i];
        //         if (value != 0) {
        //             this["_" + key] = value;
        //         }
        //     }
        // }
    }
}
