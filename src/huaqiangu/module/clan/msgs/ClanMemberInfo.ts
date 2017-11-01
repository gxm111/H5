/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-19 12:06:34
 **/
module junyou.hqg {
	export interface ClanMemberInfo{
		/**
		 * 成员id
		 */
		id: number;
		/**
		 * 成员等级
		 */
		level: number;
		/**
		 * 成员名
		 */
		name: string;
		/**
		 * 战力
		 */
		zhanli: number;
		/**
		 * 可选参数 贡献
		 */
		res?: number;
		/**
		 * 可选参数 职位头衔
		 */
		titleid?: number;
		/**
		 * 可选参数 离线时间0：在线，大于0：离线时间戳
		 */
		time?: number;
	}
}
