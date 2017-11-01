/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-28 17:04:21
 **/
module junyou.hqg {
	export interface ClanJoinFailed_S2C{
		/**
		 * 0：已有门派，1:门派已解散，2:不满足条件
		 */
		state: number;
		/**
		 * 可选参数 只有不满足条件的时候，才会有此值
		 */
		list?: ClanLimitInfo[];
	}
}
