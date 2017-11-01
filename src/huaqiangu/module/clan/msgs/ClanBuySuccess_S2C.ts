/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E9%97%A8%E6%B4%BE 生成
 * 生成时间 2016-09-30 15:21:12
 **/
module junyou.hqg {
	export interface ClanBuySuccess_S2C{
		/**
		 * 商品配置id
		 */
		cfgid: number;
		/**
		 * 可选参数 你购买的商品数量
		 */
		count?: number;
		/**
		 * 可选参数 商品已购买的总数量，如果是可无限购买的，为0
		 */
		total?: number;
		/**
		 * 物品消耗/获得信息
		 */
		context: ItemsContext;
	}
}
