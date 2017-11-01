module junyou.game {
    /**
     * 时间冷却接口
     * @author pb
     */
    export interface ICooldown {

        /*cd时间*/
        cd: number;

        /*key*/
        key: string;

        /*是否冷却中*/
        isCooling: boolean;

    }
}