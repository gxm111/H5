declare function parseInt(s: number, radix?: number): number;

/**
 * 对数字进行补0操作
 * @param value 要补0的数值
 * @param length 要补的总长度
 * @return 补0之后的字符串
 */
function zeroize(value: number | string, length: number = 2): string {
    let str = "" + value;
    let zeros = "";
    for (let i = 0, len = length - str.length; i < len; i++) {
        zeros += "0";
    }
    return zeros + str;
}
/****************************************扩展Object****************************************/
interface Object {
    /**
     * 将数据拷贝到 to
     * @param to 目标
     */
    copyto(to: Object);
    /**
     * 获取指定属性的描述，会查找当前数据和原型数据
     * @param property 指定的属性名字
     */
    getPropertyDescriptor(property: string): PropertyDescriptor;
}

Object.defineProperties(Object.prototype, {
    getPropertyDescriptor: {
        value: function (property: string): any {
            var data = Object.getOwnPropertyDescriptor(this, property);
            if (data) {
                return data;
            }
            var prototype = Object.getPrototypeOf(this);
            if (prototype) {
                return prototype.getPropertyDescriptor(property);
            }
            return;
        },
        enumerable: false
    },
    copyto: {
        value: function (to: Function) {
            for (let p in this) {
                if (!(p in to)) { // 本身没有这个属性
                    to[p] = this[p];
                } else {
                    var data: PropertyDescriptor = to.getPropertyDescriptor(p);
                    if (data && data.set) {// 可进行赋值
                        to[p] = this[p];
                    }
                }
            }
        },
        enumerable: false
    }
});
interface Function {

    /**
     * 检查当前类型是否是测试的类型的子类
     * 
     * @param {Function} testBase
     * @returns {boolean}
     * 
     * @memberOf Object
     */
    isSubClass(testBase: Function): boolean;
}
Object.defineProperties(Function.prototype, {
    isSubClass: {
        value: function (testBase: Function) {
            if (typeof testBase !== "function") {
                return false;
            }
            let base = this.prototype;
            let flag = false;
            while (base !== null && base !== Object) {
                if (base === testBase) {
                    flag = true;
                    break;
                }
                base = base.prototype;
            }
            return true;
        },
        enumerable: false
    }
});

/****************************************扩展Math****************************************/
interface Math {
    /**
     * 让数值处于指定的最大值和最小值之间，低于最小值取最小值，高于最大值取最大值
     * @param value 要处理的数值
     * @param min   最小值
     * @param max   最大值
     */
    clamp(value: number, min: number, max: number): number;

    /**
     * 从最小值到最大值之间随机[min,max)
     */
    random2(min: number, max: number): number;

    /**
     * 角度转弧度的乘数
     */
    RAD_TO_DEG: number;
    /**
     * 整圆的弧度
     */
    PI2: number;
}
Math.RAD_TO_DEG = 180 / Math.PI;

Math.PI2 = 2 * Math.PI;

Math.clamp = (value, min, max) => {
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    return value;
}

Math.random2 = (min, max) => {
    return min + Math.random() * (max - min);
}

/****************************************扩展Number********************************************/
interface Number {
    /**
     * 对数字进行补0操作
     * @param length 要补的总长度
     * @return 补0之后的字符串
     */
    zeroize(length: number): string;
}

Object.defineProperties(Number.prototype, {
    zeroize: {
        value: function (length) { return zeroize(this, length) },
        enumerable: false
    }
});

/****************************************扩展String****************************************/
interface String {
    /**
     * 替换字符串中{0}{1}{2}{a} {b}这样的数据，用obj对应key替换，或者是数组中对应key的数据替换
     */
    substitute(...args): string;
    substitute(args: any[]): string;
    /**
     * 对数字进行补0操作
     * @param length 要补的总长度
     * @return 补0之后的字符串
     */
    zeroize(length: number): string;
    /**
     * 将一个字符串转换成一个很小几率重复的数值<br/>
     * <font color="#ff0000">此方法hash的字符串并不一定唯一，慎用</font>
     */
    hash(): number;
}


