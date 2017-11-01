module junyou.hqg {
    /**
     * 伤害信息
     * @author 3tion
     */
    export class DmgInfo implements IRecyclable {
        private static _pool: RecyclablePool<DmgInfo> = new RecyclablePool(DmgInfo);

        public static getInstance() {
            return this._pool.getInstance();
        }
        /**
		 * 目标单位
         * 
         * @type {UnitEntity}
		 */
        public target: UnitEntity;

		/**
		 * 伤害类型
		 */
        public type: number;

		/**
		 * 伤害值
		 */
        public dmg: number;
        /**
         * 技能释放中心的坐标x
         * 
         * @type {number}
         */
        public cx: number;
        /**
         * 技能释放中心的坐标y
         * 
         * @type {number}
         */
        public cy: number;
        /**
         * 施法者
         * 
         * @type {UnitEntity}
         */
        public caster: UnitEntity;

        constructor() {

        }
    }
}