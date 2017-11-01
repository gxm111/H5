/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-23 14:22:30
 **/
module junyou.hqg {
	export interface MyClanInfoSuccess_S2C{
		/**
		 * 门派中和自己相关的信息
		 */
		myinfo: MyClanInfo;
		/**
		 * 门派信息
		 */
		info: ClanInfo;
		/**
		 * 门派排名
		 */
		rank: number;
		/**
		 * 可选参数 门派公告
		 */
		notice?: string;
	}
}
