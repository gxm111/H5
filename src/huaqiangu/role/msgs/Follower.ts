/**
 * 使用JunyouProtoTools，从 http://192.168.0.205:1234/hqgH5/wiki/wikis/%E8%A7%92%E8%89%B2%E6%95%B0%E6%8D%AE 生成
 * 生成时间 2016-10-13 11:16:42
 **/
module junyou.hqg {
	export interface Follower{
		/**
		 * 角色职业配置id
		 */
		cfgid: number;
		/**
		 * 可选参数 人物模型外显标识(如果此值没有，客户端使用配置的默认外显)
		 */
		cloth?: string;
		/**
		 * 可选参数 武器外显标识
		 */
		weapon?: string;
		/**
		 * 可选参数 翅膀外显标识
		 */
		wing?: string;
		/**
		 * 人物总体属性
		 */
		xattr: XAttr;
		/**
		 * 可选参数 随从装配的自动释放的技能
		 */
		skills?: SkillInfo[];
	}
}
