/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-23 14:22:30
 **/
module junyou.hqg {
	export interface ClanLimitInfo{
		/**
		 * 入门限制类型   1 战力最低需求  2 等级最低需求   3 VIP等级最低需求
		 */
		id: number;
		/**
		 * 限制条件的值
		 */
		value: number;
	}
}
