/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF 生成
 * 生成时间 2016-09-29 11:40:09
 **/
module junyou.hqg {
	export interface ItemInfo{
		/**
		 * 物品唯一标识，非全局，绑定在个人上
		 */
		id: number;
		/**
		 * 物品的配置id
		 */
		cfgid: number;
		/**
		 * 可选参数 格位标识，0表示在背包中，1表示在主角身上，2表示在伙伴1身上，3表示在伙伴2身上
		 */
		slot?: number;
		/**
		 * 可选参数 装备的稀有等级，道具没有此值，直接根据配置得到
		 */
		rare?: number;
		/**
		 * 可选参数 过期时间戳
		 */
		expire?: number;
		/**
		 * 可选参数 随机属性
		 */
		suiji?: EquipSuiJi[];
		/**
		 * 可选参数 物品数量
		 */
		count?: number;
	}
}
