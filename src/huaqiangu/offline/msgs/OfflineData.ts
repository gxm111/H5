/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E7%A6%BB%E7%BA%BF%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-08-17 18:44:26
 **/
module junyou.hqg {
	export interface OfflineData{
		/**
		 * 离线时间(单位：秒)
		 */
		time: number;
		/**
		 * 战斗总次数
		 */
		battleCount: number;
		/**
		 * 可选参数 离线获得总经验
		 */
		totalExp?: number;
		/**
		 * 可选参数 角色增加的等级
		 */
		deltaLevel?: number;
		/**
		 * 可选参数 获得的装备列表
		 */
		equips?: ItemInfo[];
		/**
		 * 可选参数 自动熔炼的装备数量
		 */
		ronglianCount?: number;
		/**
		 * 可选参数 离线获得总游戏币
		 */
		totalMoney?: number;
		/**
		 * 可选参数 离线获得总熔炼值
		 */
		totalRongLian?: number;
	}
}
