module junyou.hqg {
    /**
     * 敌人
     * @author 3tion
     */
    export class EnemyVO implements IRecyclable {

        private static _pool: RecyclablePool<EnemyVO> = new RecyclablePool(EnemyVO);

        public static getInstance() {
            return this._pool.getInstance();
        }

        /**
         * 敌人实体
         * 
         * @type {number}
         */
        public entity: UnitEntity;
        /**
         * 前一次攻击时间
         * 
         * @type {number}
         */
        public lasttime: number = 0;
        /**
         * 仇恨
         * 
         * @type {number}
         */
        public threat: number = 0;
        constructor() {

        }

        recycle() {
            EnemyVO._pool.recycle(this);
        }

        onRecycle() {
            if (this.entity) {
                this.entity = undefined;
            }
            this.lasttime = 0;
            this.threat = 0;
        }
    }
}