module junyou.sui {
    export interface ArtNumber extends ArtText {
        /***显不显示小数 */
        isFloat: boolean;
        /***显不显示“+”号，“-”号默认显示 */
        useSign: boolean;
        
        _numValue: number;
        
        setTweenValue(value: number, duration?: number, ease?: IEaseFunction, callBack?: Function): void;
    }

    export class ArtTextUtil {

        private static subCallBack: Function;

        private static flyCallBack: Function;
        
        
        

        public static convertTextToNumber(art: junyou.sui.ArtText) {
            let art2 = <ArtNumber>art;
            art2.isFloat = false;
            art2.useSign = false;
            art2._numValue = +art.value;
            art2.setTweenValue = ArtTextUtil.doNumberSub;
            Object.defineProperty(art2, 'value', {
                get: this._getValue,
                set: this._setValue
            });
            return art2;
        }


        /****播放一个差值的滚动效果 */
        private static doNumberSub(value: number, duration?: number, ease?: IEaseFunction, callBack?: Function) {
            let tween: junyou.Tween = Global.getTween(this,undefined,undefined,true);
            if (callBack) {
                return tween.to({ value: value }, duration, ease).call(callBack, null, [this]);
            }
            return tween.to({ value: value }, duration, ease);
        }
        
       

        private static _getValue = function (): number { return this._numValue; }
        private static _setValue = function (val: number) {
            if (this._numValue == val) return;
            this._numValue = val;
            if (!this.isFloat) {
                val = Math.round(val);
            }
            let tempVal: any = val;
            if (this.useSign) {
                if (val >= 0) {
                    tempVal = "+" + val;
                }
            }
            this.setValue(tempVal);
        }




    }
}