Object.defineProperties(String.prototype, {
    zeroize: {
        value: function (length) { return zeroize(this, length) },
        enumerable: false
    },
    substitute: {
        value: function (args) {
            var len = arguments.length;
            if (len > 0) {
                var obj;
                if (len == 1) {
                    obj = arguments[0];
                    if (typeof obj !== "object") {
                        obj = arguments;
                    }
                } else {
                    obj = arguments;
                }

                if ((obj instanceof Object) && !(obj instanceof RegExp)) {
                    return this.replace(/\{([^{}]+)\}/g, function (match, key) {
                        var value = obj[key];
                        return (value !== undefined) ? '' + value : '';
                    });
                }
            }
            return this;
        },
        enumerable: false
    },
    hash: {
        value: function () {
            var len = this.length;
            var hval = 0;
            var hash = 5381;
            for (var i = 0; i < len; i++) {
                hash += (hash << 5) + this.charCodeAt(i);
            }
            return hash & 0x7fffffff;
        },
        enumerable: false
    }
});
interface StringConstructor {
    /**
     * 对数字进行补0操作
     * @param value 要补0的数值
     * @param length 要补的总长度
     * @return 补0之后的字符串
     */
    zeroize: (value: number, length: number) => string;

}

String.zeroize = zeroize;

/****************************************扩展Date****************************************/


interface Date {

    /**
     * 格式化日期
     * 
     * @param {string} mask 时间字符串
     * @param {boolean} [local] 是否基于本地时间显示，目前项目，除了报错信息，其他时间都用UTC时间显示
     * @returns {string} 格式化后的时间
     */
    format(mask: string, local?: boolean): string;
}

Object.defineProperties(Date.prototype, {
    format: {
        value: function (mask, local?: boolean) {
            let d: Date = this;
            return mask.replace(/"[^"]*"|'[^']*'|(?:d{1,2}|m{1,2}|yy(?:yy)?|([hHMs])\1?)/g, function ($0) {
                switch ($0) {
                    case "d": return gd();
                    case "dd": return zeroize(gd());
                    case "M": return gM() + 1;
                    case "MM": return zeroize(gM() + 1);
                    case "yy": return String(gy()).substr(2);
                    case "yyyy": return gy();
                    case "h": return gH() % 12 || 12;
                    case "hh": return zeroize(gH() % 12 || 12);
                    case "H": return gH();
                    case "HH": return zeroize(gH());
                    case "m": return gm();
                    case "mm": return zeroize(gm());
                    case "s": return gs();
                    case "ss": return zeroize(gs());
                    default: return $0.substr(1, $0.length - 2);
                }
            });
            function gd() { return local ? d.getDate() : d.getUTCDate() }
            function gM() { return local ? d.getMonth() : d.getUTCMonth() }
            function gy() { return local ? d.getFullYear() : d.getUTCFullYear() }
            function gH() { return local ? d.getHours() : d.getUTCHours() }
            function gm() { return local ? d.getMinutes() : d.getUTCMinutes() }
            function gs() { return local ? d.getSeconds() : d.getUTCSeconds() }
        },
        enumerable: false
    }
});

/****************************************扩展Array****************************************/
interface ArrayConstructor {
    /**
     * 将数组from的数据复制到数组to
     * 
     * @template T
     * @param {Array<T>} from
     * @param {Array<T>} to
     */
    copy<T>(from: Array<T>, to: Array<T>);

    /*降序*/
    DESC: number;
    /*升序*/
    ASC: number;
}
Array.copy = <T>(a: Array<T>, b: Array<T>) => {
    a.forEach((item, idx) => {
        b[idx] = a[idx];
    });
}

Array.ASC = 0;
Array.DESC = 1;

interface Array<T> {
    /**
     * 如果数组中没有要放入的对象，则将对象放入数组
     * 
     * @param {T} t 要放入的对象
     */
    pushOnce(t: T);

    /**
    * 
    * 删除某个数据
    * @param {T} t
    * @returns {boolean}   true 有这个数据并且删除成功
    *                      false 没有这个数据
    */
    remove(t: T): boolean;


    /**
     * 排序 支持多重排序
     * 降序, 升序
     * @param {string[]} kArr
     * @param {boolean[]} [dArr] 是否降序，默认升序
     */
    multiSort(kArr: string[], dArr?: boolean[]);
}

