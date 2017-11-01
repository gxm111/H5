/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-28 17:04:21
 **/
module junyou.hqg {
	export interface ClanJoinSuccess_S2C{
		/**
		 * 我的门派信息
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
