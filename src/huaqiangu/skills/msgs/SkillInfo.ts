/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E6%8A%80%E8%83%BD%E4%BF%A1%E6%81%AF 生成
 * 生成时间 2016-08-16 20:26:52
 **/
module junyou.hqg {
	export interface SkillInfo{
		/**
		 * 技能标识
		 */
		id: number;
		/**
		 * 可选参数 技能被冠名后的名字
		 */
		name?: string;
		/**
		 * 可选参数 技能的冠名者名字
		 */
		rolename?: string;
	}
}
