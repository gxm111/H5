module junyou.hqg {
    /**
     * 装备配置
     * @author 3tion
     */
    export class EquVO extends ItemVO<ZhuangBeiCfg> implements IXObject {
        /**
         * 可选参数 随机属性
         */
        public suiji: EquipSuiJi[];

        private _rare: number;

        public set rare(value: number) {
            this._rare = value;
        }

        public get rare(): number {
            return this._rare;
        }

        private _xChanged: boolean;


        /**
         * 
         * 随机X属性
         * @type {IXObject}
         */
        public suijiXAttr: IXObject = {};

        /**
         * 
         * 基础属性
         * @type {IXObject}
         */
        public baseXAttr: IXObject = {};


        public xInvalidate() {
            this._xChanged = true;
        }

        /**
         * 重新计算属性
         */
        public xUpdate() {
            if (this._xChanged) {
                let items = DataLocator.getData(game.ConfigKey.AllItems);
                let pingzhi = DataLocator.getData(game.ConfigKey.ZhuangBeiPinZhi);
                //计算基础属性
                let equipCfg = this.cfg;
                let pingzhiCfg = <ZhuangBeiPinZhiCfg>pingzhi[this.rare];
                if (!pingzhiCfg) {
                    ThrowError(`无法获取装备的品质数据，物品id为${this.id}，品质为：${this.rare}`);
                }
                XObject.reset(this.baseXAttr);
                for (let key in XObject.ORDER) {
                    // 处理基础属性
                    this.baseXAttr[key] = +equipCfg[key] * pingzhiCfg.multiple || 0;//防止出现NaN
                }

                //计算随机属性
                let suijiXAttr = this.suijiXAttr;
                XObject.reset(suijiXAttr);
                for (let suiji of this.suiji) {
                    let v = +suijiXAttr[suiji.key] || 0;
                    suijiXAttr[suiji.key] = v + suiji.value;
                }

                for (let key in XObject.ORDER) {
                    this[key] = (~~this.baseXAttr[key]) + (~~this.suijiXAttr[key]);
                }

                //TODO 战力评分计算


                this._xChanged = false;
            }
        }

        private _zhanli: number;

        public get zhanli(): number {
            this.xUpdate();
            return this._zhanli;
        }

        /*装备部位*/
        public get part(): number {
            if (this.cfg) {
                return this.cfg.part;
            }
            return 0;
        }

        /*当前评分较高标记，熔炼用*/
        //public currentHigher:boolean;

        constructor() {
            super();
        }
    }
}