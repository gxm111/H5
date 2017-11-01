module junyou.hqg {
    /**
     * 待机动作
     * @author 3tion
     */
    export class StandByAction extends GUnitAction {

        constructor() {
            super();
            this._action = GUnitAction.getAction(0);
        }
    }
}