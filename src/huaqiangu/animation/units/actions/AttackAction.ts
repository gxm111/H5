module junyou.hqg {

    /**
     * 攻击动作<br/>
     * 技能全部继承此动作
     * @author 3tion
     */
    export class AttackAction extends GUnitAction {
        private static _creators: { [index: number]: { new (): AttackAction } };
        private static getCreator(id: number) {
            if (!this._creators) {
                this._creators = { "0": AttackAction, "1": Op1 };// inline op
            }
            return this._creators[id];
        }

        /**
         * 注册技能处理器，用于后期自定义技能时，使用
         * 
         * @static
         * @param {number} id (description)
         * @param {{ new (): AttackAction }} creator (description)
         */
        public static regOperatorCreator(id: number, creator: { new (): AttackAction }) {
            if (DEBUG) {
                if (id in this._creators) {
                    ThrowError(`技能处理器标识，标识：${id}`);
                }
            }
            this._creators[id] = creator;
        }

        public static getOperator(id: number, context: SkillContext): AttackAction {
            let creator: { new (): AttackAction } = this.getCreator(id);
            let action = new creator();
            action.create(context);
            return action;
        }
        /**
         * 检查当前动作是否可以结束<br/>
         * @return true 可以结束<br/>
         *         false 不可结束
         */
        public get canStop(): Boolean {
            //只有攻击动作结束，才可以结束
            return this._isEnd;
        }

        /**
         * 动画播放结束的回调
         */
        public playComplete(unit: game.Unit, now: number) {
            this._isEnd = true;
        }

        /**
         * 技能实体被创建
         * 
         * @protected
         * @abstract
         * @param {SkillContext} context (description)
         */
        protected create(context: SkillContext) {
            // 设置动作
            this._action = AttackAction.getAction(context.skillCfg.mobanCfg.action);
            // 调整角色朝向
            let cunit = context.caster.unit;
            let tunit = context.mainTarget.unit;
            let cfg = context.skillCfg;
            let moban = cfg.mobanCfg
            cunit.faceTo = game.FaceToUtils.getFaceTo8(cunit.x, cunit.y, tunit.x, tunit.y);

            // 播放起始动画
            if (moban.sani) {
                context.controller.playAniOnTargetBody(moban.sani, context.caster);
            }
            if (moban.sani1) {
                context.controller.playAniOnTargetHalo(moban.sani1, context.caster);
            }
            if (moban.tani) {
                context.controller.playAniOnTargetBody(moban.tani, context.mainTarget);
            }
            if (moban.tani1) {
                context.controller.playAniOnTargetHalo(moban.tani1, context.mainTarget);
            }
            this.fire(context);
        }

        protected fire(context: SkillContext) {
            var caster = context.caster;
            context.cx = caster.x;
            context.cy = caster.y;
            this.playTargetHurt(context, context.mainTarget);
        }

        /**
         * 播放目标受创特效
         * 
         * @protected
         * @param {SkillContext} context (description)
         */
        protected playTargetHurt(context: SkillContext, target: UnitEntity) {
            let controller = context.controller;
            let dmgInfo = controller.cac(context.caster, target, context.skillCfg);
            dmgInfo.cx = context.cx;
            dmgInfo.cy = context.cy;
            DmgEffect.showEffect(dmgInfo, controller);
            let cfg = context.skillCfg;
            let moban = cfg.mobanCfg;
            if (moban.hani) {
                context.controller.playAniOnTargetBody(moban.hani, target);
            }
            if (target.hp <= 0) { //目标死亡
                this.dead(target, context);
            }
        }


        /**
         * 被某个技能攻击致死
         * 
         * @param {UnitEntity} target (description)
         * @param {SkillContext} context (description)
         */
        protected dead(target: UnitEntity, context: SkillContext) {
            let now = context.controller.timeline;
            let caster = context.caster;
            // 计算出攻击角度
            var dx = target.x - caster.x || 0.01;
            var dy = target.y - caster.y || 0.01;
            var rad = Math.atan2(2 * dy, dx);
            var dist = 300;// TODO 使用技能配置
            // var delta = dist / Math.sqrt(dx * dx + 4 * dy * dy);
            // var tx = caster.x + delta * dx;
            // var ty = caster.y + delta * dy;
            var tx = caster.x + dist * Math.cos(rad);
            var ty = caster.y + 0.5 * dist * Math.sin(rad);
            target.unit.dead(tx, ty, rad, now);
        }

    }
}