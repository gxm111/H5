module junyou.hqg {
    /**
     * 技能管理器，用于注册代码创建的一些处理器
     * @author 3tion
     */
    export class SkillManager {

        private static _finders: { [index: number]: IFinder } = {};

        public static skillGroups:{[index:number]:JiNengCfg[]};

        public static init() {
            let finders = this._finders;
            finders[0] = new CircleFinder();
            finders[1] = new CircleFinder1();
            finders[2] = new RectangleFinder();
            finders[3] = new SectorFinder();
            // 处理技能参数
            let skills: JiNengCfg[] = DataLocator.getData(game.ConfigKey.JiNeng);
            this.skillGroups = [[],[],[]];
            if (skills) {
                let skill:JiNengCfg;
                for (let key in skills) {
                    skill = skills[key];
                    let finder = finders[skill.areatype];
                    this.skillGroups[skill.group].push(skill);
                    if (finder) {
                        finder.initSkill(skill);
                    } else {
                        ThrowError(`技能id:[${skill.id}]无法找到对应的范围处理器，areatype:[${skill.areatype}]`);
                    }
                }
            }
        }

        /**
         * 获取范围选取器
         * 
         * @static
         * @param {number} areatype 范围类型
         * @returns (description)
         */
        public static getFinder(areatype: number) {
            return this._finders[areatype];
        }

        /**
         * 获取目标集合
         * 
         * @param {SkillContext} context (description)
         */
        public static getTargets(context: SkillContext) {
            var willchecked = context.getWillChecked();
            let mainTarget = context.mainTarget;
            let cfg = context.skillCfg;
            let will: number;
            // 检查当前技能目标类型
            switch (cfg.maintarget) {
                case 1:// 自己
                    mainTarget = context.caster;
                    break;
                case 2:// 血量最高
                    will = 0;
                    willchecked.forEach(unit => {
                        if (will < unit.hp) {
                            will = unit.hp;
                            mainTarget = unit;
                        }
                    });
                    break;
                case 3:// 血量最低
                    will = Number.MAX_VALUE;
                    willchecked.forEach(unit => {
                        if (will > unit.hp) {
                            will = unit.hp;
                            mainTarget = unit;
                        }
                    });
                    break;
            }
            context.targets.length = 0;
            if (mainTarget) {   // 说明已经没有目标，则目标数组为0
                context.mainTarget = mainTarget;
                let finder = this._finders[cfg.areatype];
                if (finder) {
                    finder.find(willchecked, context);
                }
            }
        }
    }
}