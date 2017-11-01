/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A3%85%E5%A4%87%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-08-24 10:28:23
 **/
module junyou.hqg {
	export interface DressSuccess_S2C{
		/**
		 * 穿上的装备唯一标识
		 */
		id: number;
		/**
		 * 可选参数 当前物品所在的位置，0表示在背包，1表示在主角身上，2表示在伙伴1身上，3表示在伙伴2身上
		 */
		slot?: number;
	}
}
