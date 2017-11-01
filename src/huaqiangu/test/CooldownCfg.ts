module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class CooldownCfg implements game.ICooldown {

        /*cd时间*/
        public cd: number = 60000;
        /*key*/
        public key: string = "1";
        /*是否冷却中*/
        public isCooling: boolean;

    }
}