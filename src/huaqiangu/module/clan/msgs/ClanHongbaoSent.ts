/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-30 15:21:12
 **/
module junyou.hqg {
	export interface ClanHongbaoSent{
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
		 * 可选参数 已领个数
		 */
		num?: number;
	}
}
