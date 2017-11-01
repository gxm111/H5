module junyou.hqg {
    /**
     * 场景中的实体
     */
    export interface IEntity {
        /**
         * 全局标识
         * 
         * @type {(string|number)}
         */
        guid: number;

        /**
         * 是否已经销毁
         */
        disposed: boolean;

        /**
         * 数据处理帧
         * 如果有AI的实体，AI操作在此进行
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doData(controller: FightController, now: number);
        /**
         * 数据渲染信息
         * 
         * @param {FightController} controller 战斗控制器
         * @param {number} now 当前时间
         */
        doRender(controller: FightController, now: number);

        /**
         * 销毁实体
         */
        dispose();
    }
}