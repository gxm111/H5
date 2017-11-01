module junyou.hqg {
    /**
     * description
     * @author pb
     */
    export class ClanHongbaoSentVO implements ClanHongbaoSent{
        /**
		 * 元宝数
		 */
		gold: number;
		/**
		 * 状态 0：已过期，1：未过期
		 */
		state: number;
		/**
		 * 发出时间
		 */
		time: number;
		/**
		 * 红包个数
		 */
		totalNum: number;
		/**
		 *  已领个数
		 */
		num: number;

    }
}