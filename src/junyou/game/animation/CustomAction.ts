module junyou.game {
    /**
     * 代码中动态创建的自定义帧，用于处理一些自定义需求
     * @author 3tion
     */
    export class CustomAction implements IRenderAction {
        public key: number;
        public frames: FrameInfo[];
        constructor() {
        }

        private static _key: number = -0.5;// 使用0.5 防止和手动加的key重复

        /**
         * 获取自定义动作
         * 
         * @static
         * @param {number[][]} actions 动作序列
         * @param {number} [key] 动作标识，需要使用整数
         * @return {CustomAction}   自定义动作
         */
        public static getCustomAction(actions: number[][], key?: number) {
            let action = new CustomAction();
            action.key = key === void 0 ? this._key-- : key;
            let frames = action.frames = [];
            let i = 0;
            actions.forEach((info) => {
                frames[i++] = FrameInfo.fromData(info);
            });
            return action;
        }
    }
}