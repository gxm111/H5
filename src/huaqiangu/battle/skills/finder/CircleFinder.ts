module junyou.hqg {

    function circleFind(willChecked: UnitEntity[], mainTarget: UnitEntity, context: SkillContext) {
        context.cx = mainTarget.x;
        context.cy = mainTarget.y;
        // 按距离排序
        context.sortByDistance(willChecked);
        let cfg = context.skillCfg;
        let sqRadius = cfg.finderParams[0];
        let maxCount = context.maxTarget || cfg.maxtarget;
        let targets = context.targets;
        let i = 0;
        for (let entity of willChecked) {
            let sqDist = FightController.getSQDist2(entity, mainTarget);
            if (sqDist <= sqRadius) {
                targets[i++] = entity;
                if (i >= maxCount) {
                    break;
                }
            }
        }
        targets.length = i;
    }

    function _initSkill(cfg: JiNengCfg) {
        cfg.finderParams = [cfg.area1 * cfg.area1];
    }

    /**
     * 0 从主目标开始的圆形
     * @author 3tion
     */
    export class CircleFinder implements IFinder {
        find(willChecked: UnitEntity[], context: SkillContext) {
            circleFind(willChecked, context.mainTarget, context);
        }
        initSkill = _initSkill;
    }
    /**
    * 1 从施法者开始的圆形
    * @author 3tion
    */
    export class CircleFinder1 implements IFinder {
        find(willChecked: UnitEntity[], context: SkillContext) {
            circleFind(willChecked, context.caster, context);
        }
        initSkill = _initSkill;
    }
}