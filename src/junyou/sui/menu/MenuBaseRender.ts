module junyou.sui{
    
    /**
     * @author gushuai
     * (description)
     * 
     * @export
     * @class MenuBaseRender
     * @extends {egret.Sprite}
     * @template T
     */
    export class MenuBaseRender<T extends MenuBaseVO> extends egret.Sprite{

        private _data:T;
        public constructor(){
            super();
            this.touchEnabled = this.touchChildren = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.itemClick,this);
            this.initUI();
        }

        protected initUI(){

        }

        protected itemClick(e:egret.Event){
            if(this._data){
                if(!!this._data.callBack){
                    this._data.callBack.apply(this,[this.parent.parent,this._data]);
                }
            }
        }

        public setData(val:T){
            this._data = val;
        }

        public getData():T{
            return this._data;
        }
    }
}