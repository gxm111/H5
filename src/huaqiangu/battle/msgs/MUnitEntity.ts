/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%88%98%E6%96%97%E6%95%B0%E6%8D%AE%E9%80%9A%E4%BF%A1 生成
 * 生成时间 2016-08-02 11:18:57
 **/
module junyou.hqg {
	export interface MUnitEntity{
		/**
		 * 单位的战斗标识
		 */
		guid: number;
		/**
		 * 单位属性
		 */
		xattr: XAttr;
		/**
		 * pst标识
		 */
		pst: string;
		/**
		 * 队伍标识
		 */
		team: number;
		/**
		 * 底图资源标识
		 */
		cloth: string;
		/**
		 * 坐标x
		 */
		x: number;
		/**
		 * 坐标y
		 */
		y: number;
		/**
		 * 可选参数 技能id列表
		 */
		skills?: SkillInfo[];
		/**
		 * 可选参数 武器资源标识
		 */
		weapon?: string;
		/**
		 * 可选参数 翅膀资源标识
		 */
		wing?: string;
		/**
		 * 可选参数 单位名称
		 */
		name?: string;
	}
}
