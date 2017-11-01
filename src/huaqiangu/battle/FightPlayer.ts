module junyou.hqg {
    /**
     * 战斗播放器
     * @author 3tion
     */
    export class FightPlayer extends FightController {

        /**
         * 命令序列
         */
        protected _cmds: FightCommand[];
        protected _creators: { [index: number]: { new (): FightCommand } }


        constructor() {
            super();
        }

        init() {
            this._cmds = [];
            super.init();
        }

        /**
        * 开启一个序列
        * 
        * @param {number} seed
        * @param {any[][]} cmds
        */
        public playCmd(seed: number, cmds: any[][]) {
            this.seed = seed;
            let creators = this._creators;
            let cmdList = this._cmds;
            // 创建指令
            for (let i = 0, len = cmds.length; i < len; i++) {
                let cmdData = cmds[i];
                let key = cmdData[0];
                let creator = creators[key];
                let cmd = new creator();
                //cmd.init(cmdData[1]);
                cmdList.push(cmd);
            }
        }


        /**
         * 注册指令创建器
         * 
         * @param {number} key 创建器标识
         * @param {{ new (): IFightCommand }} creator 创建器
         */
        public regCmdCreator(key: number, creator: { new (): FightCommand }) {
            this._creators[key] = creator;
        }
    }
}