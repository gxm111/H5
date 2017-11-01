module junyou.hqg {
    /**
     * TODO 花千骨游戏中的Buff实体<br/>
     * 由UnitEntity或者其他实体发出，会持续对单位进行处理
     */
    export class BufferEntity implements IEntity {
        constructor() {

        }

        guid: number;

        protected _disposed: boolean;

        public get disposed() {
            return this._disposed;
        }

        /**
         * 目标
         */
        private _target: UnitEntity;

        /**
         * 数据处理帧
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doData(controller: FightController, now: number) {

        }
        /**
         * 数据渲染信息
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doRender(controller: FightController, now: number) {

        }

        dispose() {

        }
    }
}