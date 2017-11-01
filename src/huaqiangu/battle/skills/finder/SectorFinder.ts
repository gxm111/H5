module junyou.hqg {
    /**
     * 扇形范围查找器
     * @author 3tion
     */
    export class SectorFinder implements IFinder {
        find(willChecked: UnitEntity[], context: SkillContext) {
            let cfg: JiNengCfg = context.skillCfg;
            // 从caster开始
            let caster = context.caster;
            let sx = caster.x;
            let sy = caster.y;
            context.cx = sx;
            context.cy = sy;

            let target = context.mainTarget;
            let ex = target.x;
            let ey = target.y;

            var rad = Math.atan2(2 * (ey - sy), ex - sx);
            var rd = cfg.area2;
            var r = cfg.area1;
            var hr = cfg.finderParams[1];
            var sqRadius = cfg.finderParams[2];
            var tr = rad - rd;
            var pax = sx + r * Math.cos(tr);
            var pay = sy + hr * Math.sin(tr);

            tr = rad + rd;
            var pbx = sx + r * Math.cos(tr);
            var pby = sy + hr * Math.sin(tr);

            let maxCount = context.maxTarget || cfg.maxtarget;
            let targets = context.targets;

            // 施法者，从远到近排序
            context.sortByDistance(willChecked);
            for (let i = 0, len = willChecked.length; i < len; i++) {
                if (maxCount > 0) {
                    let entity = willChecked[i];
                    if (this.check(entity, cfg, sqRadius, sx, sy, rd, pax, pay, pbx, pby, targets)) {
                        maxCount--;
                    }
                } else {
                    break;
                }
            }
        }


        protected check(unit: UnitEntity, sp: JiNengCfg, sqRadius: number, sx: number, sy: number, rd: number, pax: number, pay: number, pbx: number, pby: number, out: UnitEntity[]) {
            var tx = unit.x;
            var ty = unit.y;
            var dx = tx - sx;
            var dy = ty - sy;
            var ff = dx || dy;
            if (ff) {
                var f = true;
                if (rd < Math.PI) {
                    if (rd > Math.PI2) {
                        f = dx * (ty - pby) <= dy * (tx - pbx) || dx * (ty - pay) >= dy * (tx - pax);
                    }
                    else {
                        f = dx * (ty - pay) > dy * (tx - pax) && dx * (ty - pby) < dy * (tx - pbx);
                    }
                }
                if (dx * dx + 4 * dy * dy <= sqRadius && f) {
                    ff = 0;
                }
            }
            if (!ff) {
                out.push(unit);
                return true;
            }
            return false;
        }

        initSkill(cfg: JiNengCfg): void {
            cfg.finderParams = [cfg.area1 * cfg.area1, cfg.area1 * .5];
        }
    }
}