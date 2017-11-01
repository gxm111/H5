module junyou.hqg {
    import MountType = game.MountType;
    import IUnitActionInfo = game.IUnitActionInfo;
    /**
     * 花千骨的单位动作
     * @author 3tion
     */
    export class GUnitAction extends game.UnitAction {
        private static _actions: { [index: number]: IUnitActionInfo } = {};

        /**
         * 获取动作信息<br/>
         * 按花千骨的h5项目，一个动作只需要一种，直接做全局缓存
         * @protected
         * @static
         * @param {number} action 动作序列
         * @returns (description)
         */
        protected static getAction(action: number) {
            let info: IUnitActionInfo = this._actions[action];
            if (!info) {
                info = { mountType: MountType.ground, action: action };
                this._actions[action] = info;
            }
            return info;
        }

        protected _action: { mountType: MountType, action: number };
        constructor() {
            super();
        }

        /**
         * 花千骨项目，暂时不考虑坐骑动作
         */
        getAction(mountType: MountType): { mountType: MountType, action: number } {
            return this._action;
        }
    }
}