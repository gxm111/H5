/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%88%98%E6%96%97%E6%95%B0%E6%8D%AE%E9%80%9A%E4%BF%A1 生成
 * 生成时间 2016-08-02 11:18:57
 **/
module junyou.hqg {
	export interface XAttr{
		/**
		 * 可选参数 最大生命
		 */
		maxhp?: number;
		/**
		 * 可选参数 物理攻击
		 */
		wugong?: number;
		/**
		 * 可选参数 物理防御
		 */
		wufang?: number;
		/**
		 * 可选参数 法术攻击
		 */
		fagong?: number;
		/**
		 * 可选参数 法术防御
		 */
		fafang?: number;
		/**
		 * 可选参数 命中等级
		 */
		mingzhong?: number;
		/**
		 * 可选参数 闪避等级
		 */
		shanbi?: number;
		/**
		 * 可选参数 暴击等级
		 */
		baoji?: number;
		/**
		 * 可选参数 韧性等级
		 */
		renxing?: number;
		/**
		 * 可选参数 必杀等级
		 */
		bisha?: number;
		/**
		 * 可选参数 无视防御
		 */
		chuantou?: number;
		/**
		 * 可选参数 身法等级
		 */
		shenfa?: number;
	}
}
