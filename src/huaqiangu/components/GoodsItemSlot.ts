module junyou.hqg {
    export interface GoodsItemSlot<T> extends junyou.sui.Slot {

        getSlot(slot: junyou.sui.Slot);
    }

    export class GoodsItemSlot<T extends GoodsSlotItem> implements GoodsItemSlot<T> {
        
        public static getSlot(slot: junyou.sui.Slot) {
            slot.setData = function (value:any) {
                let vo = <GoodsSlotItem>value;
                if (vo) {
                    this.count = vo.count;
                    let cfg = vo.cfg;
                    if (cfg) {
                        this.iconSource = cfg.icon;
                    }
                    else {
                        this.iconSource = undefined;
                    }
                }
                else {
                    this.count = 0;
                    this.iconSource = undefined;
                }
                // 测试代码 开始
                // this.iconSource = "i/part-1.png";
                // 测试代码 结束
            };
            return <GoodsItemSlot<GoodsSlotItem>>slot;
        }

    }






}
