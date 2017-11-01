/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E7%86%94%E7%82%BC 生成
 * 生成时间 2016-08-05 19:19:54
 **/
module junyou.hqg {
	export interface RongLianSuccess_S2C{
		/**
		 * 可选参数 销毁的装备ID列表
		 */
		equids?: number[];
		/**
		 * 可选参数 获得的强化石数量
		 */
		ronglianzhi?: number;
		/**
		 * 可选参数 获得的装备列表
		 */
		equips?: ItemInfo[];
		/**
		 * 可选参数 找不到的装备ID列表，通知客户端销毁这些ID的物品
		 */
		errEquids?: number[];
		/**
		 * 可选参数 获得的游戏币
		 */
		money?: number;
	}
}
