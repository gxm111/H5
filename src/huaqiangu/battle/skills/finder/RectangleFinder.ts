module junyou.hqg {
    /**
     * 矩形查找器，从主机到主目标的方向的矩形
     * @author 3tion
     */
    export class RectangleFinder implements IFinder {
        find(willChecked: UnitEntity[], context: SkillContext) {
            let target = context.mainTarget;
            let ex = target.x;
            let ey = target.y;
            let caster = context.caster;
            let sx = caster.x;
            let sy = caster.y;
            context.cx = sx;
            context.cy = sy;
            let cfg = context.skillCfg;
            let params = cfg.finderParams;
            let rad = Math.atan2(2 * (ey - sy), ex - sx);

            let w = cfg.area2;
            let r = params[0];
            let hw = params[4];

            //计算pta
            let tr = rad - Math.PI2;
            let pax = sx + w * Math.cos(tr);
            let pay = sy + hw * Math.sin(tr);

            //计算ptb
            tr = rad + Math.PI2;
            let pbx = sx + w * Math.cos(tr);
            let pby = sy + hw * Math.sin(tr);

            //计算ptc
            let d = params[1];
            hw = params[2];
            let rd = params[3];
            tr = rad + rd;
            let pcx = sx + d * Math.cos(tr);
            let pcy = sy + hw * Math.sin(tr);

            //计算ptd
            tr = rad - rd;
            let pdx = sx + d * Math.cos(tr);
            let pdy = sy + hw * Math.sin(tr);

            let maxCount = context.maxTarget || cfg.maxtarget;
            let targets = context.targets;
            // 施法者，从远到近排序
            context.sortByDistance(willChecked);
            for (let i = 0, len = willChecked.length; i < len; i++) {
                if (maxCount > 0) {
                    let entity = willChecked[i];
                    if (this.check(entity, cfg, sx, sy, pax, pay, pbx, pby, pcx, pcy, pdx, pdy, targets)) {
                        maxCount--;
                    }
                } else {
                    break;
                }
            }
        }

        protected check(unit: UnitEntity, sp: JiNengCfg, sx: number, sy: number, pax: number, pay: number, pbx: number, pby: number, pcx: number, pcy: number, pdx: number, pdy: number, out: UnitEntity[]): boolean {
            var tx = unit.x;
            var ty = unit.y;
            if (tx == sx && ty == sy) {
                out.push(unit);
                return true;
            }
            else {
                var txpax = tx - pax;
                var typay = ty - pay;
                var txpbx = tx - pbx;
                var typby = ty - pby;
                var txpcx = tx - pcx;
                var typcy = ty - pcy;
                var txpdx = tx - pdx;
                var typdy = ty - pdy;
                if (txpax * typby <= typay * txpbx && txpbx * typcy <= typby * txpcx && txpcx * typdy <= typcy * txpdx && txpdx * typay <= typdy * txpax) {
                    out.push(unit);
                    return true;
                }
            }
            return false;
        }

        initSkill(cfg: JiNengCfg): void {
            let params: any[];
            let length = cfg.area1 || cfg.range;// 如果没有配置矩形长度，取射程
            let width = cfg.area2;
            cfg.finderParams = params = [];
            params[0] = length;
            params[1] = Math.sqrt(length * length + width * width);
            params[2] = params[1] * .5;
            params[3] = Math.atan2(width, length);
            params[4] = width * .5;
        }
    }
}