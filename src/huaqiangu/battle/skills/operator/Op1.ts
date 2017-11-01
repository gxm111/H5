module junyou.hqg {
    /**
     * 使用随机的攻击动作进行攻击
     * @author 3tion
     */
    export class Op1 extends AttackAction {
        constructor() {
            super();
        }

        create(context: SkillContext) {
            super.create(context);
            // let actions = [2, 3, 4]
            // this._action = GUnitAction.getAction(actions[context.controller.random(actions.length) >> 0]);
            this._action = GUnitAction.getAction(2);
        }
    }
}