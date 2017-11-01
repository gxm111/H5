module junyou.hqg {
    /**
     * 技能上下文参数
     * @author 3tion
     */
    export class SkillContext {
        /**
         * 施法者
         * 
         * @type {UnitEntity}
         */
        public caster: UnitEntity;

        /**
         * 最大目标数
         * 
         * @type {number}
         */
        public maxTarget: number;

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
         * 主目标
         * 
         * @type {UnitEntity}
         */
        public mainTarget: UnitEntity;

        /**
         * 战斗控制器
         * 
         * @type {FightController}
         */
        public controller: FightController;
        /**
         * 目标列表
         * 
         * @type {UnitEntity[]}
         */
        public targets: UnitEntity[] = [];

        /**
         * 技能配置
         * 
         * @type {SkillCfg}
         */
        public skillCfg: JiNengCfg;

        /**
         * 获取带检测的目标数组，目标数组为未销毁的单位
         * 
         * @returns (description)
         */
        public getWillChecked() {
            let cfg = this.skillCfg;
            var willchecked: UnitEntity[];
            let controller = this.controller;
            switch (cfg.targettype) {
                case 0:
                    willchecked = controller.getOppsTeam(this.caster.data.team);
                    break;
                case 1:
                    willchecked = controller.getMyTeam(this.caster.data.team);
                    break;
                case 2:
                    willchecked = controller.units;
                    break;
                default:
                    break;
            }
            willchecked = willchecked.concat();
            controller.getAlivedUnits(willchecked);
            return willchecked;
        }


        /**
         * 按距离排序
         * 
         * @param {UnitEntity[]} targets 待排序的目标
         * @param {number} [cx] 技能释放中心的坐标x  不配置，则取上下文的坐标
         * @param {number} [cy] 技能释放中心的坐标y  不配置，则取上下文的坐标
         */
        public sortByDistance(targets: UnitEntity[], cx?: number, cy?: number) {
            cx = cx || this.cx;
            cy = cy || this.cy;
            targets.sort((a, b) => {
                return FightController.getSQDist(cx, cy, a.x, a.y) - FightController.getSQDist(cx, cy, b.x, b.y);
            });
        }

        /**
         * 克隆一个技能上下文对象
         * 
         * @param {boolean} [copyTargets=false] 是否拷贝目标数组
         * @returns {SkillContext} 技能上下文
         */
        public clone(copyTargets?: boolean) {
            var context = SkillContext.getInstance();
            context.caster = this.caster;
            context.controller = this.controller;
            context.mainTarget = this.mainTarget;
            context.skillCfg = this.skillCfg;
            if (copyTargets) {
                Array.copy(this.targets, context.targets);
            }
            return context;
        }

        public recycle() {
            SkillContext._pool.recycle(this);
        }

        public onRecycle() {
            this.targets.length = 0;
            this.caster = undefined;
            this.mainTarget = undefined;
            this.maxTarget = undefined;
        }

        private static _pool: RecyclablePool<SkillContext> = new RecyclablePool(SkillContext);

        public static getInstance() {
            return this._pool.getInstance();
        }
    }
}