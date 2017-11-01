module junyou.hqg {
    /**
     * 物品VO
     * @author 3tion
     */
    export class ItemVO<T extends DaoJuCfg> implements ItemInfo, GoodsSlotItem {

        /**
		 * 物品唯一标识，非全局，绑定在个人上
		 */
        id: number;
		/**
		 * 物品的配置id
		 */
        cfgid: number;
		/**
		 * 可选参数 格位标识，0表示在背包中，1表示在主角身上，2表示在伙伴1身上，3表示在伙伴2身上
		 */
        slot: number;

		/**
		 * 可选参数 装备的稀有等级，道具没有此值，直接根据配置得到
		 */
        public get rare(): number {
            return this.cfg.rare;
        }
		/**
		 * 可选参数 过期时间戳
		 */
        expire: number;

		/**
		 * 可选参数 物品数量
		 */
        count: number;

        /**
         * 
         * 道具配置
         * @type {T}
         */
        cfg: T;


        public get minlevel(): number {
            return this.cfg ? this.cfg.minlevel : 0;
        }

        public get type(): number {
            return this.cfg ? this.cfg.type : undefined;
        }

        /**
         * 检查物品是否过期<br/>
         * 
         * @param {number} now 要检查的时间
         * @returns {boolean} true  物品没有过期，可以使用<br/>
         *                    false 物品已经过期，不可以使用<br/>
         */
        public checkExpire(now?: number) {
            return !this.expire || now < this.expire;
        }

        public getName(): string {
            return this.cfg ? this.cfg.name : "";
        }

    }
}