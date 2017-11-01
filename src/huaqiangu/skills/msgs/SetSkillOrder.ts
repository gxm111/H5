/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%8A%80%E8%83%BD%E7%9B%B8%E5%85%B3%E9%80%9A%E4%BF%A1 生成
 * 生成时间 2016-10-10 14:00:45
 **/
module junyou.hqg {
	export interface SetSkillOrder{
		/**
		 * 伙伴顺序，从0开始的索引
		 */
		follower: number;
		/**
		 * 要设置的技能id
		 */
		id: number;
		/**
		 * 要设置的技能顺序，从0开始的索引，-1为卸下
		 */
		order: number;
	}
}