Object.defineProperties(Array.prototype, {
    pushOnce: {
        value: function (t) {
            if (!~this.indexOf(t)) {
                this.push(t);
            }
        },
        enumerable: false
    },
    remove: {
        value: function (t) {
            let idx = this.indexOf(t);
            if (~idx) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        },
        enumerable: false
    },
    multiSort: {
        value: function (kArr: string[], dArr?: boolean[]) {
            this.sort(sortFunc);
            function sortFunc(a: any, b: any): number {
                if (!kArr) {
                    let mode = !!dArr;
                    if (a < b) {
                        return mode ? 1 : -1;
                    }
                    else if (a > b) {
                        return mode ? -1 : 1;
                    }
                    else {
                        return 0;
                    }
                } else {
                    for (let idx = 0, len = kArr.length; idx < len; idx++) {
                        let key = kArr[idx];
                        let mode = dArr ? !!dArr[idx] : false;
                        let av = a[key];
                        let bv = b[key];
                        let typea = typeof av;
                        let typeb = typeof bv;
                        if (typea == "object" || typeb == "object") {
                            junyou.ThrowError("multiSort value类型不应为object");
                            return 0;
                        }
                        else if (typea != typeb) {
                            junyou.ThrowError("multiSort value类型不一致");
                            return 0;
                        }
                        else if (av < bv) {
                            return mode ? 1 : -1;
                        }
                        else if (av > bv) {
                            return mode ? -1 : 1;
                        }
                        else {
                            continue;
                        }
                    }
                    return 0;
                }
            }
        },
        enumerable: false
    }
});
/****************************************Base64********************************************/
module junyou {
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    var lookup: string[] = [];
    var revLookup: number[] = [];
    for (let i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i
    }
    revLookup['-'.charCodeAt(0)] = 62
    revLookup['_'.charCodeAt(0)] = 63


    function decode(elt: string) {
        var v = revLookup[elt.charCodeAt(0)]
        return v !== undefined ? v : -1
    }

    function b64ToByteArray(b64: string): Uint8Array {

        if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4')
        }

        // the number of equal signs (place holders)
        // if there are two placeholders, than the two characters before it
        // represent one byte
        // if there is only one, then the three characters before it represent 2 bytes
        // this is just a cheap hack to not do indexOf twice
        var len = b64.length
        var placeHolders: number = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

        // base64 is 4/3 + up to two characters of the original data
        var length = b64.length * 3 / 4 - placeHolders;
        var arr: Uint8Array = new Uint8Array(length);
        // if there are placeholders, only get up to the last complete 4 chars
        var l: number = placeHolders > 0 ? b64.length - 4 : b64.length

        var L = 0

        function push(v) {
            arr[L++] = v
        }
        var i: number, j: number, tmp: number;
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
            push((tmp & 0xFF0000) >> 16)
            push((tmp & 0xFF00) >> 8)
            push(tmp & 0xFF)
        }

        if (placeHolders === 2) {
            tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
            push(tmp & 0xFF)
        } else if (placeHolders === 1) {
            tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
            push((tmp >> 8) & 0xFF)
            push(tmp & 0xFF)
        }

        return arr
    }

    function encode(num: number) {
        return lookup[num]
    }

    function tripletToBase64(num: number) {
        return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
    }

    function encodeChunk(uint8: Uint8Array, start: number, end: number) {
        var temp
        var output = []
        for (var i = start; i < end; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
            output.push(tripletToBase64(temp))
        }
        return output.join('')
    }

    function uint8ToBase64(uint8: Uint8Array): string {
        var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
        var output = ''
        var parts = []
        var temp, length
        var maxChunkLength = 16383 // must be multiple of 3

        // go through the array every three bytes, we'll deal with trailing stuff later

        for (let i = 0, length = uint8.length - extraBytes; i < length; i += maxChunkLength) {
            parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > length ? length : (i + maxChunkLength)))
        }

        // pad the end with zeros, but make sure to not forget the extra bytes
        switch (extraBytes) {
            case 1:
                temp = uint8[uint8.length - 1]
                output += encode(temp >> 2)
                output += encode((temp << 4) & 0x3F)
                output += '=='
                break
            case 2:
                temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
                output += encode(temp >> 10)
                output += encode((temp >> 4) & 0x3F)
                output += encode((temp << 2) & 0x3F)
                output += '='
                break
            default:
                break
        }

        parts.push(output)

        return parts.join('')
    }

    /**
     * Base64的相关处理
     */
    export class Base64 {


        /**
         * 从base64的字符串中获取字节数组<br/>
         * 如果支持Uint8Array则使用Uint8Array，如果不支持，使用Array<number>
         * @param {string} b64 base64的字符串
         * @return {Uint8Array|number[]}
         */
        static getByteArrayFromeBase64 = b64ToByteArray;


        /**
         *  从字节数组中获取Base64字符串<br/>
         * @param {Uint8Array|number[]} uint8 字节数组
         * @return {string} Base64字符串
         */
        static getBase64FromByteArray = uint8ToBase64;
    }


    /**
     * 加载脚本
     * @param url
     * @param callback
     * @param thisObj
     * @param args
     */
    export function loadScript(url: string, callback: Function, thisObj: any = null, ...args) {
        var script: any = document.createElement("script");
        script.type = "text/javascript";
        //检测客户端类型
        if (script.readyState) {//IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback.apply(thisObj, args);
                }
            }
        } else {//其他浏览器
            script.onload = () => {
                callback.apply(thisObj, args);
            }
        }
        script.src = url;
        // 调整为放到文档最后
        document.documentElement.appendChild(script);
    }

    export function is(instance: any, ref: { new (): any }): boolean {
        return egret.is(instance, egret.getQualifiedClassName(ref));
    }

    /**
     * 移除可视对象
     * 
     * @export
     * @param {egret.DisplayObject} display
     */
    export function removeDisplay(display: egret.DisplayObject) {
        if (display && display.parent) {
            display.parent.removeChild(display);
        }
    }

    /**
     * 添加到容器中
     * x，y如果不赋值，则居中
     * @static
     * @param {egret.DisplayObject} dis 可视对象
     * @param {egret.DisplayObjectContainer} container 容器
     * @param {number} [x] 在容器中的坐标X
     * @param {number} [y] 在容器中的坐标Y
     */
    export function addTo(dis: egret.DisplayObject, container: egret.DisplayObjectContainer, x?: number, y?: number) {
        if (x === void 0) { // x未赋值，居中
            dis.x = container.width - dis.width >> 1;
        }
        if (y === void 0) {
            dis.y = container.height - dis.height >> 1;
        }
        container.addChild(dis);
    }
}

