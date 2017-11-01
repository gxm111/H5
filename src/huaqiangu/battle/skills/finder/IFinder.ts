module junyou.hqg {
    /**
     * 目标查找器
     * @author 3tion
     */
    export interface IFinder {

        /**
         * 查找目标
         * 
         * @param {UnitEntity[]} willChecked 待检查的目标数组
         * @param {SkillContext} context 技能上下文
         */
        find(willChecked: UnitEntity[], context: SkillContext): void;

        /**
         * 初始化技能参数
         * 
         * @param {SkillCfg}
         */
        initSkill: { (cfg: JiNengCfg): void };
    }
}