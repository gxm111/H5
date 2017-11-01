module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class ClanHongbaoReceivedVO implements ClanHongbaoReceived{
        /**
		 * 获得的声望
		 */
		fame: number;
		/**
		 * 领取时间
		 */
		time: number;
		/**
		 * 发出红包的角色名
		 */
		name: string;

    }
}