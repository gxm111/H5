/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF 生成
 * 生成时间 2016-09-30 12:22:00
 **/
module junyou.hqg {
	export interface ItemsResult{
		/**
		 * 可选参数 最终的物品变化   ItemCount中，id为物品id；count为最终数量 为 0时 表示物品已消耗掉了
		 */
		items?: ItemCount[];
		/**
		 * 可选参数 新增的道具奖励
		 */
		newItems?: ItemInfo[];
		/**
		 * 可选参数 最终的经验值
		 */
		exp?: number;
		/**
		 * 可选参数 最终的游戏币
		 */
		money?: number;
		/**
		 * 可选参数 最终的荣誉
		 */
		honor?: number;
		/**
		 * 可选参数 最终的元宝
		 */
		gold?: number;
		/**
		 * 可选参数 最终的公会声望
		 */
		fame?: number;
	}
}
