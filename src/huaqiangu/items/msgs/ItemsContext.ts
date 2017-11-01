/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF 生成
 * 生成时间 2016-10-13 16:07:38
 **/
module junyou.hqg {
	export interface ItemsContext{
		/**
		 * 物品最终的数值
		 */
		result: ItemsResult;
		/**
		 * 可选参数 物品变更的数量， ItemCount中，id为物品配置id，并非物品id；count为新增（正数）/消耗（负数）的数量
		 */
		changed?: ItemCount[];
	}
}