interface Map<K, V> {
    set(key: K, value: V): Map<K, V>;
    get(key: K): V;
    has(key: K): boolean;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any);
    clear();
    size: number;
}

/****************************************Map********************************************/
if (typeof window["Map"] == "undefined" || !window["Map"]) {
    /**
    * 为了兼容低版本浏览器，使用数组实现的map
    * @author 3tion
    *
    */
    class PolyfillMap<K, V> implements Map<K, V>{
        private _keys: K[];
        private _values: V[];

        private _size: number;

        constructor() {
            this._keys = [];
            this._values = [];
            this._size = 0;
        }

        public set(key: K, value: V): Map<K, V> {
            var keys = this._keys;
            var idx = keys.indexOf(key);
            if (~idx) {// idx != -1  覆盖values数组的数据
                this._values[idx] = value;
            } else {//idx == -1 新增
                var size = this._size;
                keys[size] = key;
                this._values[size] = value;
                this._size++;
            }
            return this;
        }

        public get(key: K): V {
            var idx = this._keys.indexOf(key);
            if (~idx) {
                return this._values[idx];
            }
            return;
        }

        public has(key: K): boolean {
            return !~this._keys.indexOf(key);
        }

        public delete(key: K): boolean {
            var keys = this._keys;
            var idx = keys.indexOf(key);
            if (~idx) {//有索引，干掉key和value
                keys.splice(idx, 1);
                this._values.splice(idx, 1);
                this._size--;
                return true;
            }
            return false;
        }

        public forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any) {
            var keys = this._keys;
            var values = this._values;
            for (let i = 0, len = this._size; i < len; i++) {
                callbackfn(values[i], keys[i], <Map<K, V>>thisArg);
            }
        }

        public clear() {
            this._keys.length = 0;
            this._values.length = 0;
            this._size = 0;
        }

        public get size(): number {
            return this._size;
        }
    }
    window["Map"] = PolyfillMap;
}

module egret {
    export interface Bitmap {
        /**
         * 刷新纹理
         */
        refreshBMD();
    }
    export interface TextField {
        /**
         * 
         * 设置Html文本(慎用，废性能)
         * @param {string} value
         */
        setHtmlText(value: string);
    }
}
egret.Bitmap.prototype.refreshBMD = function () {
    let tex = this.texture;
    this.texture = null;
    this.texture = tex;
}
const htmlTextParser = new egret.HtmlTextParser();
egret.TextField.prototype.setHtmlText = function (value: string) {
    this.textFlow = htmlTextParser.parser(value);
}