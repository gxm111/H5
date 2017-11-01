module junyou.hqg {

    export interface EquipSlot<T> extends GoodsItemSlot<EquVO> {
        /**
         * 部位
         * 
         * @type {number}
         */
        part: number;
        /**
         * 是否显示默认部位
         * 
         * @type {boolean}
         */
        showSlotType: boolean;

        setChooseState(value: boolean);

        getChooseState(): boolean;

        _data: any;
    }
    export class EquipSlot extends GoodsItemSlot<EquVO> implements EquipSlot<T>, sui.ListItemRender<EquVO>{

        public handleView = () => { };

        public chooseState: boolean;

        public renderView;

        public getData = Temp.voidFunction;

        public static getSlot(slot: junyou.sui.Slot) {
            let eslot = <EquipSlot<EquVO>>slot;
            eslot.countShow = 0;
            eslot.handleView = function () { };
            Object.defineProperty(eslot, "renderView", {
                get: this.getrenderView
            });
            // Object.defineProperty(eslot,"chooseState",{
            //     get:this.getChooseState,
            //     set:this.setChooseState
            // });
            eslot.setChooseState = this.setChooseState;
            eslot.getChooseState = this.getChooseState;
            eslot.setData = _$$$setData;//function (value:any){
            // this._data = value;
            // let vo = <EquVO>value;
            // if(vo){
            //     let cfg = vo.cfg;
            //         if (cfg) {
            //             this.iconSource = cfg.icon;
            //         }
            //         else {
            //             if(this.showSlotType){
            //                 this.iconSource = "i/part"+this.part+Extension.PNG;
            //             }else{
            //                 this.iconSource = undefined;
            //             }

            //         }
            //     }else{
            //         if(this.showSlotType){
            //             this.iconSource = "i/part"+this.part+Extension.PNG;
            //         }else{
            //             this.iconSource = undefined;
            //         }

            //     }
            // }
            eslot.getData = function () {
                return this._data;
            }
            return eslot;
        }


        public static _chooseState: boolean;

        public static setChooseState = function (val: boolean) {
            this._chooseState = val;
        }

        public static getChooseState = function (): boolean {
            return this._chooseState;
        }

        public static getrenderView() {
            return this;
        }

        private static _data: any;


        // public getData(){
        //     return this._data;
        // }
    }
}
module junyou.hqg {
    export function _$$$setData(value: EquVO) {
        this._data = value;
        let vo = <EquVO>value;
        if (vo) {
            let cfg = vo.cfg;
            if (cfg) {
                this.iconSource = cfg.icon;
            }
            else {
                if (this.showSlotType) {
                    this.iconSource = "i/part-" + this.part + Extension.PNG;
                } else {
                    this.iconSource = undefined;
                }

            }
        } else {
            if (this.showSlotType) {
                this.iconSource = "i/part-" + this.part + Extension.PNG;
            } else {
                this.iconSource = undefined;
            }

        }
    }
}