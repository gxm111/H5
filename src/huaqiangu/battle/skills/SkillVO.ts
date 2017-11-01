module junyou.hqg {
    /**
     * 技能运行时数据
     * @author 3tion
     */
    export class SkillVO implements IRecyclable {

        private static _pool: RecyclablePool<SkillVO> = new RecyclablePool(SkillVO);

        public static getInstance(cfg: JiNengCfg) {
            let vo = this._pool.getInstance();
            vo.cfg = cfg;
            return vo;
        }

        protected _cfg: JiNengCfg;

        /**
         * 设置技能配置
         */
        public set cfg(value: JiNengCfg) {
            if (value != this._cfg) {
                this._cfg = value;
            }
            this._nt = value.delay;
        }

        public get cfg(): JiNengCfg {
            return this._cfg;
        }

        protected _nt: number;

        constructor() {

        }

        /**
         * 检查射程
         * 
         * @param {number} sqdist 距离的平方
         * @returns {boolean} (description)
         */
        public checkDist(sqdist: number): boolean {
            return sqdist <= this._cfg.sqRange;
        }

        /**
         * 尝试释放技能
         * 
         * @param {number} now 当前时间
         * @param {number} shenfa 身法等级
         * @returns {boolean} 是否可释放成功
         */
        public cast(now: number, shenfa: number = 0): boolean {
            let cfg = this._cfg;
            if (now > this._nt) {
                this._nt = this._cfg.cd * (10000 - shenfa) * 0.0001 + now;
                return true;
            }
            return false;
        }

        public recycle() {
            SkillVO._pool.recycle(this);
        }
    }
}